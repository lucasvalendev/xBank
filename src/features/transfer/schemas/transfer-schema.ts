import { z } from "zod"
import { parseTransferAmount } from "@/features/transfer/services/transfer-service"

function normalizeCurrencyInput(value: unknown) {
  return parseTransferAmount(value)
}

export const transferSchema = z.object({
  recipient: z.string().min(1, "Selecione um destinatário."),
  destinationCountry: z.string().min(1, "Selecione o país de destino."),
  sourceCurrency: z.enum(["BRL", "USD", "EUR"]),
  targetCurrency: z.enum(["BRL", "USD", "EUR"]),
  amount: z.preprocess(
    normalizeCurrencyInput,
    z.coerce
      .number({
        invalid_type_error: "Informe um valor válido.",
      })
      .positive("Informe um valor válido."),
  ),
})

export type TransferFormInput = z.input<typeof transferSchema>
export type TransferFormData = z.output<typeof transferSchema>
