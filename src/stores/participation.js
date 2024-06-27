import { create } from 'zustand'

export const useParticipation = create((set) => ({
  participation: {},
  setParticipation: (accountOrTeam) => set({ participation: accountOrTeam }),
}));