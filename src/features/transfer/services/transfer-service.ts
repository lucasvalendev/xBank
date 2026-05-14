import { http, registerMock } from "@/shared/lib/http"
import type {
  TransferPayload,
  TransferQuote,
  TransferResult,
} from "@/features/transfer/types/transfer-types"

export const TRANSFER_FEE = 12.9
export const BRL_TO_USD_RATE = 0.19042
const ESTIMATED_TIME = "Até 1 dia útil"

export function parseTransferAmount(value: unknown) {
  if (typeof value === "number") {
    return value
  }

  if (typeof value !== "string") {
    return Number(value)
  }

  return Number(value.replace(",", "."))
}

function roundCurrency(value: number) {
  return Math.round((value + Number.EPSILON) * 100) / 100
}

export function calculateTransferQuote(amount: number): TransferQuote {
  const safeAmount = Number.isFinite(amount) && amount > 0 ? amount : 0

  return {
    amount: safeAmount,
    fee: TRANSFER_FEE,
    exchangeRate: BRL_TO_USD_RATE,
    estimatedReceived: roundCurrency(safeAmount * BRL_TO_USD_RATE),
    total: safeAmount > 0 ? roundCurrency(safeAmount + TRANSFER_FEE) : 0,
    estimatedTime: ESTIMATED_TIME,
  }
}

registerMock("post", "/transfers", async (config) => {
  await new Promise((resolve) => setTimeout(resolve, 650))

  const payload: TransferPayload = JSON.parse(config.data ?? "{}")

  return {
    data: {
      ...payload,
      id: `transfer_${Date.now()}`,
      quote: calculateTransferQuote(payload.amount),
      createdAt: new Date().toISOString(),
    },
  }
})

export async function createTransfer(
  payload: TransferPayload,
): Promise<TransferResult> {
  const response = await http.post<TransferResult>("/transfers", payload)
  return response.data
}
