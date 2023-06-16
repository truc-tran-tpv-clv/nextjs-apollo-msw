import { TSignInResponse, TUser } from "api/type";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export interface AuthState {
  user?: TUser | null;
  accessToken?: string | null;
  appError?: string;
  setUser: (user: TSignInResponse) => void;
  logOut: () => void;
  setAppError: (appError: string) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      appError: get()?.appError,
      user: get()?.user,
      accessToken: "",
      setUser: ({ accessToken, ...user }: TSignInResponse) =>
        set({ user, accessToken }),
      logOut: () => set(() => ({ user: null, accessToken: null })),
      setAppError: (appError: string) => set(() => ({ appError })),
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
