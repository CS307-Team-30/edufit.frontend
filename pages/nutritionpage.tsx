import '../src/styles/colors.css';
import '../src/styles/globals.css';

import OneRepMaxCalculator from '@/app/components/1rm';
import FitnessLayout from '@/app/components/FitnessLayout';
import HealthCalculator from '@/app/components/HealthComponent';
import Hydration from '@/app/components/Hydration';
import Meals from '@/app/components/Meals';
import GoalMilestoneInput from '@/app/components/MileStone';
import Preset from '@/app/components/Preset';
import WeightTracker from '@/app/components/Weight';
import WorkoutComponent from '@/app/components/WorkoutComponent';

// pages/about.tsx
export default function NutritionPage() {
  return (
    <FitnessLayout>
        <Meals />
        <Hydration />
        <WorkoutComponent />
        <Preset />
        <HealthCalculator />
        <OneRepMaxCalculator />
        <WeightTracker />
        <GoalMilestoneInput />
      </FitnessLayout>
  );
}
