'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { ReactNode } from 'react';

interface Props {
  title: string;
  href: string;
  icon: ReactNode;
}
function Item({ title, icon, href }: Props) {
  const pathname = usePathname();
  console.log(pathname);
  return (
    <li className={'flex '}>
      <Link
        href={href}
        className={
          'flex-grow p-4 flex  gap-2 items-center hover:bg-gray-50 cursor-pointer ' +
          (pathname === href
            ? 'bg-blue-500 text-white font-semibold hover:bg-blue-400'
            : ' ')
        }
      >
        <div>{icon}</div>
        <p className='lowercase first-letter:capitalize'>{title}</p>
      </Link>
    </li>
  );
}

export default Item;
