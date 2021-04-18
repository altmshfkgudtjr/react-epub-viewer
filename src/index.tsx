import { useRef } from 'react'
import ReactDOM from 'react-dom';
import ReactEpubViewer from 'modules/reactViewer/ReactViewer'
import { ViewerRef } from 'types'


const App = () => {
	const EPUB_URL = "/react-epub-viewer/files/Alices Adventures in Wonderland.epub";
	const ref = useRef<ViewerRef>(null);

	return (
		<ReactEpubViewer 
			url={EPUB_URL}
			ref={ref}
		/>
	);
}


ReactDOM.render(<App />,  document.getElementById('root'));