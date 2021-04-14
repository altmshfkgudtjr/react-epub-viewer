import * as React from "react";

function SvgScrollHorizontal(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" {...props}>
      <defs>
        <style>
          {
            ".scrollHorizontal_svg__cls-3{fill:none;stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:2px}"
          }
        </style>
      </defs>
      <g
        id="scrollHorizontal_svg__\uB808\uC774\uC5B4_2"
        data-name="\uB808\uC774\uC5B4 2"
      >
        <g
          id="scrollHorizontal_svg__\uB808\uC774\uC5B4_1-2"
          data-name="\uB808\uC774\uC5B4 1"
        >
          <path fill="none" d="M0 0h48v48H0z" opacity={0.2} />
          <circle
            className="scrollHorizontal_svg__cls-3"
            cx={24}
            cy={24}
            r={5}
          />
          <path
            className="scrollHorizontal_svg__cls-3"
            d="M3 24l12-12M3 24l12 12M45 24L33 12M45 24L33 36"
          />
        </g>
      </g>
    </svg>
  );
}

export default SvgScrollHorizontal;
