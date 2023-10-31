"use client"
import Head from 'next/head';
import { useRouter } from 'next/navigation';
import * as React from 'react';

import '@/styles/colors.css';

import FormComponent from '@/app/components/FormComponent';

export default function HomePage() {

  const router = useRouter()
  React.useEffect(() => {
    router.push("/login")
  }, []) 
  return (
    <main>
      <Head>
        <title>Edufit - Unfuck Your Life</title>
      </Head>
      
      <div className='min-h-screen  bg-pink-300'>
          <FormComponent />
      </div>

    </main>
  )
};