import type { TransferQuote } from "@/features/transfer/types/transfer-types"
import type { TransactionCurrency } from "@/shared/types/transaction"
import { formatCurrency } from "@/shared/utils/formatters"

type TransferSummaryProps = {
  quote: TransferQuote
  sourceCurrency: TransactionCurrency
  targetCurrency: TransactionCurrency
  balance: number
}

export function TransferSummary({
  quote,
  sourceCurrency,
  targetCurrency,
  balance,
}: TransferSummaryProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="rounded-xl border border-border bg-card p-5">
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
          Resumo
        </p>

        <div className="mt-4 flex flex-col gap-3">
          <Row label="Taxa de câmbio" value={`1 BRL = ${quote.exchangeRate.toFixed(5)} USD`} />
          <Row label="Valor enviado" value={formatCurrency(quote.amount, sourceCurrency)} />
          <Row label="Taxa fixa" value={formatCurrency(quote.fee, "BRL")} />
          <Row label="Prazo estimado" value={quote.estimatedTime} />

          <div className="border-t border-border pt-3">
            <Row label="Total debitado" value={formatCurrency(quote.total, sourceCurrency)} bold />
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-border bg-card p-5">
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">Destinatário recebe</span>
          <span className="text-lg font-semibold">
            {formatCurrency(quote.estimatedReceived, targetCurrency)}
          </span>
        </div>
      </div>

      <div className="rounded-xl border border-border bg-card p-4">
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">Saldo disponível</span>
          <span className="text-sm font-medium">
            {formatCurrency(balance, "BRL")}
          </span>
        </div>
      </div>
    </div>
  )
}

function Row({ label, value, bold }: { label: string; value: string; bold?: boolean }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="text-xs text-muted-foreground">{label}</span>
      <span className={bold ? "text-sm font-semibold" : "text-xs font-medium"}>
        {value}
      </span>
    </div>
  )
}
