import { create } from "zustand"

export const useCmk = create(set => ({
  open: false,
  setOpen: () => set(state => ({ open: !state.open }))
}))
