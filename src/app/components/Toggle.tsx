import { useRouter } from 'next/router';
import React, { useState } from 'react';

import { useGlobalStore } from '@/app/stores/UserStore';

const Toggle = () => {
  const globTog = useGlobalStore((state) => state.toggle);
  const [nav, toggleNav] = useState(globTog);

  React.useEffect(() => {
    toggleNav(globTog);
  }, [globTog]);

  const setGlobTog = useGlobalStore((state) => state.setToggle);
  const router = useRouter();

  const handleToggle = () => {
    if (nav) {
      setGlobTog(false);
      router.push('homepage');
    } else {
      setGlobTog(true);
      router.push('nutritionpage');
    }
  };

  return (
    <div
      className={`relative inline-block h-full max-h-[26px] w-12 select-none rounded-xl align-middle transition duration-200 ease-in ${
        nav ? 'bg-pink-500' : 'bg-pink-100'
      }`}
      onClick={() => handleToggle()}
      tabIndex={0}
    >
      <span
        className={`absolute block h-6 w-6 transform rounded-full bg-pink-300 text-pink-400 shadow-md transition-transform duration-200 ease-in ${
          nav ? 'translate-x-6' : 'translate-x-0'
        }`}
      ></span>
    </div>
  );
};

export default Toggle;
