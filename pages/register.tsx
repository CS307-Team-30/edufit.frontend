'use client';

import * as React from 'react';

import FormComponent from '@/app/components/FormComponent';
import ComponentsLayout from '@/app/components/layout';

export default function HomePage() {
  return (
    <main>
      <ComponentsLayout>

        <div>
          <FormComponent />
        </div>

      </ComponentsLayout>
    </main>
  );
}
