import { useRef } from 'react';
import { createRoot } from 'react-dom/client';
import { EpubViewer, ReactEpubViewer } from 'modules';
import { ViewerRef } from 'types';

interface Props {
  VIEWER_TYPE?: 'ReactViewer' | 'EpubViewer';
}

const App = ({ VIEWER_TYPE = 'ReactViewer' }: Props) => {
  const EPUB_URL = 'files/Alices Adventures in Wonderland.epub';
  const ref = useRef<ViewerRef>(null);

  return (
    <>
      {VIEWER_TYPE === 'ReactViewer' && (
        <>
          <ReactEpubViewer url={EPUB_URL} ref={ref} />
        </>
      )}
      {VIEWER_TYPE === 'EpubViewer' && (
        <>
          <EpubViewer url={EPUB_URL} ref={ref} />
        </>
      )}
    </>
  );
};

const container = document.getElementById('root');
if (container) {
  createRoot(container).render(<App />);
}
