import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { Comment } from '@/types/Comment';
import { Community } from '@/types/Community';
import { Post } from '@/types/Post';
import { initialUserState, User } from '@/types/User';

type State = {
  user: User;
  toggle: boolean;
  communities: Array<Community>;
  homepagePosts: Array<Post>;
  commentsModal: Array<Comment>;
  addCommentsModal: boolean;
  setAddCommentsModal: (addCommentsModal: State['addCommentsModal']) => void;
  setToggle: (toggle: State['toggle']) => void;
  updateCommentsModal: (commentsModal: State['commentsModal']) => void;
  updateUser: (user: State['user']) => void;
  update: (communities: State['communities']) => void;
  updatePosts: (homepagePosts: State['homepagePosts']) => void;
};

// Create your store, which includes both state and (optionally) actions
export const useGlobalStore = create<State>()(
  persist(
    (set) => ({
      user: initialUserState,
      toggle: false,
      communities: [],
      homepagePosts: [],
      commentsModal: [],
      addCommentsModal: false,
      setToggle: (toggleState) => set(() => ({ toggle: toggleState })),
      setAddCommentsModal: (addCommentsModal) =>
        set(() => ({ addCommentsModal: addCommentsModal })),
      updateCommentsModal: (commentsModal) =>
        set(() => ({ commentsModal: commentsModal })),
      updateUser: (user) => set(() => ({ user: user })),
      update: (communities) => set(() => ({ communities: communities })),
      updatePosts: (homepagePosts) =>
        set(() => ({ homepagePosts: homepagePosts }))
    }),
    { name: 'global', getStorage: () => localStorage }
  )
);
