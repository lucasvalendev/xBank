import { Navigate } from "react-router-dom"
import { useAuthStore } from "@/features/auth/store/auth-store"
import { appRoutes } from "@/shared/constants/app-routes"

export function HomeRedirect() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)

  return (
    <Navigate
      to={isAuthenticated ? appRoutes.dashboard : appRoutes.login}
      replace
    />
  )
}
