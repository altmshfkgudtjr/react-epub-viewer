<div align=center>
    <br />
    <a href="https://github.com/altmshfkgudtjr/react-epub-viewer"><img src="https://user-images.githubusercontent.com/47492535/115026922-02c0be80-9efe-11eb-8c0c-40379e3249d1.png" alt="react_epub" style="zoom:50%;" /></a>
    <br />
    <br />
</div>


# React-Epub-Viewer

[![Latest Stable Version](https://img.shields.io/npm/v/react-epub-viewer.svg?style=for-the-badge)](https://www.npmjs.com/package/react-epub-viewer) [![License](https://img.shields.io/badge/license-mit-red.svg?style=for-the-badge)](https://www.npmjs.com/package/react-epub-viewer) 

**React-Epub-Viewer** is Epub Viewer for React.js powered by [Epub.js](https://github.com/futurepress/epub.js/) v0.3

You can use React-Epub-Viewer together with React. 



<br />



## Getting Started

📢 **[Online demo](https://altmshfkgudtjr.github.io/react-epub-viewer)**

**Features**

- Table of contents
- Setting
  - Font
  - Font size
  - Line height
  - Viewer horizontal margin
  - Viewer vertical margin
- Change viewer type
  - Scrolled-doc [`true`/`false`]
  - Spread [`true`/`false`]

- Current Page Information
  - Current chapter name
  - Current page number
  - Total page number
- Move page by arrow keys
- Highlight (Using `mouseup` event)
  - Select highlight color



### Getting the Code

Install library from [NPM](https://www.npmjs.com/package/react-epub-viewer)

```shell
npm install react-epub-viewer
```

Import viewer component

```javascript
import { useRef } from 'react'
import {
  EpubViewer,
  ReactEpubViewer
} from 'react-epub-viewer'

const App = () => {
  const viewerRef = useRef(null);
  
  return (
    <div style={{ position: "relative", height: "100%" }}>
      <ReactEpubViewer 
        url={'files/Alices Adventures in Wonderland.epub'}
        ref={viewerRef}
      />
    </div>
  );
}

export default App
```

You can find other parameters in [Component Props](##Component Props).



<br />



## Component Props

You can see also Types for React-Epub-Viewer [here](https://github.com/altmshfkgudtjr/react-epub-viewer/blob/main/src/types/index.d.ts).



### EpubViewer Props

- `ref` - [RefObject] Viewer Ref

- `url` - [string] - Epub file path
- `epubFileOptions` - [[object](http://epubjs.org/documentation/0.3/#book)] Epub file option (Epub.js BookOption)
- `epubOptions` - [[object](http://epubjs.org/documentation/0.3/#rendition)] Epub viewer option (Epub.js RenditionOption)
- `style` - [object] Epub wrapper style
- `location` - [string] Epub [CFI](http://idpf.org/epub/linking/cfi/epub-cfi.html) or Spine href
- `bookChanged` - [function]  Run when epub book changed
- `renditionChanged` - [function] Run when rendition changed
- `pageChanged` - [function] Run when page changed
- `tocChanged` - [function] Run when toc changed
- `selectionChanged` - [function] Run when selected
- `loadingView` - [ReactNode] React Loading Component



### ReactEpubViewer Props

- `ref` - [RefObject] Viewer Ref

- `url` - [string] Epub file path
- `viewerLayout` - [object] Viewer layout values (header height, footer height, etc...)
- `viewerOption` - [object] Viewer option (whether is flow or is spread)
- `onBookInfoChange` - [function] Run when book information changed
- `onPageChange ` - [function] Run when page changed
- `onTocChange ` - [function] Run when toc changed
- `onSelection ` - [function] Run when selected
- `loadingView` - [ReactNode] React Loading Component



<br />



---



# Contribuing

If you would like to contribute, please follow the [guideline](https://github.com/altmshfkgudtjr/react-epub-viewer/blob/main/CONTRIBUTING.md)! Thank you! 😀

