import { create } from "zustand";

const useConversationStore = create((set) => ({
  selectedConversation: null,
  messages: [],
  conversations: [], // <<< --- We'll use this to update the sidebar

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

  // --- NEW ACTIONS ---

  /**
   * Sets the entire list of conversations (for the sidebar)
   */
  setConversations: (conversations) => set({ conversations }),

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

// import { create } from "zustand";

// /**
//  * Zustand store for managing conversation state.
//  *
//  * @property {object | null} selectedConversation - The user object of the selected chat.
//  * @property {Array} messages - An array of message objects for the selected chat.
//  * @property {(conversation) => void} setSelectedConversation - Action to set the selected chat.
//  * @property {(messages) => void} setMessages - Action to overwrite the messages array.
//  * @property {(message) => void} addMessage - Action to append a new message.
//  */
// const useConversationStore = create((set) => ({
//   // --- State ---
//   selectedConversation: null,
//   messages: [], // We will store messages here

//   // --- Actions ---
//   setSelectedConversation: (conversation) =>
//     set({ selectedConversation: conversation }),

//   /**
//    * Overwrites the existing messages with a new array.
//    * (Used when loading a new chat)
//    */
//   setMessages: (messages) => set({ messages: messages }),

//   /**
//    * Appends a single message to the end of the messages array.
//    * (Used for sending or receiving a new message)
//    */
//   addMessage: (message) =>
//     set((state) => ({
//       messages: [...state.messages, message],
//     })),

//   /**
//    * Removes a single message from the messages array.
//    * @param {string} messageId - The ID of the message to remove.
//    */
//   deleteMessage: (messageId) =>
//     set((state) => ({
//       messages: state.messages.filter((msg) => msg._id !== messageId),
//     })),
// }));

// export default useConversationStore;
