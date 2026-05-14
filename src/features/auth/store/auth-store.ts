import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"
import { loginWithMockCredentials } from "@/features/auth/services/auth-service"
import type { LoginCredentials } from "@/features/auth/types/auth-types"
import type { User } from "@/shared/types/user"

type AuthState = {
  user: User | null
  isAuthenticated: boolean
  login: (credentials: LoginCredentials) => Promise<void>
  logout: () => void
  restoreSession: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      login: async (credentials) => {
        const session = await loginWithMockCredentials(credentials)

        set({
          user: session.user,
          isAuthenticated: true,
        })
      },
      logout: () => {
        set({
          user: null,
          isAuthenticated: false,
        })
      },
      restoreSession: () => {
        set((state) => ({
          isAuthenticated: Boolean(state.user),
        }))
      },
    }),
    {
      name: "xbank.auth",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    },
  ),
)
