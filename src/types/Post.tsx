// import { Comment } from "@/types/Comment"

import { Community } from "@/types/Community"
import { User } from "@/types/User"

export interface Post {
  community: Community
  author: User
  title: string
  content: string
  // comments: Array<Comment>
}