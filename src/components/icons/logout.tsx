import React, { SVGProps } from 'react';
export function Logout(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' {...props}>
      <path
        fill='currentColor'
        d='m30 16l-7-7l-1.414 1.414L26.172 15H9v2h17.172l-4.586 4.586L23 23z'
      ></path>
      <path
        fill='currentColor'
        d='M14 28C7.383 28 2 22.617 2 16S7.383 4 14 4c2.335 0 4.599.671 6.546 1.941l-1.092 1.676A9.96 9.96 0 0 0 14 6C8.486 6 4 10.486 4 16s4.486 10 10 10a9.96 9.96 0 0 0 5.454-1.617l1.092 1.676A11.953 11.953 0 0 1 14 28'
      ></path>
    </svg>
  );
}