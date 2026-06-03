import { cn } from '../../lib/utils'

interface ButtonProps {
  children: React.ReactNode
  size?: 'default' | 'sm' | 'lg'
  variant?: 'default' | 'secondary'
  className?: string
  href?: string
}

export function Button({ 
  children, 
  size = 'default', 
  variant = 'default', 
  className,
  href,
}: ButtonProps) {
  const baseStyles = cn(
    "inline-flex items-center justify-center gap-2 font-semibold rounded-xl transition-all duration-300 cursor-pointer",
    "focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-white",
    className
  )
  
  const variants: Record<string, string> = {
    default: cn(
      "bg-gradient-to-r from-primary to-secondary text-white",
      "shadow-button",
      "hover:shadow-button-hover hover:-translate-y-0.5",
      "active:translate-y-0 active:shadow-button"
    ),
    secondary: cn(
      "bg-white text-text-secondary",
      "border border-border shadow-sm",
      "hover:bg-primary/5 hover:border-primary/30 hover:text-primary"
    ),
  }
  
  const sizes: Record<string, string> = {
    sm: 'h-9 px-4 py-2 text-sm',
    default: 'h-11 px-6 py-2.5 text-sm',
    lg: 'h-14 px-8 py-3.5 text-base',
  }

  const classes = cn(baseStyles, variants[variant], sizes[size])

  if (href) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    )
  }

  return (
    <button className={classes}>
      {children}
    </button>
  )
}
