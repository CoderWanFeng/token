import { cn } from '../../lib/utils'

interface ButtonProps {
  children: React.ReactNode
  size?: 'default' | 'sm' | 'lg'
  variant?: 'default' | 'secondary'
  className?: string
}

export function Button({ 
  children, 
  size = 'default', 
  variant = 'default', 
  className
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center gap-2 rounded-xl text-base font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer'
  
  const variants = {
    default: 'bg-gradient-to-r from-primary to-secondary text-white shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5',
    secondary: 'bg-surface text-text-primary border border-border hover:bg-surface-light hover:border-primary'
  }
  
  const sizes = {
    sm: 'h-9 px-4 py-2 text-sm',
    default: 'h-11 px-6 py-2.5',
    lg: 'h-14 px-8 py-3 text-lg'
  }

  return (
    <button className={cn(baseStyles, variants[variant], sizes[size], className)}>
      {children}
    </button>
  )
}
