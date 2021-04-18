import React, { 
  useState, 
  useEffect, 
  useCallback, 
  useRef,
  CSSProperties
} from 'react'
import { Book, Rendition } from "epubjs";
// style
import styles from 'modules/epubViewer/styles'
// types
import { EpubViewerProps, ViewerRef } from 'types'
import Toc from 'types/toc'
import Loc from 'types/loc'


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
const EpubViewer = ({
  url, 
  epubFileOptions, 
  epubOptions,
  style,
  location,
  bookChanged,
  rendtionChanged,
  pageChanged,
  tocChanged,
  selectionChanged,
  loadingView,
}: EpubViewerProps, ref: React.RefObject<ViewerRef> | any) => {
  // TODO Fix the ref type correctly instead 'any' type.
  const viewerStyle: CSSProperties = style ? { ...styles, ...style} : styles;

  const [isLoaded, setIsLoaded] = useState(false);

  const [book, setBook] = useState<Book | null>(null);

  const [rendition, setRendition] = useState<Rendition | null>(null);

  const [toc, setToc] = useState<Toc[]>([]);

  const currentCfi = useRef<string>('');

  

  /**
   * Init Book
   * @method
   * - Set book state
   * - Set Epub path state
   * - Set isLoaded state
   * - Set toc state
   */
  const initBook = () => {
    if (book) {
      book.destroy();
    }
    
    const book_ = new Book(url, epubFileOptions);
    setBook(book_);

    bookChanged && bookChanged(book_);

    book_.loaded.navigation.then(({ toc }) => {
      const toc_: Toc[] = toc.map(t => ({ 
        label: t.label, 
        href: t.href 
      }));
      
      setIsLoaded(true);
      setToc(toc_);
      tocChanged && tocChanged(toc_);
      initRendition(book_);
    });

    // Init Location & Pagination
    book_.ready.then(function() {
      const stored = localStorage.getItem(book_.key() + '-locations');
      if (stored) {
          return book_.locations.load(stored);
      } else {
          return book_.locations.generate(1024);
      }
    }).then(() => {
      localStorage.setItem(book_.key() + '-locations', book_.locations.save());
    });
  };

  /**
   * Init Rendition
   * @method
   * - Init iframe tag on DOM element
   * - Set rendition
   * - Set start page
   */
  const initRendition = (book_: Book) => {
    const node = ref.current;
    if (!node || !book_) return;
    
    const rendition_ = book_.renderTo(node, {
      width: "100%",
      height: "100%",
      ...epubOptions
    });
    setRendition(rendition_);
    
    rendtionChanged && rendtionChanged(rendition_);

    if(typeof location === "string") {
      rendition_.display(location);
    } else if(toc.length > 0 && toc[0].href) {
      rendition_.display(toc[0].href);
    } else {
      rendition_.display();
    }
  }

  /**
   * Move page
   * @method
   * @param type direction
   */
  const movePage = useCallback((type: "PREV" | "NEXT") => {
    if (!rendition) return;
    if (type === "PREV") rendition.prev();
    else rendition.next();
  }, [rendition]);

  /**
   * Move page by arrow key
   * @method
   * @param props Keyboard Event
   * @param props.key 
   */
  const handleKeyPress = useCallback(({ key }: any) => {
    key && key === "ArrowLeft" && movePage("PREV");
    key && key === "ArrowRight" && movePage("NEXT");
  }, [movePage]);

  /**
   * Run when location changed
   * @method
   * @param loc
   * - Set location state
   * - Run 'locationChanged()' through startCFI
   */
  const onLocationChange = useCallback((loc: Loc) => {
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

    pageChanged && pageChanged({
      chapterName, 
      currentPage, 
      totalPage, 
      startCfi, 
      endCfi,
      base
    });

    currentCfi.current = startCfi;
  }, [book, pageChanged]);

  /**
   * Highlight function
   * @param cfiRange Selecton CFIRange
   * @param color Highlight color
   * @param callback Highlight callback function when click it
   */
   const onHighlight = useCallback((
    cfiRange: string, 
    callback: (e: any) => void,
    color?: string
  ) => {
    if (!rendition) return;

    rendition.annotations.remove(cfiRange, 'highlight');
    rendition.annotations.highlight(
      cfiRange, 
      {}, 
      callback, 
      "epub-highlight",
      { 'fill': color || '#fdf183' }
    );
  }, [rendition]);

  /**
   * Register viewer control function
   * @method
   * - REF.CURRENT.prevPage() : Move prev page
   * - REF.CURRENT.nextPage() : Move next page
   * - REF.CURRENT.getCurrentCfi() : Get current CFI
   * - REF.CURRENT.onHighlight(): Set highlight
   * - REF.CURRENT.offHighlight(): Remove specific highliht
   * - REF.CURRENT.seLocation(): Move to specific cfi or href
   */
  const registerGlobalFunc = useCallback(() => {
    if (!ref.current) return;
    if (movePage) {
      ref.current.prevPage = () => movePage("PREV");
      ref.current.nextPage = () => movePage("NEXT");
    }
    ref.current.getCurrentCfi = () => currentCfi.current;
    if (onHighlight) {
      ref.current.onHighlight = onHighlight;
    }
    if (rendition) {
      ref.current.offHighlight = (cfiRange: string) => rendition.annotations.remove(cfiRange, 'highlight');
      ref.current.setLocation = (location: string) => rendition.display(location);
    }
  }, [ref, rendition, movePage, onHighlight]);



  /** Ref checker */
  useEffect(() => {
    if (!ref) {
      throw new Error("[React-Epub-Viewer] Put a ref argument that has a ViewerRef type.");
    }
  }, [ref]);

  /** Epub Init */
  /* eslint-disable */
  useEffect(() => {
    if (!url) return;
    initBook();
  }, [url]);
  /* eslint-enable */

  /** 
   * Emit Viewer Event
   * - Register move event
   * - Register location changed event
   * - Register selection event
   */
  /* eslint-disable */
  useEffect(() => {
    if (!rendition) return;

    // Emit global control function
    registerGlobalFunc();

    document.addEventListener('keyup', handleKeyPress, false);
    rendition.on("keyup", handleKeyPress);
    rendition.on("locationChanged", onLocationChange);
    selectionChanged && rendition.on('selected', selectionChanged);

    return (() => {
      document.removeEventListener('keyup', handleKeyPress, false);
      rendition.off("keyup", handleKeyPress);
      rendition.off("locationChanged", onLocationChange);
      selectionChanged && rendition.off('selected', selectionChanged);
    });
  }, [
    rendition,
    registerGlobalFunc,
    handleKeyPress
  ]);
  /* eslint-enable */

  /** Display page by changed location */
  useEffect(() => {
    if (!location || !rendition) return;

    rendition.display(location);
  }, [location, rendition]);

  
  return (<>
    {!isLoaded && loadingView}
    <div ref={ref} style={viewerStyle} />
  </>);
}

export default React.forwardRef(EpubViewer)