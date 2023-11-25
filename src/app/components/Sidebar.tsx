import Link from 'next/link';
import * as React from 'react';

import { useGlobalStore } from '@/app/stores/UserStore';

export default function Sidebar() {
  const links = useGlobalStore((state) => state.user.communities);
  return (
    <div className=' min-h-screen w-[300px] bg-pink-400 px-4 py-4 text-white'>
      <h4>Subscribed Communities</h4>
      {links.map((community, id) => (
        <button
          className=' mt-2 rounded bg-white px-2 py-1 font-bold text-pink-400 transition-colors duration-150 hover:bg-pink-700 hover:text-white'
          key={id}
        >
          <Link href={'/community/' + community.id}>{community.name}</Link>
        </button>
      ))}
    </div>
  );
}
