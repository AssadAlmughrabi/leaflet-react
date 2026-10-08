import { useEffect, useRef, type MouseEvent, type SyntheticEvent } from 'react'

// Opens a <dialog> as a modal. Escape or a click on the backdrop calls onClose.
export function useDialog(onClose: () => void) {
  const ref = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = ref.current
    dialog?.showModal()
    return () => dialog?.close()
  }, [])

  return {
    ref,
    // Escape key
    onCancel: (event: SyntheticEvent<HTMLDialogElement>) => {
      event.preventDefault()
      onClose()
    },
    // click on the dark backdrop (outside the panel)
    onClick: (event: MouseEvent<HTMLDialogElement>) => {
      if (event.target === event.currentTarget) onClose()
    },
  }
}
