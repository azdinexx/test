import React, { SVGProps } from 'react';
export function ChevronLeft(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' {...props}>
      <path
        fill='currentColor'
        d='M10 16L20 6l1.4 1.4l-8.6 8.6l8.6 8.6L20 26z'
      ></path>
    </svg>
  );
}

export function ChevronRight(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' {...props}>
      <path
        fill='currentColor'
        d='M22 16L12 26l-1.4-1.4l8.6-8.6l-8.6-8.6L12 6z'
      ></path>
    </svg>
  );
}
