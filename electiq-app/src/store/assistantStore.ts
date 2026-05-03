import { create } from 'zustand';
import type { ChatMessage } from '../types/election.types';

interface AssistantState {
  messages: ChatMessage[];
  isLoading: boolean;
  conversationId: string | null;
  addMessage: (message: ChatMessage) => void;
  setLoading: (loading: boolean) => void;
  clearChat: () => void;
  setConversationId: (id: string) => void;
}

export const useAssistantStore = create<AssistantState>((set) => ({
  messages: [],
  isLoading: false,
  conversationId: null,
  addMessage: (message) =>
    set((state) => ({ messages: [...state.messages, message] })),
  setLoading: (loading) => set({ isLoading: loading }),
  clearChat: () => set({ messages: [], conversationId: null }),
  setConversationId: (id) => set({ conversationId: id }),
}));
