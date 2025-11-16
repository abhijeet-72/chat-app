import { create } from "zustand";

const useConversationStore = create((set) => ({
  selectedConversation: null,
  messages: [],
  conversations: [],

  setSelectedConversation: (conversation) =>
    set({ selectedConversation: conversation }),

  setMessages: (messages) => set({ messages: messages }),

  addMessage: (message) =>
    set((state) => ({
      messages: [...state.messages, message],
    })),

  deleteMessage: (messageId) =>
    set((state) => ({
      messages: state.messages.filter((msg) => msg._id !== messageId),
    })),

  // --- THIS IS THE FIX ---
  /**
   * Sets the entire list of conversations (for the sidebar)
   * Can accept a new array or an updater function (prevState => newState)
   */
  setConversations: (updater) =>
    set((state) => {
      const conversations =
        typeof updater === "function" ? updater(state.conversations) : updater;
      return { conversations };
    }),
  // --- END OF FIX ---

  /**
   * Adds a new conversation to the list (for new groups)
   */
  addConversation: (conversation) =>
    set((state) => ({
      conversations: [conversation, ...state.conversations],
    })),

  /**
   * Removes a conversation from the list (for leaving/deleting)
   */
  removeConversation: (conversationId) =>
    set((state) => ({
      conversations: state.conversations.filter(
        (c) => c._id !== conversationId
      ),
    })),
}));

export default useConversationStore;
