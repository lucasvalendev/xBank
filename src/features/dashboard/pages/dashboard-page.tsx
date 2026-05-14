import { useEffect } from "react"
import { Bitcoin, Globe2 } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { useAuthStore } from "@/features/auth/store/auth-store"
import { BalanceCard } from "@/features/dashboard/components/balance-card"
import { FeatureCard } from "@/features/dashboard/components/feature-card"
import { QuickActions } from "@/features/dashboard/components/quick-actions"
import { TransactionList } from "@/features/dashboard/components/transaction-list"
import { useAccountQuery } from "@/features/dashboard/hooks/use-account-query"
import { useAccountStore } from "@/features/dashboard/store/account-store"
import { AppLayout } from "@/shared/components/layout/app-layout"
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card"
import { appRoutes } from "@/shared/constants/app-routes"

export function DashboardPage() {
  const navigate = useNavigate()
  const user = useAuthStore((state) => state.user)
  const logout = useAuthStore((state) => state.logout)
  const balance = useAccountStore((state) => state.balance)
  const transactions = useAccountStore((state) => state.transactions)
  const isInitialized = useAccountStore((state) => state.isInitialized)
  const setAccountOverview = useAccountStore((state) => state.setAccountOverview)
  const accountQuery = useAccountQuery(!isInitialized)
  const isLoading = accountQuery.isLoading && !isInitialized

  function handleLogout() {
    logout()
    navigate(appRoutes.login, { replace: true })
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
          <h1 className="text-lg font-semibold">Painel da conta</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Saldo, movimentações e atalhos rápidos.
          </p>
        </header>

        {accountQuery.isError ? (
          <Card>
            <CardHeader>
              <CardTitle>Não foi possível carregar os dados.</CardTitle>
              <CardDescription>
                Recarregue a página para tentar novamente.
              </CardDescription>
            </CardHeader>
          </Card>
        ) : null}

        <div className="grid gap-4 lg:grid-cols-[1fr_280px]">
          <BalanceCard balance={balance} isLoading={isLoading} />
          <QuickActions />
        </div>

        <div className="grid gap-4 lg:grid-cols-[1fr_280px]">
          <TransactionList transactions={transactions} isLoading={isLoading} />
          <div className="flex flex-col gap-4">
            <FeatureCard
              icon={Globe2}
              title="Transfira para o exterior"
              description="Envie dinheiro para mais de 200 países com tarifas competitivas."
            />
            <FeatureCard
              icon={Bitcoin}
              title="Cripto e Fiat"
              description="Compre, venda e mantenha cripto ou moeda fiduciária."
            />
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
