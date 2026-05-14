import type { AuthSession, LoginCredentials } from "@/features/auth/types/auth-types"
import { http, registerMock } from "@/shared/lib/http"

const MOCK_USER_ID = "user_xbank_demo"

registerMock("post", "/auth/login", async (config) => {
  await new Promise((resolve) => setTimeout(resolve, 650))

  const body = JSON.parse(config.data ?? "{}")

  return {
    data: {
      user: {
        id: MOCK_USER_ID,
        name: "Lucas Valen",
        email: body.email ?? "",
      },
    },
  }
})

export async function loginWithMockCredentials(
  credentials: LoginCredentials,
): Promise<AuthSession> {
  const response = await http.post<AuthSession>("/auth/login", credentials)
  return response.data
}
