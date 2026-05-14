import { zodResolver } from "@hookform/resolvers/zod"
import { ArrowDownUp, CheckCircle2 } from "lucide-react"
import { useMemo, useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { CountrySelect } from "@/features/transfer/components/country-select"
import { CurrencySelect } from "@/features/transfer/components/currency-select"
import { SecurityNotice } from "@/features/transfer/components/security-notice"
import { TransferSummary } from "@/features/transfer/components/transfer-summary"
import { useCreateTransfer } from "@/features/transfer/hooks/use-create-transfer"
import {
  transferSchema,
  type TransferFormData,
  type TransferFormInput,
} from "@/features/transfer/schemas/transfer-schema"
import {
  calculateTransferQuote,
  parseTransferAmount,
} from "@/features/transfer/services/transfer-service"
import { Button } from "@/shared/components/ui/button"
import { Input } from "@/shared/components/ui/input"
import { useToast } from "@/shared/hooks/use-toast"

type TransferFormProps = {
  balance: number
  onTransferConfirmed: (payload: TransferFormData & { total: number }) => void
}

export function TransferForm({
  balance,
  onTransferConfirmed,
}: TransferFormProps) {
  const createTransfer = useCreateTransfer()
  const { success: toastSuccess, error: toastError } = useToast()
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const {
    register,
    handleSubmit,
    setError,
    watch,
    control,
    formState: { errors },
  } = useForm<TransferFormInput, undefined, TransferFormData>({
    resolver: zodResolver(transferSchema),
    defaultValues: {
      recipient: "Maria Oliveira",
      destinationCountry: "Estados Unidos",
      sourceCurrency: "BRL",
      targetCurrency: "USD",
      amount: undefined,
    },
  })

  const watchedAmount = parseTransferAmount(watch("amount"))
  const sourceCurrency = watch("sourceCurrency")
  const targetCurrency = watch("targetCurrency")
  const quote = useMemo(
    () => calculateTransferQuote(watchedAmount),
    [watchedAmount],
  )
  const isPending = createTransfer.isPending

  async function onSubmit(values: TransferFormData) {
    setSubmitError(null)
    setSuccessMessage(null)

    const nextQuote = calculateTransferQuote(values.amount)

    if (nextQuote.total > balance) {
      setError("amount", {
        type: "manual",
        message: "Saldo insuficiente para concluir a transferência.",
      })
      return
    }

    try {
      const result = await createTransfer.mutateAsync(values)
      onTransferConfirmed({
        ...values,
        total: result.quote.total,
      })
      setSuccessMessage("Transferência realizada com sucesso.")
      toastSuccess("Transferência realizada com sucesso.")
    } catch {
      const msg = "Não foi possível concluir a transferência. Tente novamente."
      setSubmitError(msg)
      toastError(msg)
    }
  }

  return (
    <div className="grid gap-4 lg:grid-cols-[1fr_320px]">
      <div className="rounded-xl border border-border bg-card p-5">
        <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-medium text-muted-foreground" htmlFor="recipient">
                  Destinatário
                </label>
                <button
                  className="text-[11px] text-muted-foreground/60 transition-colors hover:text-foreground"
                  type="button"
                >
                  Novo destinatário
                </button>
              </div>
              <Input
                id="recipient"
                aria-invalid={Boolean(errors.recipient)}
                aria-describedby={
                  errors.recipient ? "recipient-error" : undefined
                }
                {...register("recipient")}
              />
              {errors.recipient ? (
                <p className="text-xs text-destructive" id="recipient-error">
                  {errors.recipient.message}
                </p>
              ) : null}
            </div>

            <div className="flex flex-col gap-1.5">
              <label
                className="text-xs font-medium text-muted-foreground"
                htmlFor="destinationCountry"
              >
                País de destino
              </label>
              <Controller
                control={control}
                name="destinationCountry"
                render={({ field }) => (
                  <CountrySelect
                    id="destinationCountry"
                    value={field.value}
                    onValueChange={field.onChange}
                    aria-invalid={Boolean(errors.destinationCountry)}
                    aria-describedby={
                      errors.destinationCountry
                        ? "destination-country-error"
                        : undefined
                    }
                  />
                )}
              />
              {errors.destinationCountry ? (
                <p
                  className="text-xs text-destructive"
                  id="destination-country-error"
                >
                  {errors.destinationCountry.message}
                </p>
              ) : null}
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-muted-foreground" htmlFor="amount">
              Valor enviado
            </label>
            <div className="grid gap-2 sm:grid-cols-[1fr_110px]">
              <Input
                id="amount"
                type="text"
                inputMode="decimal"
                placeholder="0,00"
                aria-invalid={Boolean(errors.amount)}
                aria-describedby={errors.amount ? "amount-error" : undefined}
                {...register("amount")}
              />
              <Controller
                control={control}
                name="sourceCurrency"
                render={({ field }) => (
                  <CurrencySelect
                    id="sourceCurrency"
                    aria-label="Moeda de origem"
                    value={field.value}
                    onValueChange={field.onChange}
                  />
                )}
              />
            </div>
            {errors.amount ? (
              <p className="text-xs text-destructive" id="amount-error">
                {errors.amount.message}
              </p>
            ) : null}
          </div>

          <div className="flex justify-center">
            <div className="flex size-8 items-center justify-center rounded-full border border-border bg-accent">
              <ArrowDownUp className="size-3.5 text-muted-foreground" />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-muted-foreground" htmlFor="received">
              Destinatário recebe (estimado)
            </label>
            <div className="grid gap-2 sm:grid-cols-[1fr_110px]">
              <Input
                id="received"
                readOnly
                value={quote.estimatedReceived.toFixed(2)}
              />
              <Controller
                control={control}
                name="targetCurrency"
                render={({ field }) => (
                  <CurrencySelect
                    id="targetCurrency"
                    aria-label="Moeda de destino"
                    value={field.value}
                    onValueChange={field.onChange}
                  />
                )}
              />
            </div>
          </div>

          <SecurityNotice />

          {successMessage ? (
            <div className="flex items-center gap-2 rounded-lg border border-success/30 bg-success/5 px-3 py-2.5 text-xs text-success">
              <CheckCircle2 className="size-3.5" />
              {successMessage}
            </div>
          ) : null}

          {submitError ? (
            <div className="rounded-lg border border-destructive/30 bg-destructive/5 px-3 py-2.5 text-xs text-destructive">
              {submitError}
            </div>
          ) : null}

          <Button className="h-11 w-full text-sm font-medium" disabled={isPending} type="submit">
            {isPending ? "Confirmando..." : "Confirmar transferência"}
          </Button>
        </form>
      </div>

      <TransferSummary
        balance={balance}
        quote={quote}
        sourceCurrency={sourceCurrency}
        targetCurrency={targetCurrency}
      />
    </div>
  )
}
