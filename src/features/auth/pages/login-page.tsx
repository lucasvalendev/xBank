import { Navigate } from "react-router-dom"
import { LoginForm } from "@/features/auth/components/login-form"
import { useAuthStore } from "@/features/auth/store/auth-store"
import { AuthLayout } from "@/shared/components/layout/auth-layout"
import { appRoutes } from "@/shared/constants/app-routes"

export function LoginPage() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)

  if (isAuthenticated) {
    return <Navigate to={appRoutes.dashboard} replace />
  }

  return (
    <AuthLayout>
      <LoginForm />
    </AuthLayout>
  )
}
