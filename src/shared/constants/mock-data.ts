import type { Account } from "@/shared/types/account"
import type { Transaction } from "@/shared/types/transaction"

export const mockAccount: Account = {
  id: "account_xbank_primary",
  balance: 48750,
  currency: "BRL",
}

export const mockTransactions: Transaction[] = [
  {
    id: "txn_received_maria",
    title: "Transferência recebida",
    description: "Maria Oliveira",
    amount: 2500,
    currency: "BRL",
    type: "income",
    status: "completed",
    createdAt: "Hoje, 09:42",
  },
  {
    id: "txn_pix_marketplace",
    title: "Pagamento PIX",
    description: "Marketplace",
    amount: 189.9,
    currency: "BRL",
    type: "outcome",
    status: "completed",
    createdAt: "Ontem, 18:21",
  },
  {
    id: "txn_fx_usd_brl",
    title: "Câmbio",
    description: "USD para BRL",
    amount: 1320,
    currency: "BRL",
    type: "income",
    status: "completed",
    createdAt: "12 mai, 14:08",
  },
  {
    id: "txn_x_premium",
    title: "Assinatura",
    description: "X Premium",
    amount: 49.9,
    currency: "BRL",
    type: "outcome",
    status: "completed",
    createdAt: "10 mai, 08:00",
  },
]
