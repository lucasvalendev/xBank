import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it, vi } from "vitest"
import { TransferForm } from "@/features/transfer/components/transfer-form"
import { calculateTransferQuote } from "@/features/transfer/services/transfer-service"

function renderTransferForm(balance = 48_750) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  })
  const onTransferConfirmed = vi.fn()

  render(
    <QueryClientProvider client={queryClient}>
      <TransferForm
        balance={balance}
        onTransferConfirmed={onTransferConfirmed}
      />
    </QueryClientProvider>,
  )

  return { onTransferConfirmed }
}

describe("transfer flow", () => {
  it("calculates the quote and confirms a valid transfer", async () => {
    const user = userEvent.setup()
    const { onTransferConfirmed } = renderTransferForm()

    await user.type(screen.getByLabelText("Valor enviado"), "1000,00")

    expect(screen.getByText("R$ 1.012,90")).toBeInTheDocument()
    expect(screen.getByText("US$ 190,42")).toBeInTheDocument()

    await user.click(screen.getByRole("button", { name: "Confirmar transferência" }))

    expect(
      await screen.findByText("Transferência realizada com sucesso."),
    ).toBeInTheDocument()
    expect(onTransferConfirmed).toHaveBeenCalledWith(
      expect.objectContaining({
        amount: 1000,
        recipient: "Maria Oliveira",
        total: 1012.9,
      }),
    )
  })

  it("blocks a transfer when the balance is insufficient", async () => {
    const user = userEvent.setup()
    const { onTransferConfirmed } = renderTransferForm(100)

    await user.type(screen.getByLabelText("Valor enviado"), "1000")
    await user.click(screen.getByRole("button", { name: "Confirmar transferência" }))

    expect(
      await screen.findByText("Saldo insuficiente para concluir a transferência."),
    ).toBeInTheDocument()
    expect(onTransferConfirmed).not.toHaveBeenCalled()
  })

  it("keeps the transfer calculation stable", () => {
    expect(calculateTransferQuote(1000)).toMatchObject({
      amount: 1000,
      fee: 12.9,
      exchangeRate: 0.19042,
      estimatedReceived: 190.42,
      total: 1012.9,
    })
  })
})
