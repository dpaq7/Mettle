import * as React from "react"
import * as PopoverPrimitive from "@radix-ui/react-popover"
import { cn } from "@/lib/utils"

const Popover = PopoverPrimitive.Root

const PopoverTrigger = PopoverPrimitive.Trigger

const PopoverAnchor = PopoverPrimitive.Anchor

export interface PopoverContentProps
  extends React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content> {
  variant?: "default" | "fantasy"
}

const PopoverContent = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  PopoverContentProps
>(({ className, align = "center", sideOffset = 4, variant = "fantasy", ...props }, ref) => (
  <PopoverPrimitive.Portal>
    <PopoverPrimitive.Content
      ref={ref}
      align={align}
      sideOffset={sideOffset}
      className={cn(
        // Base styles - Using Anvil design system
        "z-[9999] w-72 p-4",
        "bg-[var(--bg-surface)] text-[var(--text-primary)]",
        "border border-[var(--border-default)]",
        "shadow-[var(--shadow-md)]",
        "outline-none",

        // Animation
        "animate-in fade-in-0 zoom-in-95",
        "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
        "data-[side=bottom]:slide-in-from-top-2",
        "data-[side=top]:slide-in-from-bottom-2",
        "data-[side=left]:slide-in-from-right-2",
        "data-[side=right]:slide-in-from-left-2",

        // Variant styles - chamfered corners for fantasy
        variant === "fantasy" && "[clip-path:polygon(8px_0,calc(100%-8px)_0,100%_8px,100%_calc(100%-8px),calc(100%-8px)_100%,8px_100%,0_calc(100%-8px),0_8px)]",
        variant === "default" && "rounded-md",

        className
      )}
      {...props}
    />
  </PopoverPrimitive.Portal>
))
PopoverContent.displayName = PopoverPrimitive.Content.displayName

const PopoverClose = PopoverPrimitive.Close

export { Popover, PopoverTrigger, PopoverContent, PopoverAnchor, PopoverClose }
