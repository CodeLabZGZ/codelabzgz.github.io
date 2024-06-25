import { create } from 'zustand'

export const useTeam = create((set) => ({
  selectedTeam: {},
  setSelectedTeam: (team) => set({ selectedTeam: team }),
}));