'use client';

import * as React from 'react';

import "../src/styles/colors.css"
import "../src/styles/globals.css"

import FormComponent from '@/app/components/FormComponent';

export default function HomePage() {
  return (
    <main>

      <div className='min-h-screen  bg-pink-300'>
          <FormComponent />
      </div>

    </main>
  );
}
