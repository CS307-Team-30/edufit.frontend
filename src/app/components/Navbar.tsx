'use client';
import { motion, useScroll } from 'framer-motion';
import * as React from 'react';
import { useState } from 'react';
import '@/styles/calendar'

import UnstyledLink from '@/components/links/UnstyledLink';
<<<<<<< HEAD

=======
>>>>>>> main
const links = [
  { href: '/', label: 'Route 1' },
  { href: '/', label: 'Route 2' }
];

import {faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import Link from 'next/link';
import { FaSearch } from 'react-icons/fa';

import Toggle from '@/app/components/Toggle';
import { useGlobalStore } from '@/app/stores/UserStore';

// import { RootState } from '@/types/types';

// eslint-disable-next-line @typescript-eslint/ban-types
function SearchComponent({
  value,
  handleChange
}: {
  value: string;
  handleChange: Function;
}) {
  return (
    <div className='mr-3 flex items-center justify-center text-2xl'>
      <FaSearch className='mr-2' />{' '}
      {/* <-- This is your magnifying glass icon */}
      <input
        className='px-4'
        type='text'
        value={value}
        onChange={(e) => handleChange(e.target.value)}
        placeholder='Search communities'
      />
    </div>
  );
}

export default function Header() {


  const globTog = useGlobalStore(state => state.toggle)
  const [nav, toggleNav] = useState(globTog);


  const { scrollYProgress } = useScroll();

  const [value, setValue] = useState('');

  const communitiesGlob = useGlobalStore((state) => state.communities);
  const [communities, setCommunities] = useState(communitiesGlob)

  React.useEffect(() => {
    setCommunities(communitiesGlob)
    toggleNav(globTog)
  }, [communitiesGlob, globTog])


  const handleChange = (value: any) => {
    setValue(value);
  };

  // React.useEffect(() => {
  //   console.log(user)

  // }, [user])

  return (
<<<<<<< HEAD
    <div className='sticky top-0 z-30 bg-white'>
      <motion.header className='sticky top-0 z-50 min-h-[100px] border px-10 pb-6 pt-8 text-4xl shadow-md md:px-32'>
        <div className='grid grid-cols-3'>
          <Toggle />
          <div>
            <Link
              href='/homepage'
              className='flex flex-row items-center justify-center space-x-2'
            >
              <Image
                src='/images/logo.png'
                alt='logo'
                height={40}
                width={100}
              />
              <div className='flex flex-row'>
                <h1 className='font-secondary flex flex-row justify-center text-5xl'>
                  Edu
                </h1>
                <h1 className='font-secondary flex flex-row justify-center text-5xl text-pink-300'>
                  Fit
                </h1>
                {/* <h2>{user.username}</h2> */}
              </div>
            </Link>
=======
    <div className='sticky top-0 z-50 bg-white'>
    <motion.header className='sticky top-0 z-50 border min-h-[100px] md:px-16 px-10 pt-8 pb-6 shadow-md text-4xl'>
      <div className='flex flex-row justify-between space-x-0'>
        <Toggle />
        <Link className="mt-6" href="/calendar">
        <div className='flex flex-col items-center mt-0'>
          <FontAwesomeIcon icon={faCalendarAlt}/>
          <h1 className="text-xl">Calendar</h1>
        </div>
        </Link>
        <div>
        
        <Link href="/homepage" className='flex flex-row items-center justify-center space-x-2'>
        <Image src="/images/logo.png" alt="logo" height={40} width={100}/>
        <div className='flex flex-row'>
        <h1 className='font-secondary text-5xl flex flex-row justify-center'>
          Edu
        </h1>
        <h1 className='font-secondary text-pink-300 text-5xl flex flex-row justify-center'>
          Fit
        </h1>
        {/* <h2>{user.username}</h2> */}
        </div>
        </Link>
        </div>
        <div className='relative flex justify-end text-2xl'>
          <SearchComponent value={value} handleChange={handleChange} />
          <div className='z-50 absolute left-0 top-2/3 bg-white font-bold text-xl rounded-xl'>
              {communities
                  .filter(item => (value !== '' && item.name.includes(value))) // Filter condition
                  .map((item, index) => (
                      <UnstyledLink href={"/community/" + item.id} className='top-1/2 mt-4 text-black hover:bg-pink-300 px-4 py-2' key={index}>{item.name}</UnstyledLink>
                  ))
              }
>>>>>>> main
          </div>
          <div className='relative flex justify-end text-2xl'>
            <SearchComponent value={value} handleChange={handleChange} />
            <div className='absolute left-0 top-2/3 z-50 rounded-xl bg-white text-xl font-bold'>
              {communities
                .filter((item) => value !== '' && item.name.includes(value)) // Filter condition
                .map((item, index) => (
                  <UnstyledLink
                    href={'/community/' + item.id}
                    className='top-1/2 mt-4 px-4 py-2 text-black hover:bg-pink-300'
                    key={index}
                  >
                    {item.name}
                  </UnstyledLink>
                ))}
            </div>
            <Link className='rounded-full' href='/user'>
              <Image
                className='h-[80px] w-[80px] rounded-full'
                src='/images/user_icon.jpg'
                alt='user icon'
                width={80}
                height={80}
              />
            </Link>
          </div>
          <motion.nav
            initial={{ translateX: -1000 }}
            animate={nav ? { translateX: 0 } : { translateX: -1000 }}
            transition={{ duration: 0.35, type: 'tween' }}
            className='absolute left-0 top-0 z-30 mt-[104px] h-screen  w-full  border bg-pink-100 md:w-96'
          >
            <ul className='mt-10 flex w-full flex-col items-center space-y-6'>
              {links.map(({ href, label }) => (
                <li key={`${href}${label}`}>
                  <UnstyledLink href={href} className='hover:text-gray-600'>
                    {label}
                  </UnstyledLink>
                </li>
              ))}
            </ul>
          </motion.nav>
        </div>
      </motion.header>
      <motion.div
        className='left-0 top-0 z-40 h-2 w-full bg-pink-500 text-left'
        style={{ scaleX: scrollYProgress }}
      />
    </div>
  );
}
