import { create } from "zustand"
import type { TransferPayload } from "@/features/transfer/types/transfer-types"
import type { Account } from "@/shared/types/account"
import type { Transaction } from "@/shared/types/transaction"

type AccountState = {
  account: Account | null
  balance: number
  transactions: Transaction[]
  isInitialized: boolean
  setAccountOverview: (payload: {
    account: Account
    transactions: Transaction[]
  }) => void
  applyTransfer: (payload: TransferPayload & { total: number }) => void
}

export const useAccountStore = create<AccountState>()((set) => ({
  account: null,
  balance: 0,
  transactions: [],
  isInitialized: false,
  setAccountOverview: ({ account, transactions }) => {
    set({
      account,
      balance: account.balance,
      transactions,
      isInitialized: true,
    })
  },
  applyTransfer: (payload) => {
    set((state) => {
      const nextBalance = Math.max(state.balance - payload.total, 0)
      const nextAccount = state.account
        ? { ...state.account, balance: nextBalance }
        : state.account

      const transaction: Transaction = {
        id: `transaction_${Date.now()}`,
        title: "Transferência enviada",
        description: payload.recipient,
        amount: payload.total,
        currency: payload.sourceCurrency,
        type: "outcome",
        status: "completed",
        createdAt: "Hoje, agora",
      }

      return {
        account: nextAccount,
        balance: nextBalance,
        transactions: [transaction, ...state.transactions],
      }
    })
  },
}))
