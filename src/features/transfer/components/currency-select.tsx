import type { TransactionCurrency } from "@/shared/types/transaction"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select"

const currencyOptions: TransactionCurrency[] = ["BRL", "USD", "EUR"]

type CurrencySelectProps = {
  id?: string
  value: TransactionCurrency
  onValueChange: (value: TransactionCurrency) => void
  "aria-label"?: string
}

export function CurrencySelect({
  id,
  value,
  onValueChange,
  "aria-label": ariaLabel,
}: CurrencySelectProps) {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger id={id} aria-label={ariaLabel}>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {currencyOptions.map((currency) => (
          <SelectItem key={currency} value={currency}>
            {currency}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
