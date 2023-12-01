import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { Chatbox } from '@/types/Chatbox';
import { Community } from '@/types/Community';
import { Instructor } from '@/types/Instructor';
import { Post } from '@/types/Post';
import { initialProfileState, Profile } from '@/types/Profile';
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
  profile: Profile;
  updateUser: (user: State['user']) => void;
  update: (communities: State['communities']) => void;
  updateProfile: (profile: State['profile']) => void;
  updatePosts: (homepagePosts: State['homepagePosts']) => void;
  instructor: Instructor;
  updateInstructor:(instructor: State['instructor']) => void; 
  chatbox: Chatbox
  updateChatbox:(chatbox: State['chatbox']) => void; 
};

// Create your store, which includes both state and (optionally) actions
export const useGlobalStore = create<State>()(
  persist(
    (set) => ({
      user: initialUserState,
      profile: initialProfileState,
      updateProfile: (profile) =>
        set(() => ({ profile: profile })),
      instructor: {
        id: -1,
        bio: '',
        email: '',
        name: '',
        courses: []
      },
      chatbox: {
        chatbox_id: -1,
        last_message: '',
        other_user_username: ''
      },
      updateChatbox: (chatbox) => set(() => ({chatbox: chatbox})),

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

