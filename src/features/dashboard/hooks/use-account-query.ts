import { useQuery } from "@tanstack/react-query"
import { getAccountOverview } from "@/features/dashboard/services/account-service"

export function useAccountQuery(enabled: boolean) {
  return useQuery({
    queryKey: ["account-overview"],
    queryFn: getAccountOverview,
    enabled,
    staleTime: Number.POSITIVE_INFINITY,
  })
}
