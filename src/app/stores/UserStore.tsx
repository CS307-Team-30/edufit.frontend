import { create } from 'zustand';

import { Community } from '@/types/Community';
import { Post } from '@/types/Post';
import { initialUserState, User } from '@/types/User';

type State = {
  user: User;
  communities: Array<Community>;
  homepagePosts: Array<Post>;
};

type Action = {
  updateUser: (user: State['user']) => void;
  update: (communities: State['communities']) => void;
  updatePosts: (homepagePosts: State['homepagePosts']) => void;
};

// Create your store, which includes both state and (optionally) actions
export const useGlobalStore = create<State & Action>((set) => ({
  user: initialUserState,
  communities: [],
  homepagePosts: [],
  updateUser: (user) => set(() => ({ user: user })),
  update: (communities) => set(() => ({ communities: communities })),
  updatePosts: (homepagePosts) => set(() => ({ homepagePosts: homepagePosts }))
}));
