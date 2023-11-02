import { create } from 'zustand'

import { Community } from '@/types/Community'
import { initialUserState,User } from '@/types/User'

type State = {
  user: User
  communities: Array<Community>
}

type Action = {
  updateUser: (user: State['user']) => void
  update: (communities: State['communities']) => void
}

// Create your store, which includes both state and (optionally) actions
export const useGlobalStore = create<State & Action>((set) => ({
  user: initialUserState,
  communities: [],
  updateUser: (user) => set(() => ({ user: user })),
  update: (communities) => set(() => ({ communities: communities })),
}))
