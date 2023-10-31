import { Community } from '@/types/Community';
import { Meal } from '@/types/Meal';
import { Metrics } from '@/types/Metrics';
import { Notification } from '@/types/Notification';
import { NutritionGoals } from '@/types/NutritionGoals';
import { PrivacySettings } from '@/types/PrivacySettings';
import { WorkoutPlan } from '@/types/WorkoutPlan';

export interface User {
  name: ReactNode;
  id: string;
  username: string;
  email: string;
  meals: Array<Meal>;
  nutritionGoals: NutritionGoals;
  communities: Array<Community>;
  workoutPlan: WorkoutPlan;
  metrics: Metrics;
  privacySettigns: PrivacySettings;
  notification: Array<Notification>;
  moderator: boolean;
  authenticationToken: string;
  exp: number;
}

export const initialUserState: User = {
  id: '',
  username: '',
  email: '',
  meals: [],
  nutritionGoals: {
    // Define initial values for NutritionGoals here
  } as NutritionGoals,
  communities: [],
  workoutPlan: {
    // Define initial values for WorkoutPlan here
  } as WorkoutPlan,
  metrics: {
    // Define initial values for Metrics here
  } as Metrics,
  privacySettigns: {
    // Define initial values for PrivacySettings here
  } as PrivacySettings,
  notification: [],
  moderator: false,
  authenticationToken: '',
  exp: -1,
};
