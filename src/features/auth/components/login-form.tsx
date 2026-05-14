import { zodResolver } from "@hookform/resolvers/zod"
import { Eye, EyeOff, Lock, Mail, ShieldCheck } from "lucide-react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { loginSchema, type LoginFormData } from "@/features/auth/schemas/login-schema"
import { useAuthStore } from "@/features/auth/store/auth-store"
import { Button } from "@/shared/components/ui/button"
import { appRoutes } from "@/shared/constants/app-routes"
import { cn } from "@/shared/lib/utils"

export function LoginForm() {
  const navigate = useNavigate()
  const login = useAuthStore((state) => state.login)
  const [authError, setAuthError] = useState<string | null>(null)
  const [showPassword, setShowPassword] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  async function onSubmit(values: LoginFormData) {
    setAuthError(null)

    try {
      await login(values)
      navigate(appRoutes.dashboard, { replace: true })
    } catch {
      setAuthError("Não foi possível entrar. Tente novamente.")
    }
  }

  return (
    <form className="flex flex-col gap-8" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col items-center text-center">
        <div className="flex size-14 items-center justify-center rounded-2xl border border-border bg-card text-xl font-bold text-foreground">
          X
        </div>
        <p className="mt-3 text-xs tracking-widest text-muted-foreground uppercase">
          X bank
        </p>
        <h1 className="mt-6 text-2xl font-semibold tracking-tight">
          Bem-vindo de volta
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Acesse sua conta para continuar
        </p>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-muted-foreground" htmlFor="email">
            E-mail
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <input
              id="email"
              type="email"
              autoComplete="email"
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? "email-error" : undefined}
              placeholder="voce@xbank.dev"
              className={cn(
                "flex h-10 w-full rounded-lg border border-border bg-[#0a0a0a] pl-10 pr-3 py-2 text-sm text-foreground outline-none transition-all placeholder:text-muted-foreground/60 focus-visible:border-foreground/20 focus-visible:ring-1 focus-visible:ring-ring/30",
                errors.email && "border-destructive/50",
              )}
              {...register("email")}
            />
          </div>
          {errors.email ? (
            <p className="text-xs text-destructive" id="email-error">
              {errors.email.message}
            </p>
          ) : null}
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-muted-foreground" htmlFor="password">
            Senha
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              aria-invalid={Boolean(errors.password)}
              aria-describedby={errors.password ? "password-error" : undefined}
              placeholder="Digite sua senha"
              className={cn(
                "flex h-10 w-full rounded-lg border border-border bg-[#0a0a0a] pl-10 pr-10 py-2 text-sm text-foreground outline-none transition-all placeholder:text-muted-foreground/60 focus-visible:border-foreground/20 focus-visible:ring-1 focus-visible:ring-ring/30",
                errors.password && "border-destructive/50",
              )}
              {...register("password")}
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
              onClick={() => setShowPassword(!showPassword)}
              tabIndex={-1}
              aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
            >
              {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
            </button>
          </div>
          {errors.password ? (
            <p className="text-xs text-destructive" id="password-error">
              {errors.password.message}
            </p>
          ) : null}
          <button
            className="mt-1 self-end text-xs text-muted-foreground transition-colors hover:text-foreground"
            type="button"
          >
            Esqueceu sua senha?
          </button>
        </div>
      </div>

      {authError ? (
        <div className="rounded-lg border border-destructive/30 bg-destructive/5 px-3 py-2.5 text-xs text-destructive">
          {authError}
        </div>
      ) : null}

      <Button className="h-11 w-full text-sm font-medium" disabled={isSubmitting} type="submit">
        {isSubmitting ? "Entrando..." : "Entrar"}
      </Button>

      <div className="flex flex-col items-center gap-1 text-center">
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <ShieldCheck className="size-3.5" />
          Acesso seguro e criptografado
        </div>
        <p className="text-[11px] text-muted-foreground/60">
          Seus dados estão protegidos
        </p>
      </div>
    </form>
  )
}
