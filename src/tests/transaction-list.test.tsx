import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import { TransactionList } from "@/features/dashboard/components/transaction-list"

describe("TransactionList", () => {
  it("renders the empty state when there are no transactions", () => {
    render(<TransactionList transactions={[]} />)

    expect(
      screen.getByText("Nenhuma movimentação por enquanto."),
    ).toBeInTheDocument()
  })
})
