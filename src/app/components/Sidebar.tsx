import Link from 'next/link';
import * as React from 'react';

const links = [
  { href: '/', label: 'CS307' },
  { href: '/', label: 'CS252' },
];


export default function Sidebar() {
  return (
    <div className=' w-[300px] text-white bg-pink-400 min-h-screen py-4 px-4'>
      <h4>
        Recent Communities
      </h4>
      <li>
        {links.map((community, id) => (
          <ul key={id}>
            <Link href="/community" >{community.label}</Link>
          </ul>
        ))}

      </li>
    </div>
  )
}