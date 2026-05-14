import type { ReactNode } from "react"
import { Sidebar } from "@/shared/components/layout/sidebar"
import type { User } from "@/shared/types/user"

type AppLayoutProps = {
  children: ReactNode
  onLogout?: () => void
  user?: User | null
}

export function AppLayout({ children, onLogout, user }: AppLayoutProps) {
  return (
    <div className="flex min-h-screen bg-background text-foreground">
      <Sidebar user={user} onLogout={onLogout} />
      <main className="flex min-w-0 flex-1 flex-col">
        <div className="border-b border-border bg-[#070707] px-4 py-3 lg:hidden">
          <div className="flex items-center gap-2.5">
            <div className="flex size-7 items-center justify-center rounded-lg bg-foreground text-xs font-bold text-background">
              X
            </div>
            <span className="text-sm font-semibold">X bank</span>
          </div>
        </div>
        <div className="mx-auto w-full max-w-5xl flex-1 px-5 py-6 sm:px-6 lg:px-8">
          {children}
        </div>
      </main>
    </div>
  )
}
