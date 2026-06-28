<div align=center>
    <br />
    <a href="https://github.com/altmshfkgudtjr/react-epub-viewer"><img src="https://user-images.githubusercontent.com/47492535/115026922-02c0be80-9efe-11eb-8c0c-40379e3249d1.png" alt="react_epub" style="zoom:50%;" /></a>
    <br />
    <br />
</div>


# React-Epub-Viewer

[![Latest Stable Version](https://img.shields.io/npm/v/react-epub-viewer.svg?style=for-the-badge)](https://www.npmjs.com/package/react-epub-viewer) [![License](https://img.shields.io/badge/license-mit-red.svg?style=for-the-badge)](https://www.npmjs.com/package/react-epub-viewer) 

**React-Epub-Viewer** is an Epub viewer for React.js powered by [Epub.js](https://github.com/futurepress/epub.js/) v0.3.

It works with React 17, 18, and 19, ships both ESM and CommonJS builds with bundled TypeScript types, and is compatible with Next.js (App Router).



<br />



## Requirements

- **React** `>= 17` — tested against React 17, 18 and 19
- **Node** `>= 22` — required to build / develop the library



<br />



## Getting Started

📢 **[Online Demo](https://altmshfkgudtjr.github.io/react-epub-viewer)**
👉 You can check the **[Demo Code](https://github.com/altmshfkgudtjr/react-epub-viewer/tree/demo)**



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

> **TypeScript** — the ref exposes imperative methods. Type it with the
> exported `ViewerRef`:
>
> ```typescript
> import { useRef } from 'react'
> import { ReactEpubViewer, ViewerRef } from 'react-epub-viewer'
>
> const viewerRef = useRef<ViewerRef>(null)
> // viewerRef.current?.nextPage() / prevPage() / onHighlight(...) / setLocation(...)
> ```

> **Next.js (App Router)** — the package ships with a `"use client"` banner,
> so importing it from a Server Component is fine; just render it inside a
> Client Component (epubjs needs the browser DOM).

You can find other parameters in [Component Props](#component-props).



<br />



## Component Props

You can also see the exported types for React-Epub-Viewer [here](https://github.com/altmshfkgudtjr/react-epub-viewer/blob/main/src/types/index.ts).



### EpubViewer Props

- `ref` - [RefObject] Viewer Ref

- `url` - [string] - Epub file path
- `epubFileOptions` - [[object](http://epubjs.org/documentation/0.3/#book)] Epub file option (Epub.js BookOption)
- `epubOptions` - [[object](http://epubjs.org/documentation/0.3/#rendition)] Epub viewer option (Epub.js RenditionOption)
- `style` - [object] Epub wrapper style
- `location` - [string] Epub [CFI](http://idpf.org/epub/linking/cfi/epub-cfi.html) or Spine href
- `bookChanged` - [function]  Run when epub book changed
- `rendtionChanged` - [function] Run when rendition changed _(⚠️ note the spelling — see [Notes](#notes))_
- `pageChanged` - [function] Run when page changed
- `tocChanged` - [function] Run when toc changed
- `selectionChanged` - [function] Run when selected
- `loadingView` - [ReactNode] React Loading Component



### ReactEpubViewer Props

- `ref` - [RefObject] Viewer Ref

- `url` - [string] Epub file path
- `viewerLayout` - [object] Viewer layout values (header height, footer height, etc...)
- `viewerStyle` - [object] Viewer style (`fontFamily`, `fontSize`, `lineHeight`, `marginHorizontal`, `marginVertical`)
- `viewerStyleURL` - [string] Viewer style provided as an external CSS URL
- `viewerOption` - [object] Viewer option (whether is flow or is spread)
- `onBookInfoChange` - [function] Run when book information changed
- `onPageChange ` - [function] Run when page changed
- `onTocChange ` - [function] Run when toc changed
- `onSelection ` - [function] Run when selected
- `loadingView` - [ReactNode] React Loading Component



<br />



## Migration from 0.2.0

`0.3.0` is a toolchain & runtime modernization. The public component API
(props, ref methods) is unchanged, but the package itself changed:

**Added**

- React **18 / 19** support (React 17 still works).
- Dual **ESM + CommonJS** build with a proper `exports` map.
- Correct, bundled **TypeScript** declarations (the previous `.d.ts` had
  unresolvable imports).
- `"use client"` directive for **Next.js App Router** consumers.
- Fixes the `regeneratorRuntime is not defined` error.

**No longer supported / changed**

- **Node `>= 22` is required.** Node 18/20 (and below) are no longer
  supported — the project moved off the unmaintained Create React App
  build to Vite, whose tooling targets the current Node LTS line.
- **Package entry moved from `lib/` to `dist/`.** The library is now built
  with Vite instead of CRA/Babel. Import from the package root as before
  (`import { ReactEpubViewer } from 'react-epub-viewer'`); deep imports into
  `react-epub-viewer/lib/...` no longer exist.

The behavior of the components is otherwise preserved (verified against
`0.2.0` with static equivalence checks and a unit + component test suite).



## Notes

- The `EpubViewer` prop `rendtionChanged` is **misspelled** (it should be
  `renditionChanged`). The typo is kept in `0.3.0` for backward
  compatibility and will be corrected in a future major release.



<br />



---



# Contributing

If you would like to contribute, please follow the [guideline](https://github.com/altmshfkgudtjr/react-epub-viewer/blob/main/CONTRIBUTING.md)! Thank you! 😀
