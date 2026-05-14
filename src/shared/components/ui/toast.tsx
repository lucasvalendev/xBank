import * as ToastPrimitive from "@radix-ui/react-toast"
import { X } from "lucide-react"
import type { ComponentPropsWithoutRef } from "react"
import { cn } from "@/shared/lib/utils"

function ToastProvider(
  props: ComponentPropsWithoutRef<typeof ToastPrimitive.Provider>,
) {
  return <ToastPrimitive.Provider swipeDirection="right" {...props} />
}

function ToastViewport({
  className,
  ...props
}: ComponentPropsWithoutRef<typeof ToastPrimitive.Viewport>) {
  return (
    <ToastPrimitive.Viewport
      className={cn(
        "fixed bottom-4 right-4 z-[100] flex max-w-[360px] flex-col gap-2",
        className,
      )}
      {...props}
    />
  )
}

function Toast({
  className,
  variant = "default",
  ...props
}: ComponentPropsWithoutRef<typeof ToastPrimitive.Root> & {
  variant?: "default" | "success" | "destructive"
}) {
  return (
    <ToastPrimitive.Root
      className={cn(
        "group pointer-events-auto relative flex w-full items-center gap-3 overflow-hidden rounded-lg border px-4 py-3 shadow-2xl shadow-black/50 transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[state=open]:animate-in data-[state=open]:slide-in-from-bottom-full data-[state=closed]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full",
        variant === "default" && "border-border bg-card text-foreground",
        variant === "success" &&
          "border-success/20 bg-success/5 text-success",
        variant === "destructive" &&
          "border-destructive/20 bg-destructive/5 text-destructive",
        className,
      )}
      {...props}
    />
  )
}

function ToastTitle({
  className,
  ...props
}: ComponentPropsWithoutRef<typeof ToastPrimitive.Title>) {
  return (
    <ToastPrimitive.Title
      className={cn("text-sm font-medium", className)}
      {...props}
    />
  )
}

function ToastDescription({
  className,
  ...props
}: ComponentPropsWithoutRef<typeof ToastPrimitive.Description>) {
  return (
    <ToastPrimitive.Description
      className={cn("text-xs opacity-80", className)}
      {...props}
    />
  )
}

function ToastClose({
  className,
  ...props
}: ComponentPropsWithoutRef<typeof ToastPrimitive.Close>) {
  return (
    <ToastPrimitive.Close
      className={cn(
        "absolute right-2 top-2 rounded-md p-1 opacity-0 transition-opacity hover:opacity-100 focus:opacity-100 group-hover:opacity-100",
        className,
      )}
      aria-label="Fechar"
      {...props}
    >
      <X className="size-3.5" />
    </ToastPrimitive.Close>
  )
}

export {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
}
