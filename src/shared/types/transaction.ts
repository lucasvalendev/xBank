export type TransactionCurrency = "BRL" | "USD" | "EUR"

export type Transaction = {
  id: string
  title: string
  description: string
  amount: number
  currency: TransactionCurrency
  type: "income" | "outcome"
  status: "completed" | "pending"
  createdAt: string
}
