import { createRef } from 'react';
import { render, act, waitFor, cleanup } from '@testing-library/react';
import { EpubViewer, ReactEpubViewer } from 'modules';
import { ViewerRef } from 'types';

/**
 * Component-contract regression tests for the wrapper logic.
 *
 * epubjs is mocked so we exercise *our* behavior (ref method attachment,
 * book/rendition lifecycle, listener registration, the "latest ref" callback
 * pattern) without epubjs's browser/iframe dependencies. These guard the
 * behavioral guarantees touched by the React 18 / lifecycle refactor.
 */

const { MockBook, MockRendition } = vi.hoisted(() => {
  class MockRendition {
    handlers: Record<string, Function[]> = {};
    display = vi.fn();
    prev = vi.fn();
    next = vi.fn();
    destroy = vi.fn();
    resize = vi.fn();
    flow = vi.fn();
    spread = vi.fn();
    themes = { register: vi.fn(), registerUrl: vi.fn(), select: vi.fn() };
    annotations = { remove: vi.fn(), highlight: vi.fn() };
    on = vi.fn((e: string, h: Function) => {
      (this.handlers[e] ||= []).push(h);
    });
    off = vi.fn();
    emit(e: string, ...args: any[]) {
      (this.handlers[e] || []).forEach(h => h(...args));
    }
    location = { start: { cfi: 'epubcfi(/6/2!/4/1:0)' } };
  }

  class MockBook {
    static instances: any[] = [];
    url: string;
    options: any;
    lastRendition: any = null;
    rendition: any = null;
    spine = { get: vi.fn(() => ({ href: 'chap1.html' })) };
    navigation = { get: vi.fn(() => ({ label: 'Chapter 1' })) };
    locations = {
      load: vi.fn(),
      generate: vi.fn(() => Promise.resolve()),
      save: vi.fn(() => '[]'),
      locationFromCfi: vi.fn(() => 3),
      total: 100,
    };
    loaded = {
      navigation: Promise.resolve({
        toc: [{ label: 'Chapter 1', href: 'chap1.html' }],
      }),
      metadata: Promise.resolve({
        title: 'Title',
        description: 'Desc',
        pubdate: '2020-01-02',
        modified_date: '2020-03-04',
        creator: 'Author',
        publisher: 'Publisher',
        language: 'en',
      }),
    };
    opened = Promise.resolve({
      archive: { urlCache: { 'cover.jpg': 'blob:cover' } },
      cover: 'cover.jpg',
    });
    ready = Promise.resolve();
    renderTo = vi.fn((_node: any, _opts: any) => {
      this.lastRendition = new MockRendition();
      this.rendition = this.lastRendition;
      return this.lastRendition;
    });
    destroy = vi.fn();
    constructor(url: string, options: any) {
      this.url = url;
      this.options = options;
      MockBook.instances.push(this);
    }
    key() {
      return 'book-key-' + this.url;
    }
  }

  return { MockBook, MockRendition };
});

vi.mock('epubjs', () => ({
  Book: MockBook,
  default: MockBook,
  EpubCFI: class {
    compare() {
      return 0;
    }
  },
}));

beforeEach(() => {
  MockBook.instances.length = 0;
  vi.clearAllMocks();
});

afterEach(() => {
  cleanup();
});

