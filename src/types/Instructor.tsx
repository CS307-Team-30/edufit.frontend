import { Community } from "@/types/Community";

export interface Instructor {
  id: number;
  bio: string;
  email: string;
  name: string;
  courses: Community[]
}