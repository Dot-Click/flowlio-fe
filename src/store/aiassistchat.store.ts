import { create } from "zustand";

export type ChatMessage = {
  role: "user" | "ai";
  text: string;
};

export type Chat = {
  id: string;
  title: string;
  messages: ChatMessage[];
};

interface AiAssistChatState {
  chats: Chat[];
  activeChatId: string | null;
  addChat: (chat: Omit<Chat, "id">) => string;
  editChatTitle: (id: string, newTitle: string) => void;
  deleteChat: (id: string) => void;
  addMessage: (chatId: string, message: ChatMessage) => void;
  setActiveChat: (id: string) => void;
}

export const useAiAssistChatStore = create<AiAssistChatState>((set) => ({
  chats: [],
  activeChatId: null,
  addChat: (chat) => {
    const id = Date.now().toString();
    set((state) => ({
      chats: [...state.chats, { ...chat, id }],
      activeChatId: id,
    }));
    return id;
  },
  editChatTitle: (id, newTitle) => {
    set((state) => ({
      chats: state.chats.map((c) =>
        c.id === id ? { ...c, title: newTitle } : c
      ),
    }));
  },
  deleteChat: (id) => {
    set((state) => {
      const chats = state.chats.filter((c) => c.id !== id);
      const activeChatId =
        state.activeChatId === id ? chats[0]?.id ?? null : state.activeChatId;
      return { chats, activeChatId };
    });
  },
  addMessage: (chatId, message) => {
    set((state) => ({
      chats: state.chats.map((c) =>
        c.id === chatId ? { ...c, messages: [...c.messages, message] } : c
      ),
    }));
  },
  setActiveChat: (id) => set({ activeChatId: id }),
}));
