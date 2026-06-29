import * as React from "react";

function SvgBookOpen(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" {...props}>
      <defs>
        <style>
          {
            ".bookOpen_svg__cls-3{fill:none;stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:2px}"
          }
        </style>
      </defs>
      <g
        id="bookOpen_svg__\uB808\uC774\uC5B4_2"
        data-name="\uB808\uC774\uC5B4 2"
      >
        <g
          id="bookOpen_svg__\uB808\uC774\uC5B4_1-2"
          data-name="\uB808\uC774\uC5B4 1"
        >
          <path fill="none" d="M0 0h48v48H0z" opacity={0.2} />
          <path
            className="bookOpen_svg__cls-3"
            d="M4 6.5a27.24 27.24 0 0120 1v34a27.24 27.24 0 00-20-1zM24 7.5a27.24 27.24 0 0120-1v34a27.24 27.24 0 00-20 1"
          />
        </g>
      </g>
    </svg>
  );
}

export default SvgBookOpen;
