import * as React from 'react';

import '@/styles/colors.css';

import Navbar from '@/app/components/Navbar';


// export const metadata: Metadata = {
//   title: 'Components',
//   description: 'Pre-built components with awesome default',
// };

export default function ComponentsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
      <div>
        <Navbar />
        {children}
      </div>
  )
  
}
