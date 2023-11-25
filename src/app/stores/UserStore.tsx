import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { Community } from '@/types/Community';
import { Instructor } from '@/types/Instructor';
import { Post } from '@/types/Post';
import { initialUserState, User } from '@/types/User';

type State = {
  user: User;
  toggle: boolean;
  communities: Array<Community>;
  homepagePosts: Array<Post>;
  viewCommentsModal: number;
  setViewCommentsModal: (viewCommentsModal: State['viewCommentsModal']) => void;
  addCommentsModal: number;
  setAddCommentsModal: (addCommentsModal: State['addCommentsModal']) => void;
  setToggle: (toggle: State['toggle']) => void;
  updateUser: (user: State['user']) => void;
  update: (communities: State['communities']) => void;
  updatePosts: (homepagePosts: State['homepagePosts']) => void;
  instructor: Instructor;
  updateInstructor:(instructor: State['instructor']) => void; 
};

// Create your store, which includes both state and (optionally) actions
export const useGlobalStore = create<State>()(
  persist(
    (set) => ({
      user: initialUserState,
      instructor: {
        id: -1,
        bio: '',
        email: '',
        name: '',
        courses: []
      },

      updateInstructor: (instructor) => set(() => ({ instructor: instructor })),

      toggle: false,
      communities: [],
      homepagePosts: [],
      addCommentsModal: -1,
      viewCommentsModal: -1,
      setViewCommentsModal: (viewCommentsModal) =>
        set(() => ({ viewCommentsModal: viewCommentsModal })),
      setToggle: (toggleState) => set(() => ({ toggle: toggleState })),
      setAddCommentsModal: (addCommentsModal) =>
        set(() => ({ addCommentsModal: addCommentsModal })),
      updateUser: (user) => set(() => ({ user: user })),
      update: (communities) => set(() => ({ communities: communities })),
      updatePosts: (homepagePosts) =>
        set(() => ({ homepagePosts: homepagePosts })),
    }),

    { name: 'global', getStorage: () => localStorage }
  )
);
