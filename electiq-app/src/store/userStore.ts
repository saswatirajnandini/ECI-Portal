import { create } from 'zustand';

interface UserState {
  state: string;
  language: string;
  quizScores: Record<string, number>;
  badges: string[];
  sidebarCollapsed: boolean;
  setState: (state: string) => void;
  setLanguage: (lang: string) => void;
  updateQuizScore: (moduleId: string, score: number) => void;
  addBadge: (badge: string) => void;
  toggleSidebar: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  state: '',
  language: 'en',
  quizScores: {},
  badges: [],
  sidebarCollapsed: false,
  setState: (state) => set({ state }),
  setLanguage: (language) => set({ language }),
  updateQuizScore: (moduleId, score) =>
    set((s) => ({ quizScores: { ...s.quizScores, [moduleId]: score } })),
  addBadge: (badge) =>
    set((s) => ({ badges: [...s.badges, badge] })),
  toggleSidebar: () =>
    set((s) => ({ sidebarCollapsed: !s.sidebarCollapsed })),
}));
