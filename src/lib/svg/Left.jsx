import * as React from "react";

function SvgLeft(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" {...props}>
      <defs>
        <style>
          {
            ".left_svg__cls-3{fill:none;stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:2px}"
          }
        </style>
      </defs>
      <g id="left_svg__\uB808\uC774\uC5B4_2" data-name="\uB808\uC774\uC5B4 2">
        <g
          id="left_svg__\uB808\uC774\uC5B4_1-2"
          data-name="\uB808\uC774\uC5B4 1"
        >
          <path fill="none" d="M0 0h48v48H0z" opacity={0.2} />
          <path
            className="left_svg__cls-3"
            d="M4 24L18.5 9.5M18.5 38.5L4 24M44 24H4"
          />
        </g>
      </g>
    </svg>
  );
}

export default SvgLeft;
