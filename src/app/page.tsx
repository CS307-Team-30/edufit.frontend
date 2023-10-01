'use client';

import Head from 'next/head';
import * as React from 'react';

import ComponentsLayout from '@/app/components/layout';

export default function HomePage() {
  return (
    <main>
      <Head>
        <title>Edufit - Unfuck Your Life</title>
      </Head>
      <ComponentsLayout>

        <section className='bg-white'>
            Homepage
        </section>

      </ComponentsLayout>
    </main>
  );
}
