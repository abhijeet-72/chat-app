import { create } from "zustand";

const useConversationStore = create((set) => ({
  selectedConversation: null,
  messages: [],
  conversations: [],

  setSelectedConversation: (conversation) =>
    set({ selectedConversation: conversation }),

  setMessages: (messages) => set({ messages: messages }),

  // Modify addMessage to check for duplicates by ID
  addMessage: (message) =>
    set((state) => {
      // 1. Let's check if message already exists
      const exists = state.messages.some((msg) => msg._id === message._id);

      // 2. If it exists, return current state (do nothing)
      if (exists) return state;

      // 3. If not, add it
      return { messages: [...state.messages, message] };
    }),

  deleteMessage: (messageId) =>
    set((state) => ({
      messages: state.messages.filter((msg) => msg._id !== messageId),
    })),

  // --- FIX ---
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
