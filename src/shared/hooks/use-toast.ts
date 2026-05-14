import { create } from "zustand"

type ToastVariant = "default" | "success" | "destructive"

type ToastItem = {
  id: string
  title: string
  variant: ToastVariant
}

type ToastState = {
  toasts: ToastItem[]
  addToast: (title: string, variant?: ToastVariant) => void
  removeToast: (id: string) => void
}

export const useToastStore = create<ToastState>()((set) => ({
  toasts: [],
  addToast: (title, variant = "default") => {
    const id = `toast_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`
    set((state) => ({
      toasts: [...state.toasts, { id, title, variant }],
    }))
  },
  removeToast: (id) => {
    set((state) => ({
      toasts: state.toasts.filter((t) => t.id !== id),
    }))
  },
}))

export function useToast() {
  const addToast = useToastStore((state) => state.addToast)

  return {
    toast: addToast,
    success: (title: string) => addToast(title, "success"),
    error: (title: string) => addToast(title, "destructive"),
  }
}
