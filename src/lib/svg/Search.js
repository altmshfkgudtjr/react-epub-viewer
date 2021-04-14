import * as React from "react";

function SvgSearch(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" {...props}>
      <defs>
        <style>
          {
            ".search_svg__cls-3{fill:none;stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:2px}"
          }
        </style>
      </defs>
      <g id="search_svg__\uB808\uC774\uC5B4_2" data-name="\uB808\uC774\uC5B4 2">
        <g
          id="search_svg__\uB808\uC774\uC5B4_1-2"
          data-name="\uB808\uC774\uC5B4 1"
        >
          <path fill="none" d="M0 0h48v48H0z" opacity={0.2} />
          <circle className="search_svg__cls-3" cx={17} cy={17} r={14} />
          <path className="search_svg__cls-3" d="M44 44L27 27" />
        </g>
      </g>
    </svg>
  );
}

export default SvgSearch;
