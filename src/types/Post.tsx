// import { Comment } from "@/types/Comment"

import { Community } from '@/types/Community';
import { User } from '@/types/User';

export interface Post {
  id: number;
  community: Community;
  author: User;
  title: string;
  content: string;
  upvotes: Array<User>;
  downvotes: Array<User>;
  // comments: Array<Comment>
}
