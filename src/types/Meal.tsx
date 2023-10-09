export interface Meal {
  mealId: number
  name: string
  nutrients: Map<string, number>
  timestamp: Date
}