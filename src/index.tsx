import ReactDOM from 'react-dom';
import Reader from 'containers/Reader'

const EPUB_URL = "files/Alices Adventures in Wonderland.epub";

ReactDOM.render(<Reader url={EPUB_URL} />,  document.getElementById('root'));