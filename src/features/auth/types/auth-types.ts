import type { User } from "@/shared/types/user"

export type LoginCredentials = {
  email: string
  password: string
}

export type AuthSession = {
  user: User
}
