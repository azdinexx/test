import React, { SVGProps } from 'react';
export function New(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' {...props}>
      <path fill='currentColor' d='M30 24h-4v-4h-2v4h-4v2h4v4h2v-4h4z'></path>
      <path
        fill='currentColor'
        d='M16 28H8V4h8v6a2.006 2.006 0 0 0 2 2h6v4h2v-6a.91.91 0 0 0-.3-.7l-7-7A.909.909 0 0 0 18 2H8a2.006 2.006 0 0 0-2 2v24a2.006 2.006 0 0 0 2 2h8Zm2-23.6l5.6 5.6H18Z'
      ></path>
    </svg>
  );
}
