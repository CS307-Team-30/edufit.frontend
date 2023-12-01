'use client';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { motion, useScroll } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect } from 'react';
import * as React from 'react';
import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { MdOutlineMessage } from 'react-icons/md';

import UnstyledLink from '@/components/links/UnstyledLink';

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
      <FaSearch className='ml-3 mr-2' />{' '}
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
  const globTog = useGlobalStore((state) => state.toggle);
  const [nav, toggleNav] = useState(globTog);

  const { scrollYProgress } = useScroll();

  const [value, setValue] = useState('');

  const communitiesGlob = useGlobalStore((state) => state.communities);
  const [communities, setCommunities] = useState(communitiesGlob);

  React.useEffect(() => {
    setCommunities(communitiesGlob);
    toggleNav(globTog);
  }, [communitiesGlob, globTog]);

  const handleChange = (value: string) => {
    setValue(value.toUpperCase());
  };

  // React.useEffect(() => {
  //   console.log(user)

  // }, [user])

  const [imageURL, setImageURL] = useState('');
  const profile = useGlobalStore((state) => state.profile);
  const profile_pic = profile.profile_pic;

  useEffect(() => {
    // Fetch the image URL from the server
    fetch('http://localhost:8000/images/' + profile_pic) // Replace with the actual endpoint URL
      .then((response) => {
        if (response.ok) {
          return response.url;
        }
        throw new Error('Failed to fetch image.');
      })
      .then((url) => {
        setImageURL(url);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div className='sticky top-0 z-30 bg-white'>
      <motion.header className='sticky top-0 z-50 min-h-[100px] border px-10 pb-6 pt-8 text-4xl shadow-md md:px-32'>
        <div className='grid grid-cols-3'>
          <div className='flex flex-row items-start space-x-8'>
            <Link className='rounded-full' href='/profile'>
              <img
                className='h-[80px] w-[80px] rounded-full'
                src={imageURL}
                alt='user icon'
                width={80}
                height={80}
              />
            </Link>
            <Toggle />
            <Link className='mt-6' href='/calendar'>
              <div className='mt-0 flex flex-col items-center text-pink-400 hover:text-pink-600'>
                <FontAwesomeIcon icon={faCalendarAlt} />
                <h1 className='text-xl'>Calendar</h1>
              </div>
            </Link>
            <UnstyledLink className='mt-6 text-5xl' href='/messages'>
              <MdOutlineMessage className='text-pink-400 hover:text-pink-600' />
            </UnstyledLink>
          </div>

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
          </div>
          <div className='relative flex justify-end text-2xl'>
            <SearchComponent value={value} handleChange={handleChange} />
            <div className='absolute left-0 top-3/4 z-50 flex w-[400px] flex-col rounded-lg bg-white text-xl font-bold'>
              {communities
                .filter((item) => value !== '' && item.name.includes(value)) // Filter condition
                .map((item, index) => (
                  <UnstyledLink
                    href={'/community/' + item.id}
                    className='top-1/2 mt-4 rounded-lg px-4 py-2 text-black hover:bg-pink-500'
                    key={index}
                  >
                    {item.name}
                  </UnstyledLink>
                ))}
            </div>
          </div>
        </div>
      </motion.header>
      <motion.div
        className='left-0 top-0 z-40 h-2 w-full bg-pink-500 text-left'
        style={{ scaleX: scrollYProgress }}
      />
    </div>
  );
}