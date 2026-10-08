import type { ComponentProps } from 'react'
import './Button.css'

interface ButtonProps extends ComponentProps<'button'> { // to take button props
  variant?: 'primary' | 'secondary' | 'outline' | 'amber' | 'muted' | 'ghost'
}

export function Button({ variant = 'primary', type = 'button', className, ...rest }: ButtonProps) {
  const classes = ['btn', `btn-${variant}`, className].filter(Boolean).join(' ')
  return <button type={type} className={classes} {...rest} />
}
