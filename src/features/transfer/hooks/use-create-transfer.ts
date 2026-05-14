import { useMutation } from "@tanstack/react-query"
import { createTransfer } from "@/features/transfer/services/transfer-service"

export function useCreateTransfer() {
  return useMutation({
    mutationFn: createTransfer,
  })
}
