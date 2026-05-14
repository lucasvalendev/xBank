import { ArrowDownLeft, ArrowUpRight, Repeat2 } from "lucide-react"
import type { Transaction } from "@/shared/types/transaction"
import { formatCurrency } from "@/shared/utils/formatters"

type TransactionItemProps = {
  transaction: Transaction
}

export function TransactionItem({ transaction }: TransactionItemProps) {
  const isIncome = transaction.type === "income"
  const Icon = transaction.title === "Câmbio" ? Repeat2 : isIncome ? ArrowDownLeft : ArrowUpRight
  const signedAmount = `${isIncome ? "+" : "-"} ${formatCurrency(
    transaction.amount,
    transaction.currency,
  )}`

  return (
    <li className="flex items-center gap-3 py-3 border-b border-border last:border-0">
      <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-accent">
        <Icon className="size-3.5 text-muted-foreground" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium">{transaction.title}</p>
        <p className="truncate text-xs text-muted-foreground">
          {transaction.description}
        </p>
      </div>
      <div className="text-right">
        <p className={isIncome ? "text-sm font-medium text-success" : "text-sm font-medium"}>
          {signedAmount}
        </p>
        <p className="text-[11px] text-muted-foreground">{transaction.createdAt}</p>
      </div>
    </li>
  )
}
