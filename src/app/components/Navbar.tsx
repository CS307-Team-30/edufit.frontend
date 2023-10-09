import { motion, useScroll } from 'framer-motion';
import * as React from 'react';
import {useEffect, useState } from 'react';
import {BsFacebook, BsInstagram, BsTwitter} from 'react-icons/bs'
import { ImSoundcloud } from 'react-icons/im';

import UnstyledLink from '@/components/links/UnstyledLink';

import defaultData from '@/types/YamlData';

const links = [
  { href: '/', label: 'Route 1' },
  { href: '/', label: 'Route 2' },
];


export default function Header() {

  const [nav, toggleNav] = useState(false)
  const { scrollYProgress } = useScroll()

  const [value, setValue] = useState('')

  const [data, setData] = useState(defaultData);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/siteData');
        const parsedData = await response.json();
        setData(parsedData);
      } catch (error) {
        console.error('Error fetching YAML data:', error);
      }
    };

    fetchData();
  }, []);

  const handleChange = (value: any) => {
    setValue(value)
  }

  

  return (
    <div className='sticky top-0 z-50 bg-white'>
    <motion.header className='sticky top-0 z-50 border min-h-[100px] md:px-32 px-10 pt-8 pb-6 shadow-md text-4xl'>
      <div className='grid grid-cols-3'>
        <div className='flex flex-row justify-start items-center'>

        <label className="relative inline-flex items-center cursor-pointer">
          <input type="checkbox" value="" className="sr-only peer" />
          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-pink-300 dark:peer-focus:ring-pink-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-pink-600"></div>
        </label>
        </div>
        <div>

        <div className='flex flex-row items-center justify-center'>

        <h1 className='font-secondary text-5xl flex flex-row justify-center'>
          Edu
        </h1>
        <h1 className='font-secondary text-pink-300 text-5xl flex flex-row justify-center'>
          Fit
        </h1>
        </div>
        </div>
        <div className='flex justify-end text-2xl'>
          <input className='px-4' type="text" value={value} onChange={(e) => handleChange(e.target.value)} placeholder='Search something'/>
        </div>
        <motion.nav 
          initial={{translateX: -1000}}
          animate={nav ? {translateX: 0} : {translateX: -1000}}
          transition={{duration: 0.35, type: 'tween'}}
          className='left-0 top-0 mt-[104px] absolute border w-full  md:w-96  h-screen bg-gray-100 z-30'>
          <ul className='w-full flex flex-col items-center mt-10 space-y-6'>
            {links.map(({ href, label }) => (
              <li key={`${href}${label}`}>
                <UnstyledLink href={href} className='hover:text-gray-600'>
                  {label}
                </UnstyledLink>
              </li>
            ))}
          </ul>
          <div className='text-3xl flex md:hidden flex-row space-x-4 justify-center mt-12 items-center'>
            <UnstyledLink href={data.main.facebook} className='hover:text-gray-600'>
              <BsFacebook />
            </UnstyledLink>
            <UnstyledLink href={data.main.instagram} className='hover:text-gray-600'>
              <BsInstagram />
            </UnstyledLink>
            <UnstyledLink href={data.main.soundcloud} className='hover:text-gray-600'>
              <ImSoundcloud />
            </UnstyledLink>
            <UnstyledLink href={data.main.twitter} className='hover:text-gray-600'>
              <BsTwitter/>
            </UnstyledLink>

          </div>
        </motion.nav>
      </div>
    </motion.header>
    <motion.div className='h-2 w-full text-left left-0 top-0 z-40 bg-black' style={{scaleX: scrollYProgress}} />
    </div>

  );
}
