// stores/useAuthStore.ts
import { create } from "zustand";
import type { User } from "@supabase/supabase-js";
import supabase from "../utils/supabase";

interface AuthState {
  user: User | null;
  setUser: (user: User | null) => void;
  signInWithGitHub: () => void;
  signOut: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,

  setUser: (user) => set({ user }),

  signInWithGitHub: () => {
    supabase.auth.signInWithOAuth({ provider: "github" });
  },

  signOut: async () => {
    await supabase.auth.signOut();
    set({ user: null });
  },
}));

// Set up auth listener outside the store to update the state
supabase.auth.getSession().then(({ data: { session } }) => {
  useAuthStore.getState().setUser(session?.user ?? null);
});

supabase.auth.onAuthStateChange((_, session) => {
  useAuthStore.getState().setUser(session?.user ?? null);
});
