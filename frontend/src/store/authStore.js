import { create } from "zustand";
import { persist } from "zustand/middleware";

/**
 * Zustand store for authentication state.
 *
 * This store manages the authenticated user's state and persists
 * it to localStorage.
 *
 * @property {object | null} authUser - The authenticated user object, or null if not logged in.
 * @property {(user) => void} setAuthUser - Action to set the authenticated user.
 * @property {() => void} logoutUser - Action to clear the authenticated user (logout).
 */
const useAuthStore = create(
  // 1. 'persist' middleware wraps our store definition
  persist(
    // 2. 'set' is the function to update the store's state
    (set) => ({
      // --- State ---
      authUser: null,

      // --- Actions ---

      /**
       * Sets the authenticated user in the store.
       * @param {object} user - The user object received from the API.
       */
      setAuthUser: (user) => set({ authUser: user }),

      /**
       * Clears the authenticated user from the store.
       */
      logoutUser: () => set({ authUser: null }),
    }),
    {
      // 3. Configuration for the 'persist' middleware
      name: "flux-auth-storage", // Name of the item in localStorage

      // (Optional) By default, it persists the entire store.
      // We only have 'authUser', so this is fine.
    }
  )
);

export default useAuthStore;
