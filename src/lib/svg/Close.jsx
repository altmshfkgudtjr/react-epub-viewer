import * as React from "react";

function SvgClose(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" {...props}>
      <defs>
        <style>
          {
            ".close_svg__cls-3{fill:none;stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:2px}"
          }
        </style>
      </defs>
      <g id="close_svg__\uB808\uC774\uC5B4_2" data-name="\uB808\uC774\uC5B4 2">
        <g
          id="close_svg__\uB808\uC774\uC5B4_1-2"
          data-name="\uB808\uC774\uC5B4 1"
        >
          <path fill="none" d="M0 0h48v48H0z" opacity={0.2} />
          <path className="close_svg__cls-3" d="M4 4l40 40M4 44L44 4" />
        </g>
      </g>
    </svg>
  );
}

export default SvgClose;
