import { Comment } from "@/types/Comment"
import { Community } from "@/types/Community"
import { User } from "@/types/User"

export interface Thread {
  threadId: number
  title: string
  content: string
  author: User
  comments: Array<Comment>
  community: Community
}