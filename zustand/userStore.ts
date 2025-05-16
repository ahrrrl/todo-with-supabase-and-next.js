import { User } from '@supabase/supabase-js'
import { create } from 'zustand'

type State = {
  user: User | null
}

type Actions = {
  setUser: (user: User | null) => void
}

const useUserStore = create<State & Actions>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}))

export default useUserStore