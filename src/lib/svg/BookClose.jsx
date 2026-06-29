import * as React from "react";

function SvgBookClose(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" {...props}>
      <defs>
        <style>
          {
            ".bookClose_svg__cls-3{fill:none;stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:2px}"
          }
        </style>
      </defs>
      <g
        id="bookClose_svg__\uB808\uC774\uC5B4_2"
        data-name="\uB808\uC774\uC5B4 2"
      >
        <g
          id="bookClose_svg__\uB808\uC774\uC5B4_1-2"
          data-name="\uB808\uC774\uC5B4 1"
        >
          <path fill="none" d="M0 0h48v48H0z" opacity={0.2} />
          <path
            className="bookClose_svg__cls-3"
            d="M37.12 3H10.88a3 3 0 00-.43 0A1.71 1.71 0 009.1 4.11a1.87 1.87 0 00-.1.59v29.18c0 1 0 .94 1.88 1.88l18 9a1.8 1.8 0 002.6-1.2 3 3 0 000-.31v-7.58h5.62A1.88 1.88 0 0039 33.8V4.87A1.88 1.88 0 0037.12 3z"
          />
          <path
            className="bookClose_svg__cls-3"
            d="M31.5 35.67V14.84a2 2 0 00-1.1-1.78L10.45 3"
          />
        </g>
      </g>
    </svg>
  );
}

export default SvgBookClose;
