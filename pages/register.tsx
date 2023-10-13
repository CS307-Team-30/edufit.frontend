'use client';

import * as React from 'react';

import "../src/styles/colors.css"
import "../src/styles/globals.css"

import RegistrationFormComponent from '@/app/components/RegistrationFormComponent';

export default function HomePage() {
  return (
    <main>

      <div className='min-h-screen  bg-pink-300'>
          <RegistrationFormComponent />
      </div>

    </main>
  );
}
