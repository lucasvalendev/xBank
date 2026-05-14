import type { TransactionCurrency } from "@/shared/types/transaction"

export function formatCurrency(value: number, currency: TransactionCurrency = "BRL") {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency,
  }).format(value)
}
