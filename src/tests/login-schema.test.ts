import { describe, expect, it } from "vitest"
import { loginSchema } from "@/features/auth/schemas/login-schema"

describe("loginSchema", () => {
  it("accepts valid credentials", () => {
    const result = loginSchema.safeParse({
      email: "lucas@xbank.dev",
      password: "123456",
    })

    expect(result.success).toBe(true)
  })

  it("rejects invalid email and short password", () => {
    const result = loginSchema.safeParse({
      email: "lucas",
      password: "123",
    })

    expect(result.success).toBe(false)
  })
})
