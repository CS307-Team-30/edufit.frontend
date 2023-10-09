export interface WorkoutPlan {
  planId: number
  name: string
  exercises: Array<Exercise>
  schedule: Schedule
  goals: string
}