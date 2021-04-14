import * as React from "react";

function SvgBookmark(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" {...props}>
      <g data-name="\uB808\uC774\uC5B4 2">
        <g data-name="\uB808\uC774\uC5B4 1">
          <path fill="none" d="M0 0h48v48H0z" opacity={0.2} />
          <path
            d="M10 5.07V44a1 1 0 001.71.73l10.88-11.29a1.94 1.94 0 012.82 0l10.88 11.25A1 1 0 0038 44V5.07A2 2 0 0036 3H12a2 2 0 00-2 2.07z"
            stroke="#000"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            fill="none"
          />
        </g>
      </g>
    </svg>
  );
}

export default SvgBookmark;
