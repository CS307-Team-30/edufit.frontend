import { motion, useScroll } from 'framer-motion';
import * as React from 'react';
import {useEffect, useState } from 'react';
import {BsFacebook, BsFillGearFill, BsInstagram, BsTwitter} from 'react-icons/bs'
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

  

  return (
    <div className='sticky top-0 z-50 bg-white'>
    <motion.header className='sticky top-0 z-50 border min-h-[100px] md:px-32 px-10 pt-8 pb-6 shadow-md text-4xl'>
      <div className='grid grid-cols-3'>
        <div className='flex flex-row justify-start items-center'>
          <motion.button 
            type='button'
            initial={{rotate: 0}}
            animate={nav ? {rotate: 90} : {rotate: 0}}
            onClick={() => toggleNav(!nav)}
            className='font-bold hover:text-gray-600'>
            <BsFillGearFill />
          </motion.button>
        </div>
        <h1 className='font-secondary text-5xl flex flex-row justify-center'>
          {data.main.title}
        </h1>
        <div className='text-3xl hidden md:flex flex-row space-x-4 justify-end items-center'>
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
