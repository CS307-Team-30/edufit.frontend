import '../src/styles/colors.css';
import '../src/styles/globals.css';

import ComponentsLayout from '@/app/components/layout';
import Nutrition from '@/app/components/Nutrition';

// pages/about.tsx
export default function NutritionPage() {
  return (
    <ComponentsLayout>
      <div className='mt-12 min-h-[500px] bg-white px-12 pt-20 md:mx-40'>
        <Nutrition />
      </div>
    </ComponentsLayout>
  );
}
