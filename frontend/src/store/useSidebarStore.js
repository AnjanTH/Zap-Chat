import { create } from "zustand";

export const useSidebarStore = create((set) => ({
  isSidebarVisible: false,
  toggleSidebar: () => set((state) => ({ isSidebarVisible: !state.isSidebarVisible })),
  closeSidebar: () => set({ isSidebarVisible: false }),
}));
