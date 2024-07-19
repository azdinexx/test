import React, { SVGProps } from 'react';

export function CrmIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' {...props}>
      <g fill='currentColor'>
        <path d='M17 18v-2h-2v2H3v6h2v-4h10v4h2v-4h10v4h2v-6z'></path>
        <path
          d='M4 32a3 3 0 1 1 0-6a3 3 0 0 1 0 6m0-4a1 1 0 1 0 0 2a1 1 0 0 0 0-2m12 4a3 3 0 1 1 0-6a3 3 0 0 1 0 6m0-4a1 1 0 1 0 0 2a1 1 0 0 0 0-2m12 4a3 3 0 1 1 0-6a3 3 0 0 1 0 6m0-4a1 1 0 1 0 0 2a1 1 0 0 0 0-2M23 8V6h-2.1a5 5 0 0 0-.73-1.75l1.49-1.49l-1.42-1.42l-1.49 1.49A5 5 0 0 0 17 2.1V0h-2v2.1a5 5 0 0 0-1.75.73l-1.49-1.49l-1.42 1.42l1.49 1.49A5 5 0 0 0 11.1 6H9v2h2.1a5 5 0 0 0 .73 1.75l-1.49 1.49l1.41 1.41l1.49-1.49a5 5 0 0 0 1.76.74V14h2v-2.1a5 5 0 0 0 1.75-.73l1.49 1.49l1.41-1.41l-1.48-1.5A5 5 0 0 0 20.9 8zm-7 2a3 3 0 1 1 0-6a3 3 0 0 1 0 6'
          className='ouiIcon__fillSecondary'
        ></path>
        <path d='M16 8a1 1 0 0 1-1-1a1.39 1.39 0 0 1 0-.2a.65.65 0 0 1 .06-.18a.74.74 0 0 1 .09-.18a1.61 1.61 0 0 1 .12-.15a.93.93 0 0 1 .33-.21a1 1 0 0 1 1.09.21l.12.15a.78.78 0 0 1 .09.18a.62.62 0 0 1 .1.18a1.27 1.27 0 0 1 0 .2a1 1 0 0 1-1 1'></path>
      </g>
    </svg>
  );
}
