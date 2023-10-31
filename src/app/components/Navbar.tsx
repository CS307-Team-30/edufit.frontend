import { motion, useScroll } from 'framer-motion';
import * as React from 'react';
import { useState } from 'react';

import UnstyledLink from '@/components/links/UnstyledLink';


const links = [
  { href: '/', label: 'Route 1' },
  { href: '/', label: 'Route 2' },
];

import Image from 'next/image';
import Link from 'next/link';
import { FaSearch } from 'react-icons/fa';

import Toggle from '@/app/components/Toggle';

// import { RootState } from '@/types/types';

// eslint-disable-next-line @typescript-eslint/ban-types
function SearchComponent({ value, handleChange }: {value: string, handleChange: Function}) {
    return (
        <div className='flex justify-center mr-3 text-2xl items-center'>
            <FaSearch className='mr-2' /> {/* <-- This is your magnifying glass icon */}
            <input className='px-4' type="text" value={value} onChange={(e) => handleChange(e.target.value)} placeholder='Search communities'/>
        </div>
    );
}



export default function Header() {

  const [nav, toggleNav] = useState(false)
  const { scrollYProgress } = useScroll()

  const [value, setValue] = useState('')

  // const user: User = useSelector((state: RootState) => state.user);


  const handleChange = (value: any) => {
    setValue(value)
  }

  // React.useEffect(() => {
  //   console.log(user)

  // }, [user])

  return (
    <div className='sticky top-0 z-50 bg-white'>
    <motion.header className='sticky top-0 z-50 border min-h-[100px] md:px-32 px-10 pt-8 pb-6 shadow-md text-4xl'>
      <div className='grid grid-cols-3'>
        <Toggle />
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
        <div className='flex justify-end text-2xl'>
          <SearchComponent value={value} handleChange={handleChange} />
          <Link className='rounded-full' href="/user">
            <Image className='rounded-full h-[80px] w-[80px]' src="/images/user_icon.jpg" alt="user icon" width={80} height={80}/>

          </Link>
        </div>
        <motion.nav 
          initial={{translateX: -1000}}
          animate={nav ? {translateX: 0} : {translateX: -1000}}
          transition={{duration: 0.35, type: 'tween'}}
          className='left-0 top-0 mt-[104px] absolute border w-full  md:w-96  h-screen bg-pink-100 z-30'>
          <ul className='w-full flex flex-col items-center mt-10 space-y-6'>
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
    <motion.div className='h-2 w-full text-left left-0 top-0 z-40 bg-pink-500' style={{scaleX: scrollYProgress}} />
    </div>

  );
}
