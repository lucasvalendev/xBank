import { cva } from "class-variance-authority"

export const cardVariants = cva(
  "rounded-xl border text-card-foreground",
  {
    variants: {
      variant: {
        default: "border-border bg-card",
        elevated: "border-border bg-[#0d0d0d]",
        interactive:
          "border-border bg-card transition-colors hover:border-foreground/10 hover:bg-[#0d0d0d]",
      },
      padding: {
        none: "p-0",
        sm: "p-3",
        md: "p-5",
        lg: "p-6",
      },
    },
    defaultVariants: {
      variant: "default",
      padding: "md",
    },
  },
)
