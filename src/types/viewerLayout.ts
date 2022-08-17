/**
 * Epub viewer layout size type
 * @type
 * @param MIN_VIEWER_WIDTH Viewer min width (px)
 * @param MIN_VIEWER_HEIGHT Viewer min height (px)
 * @param VIEWER_HEADER_HEIGHT Viewer header height (px)
 * @param VIEWER_FOOTER_HEIGHT Viewer footer height (px)
 * @param VIEWER_SIDEMENU_WIDTH Viewer sideMenu width (px)
 */
interface ViewerLayout {
  MIN_VIEWER_WIDTH: number;
  MIN_VIEWER_HEIGHT: number;
  VIEWER_HEADER_HEIGHT: number;
  VIEWER_FOOTER_HEIGHT: number;
  VIEWER_SIDEMENU_WIDTH: number;
}

export default ViewerLayout;
