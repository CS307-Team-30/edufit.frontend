import '../src/styles/colors.css';
import '../src/styles/globals.css';

import HealthCalculator from '@/app/components/HealthComponent';
import Hydration from '@/app/components/Hydration';
import ComponentsLayout from '@/app/components/layout';
import Meals from '@/app/components/Meals';
import GoalMilestoneInput from '@/app/components/MileStone';
import WeightTracker from '@/app/components/Weight';
import WorkoutComponent from '@/app/components/WorkoutComponent';

// pages/about.tsx
export default function NutritionPage() {
  return (
    <ComponentsLayout>
      <div className='mt-12 min-h-[500px] bg-white px-12 pt-20 md:mx-40'>
        <Meals />
      </div>
      <div className='mt-12 min-h-[500px] bg-white px-12 pt-20 md:mx-40'>
        <Hydration />
      </div>
      <div className='mt-12 min-h-[500px] bg-white px-12 pt-20 md:mx-40'>
        <WorkoutComponent />
      </div>
      <div className='mt-12 min-h-[500px] bg-white px-12 pt-20 md:mx-40'>
        <HealthCalculator />
      </div>
      <div className='mt-12 min-h-[500px] bg-white px-12 pt-20 md:mx-40'>
        <WeightTracker />
      </div>
      <div className='mt-12 min-h-[500px] bg-white px-12 pt-20 md:mx-40'>
        <GoalMilestoneInput />
      </div>
    </ComponentsLayout>
  );
}
