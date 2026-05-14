import { screen, within } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { beforeEach, describe, expect, it } from "vitest"
import { useAuthStore } from "@/features/auth/store/auth-store"
import { useAccountStore } from "@/features/dashboard/store/account-store"
import { renderApp } from "@/tests/utils/render-with-router"

describe("authenticated transfer flow", () => {
  beforeEach(() => {
    localStorage.clear()
    useAuthStore.setState({
      user: null,
      isAuthenticated: false,
    })
    useAccountStore.setState({
      account: null,
      balance: 0,
      transactions: [],
      isInitialized: false,
    })
  })

  it("updates the balance and transaction list after a valid transfer", async () => {
    const user = userEvent.setup()
    renderApp()

    await user.type(screen.getByLabelText("E-mail"), "lucas@xbank.dev")
    await user.type(screen.getByLabelText("Senha"), "123456")
    await user.click(screen.getByRole("button", { name: "Entrar" }))

    expect(
      await screen.findByRole("heading", { name: /painel da conta/i }),
    ).toBeInTheDocument()
    expect(await screen.findByText("R$ 48.750,00")).toBeInTheDocument()

    await user.click(screen.getByRole("link", { name: "Transferir" }))

    expect(
      await screen.findByRole("heading", { name: /preparar envio/i }),
    ).toBeInTheDocument()

    await user.type(screen.getByLabelText("Valor enviado"), "1000")

    expect(await screen.findByText("R$ 1.012,90")).toBeInTheDocument()
    expect(screen.getByText("US$ 190,42")).toBeInTheDocument()

    await user.click(
      screen.getByRole("button", { name: "Confirmar transferência" }),
    )

    expect(
      await screen.findByText("Transferência realizada com sucesso."),
    ).toBeInTheDocument()
    expect(
      await screen.findByRole("heading", { name: /painel da conta/i }, { timeout: 3000 }),
    ).toBeInTheDocument()
    expect(await screen.findByText("R$ 47.737,10")).toBeInTheDocument()

    const transactions = screen.getByRole("heading", {
      name: /transa..es recentes/i,
    }).closest("div")?.parentElement

    expect(transactions).toBeTruthy()
    const firstTransaction = within(transactions as HTMLElement).getAllByRole(
      "listitem",
    )[0]

    expect(
      within(firstTransaction).getByText("Transferência enviada"),
    ).toBeInTheDocument()
    expect(
      within(firstTransaction).getByText("Maria Oliveira"),
    ).toBeInTheDocument()
    expect(
      within(firstTransaction).getByText("- R$ 1.012,90"),
    ).toBeInTheDocument()
  })
})
