import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  CSSProperties,
} from 'react';
import { Book, Rendition } from 'epubjs';
// style
import styles from 'modules/epubViewer/styles';
// hooks
import { useStableValue } from 'lib/hooks/useStableValue';
// types
import { EpubViewerProps, ViewerRef } from 'types';
import Loc from 'types/loc';

/**
 * EpubViewer Module
 * @class
 * @param props
 * @param props.url Epub path
 * @param props.epubFileOptions Epub file option
 * @param props.epubOptions Epub viewer option
 * @param props.style Epub Wrapper style
 * @param props.location Epub CFI or href
 * @param props.bookChanged Run when book changed
 * @param props.rendtionChanged Run when rendition changed
 * @param props.pageChanged Run when page changed
 * @param props.tocChanged Run when toc changed
 * @param props.selectionChanged Run when selected
 * @param props.loadingView Loading Component
 * @param ref Viewer ref
 */
const EpubViewer = (
  {
    url,
    epubFileOptions: epubFileOptionsProp,
    epubOptions: epubOptionsProp,
    style,
    location,
    bookChanged,
    rendtionChanged,
    pageChanged,
    tocChanged,
    selectionChanged,
    loadingView,
  }: EpubViewerProps,
  ref: React.ForwardedRef<ViewerRef>,
) => {
  // Keep option objects referentially stable so that passing an inline literal
  // (e.g. `epubOptions={{ allowScriptedContent: true }}`) does not re-run the
  // book/rendition effects on every render. Recreating the rendition on each
  // render races the epubjs lifecycle and can crash rendering ("Cannot read
  // properties of undefined (reading 'package')") → the book never loads.
  const epubFileOptions = useStableValue(epubFileOptionsProp);
  const epubOptions = useStableValue(epubOptionsProp);
  /**
   * This component requires an object ref (not a callback ref) because it both
   * forwards the ref to the wrapper element and augments `ref.current` with
   * imperative methods. Narrow it once here.
   */
  const viewerRef = ref as React.MutableRefObject<ViewerRef | null>;

  const viewerStyle: CSSProperties = style ? { ...styles, ...style } : styles;

  const [isLoaded, setIsLoaded] = useState(false);

  const [book, setBook] = useState<Book | null>(null);

  const [rendition, setRendition] = useState<Rendition | null>(null);

  const currentCfi = useRef<string>('');

  // Track every CFIRange highlighted through `onHighlight` so we can clear
  // them all later. epubjs keeps its `annotations` map private, so there is no
  // public way to enumerate them without this bookkeeping.
  const highlights = useRef<Set<string>>(new Set());

  // Keep the latest consumer callbacks in refs so effects don't re-run when
  // inline callback props change identity between renders.
  const bookChangedRef = useRef(bookChanged);
  const rendtionChangedRef = useRef(rendtionChanged);
  const pageChangedRef = useRef(pageChanged);
  const tocChangedRef = useRef(tocChanged);
  const selectionChangedRef = useRef(selectionChanged);
  useEffect(() => {
    bookChangedRef.current = bookChanged;
    rendtionChangedRef.current = rendtionChanged;
    pageChangedRef.current = pageChanged;
    tocChangedRef.current = tocChanged;
    selectionChangedRef.current = selectionChanged;
  });

  /**
   * Move page
   * @method
   * @param type direction
   */
  const movePage = useCallback(
    (type: 'PREV' | 'NEXT') => {
      if (!rendition) return;
      if (type === 'PREV') rendition.prev();
      else rendition.next();
    },
    [rendition],
  );

  /**
   * Move page by arrow key
   * @method
   * @param props Keyboard Event
   * @param props.key
   */
  const handleKeyPress = useCallback(
    ({ key }: any) => {
      key && key === 'ArrowLeft' && movePage('PREV');
      key && key === 'ArrowRight' && movePage('NEXT');
    },
    [movePage],
  );

  /**
   * Run when location changed
   * @method
   * @param loc
   * - Set location state
   * - Run 'locationChanged()' through startCFI
   */
  const onLocationChange = useCallback(
    (loc: Loc) => {
      const startCfi = loc && loc.start;
      const endCfi = loc && loc.end;
      const base = loc && loc.start.slice(8).split('!')[0];

      if (!book) return;

      const spineItem = book.spine.get(startCfi);
      const navItem = book.navigation.get(spineItem.href);
      const chapterName = navItem && navItem.label.trim();

      const locations: any = book.locations;
      const currentPage = locations.locationFromCfi(startCfi);
      const totalPage = locations.total;

      // #93 guard: epubjs returns -1 from `locationFromCfi` when the locations
      // index has not been generated yet (e.g. right after a url transition,
      // before `book.locations.generate()` resolves). Skip emitting the bogus
      // page so consumers never receive `currentPage = -1`; the correct page is
      // reported by the next locationChanged once locations are ready.
      if (currentPage >= 0) {
        pageChangedRef.current?.({
          chapterName,
          currentPage,
          totalPage,
          startCfi,
          endCfi,
          base,
        });
      }

      currentCfi.current = startCfi;
    },
    [book],
  );

  /**
   * Selection event handler with a stable identity (reads the latest callback
   * from a ref) so listeners are not re-registered on every render.
   */
  const handleSelected = useCallback((cfiRange: string, contents: any) => {
    selectionChangedRef.current?.(cfiRange, contents);
  }, []);

  /**
   * Highlight function
   * @param cfiRange Selected CFIRange
   * @param callback Highlight callback function when click it
   * @param color Highlight color
   */
  const onHighlight = useCallback(
    (cfiRange: string, callback?: (e: any) => void, color?: string) => {
      if (!rendition) return;

      rendition.annotations.remove(cfiRange, 'highlight');
      rendition.annotations.highlight(
        cfiRange,
        {},
        callback,
        'epub-highlight',
        {
          fill: color || '#fdf183',
        },
      );
      highlights.current.add(cfiRange);
    },
    [rendition],
  );

  /**
   * Highlight remove function
   * @param cfiRange Selected CFIRange
   */
  const onRemoveHighlight = useCallback(
    (cfiRange: string) => {
      if (!rendition) return;

      rendition.annotations.remove(cfiRange, 'highlight');
      highlights.current.delete(cfiRange);
    },
    [rendition],
  );

  /**
   * Remove every highlight added through `onHighlight`
   * @method
   */
  const onRemoveAllHighlight = useCallback(() => {
    if (!rendition) return;

    highlights.current.forEach(cfiRange => {
      // epubjs throws if the annotation no longer exists; ignore so one stale
      // entry cannot abort the whole clear.
      try {
        rendition.annotations.remove(cfiRange, 'highlight');
      } catch {
        /* ignore already-removed annotations */
      }
    });
    highlights.current.clear();
  }, [rendition]);

  /**
   * Register viewer control function
   * @method
   * - REF.CURRENT.prevPage() : Move prev page
   * - REF.CURRENT.nextPage() : Move next page
   * - REF.CURRENT.getCurrentCfi() : Get current CFI
   * - REF.CURRENT.onHighlight(): Set highlight
   * - REF.CURRENT.offHighlight(): Remove specific highliht
   * - REF.CURRENT.offAllHighlight(): Remove every highlight
   * - REF.CURRENT.seLocation(): Move to specific cfi or href
   */
  const registerGlobalFunc = useCallback(() => {
    if (!viewerRef.current) return;
    if (movePage) {
      viewerRef.current.prevPage = () => movePage('PREV');
      viewerRef.current.nextPage = () => movePage('NEXT');
    }
    viewerRef.current.getCurrentCfi = () => currentCfi.current;
    if (onHighlight) {
      viewerRef.current.onHighlight = onHighlight;
    }
    if (onRemoveHighlight) {
      viewerRef.current.offHighlight = onRemoveHighlight;
    }
    if (onRemoveAllHighlight) {
      viewerRef.current.offAllHighlight = onRemoveAllHighlight;
    }
    if (rendition) {
      viewerRef.current.setLocation = (location: string) =>
        rendition.display(location);
    }
  }, [
    viewerRef,
    rendition,
    movePage,
    onHighlight,
    onRemoveHighlight,
    onRemoveAllHighlight,
  ]);

  /** Ref Checker */
  useEffect(() => {
    if (!ref) {
      throw new Error(
        '[React-Epub-Viewer] Put a ref argument that has a ViewerRef type.',
      );
    }
  }, [ref]);

  /** Epub book lifecycle: create on url/options change, destroy on cleanup */
  useEffect(() => {
    if (!url) return;

    const book_ = new Book(url, epubFileOptions);
    setBook(book_);

    return () => {
      // epubjs destroy is not always idempotent; guard against throws.
      try {
        book_.destroy();
      } catch {
        /* ignore epubjs teardown errors */
      }
      setBook(null);
      setRendition(null);
      setIsLoaded(false);
    };
  }, [url, epubFileOptions]);

  /** Book Changed */
  useEffect(() => {
    if (!book) return;

    bookChangedRef.current?.(book);

    book.loaded.navigation.then(({ toc }) => {
      const toc_ = toc.map(t => ({
        label: t.label,
        href: t.href,
      }));

      setIsLoaded(true);
      tocChangedRef.current?.(toc_);
    });

    book.ready
      .then(function () {
        if (!book) return;

        const stored =
          typeof localStorage !== 'undefined'
            ? localStorage.getItem(book.key() + '-locations')
            : null;
        if (stored) {
          return book.locations.load(stored);
        } else {
          return book.locations.generate(1024);
        }
      })
      .then(() => {
        if (!book) return;
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem(
            book.key() + '-locations',
            book.locations.save(),
          );
        }
      });
  }, [book]);

  /** Rendition Changed */
  useEffect(() => {
    if (!rendition) return;

    rendtionChangedRef.current?.(rendition);
  }, [rendition]);

  /** Viewer Option Changed: (re)create the rendition, destroying the old one */
  useEffect(() => {
    if (!book) return;

    const node = viewerRef.current;
    if (!node) return;

    let mounted = true;
    let rendition_: Rendition | null = null;
    node.innerHTML = '';

    book.ready.then(function () {
      if (!mounted || !book.spine) return;

      const loc = book.rendition?.location?.start?.cfi;

      rendition_ = book.renderTo(node, {
        width: '100%',
        height: '100%',
        ...epubOptions,
      });
      setRendition(rendition_);

      if (loc) {
        rendition_.display(loc);
      } else {
        rendition_.display();
      }
    });

    return () => {
      mounted = false;
      try {
        rendition_?.destroy();
      } catch {
        /* ignore epubjs teardown errors */
      }
    };
  }, [book, epubOptions, viewerRef]);

  /** Location Changed */
  useEffect(() => {
    if (!viewerRef.current || !location) return;
    if (viewerRef.current.setLocation) viewerRef.current.setLocation(location);
  }, [location, viewerRef]);

  /**
   * Emit Viewer Event
   * - Register move event
   * - Register location changed event
   * - Register selection event
   */
  useEffect(() => {
    if (!rendition) return;

    // Emit global control function
    registerGlobalFunc();

    document.addEventListener('keyup', handleKeyPress, false);
    rendition.on('keyup', handleKeyPress);
    rendition.on('locationChanged', onLocationChange);
    rendition.on('selected', handleSelected);

    return () => {
      document.removeEventListener('keyup', handleKeyPress, false);
      rendition.off('keyup', handleKeyPress);
      rendition.off('locationChanged', onLocationChange);
      rendition.off('selected', handleSelected);
    };
  }, [rendition, registerGlobalFunc, handleKeyPress, onLocationChange, handleSelected]);

  return (
    <>
      {!isLoaded && loadingView}
      <div ref={viewerRef} style={viewerStyle} />
    </>
  );
};

export default React.forwardRef<ViewerRef, EpubViewerProps>(EpubViewer);
