import { create } from 'zustand'

import { initialUserState,User } from '@/types/User'

type State = {
  user: User
}

type Action = {
  updateUser: (user: State['user']) => void
}

// Create your store, which includes both state and (optionally) actions
export const useGlobalStore = create<State & Action>((set) => ({
  user: initialUserState,
  updateUser: (user) => set(() => ({ user: user })),
}))
