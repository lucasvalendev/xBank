import {
  BadgeHelp,
  Bitcoin,
  CircleDollarSign,
  CreditCard,
  FileText,
  Home,
  LogOut,
  ReceiptText,
  Repeat2,
  Settings,
  UserRound,
  UsersRound,
  WalletCards,
} from "lucide-react"
import { NavLink } from "react-router-dom"
import { appRoutes } from "@/shared/constants/app-routes"
import { cn } from "@/shared/lib/utils"
import type { User } from "@/shared/types/user"

const mainItems = [
  { label: "Início", href: appRoutes.dashboard, icon: Home },
  { label: "Contas", href: "#", icon: WalletCards },
  { label: "Transferências", href: appRoutes.transfer, icon: Repeat2 },
  { label: "Pagamentos", href: "#", icon: ReceiptText },
  { label: "Beneficiários", href: "#", icon: UsersRound },
  { label: "Câmbio", href: "#", icon: CircleDollarSign },
  { label: "Cripto", href: "#", icon: Bitcoin },
  { label: "Extrato", href: "#", icon: FileText },
  { label: "Cartões", href: "#", icon: CreditCard },
  { label: "Configurações", href: "#", icon: Settings },
]

type SidebarProps = {
  onLogout?: () => void
  user?: User | null
}

export function Sidebar({ onLogout, user }: SidebarProps) {
  return (
    <aside className="hidden w-56 shrink-0 border-r border-border bg-[#070707] lg:flex lg:flex-col">
      <div className="flex items-center gap-2.5 px-5 py-5">
        <div className="flex size-8 items-center justify-center rounded-lg bg-foreground text-xs font-bold text-background">
          X
        </div>
        <span className="text-sm font-semibold tracking-tight">X bank</span>
      </div>

      <nav className="mt-2 flex flex-1 flex-col gap-0.5 px-3" aria-label="Principal">
        {mainItems.map((item) => {
          const Icon = item.icon

          if (item.href === "#") {
            return (
              <button
                key={item.label}
                className="flex h-9 items-center gap-2.5 rounded-lg px-2.5 text-left text-[13px] text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                type="button"
              >
                <Icon className="size-[15px]" />
                {item.label}
              </button>
            )
          }

          return (
            <NavLink
              key={item.label}
              to={item.href}
              className={({ isActive }) =>
                cn(
                  "flex h-9 items-center gap-2.5 rounded-lg px-2.5 text-[13px] text-muted-foreground transition-colors hover:bg-accent hover:text-foreground",
                  isActive && "bg-accent text-foreground",
                )
              }
            >
              <Icon className="size-[15px]" />
              {item.label}
            </NavLink>
          )
        })}
      </nav>

      <div className="flex flex-col gap-0.5 border-t border-border px-3 py-3">
        <button
          className="flex h-9 items-center gap-2.5 rounded-lg px-2.5 text-left text-[13px] text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
          type="button"
        >
          <BadgeHelp className="size-[15px]" />
          Ajuda
        </button>

        <div className="my-2 flex items-center gap-2.5 rounded-lg border border-border bg-[#0a0a0a] px-2.5 py-2">
          <div className="flex size-7 items-center justify-center rounded-md bg-accent">
            <UserRound className="size-3.5 text-muted-foreground" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-xs font-medium">
              {user?.name ?? "Usuário"}
            </p>
            <p className="truncate text-[11px] text-muted-foreground">
              {user?.email ?? "sessao@xbank.dev"}
            </p>
          </div>
        </div>

        <button
          className="flex h-9 items-center gap-2.5 rounded-lg px-2.5 text-left text-[13px] text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
          onClick={onLogout}
          type="button"
        >
          <LogOut className="size-[15px]" />
          Sair
        </button>
      </div>
    </aside>
  )
}
