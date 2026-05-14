import {
  ArrowDownLeft,
  ArrowUpRight,
  ChevronRight,
  CircleDollarSign,
  ReceiptText,
} from "lucide-react"
import { Link } from "react-router-dom"
import { appRoutes } from "@/shared/constants/app-routes"

const actions = [
  { label: "Transferir", icon: ArrowUpRight, href: appRoutes.transfer },
  { label: "Pagar", icon: ReceiptText, href: "#" },
  { label: "Receber", icon: ArrowDownLeft, href: "#" },
  { label: "Câmbio", icon: CircleDollarSign, href: "#" },
]

export function QuickActions() {
  return (
    <div className="rounded-xl border border-border bg-card p-4">
      <p className="mb-3 text-xs font-medium text-muted-foreground uppercase tracking-wide">
        Ações rápidas
      </p>
      <div className="flex flex-col gap-1.5">
        {actions.map((action) => {
          const Icon = action.icon
          const className = "flex h-10 items-center justify-between gap-2 rounded-lg px-3 text-sm text-foreground transition-colors hover:bg-accent"
          const content = (
            <>
              <span className="inline-flex items-center gap-2.5">
                <Icon className="size-4 text-muted-foreground" />
                {action.label}
              </span>
              <ChevronRight className="size-3.5 text-muted-foreground" />
            </>
          )

          if (action.href === "#") {
            return (
              <button key={action.label} type="button" className={className}>
                {content}
              </button>
            )
          }

          return (
            <Link key={action.label} to={action.href} className={className}>
              {content}
            </Link>
          )
        })}
      </div>
      <button
        className="mt-2 w-full text-center text-xs text-muted-foreground transition-colors hover:text-foreground"
        type="button"
      >
        Ver todas
      </button>
    </div>
  )
}
