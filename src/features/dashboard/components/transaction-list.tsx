import { FileText } from "lucide-react"
import { TransactionItem } from "@/features/dashboard/components/transaction-item"
import { Skeleton } from "@/shared/components/ui/skeleton"
import type { Transaction } from "@/shared/types/transaction"

type TransactionListProps = {
  transactions: Transaction[]
  isLoading?: boolean
}

export function TransactionList({
  transactions,
  isLoading = false,
}: TransactionListProps) {
  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold">Transações recentes</h2>
        <button
          className="text-xs text-muted-foreground transition-colors hover:text-foreground"
          type="button"
        >
          Ver todas
        </button>
      </div>

      <div className="mt-4">
        {isLoading ? (
          <div className="flex flex-col gap-3">
            {Array.from({ length: 4 }).map((_, index) => (
              <Skeleton className="h-14 w-full" key={index} />
            ))}
          </div>
        ) : transactions.length > 0 ? (
          <ul className="flex flex-col">
            {transactions.map((transaction) => (
              <TransactionItem
                key={transaction.id}
                transaction={transaction}
              />
            ))}
          </ul>
        ) : (
          <div className="flex min-h-36 flex-col items-center justify-center gap-2 text-center">
            <FileText className="size-5 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">
              Nenhuma movimentação por enquanto.
            </p>
            <p className="text-xs text-muted-foreground/60">
              A próxima transferência aparecerá aqui.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
