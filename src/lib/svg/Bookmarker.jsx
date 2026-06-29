import * as React from "react";

function SvgBookmarker(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" {...props}>
      <g data-name="\uB808\uC774\uC5B4 2">
        <g data-name="\uB808\uC774\uC5B4 1">
          <path fill="none" d="M0 0h48v48H0z" opacity={0.2} />
          <path
            d="M42.93 12H4c-.93 0-1.39.92-.73 1.46l11.25 9.33a1.51 1.51 0 010 2.42L3.31 34.54c-.66.54-.2 1.46.69 1.46h38.93A1.92 1.92 0 0045 34.29V13.71A1.92 1.92 0 0042.93 12z"
            stroke="#000"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
          />
        </g>
      </g>
    </svg>
  );
}

export default SvgBookmarker;
