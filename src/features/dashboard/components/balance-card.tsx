import { Eye, TrendingUp } from "lucide-react"
import { Skeleton } from "@/shared/components/ui/skeleton"
import { formatCurrency } from "@/shared/utils/formatters"

type BalanceCardProps = {
  balance: number
  isLoading?: boolean
}

export function BalanceCard({ balance, isLoading = false }: BalanceCardProps) {
  return (
    <div className="rounded-xl border border-border bg-card p-5">
      {isLoading ? (
        <div className="flex flex-col gap-4">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-9 w-48" />
          <Skeleton className="h-3 w-32" />
          <Skeleton className="mt-2 h-16 w-full" />
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              Saldo total
            </span>
            <button
              type="button"
              className="text-muted-foreground transition-colors hover:text-foreground"
              aria-label="Ocultar saldo"
            >
              <Eye className="size-4" />
            </button>
          </div>

          <div>
            <p className="text-3xl font-semibold tracking-tight">
              {formatCurrency(balance)}
            </p>
            <div className="mt-2 flex items-center gap-3">
              <a
                className="text-xs text-muted-foreground transition-colors hover:text-foreground"
                href="#contas"
              >
                Ver detalhes das contas
              </a>
              <span className="inline-flex items-center gap-1 rounded-md bg-success/10 px-1.5 py-0.5 text-[11px] font-medium text-success">
                <TrendingUp className="size-3" />
                +3,2%
              </span>
            </div>
          </div>

          <div className="mt-1 flex h-24 items-end gap-[3px] rounded-lg border border-border bg-[#070707] px-3 py-3">
            {[28, 38, 34, 52, 46, 58, 42, 66, 55, 72, 60, 78, 64, 82, 70, 86].map(
              (height, index) => (
                <span
                  aria-hidden="true"
                  className="flex-1 rounded-sm bg-foreground/20 transition-all"
                  key={index}
                  style={{ height: `${height}%` }}
                />
              ),
            )}
          </div>
        </div>
      )}
    </div>
  )
}
