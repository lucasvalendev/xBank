import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { render } from "@testing-library/react"
import { MemoryRouter, Route, Routes } from "react-router-dom"
import { HomeRedirect } from "@/features/auth/components/home-redirect"
import { ProtectedRoute } from "@/features/auth/components/protected-route"
import { LoginPage } from "@/features/auth/pages/login-page"
import { DashboardPage } from "@/features/dashboard/pages/dashboard-page"
import { TransferPage } from "@/features/transfer/pages/transfer-page"
import { appRoutes } from "@/shared/constants/app-routes"

type RenderAppOptions = {
  initialEntries?: string[]
}

function createTestQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  })
}

export function renderApp({ initialEntries = [appRoutes.login] }: RenderAppOptions = {}) {
  const queryClient = createTestQueryClient()

  return render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter initialEntries={initialEntries}>
        <Routes>
          <Route path={appRoutes.home} element={<HomeRedirect />} />
          <Route path={appRoutes.login} element={<LoginPage />} />
          <Route
            path={appRoutes.dashboard}
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />
          <Route
            path={appRoutes.transfer}
            element={
              <ProtectedRoute>
                <TransferPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </MemoryRouter>
    </QueryClientProvider>,
  )
}