describe('EpubViewer (mocked epubjs)', () => {
  it('attaches imperative ref methods after rendering', async () => {
    const ref = createRef<ViewerRef>();
    render(<EpubViewer url="a.epub" ref={ref} />);

    await waitFor(() => expect(MockBook.instances.length).toBe(1));
    await waitFor(() =>
      expect(MockBook.instances[0].renderTo).toHaveBeenCalled(),
    );
    await waitFor(() => expect(typeof ref.current?.prevPage).toBe('function'));

    expect(typeof ref.current?.nextPage).toBe('function');
    expect(typeof ref.current?.getCurrentCfi).toBe('function');
    expect(typeof ref.current?.onHighlight).toBe('function');
    expect(typeof ref.current?.offHighlight).toBe('function');
    expect(typeof ref.current?.setLocation).toBe('function');
  });

  it('creates a rendition and displays it', async () => {
    render(<EpubViewer url="a.epub" ref={createRef()} />);
    await waitFor(() =>
      expect(MockBook.instances[0]?.lastRendition).toBeTruthy(),
    );
    expect(MockBook.instances[0].lastRendition.display).toHaveBeenCalled();
  });

  it('fires tocChanged with the parsed table of contents', async () => {
    const tocChanged = vi.fn();
    render(<EpubViewer url="a.epub" ref={createRef()} tocChanged={tocChanged} />);
    await waitFor(() =>
      expect(tocChanged).toHaveBeenCalledWith([
        { label: 'Chapter 1', href: 'chap1.html' },
      ]),
    );
  });

  it('destroys the book on unmount (no leak)', async () => {
    const { unmount } = render(<EpubViewer url="a.epub" ref={createRef()} />);
    await waitFor(() => expect(MockBook.instances.length).toBe(1));
    const book = MockBook.instances[0];
    unmount();
    expect(book.destroy).toHaveBeenCalled();
  });

  it('destroys the previous book and creates a new one when url changes', async () => {
    const ref = createRef<ViewerRef>();
    const { rerender } = render(<EpubViewer url="a.epub" ref={ref} />);
    await waitFor(() => expect(MockBook.instances.length).toBe(1));
    const first = MockBook.instances[0];

    rerender(<EpubViewer url="b.epub" ref={ref} />);
    await waitFor(() => expect(MockBook.instances.length).toBe(2));
    expect(first.destroy).toHaveBeenCalled();
  });

  it('prevPage/nextPage delegate to the rendition', async () => {
    const ref = createRef<ViewerRef>();
    render(<EpubViewer url="a.epub" ref={ref} />);
    await waitFor(() => expect(typeof ref.current?.nextPage).toBe('function'));

    const rendition = MockBook.instances[0].lastRendition;
    act(() => ref.current!.nextPage());
    expect(rendition.next).toHaveBeenCalled();
    act(() => ref.current!.prevPage());
    expect(rendition.prev).toHaveBeenCalled();
  });

  it('onHighlight delegates to rendition.annotations', async () => {
    const ref = createRef<ViewerRef>();
    render(<EpubViewer url="a.epub" ref={ref} />);
    await waitFor(() => expect(typeof ref.current?.onHighlight).toBe('function'));

    const rendition = MockBook.instances[0].lastRendition;
    act(() => ref.current!.onHighlight('epubcfi(/6/2!/4)', undefined, '#abc'));
    expect(rendition.annotations.highlight).toHaveBeenCalled();
  });

  it('invokes the LATEST pageChanged on locationChanged (latest-ref pattern)', async () => {
    const first = vi.fn();
    const second = vi.fn();
    const ref = createRef<ViewerRef>();
    const { rerender } = render(
      <EpubViewer url="a.epub" ref={ref} pageChanged={first} />,
    );
    await waitFor(() =>
      expect(MockBook.instances[0]?.lastRendition).toBeTruthy(),
    );

    // Swap the callback without changing url (book/rendition stay the same).
    rerender(<EpubViewer url="a.epub" ref={ref} pageChanged={second} />);

    const rendition = MockBook.instances[0].lastRendition;
    act(() =>
      rendition.emit('locationChanged', {
        start: 'epubcfi(/6/2!/4/1:0)',
        end: 'epubcfi(/6/2!/4/1:5)',
      }),
    );

    expect(second).toHaveBeenCalledTimes(1);
    expect(first).not.toHaveBeenCalled();
    expect(second.mock.calls[0][0]).toMatchObject({
      chapterName: 'Chapter 1',
      currentPage: 3,
      totalPage: 100,
    });
  });
});

describe('ReactEpubViewer (mocked epubjs)', () => {
  it('parses book metadata and fires onBookInfoChange (latest-ref)', async () => {
    const onBookInfoChange = vi.fn();
    render(
      <ReactEpubViewer
        url="a.epub"
        ref={createRef()}
        onBookInfoChange={onBookInfoChange}
      />,
    );

    await waitFor(() => expect(onBookInfoChange).toHaveBeenCalled());
    const info = onBookInfoChange.mock.calls[0][0];
    expect(info).toMatchObject({
      title: 'Title',
      author: 'Author',
      publisher: 'Publisher',
      language: 'en',
      coverURL: 'blob:cover',
    });
    expect(typeof info.published_date).toBe('string');
  });

  it('fires onTocChange through the underlying EpubViewer', async () => {
    const onTocChange = vi.fn();
    render(
      <ReactEpubViewer url="a.epub" ref={createRef()} onTocChange={onTocChange} />,
    );
    await waitFor(() =>
      expect(onTocChange).toHaveBeenCalledWith([
        { label: 'Chapter 1', href: 'chap1.html' },
      ]),
    );
  });

  it('destroys the book on unmount', async () => {
    const { unmount } = render(<ReactEpubViewer url="a.epub" ref={createRef()} />);
    await waitFor(() => expect(MockBook.instances.length).toBe(1));
    const book = MockBook.instances[0];
    unmount();
    expect(book.destroy).toHaveBeenCalled();
  });
});
