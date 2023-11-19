import { create } from 'zustand';

import { Comment } from '@/types/Comment';
import { Community } from '@/types/Community';
import { Post } from '@/types/Post';
import { initialUserState, User } from '@/types/User';

type State = {
  user: User;
  communities: Array<Community>;
  homepagePosts: Array<Post>;
  commentsModal: Array<Comment>;
  addCommentsModal: boolean;
  setAddCommentsModal: (addCommentsModal: State['addCommentsModal']) => void;
  updateCommentsModal: (commentsModal: State['commentsModal']) => void;
  updateUser: (user: State['user']) => void;
  update: (communities: State['communities']) => void;
  updatePosts: (homepagePosts: State['homepagePosts']) => void;
};

// Create your store, which includes both state and (optionally) actions
export const useGlobalStore = create<State>((set) => ({
  user: initialUserState,
  communities: [],
  homepagePosts: [],
  commentsModal: [],
  addCommentsModal: false,
  setAddCommentsModal: (addCommentsModal) =>
    set(() => ({ addCommentsModal: addCommentsModal })),
  updateCommentsModal: (commentsModal) =>
    set(() => ({ commentsModal: commentsModal })),
  updateUser: (user) => set(() => ({ user: user })),
  update: (communities) => set(() => ({ communities: communities })),
  updatePosts: (homepagePosts) => set(() => ({ homepagePosts: homepagePosts }))
}));
