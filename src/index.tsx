import { createRoot } from 'react-dom/client'
import Reader from 'containers/Reader'

const EPUB_URL = `${import.meta.env.BASE_URL}files/Alices Adventures in Wonderland.epub`

const container = document.getElementById('root')
const root = createRoot(container!)
root.render(<Reader url={EPUB_URL} />)
