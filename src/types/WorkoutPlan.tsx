import { Exercise } from "@/types/Exercise"
import { Schedule } from "@/types/Schedule"

export interface WorkoutPlan {
  planId: number
  name: string
  exercises: Array<Exercise>
  schedule: Schedule
  goals: string
}