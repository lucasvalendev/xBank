import { ShieldCheck } from "lucide-react"

export function SecurityNotice() {
  return (
    <div className="flex items-start gap-3 rounded-lg border border-border bg-[#070707] p-3.5">
      <ShieldCheck className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
      <div>
        <p className="text-xs font-medium">Sua transferência é protegida</p>
        <p className="mt-0.5 text-[11px] leading-relaxed text-muted-foreground">
          Usamos criptografia de ponta a ponta para proteger seus dados e transações.
        </p>
      </div>
    </div>
  )
}
