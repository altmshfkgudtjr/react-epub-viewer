import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from 'react';
import { Book, Rendition, Contents } from 'epubjs';
// modules
import EpubViewer from 'modules/epubViewer/EpubViewer';
// components
import LoadingView from 'LoadingView';
// utils
import { debounce, timeFormatter } from 'lib/utils/commonUtil';
// styles
import viewerDefaultStyles from 'modules/reactViewer/viewerStyle';
// types
import { ReactViewerProps, ViewerRef } from 'types';
import BookType, { BookStyle, BookOption } from 'types/book';

/**
 * Epub React Viewer Module
 * @class
 * @param props
 * @param props.url Epub file path
 * @param props.viewerLayout Viewer layout
 * @param props.viewerStyle Viewer style
 * @param props.viewerStyleURL Viwer style - CSS URL
 * @param props.viewerOption Viewer option
 * @param props.onBookInfoChange Run when book information changed
 * @param props.onPageChange Run when page changed
 * @param props.onTocChange Run when toc changed
 * @param props.onSelection Run when selected
 * @param props.loadingView Loading component
 * @param ref Viewer ref
 */
const ReactViewer = (
  {
    url,
    viewerLayout,
    viewerStyle,
    viewerStyleURL,
    viewerOption,
    onBookInfoChange,
    onPageChange,
    onTocChange,
    onSelection,
    loadingView,
  }: ReactViewerProps,
  ref: React.RefObject<ViewerRef> | any,
) => {
  // TODO Fix the ref type correctly instead 'any' type.
  const [book, setBook] = useState<Book | null>(null);

  const [rendition, setRendition] = useState<Rendition | null>(null);

  const [layoutStyle, setLayoutStyle] = useState<{ [key: string]: any }>({});

  const [bookStyle, setBookStyle] = useState<BookStyle>({
    fontFamily: 'Origin',
    fontSize: 16,
    lineHeight: 1.4,
    marginHorizontal: 0,
    marginVertical: 0,
  });

  const [bookOption, setBookOption] = useState<BookOption>({
    flow: 'paginated',
    resizeOnOrientationChange: true,
    spread: 'auto',
  });

  const currentSelection = useRef<{
    cfiRange: string;
    contents: Contents | null;
  }>({
    cfiRange: '',
    contents: null,
  });

  /**
   * Run book changed
   * @method
   * @param book Epub Book
   */
  const bookChanged = (book: Book) => setBook(book);

  /**
   * Run rendition changed
   * @method
   * @param rendition Epub Rendition
   */
  const rendtionChanged = (rendition: Rendition) => setRendition(rendition);

  /**
   * Run selection changed [Debounce]
   * @method
   * @param cfiRange CFIRange
   * @param contents Selection Epub Contents
   */
  const selectionChanged = (cfiRange: string, contents: Contents) => {
    currentSelection.current = { cfiRange, contents };
  };

  /**
   * Viewer resizing function
   * @method
   */
  const onResize = useMemo(
    () =>
      debounce(250, () => {
        if (!rendition) return;

        const viewerLayout_ = viewerLayout || {
          MIN_VIEWER_WIDTH: 600,
          MIN_VIEWER_HEIGHT: 300,
          VIEWER_HEADER_HEIGHT: 0,
          VIEWER_FOOTER_HEIGHT: 0,
          VIEWER_SIDEMENU_WIDTH: 0,
        };

        const { innerWidth: win_w, innerHeight: win_h } = window;
        const componentHeight =
          viewerLayout_.VIEWER_HEADER_HEIGHT +
          viewerLayout_.VIEWER_FOOTER_HEIGHT;
        const w =
          win_w -
          ~~(
            ((win_w - viewerLayout_.MIN_VIEWER_WIDTH) / 100) *
            bookStyle.marginHorizontal
          );
        const h =
          bookOption.flow === 'scrolled-doc'
            ? win_h - componentHeight
            : win_h -
              componentHeight -
              ~~(
                ((win_h - componentHeight - viewerLayout_.MIN_VIEWER_HEIGHT) /
                  100) *
                bookStyle.marginVertical
              );
        const marginVertical =
          bookOption.flow === 'scrolled-doc'
            ? ''
            : `${
                ~~(
                  ((win_h - componentHeight - viewerLayout_.MIN_VIEWER_HEIGHT) /
                    100) *
                  bookStyle.marginVertical
                ) / 2
              }px`;

        setLayoutStyle(layout => {
          if (
            layout.width !== w ||
            layout.height !== h ||
            layout.marginTop !== marginVertical
          ) {
            return {
              ...layout,
              width: w,
              height: h,
              marginTop: marginVertical,
              marginBottom: marginVertical,
            };
          }
          return layout;
        });

        try {
          rendition.resize(w, h);
        } catch {}
      }),
    [
      rendition,
      viewerLayout,
      bookStyle.marginHorizontal,
      bookStyle.marginVertical,
      bookOption.flow,
    ],
  );

  /**
   * Selection Event, run when run mouseup event
   * @method <br/>
   * - Fire after the Epubjs selected event. [about 300ms]
   */
  const onSelected = useCallback(async () => {
    if (!ref.current) return;

    const iframe = ref.current.querySelector('iframe');
    if (!iframe) return;

    const iframeWin = iframe.contentWindow;
    if (!iframeWin) return;

    const selection_ = iframeWin.getSelection();
    if (!selection_) return;

    const selectionText = selection_.toString();
    if (selectionText === '') return;

    const cfiRange: string = await new Promise(resolve =>
      setTimeout(() => resolve(currentSelection.current.cfiRange), 350),
    );
    if (!cfiRange) return;

    const contents = currentSelection.current.contents;
    if (!contents) return;

    onSelection && onSelection(cfiRange, contents);
  }, [ref, onSelection]);

  /** Ref checker */
  useEffect(() => {
    if (!ref) {
      throw new Error(
        '[React-Epub-Viewer] Put a ref argument that has a ViewerRef type.',
      );
    }
  }, [ref]);

  /** Epub parsing */
  // TODO Fix the infinite re-rendering issue, when inlcude `onBookInfoChange` to dependencies array.
  /* eslint-disable */
  useEffect(() => {
    if (!book) return;

    Promise.all([book.loaded.metadata, book.opened])
      .then(([metaData, bookData]: any[]) => {
        const newBookData: BookType = {
          coverURL: bookData.archive.urlCache[bookData.cover],
          title: metaData.title,
          description: metaData.description,
          published_date: timeFormatter(new Date(metaData.pubdate)),
          modified_date: timeFormatter(new Date(metaData.modified_date)),
          author: metaData.creator,
          publisher: metaData.publisher,
          language: metaData.language,
        };

        onBookInfoChange && onBookInfoChange(newBookData);
      })
      .catch(error => {
        throw `${error.stack} \n\n Message : Epub parsing failed.`;
      });
  }, [book]);
  /* eslint-enable */

  /** Set viewer Styles/Options */
  useEffect(() => {
    viewerStyle && setBookStyle(v => ({ ...v, ...viewerStyle }));
    viewerOption && setBookOption(v => ({ ...v, ...viewerOption }));
  }, [viewerStyle, viewerOption]);

  /** Apply viewer Styles/Options */
  useEffect(() => {
    if (!rendition) return;

    onResize();

    const newStyle = {
      ...viewerDefaultStyles,
      body: {
        'padding-top': '0px !important',
        'padding-bottom': '0px !important',
        'font-size': `${bookStyle.fontSize}px !important`,
      },
      p: {
        'font-size': `${bookStyle.fontSize}px !important`,
        'line-height': `${bookStyle.lineHeight} !important`,
      },
    };

    rendition.flow(bookOption.flow);
    rendition.spread(bookOption.spread);

    if (bookStyle.fontFamily !== 'Origin') {
      Object.assign(newStyle.body, {
        'font-family': `${bookStyle.fontFamily} !important`,
      });
    }

    if (bookOption.flow === 'scrolled-doc') {
      // Scroll type
      Object.assign(newStyle.body, {
        margin: 'auto !important',
      });
    } else if (bookOption.spread === 'auto') {
      // View 2 pages
      Object.assign(newStyle.body, {});
    } else {
      // View 1 page
      Object.assign(newStyle.body, {});
    }

    if (!!viewerStyleURL) {
      rendition.themes.registerUrl('main', viewerStyleURL);
    }

    rendition.themes.register('default', newStyle);

    rendition.themes.select('main');
  }, [
    rendition,
    bookStyle.fontFamily,
    bookStyle.fontSize,
    bookStyle.lineHeight,
    viewerStyleURL,
    bookOption,
    onResize,
  ]);

  /** Emit screen resizing event */
  useEffect(() => {
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [onResize]);

  /** Emit selection event */
  useEffect(() => {
    if (!rendition) return;
    rendition.on('mouseup', onSelected);
    return () => rendition.off('mouseup', onSelected);
  }, [rendition, onSelected]);

  return (
    <>
      <EpubViewer
        url={url}
        style={layoutStyle}
        bookChanged={bookChanged}
        rendtionChanged={rendtionChanged}
        tocChanged={onTocChange}
        pageChanged={onPageChange}
        selectionChanged={selectionChanged}
        loadingView={loadingView || <LoadingView />}
        ref={ref}
      />
    </>
  );
};

export default React.forwardRef(ReactViewer);
