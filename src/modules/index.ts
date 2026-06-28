import ReactEpubViewer from 'modules/reactViewer/ReactViewer';
import EpubViewer from 'modules/epubViewer/EpubViewer';

export { EpubViewer, ReactEpubViewer };

// Public types
export type { ViewerRef, EpubViewerProps, ReactViewerProps } from 'types';
export type { default as Page } from 'types/page';
export type { default as Toc } from 'types/toc';
export type { default as ViewerLayout } from 'types/viewerLayout';
export type { default as Loc } from 'types/loc';
export type {
  default as Book,
  BookStyle,
  BookOption,
  BookFlow,
  BookFontFamily,
} from 'types/book';
