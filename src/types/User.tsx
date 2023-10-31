import { Community } from "@/types/Community"
import { Meal } from "@/types/Meal"
import { Metrics } from "@/types/Metrics"
import { NutritionGoals } from "@/types/NutritionGoals"
import { PrivacySettings } from "@/types/PrivacySettings"
import { WorkoutPlan } from "@/types/WorkoutPlan"

export interface User {
  id: string
  username: string
  email: string
  meals: Array<Meal>
  nutritionGoals: NutritionGoals
  communities: Array<Community>
  workoutPlan: WorkoutPlan
  metrics: Metrics
  privacySettigns: PrivacySettings
  notification: Array<Notification>
  moderator: boolean
  authenticationToken: string
}