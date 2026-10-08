import type { ReactNode } from 'react'
import { Button } from '@/components/Button/Button'
import { useDialog } from '@/hooks/useDialog'
import './Modal.css'

interface ModalProps {
  variant?: 'normal' | 'warning'
  icon?: string
  title: string
  children?: ReactNode
  cancelLabel: string
  confirmLabel: string
  onCancel: () => void
  onConfirm: () => void
}

export function Modal({
  variant = 'normal',
  icon,
  title,
  children,
  cancelLabel,
  confirmLabel,
  onCancel,
  onConfirm,
}: ModalProps) {
  const dialog = useDialog(onCancel)

  return (
    <dialog
      {...dialog}
      className={`modal modal-${variant}`}
      aria-labelledby="modal-title"
    >
      <div className="modal-panel">
        {icon && (
          <span className="modal-icon">
            <img src={icon} alt="" width="28" height="28" />
          </span>
        )}
        <h2 id="modal-title" className="modal-title">
          {title}
        </h2>
        {children && <div className="modal-body">{children}</div>}

        <div className="modal-actions">
          <Button variant="secondary" onClick={onCancel}>
            {cancelLabel}
          </Button>
          <Button variant={variant === 'warning' ? 'danger' : 'primary'} onClick={onConfirm}>
            {confirmLabel}
          </Button>
        </div>
      </div>
    </dialog>
  )
}
