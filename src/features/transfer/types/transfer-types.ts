import type { TransactionCurrency } from "@/shared/types/transaction"

export type TransferPayload = {
  recipient: string
  destinationCountry: string
  sourceCurrency: TransactionCurrency
  targetCurrency: TransactionCurrency
  amount: number
}

export type TransferQuote = {
  amount: number
  fee: number
  exchangeRate: number
  estimatedReceived: number
  total: number
  estimatedTime: string
}

export type TransferResult = TransferPayload & {
  id: string
  quote: TransferQuote
  createdAt: string
}
