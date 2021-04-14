import * as React from "react";

function SvgController(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" {...props}>
      <defs>
        <style>
          {
            ".controller_svg__cls-3{fill:none;stroke:#000;stroke-miterlimit:10;stroke-width:2px}"
          }
        </style>
      </defs>
      <g
        id="controller_svg__\uB808\uC774\uC5B4_2"
        data-name="\uB808\uC774\uC5B4 2"
      >
        <g
          id="controller_svg__\uB808\uC774\uC5B4_1-2"
          data-name="\uB808\uC774\uC5B4 1"
        >
          <path fill="none" d="M0 0h48v48H0z" opacity={0.2} />
          <circle className="controller_svg__cls-3" cx={39} cy={40} r={4} />
          <circle className="controller_svg__cls-3" cx={24} cy={24} r={4} />
          <path d="M20 24a4 4 0 01.55-2H4a2 2 0 000 4h16.55a4 4 0 01-.55-2zM44 22H27.45a3.91 3.91 0 010 4H44a2 2 0 000-4z" />
          <circle className="controller_svg__cls-3" cx={9} cy={8} r={4} />
          <path d="M44 6H12.45a3.91 3.91 0 010 4H44a2 2 0 000-4zM5 8a4 4 0 01.55-2H4a2 2 0 000 4h1.55A4 4 0 015 8z" />
          <circle className="controller_svg__cls-3" cx={39} cy={40} r={4} />
          <path d="M35 40a4 4 0 01.55-2H4a2 2 0 000 4h31.55a4 4 0 01-.55-2zM44 38h-1.55a3.91 3.91 0 010 4H44a2 2 0 000-4z" />
        </g>
      </g>
    </svg>
  );
}

export default SvgController;
