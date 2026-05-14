import { ArrowLeft } from "lucide-react"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAuthStore } from "@/features/auth/store/auth-store"
import { useAccountQuery } from "@/features/dashboard/hooks/use-account-query"
import { useAccountStore } from "@/features/dashboard/store/account-store"
import { TransferForm } from "@/features/transfer/components/transfer-form"
import type { TransferFormData } from "@/features/transfer/schemas/transfer-schema"
import { Skeleton } from "@/shared/components/ui/skeleton"
import { AppLayout } from "@/shared/components/layout/app-layout"
import { appRoutes } from "@/shared/constants/app-routes"

export function TransferPage() {
  const navigate = useNavigate()
  const user = useAuthStore((state) => state.user)
  const logout = useAuthStore((state) => state.logout)
  const balance = useAccountStore((state) => state.balance)
  const isInitialized = useAccountStore((state) => state.isInitialized)
  const setAccountOverview = useAccountStore((state) => state.setAccountOverview)
  const applyTransfer = useAccountStore((state) => state.applyTransfer)
  const accountQuery = useAccountQuery(!isInitialized)
  const isLoading = accountQuery.isLoading && !isInitialized

  function handleLogout() {
    logout()
    navigate(appRoutes.login, { replace: true })
  }

  function handleTransferConfirmed(payload: TransferFormData & { total: number }) {
    applyTransfer(payload)

    window.setTimeout(() => {
      navigate(appRoutes.dashboard)
    }, 800)
  }

  useEffect(() => {
    if (accountQuery.data && !isInitialized) {
      setAccountOverview(accountQuery.data)
    }
  }, [accountQuery.data, isInitialized, setAccountOverview])

  return (
    <AppLayout user={user} onLogout={handleLogout}>
      <div className="flex flex-col gap-6">
        <header>
          <button
            className="mb-4 inline-flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
            onClick={() => navigate(appRoutes.dashboard)}
            type="button"
          >
            <ArrowLeft className="size-3.5" />
            Voltar
          </button>
          <h1 className="text-lg font-semibold">Preparar envio</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Envie dinheiro de forma rápida e segura.
          </p>
        </header>

        {accountQuery.isError ? (
          <div className="rounded-xl border border-border bg-card p-5">
            <p className="text-sm font-medium">Não foi possível carregar sua conta.</p>
            <p className="mt-1 text-xs text-muted-foreground">
              Recarregue a página antes de iniciar uma transferência.
            </p>
          </div>
        ) : isLoading ? (
          <div className="grid gap-4 lg:grid-cols-[1fr_320px]">
            <Skeleton className="h-[480px] w-full rounded-xl" />
            <Skeleton className="h-[320px] w-full rounded-xl" />
          </div>
        ) : (
          <TransferForm
            balance={balance}
            onTransferConfirmed={handleTransferConfirmed}
          />
        )}
      </div>
    </AppLayout>
  )
}
