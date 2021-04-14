import * as React from "react";

function SvgPrev(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 44 44" {...props}>
      <defs>
        <style>
          {
            ".prev_svg__cls-3{fill:none;stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:2px}"
          }
        </style>
      </defs>
      <g id="prev_svg__\uB808\uC774\uC5B4_2" data-name="\uB808\uC774\uC5B4 2">
        <g
          id="prev_svg__\uB808\uC774\uC5B4_1-2"
          data-name="\uB808\uC774\uC5B4 1"
        >
          <path fill="none" d="M0 0h44v44H0z" opacity={0.3} />
          <path className="prev_svg__cls-3" d="M12 22L32 2M12 22l20 20" />
        </g>
      </g>
    </svg>
  );
}

export default SvgPrev;
