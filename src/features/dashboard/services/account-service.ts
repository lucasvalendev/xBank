import { http, registerMock } from "@/shared/lib/http"
import { mockAccount, mockTransactions } from "@/shared/constants/mock-data"
import type { Account } from "@/shared/types/account"
import type { Transaction } from "@/shared/types/transaction"

export type AccountOverview = {
  account: Account
  transactions: Transaction[]
}

registerMock("get", "/account/overview", async () => {
  await new Promise((resolve) => setTimeout(resolve, 700))

  return {
    data: {
      account: mockAccount,
      transactions: mockTransactions,
    },
  }
})

export async function getAccountOverview(): Promise<AccountOverview> {
  const response = await http.get<AccountOverview>("/account/overview")
  return response.data
}
