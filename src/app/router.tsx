import { createBrowserRouter } from "react-router-dom"
import { HomeRedirect } from "@/features/auth/components/home-redirect"
import { ProtectedRoute } from "@/features/auth/components/protected-route"
import { LoginPage } from "@/features/auth/pages/login-page"
import { DashboardPage } from "@/features/dashboard/pages/dashboard-page"
import { TransferPage } from "@/features/transfer/pages/transfer-page"
import { appRoutes } from "@/shared/constants/app-routes"

export const router = createBrowserRouter([
  {
    path: appRoutes.home,
    element: <HomeRedirect />,
  },
  {
    path: appRoutes.login,
    element: <LoginPage />,
  },
  {
    path: appRoutes.dashboard,
    element: (
      <ProtectedRoute>
        <DashboardPage />
      </ProtectedRoute>
    ),
  },
  {
    path: appRoutes.transfer,
    element: (
      <ProtectedRoute>
        <TransferPage />
      </ProtectedRoute>
    ),
  },
])
