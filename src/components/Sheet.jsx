import { useEffect } from 'react'
import { X } from 'lucide-react'

export default function Sheet({ open, onClose, title, children }) {
  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && onClose()
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [open, onClose])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-[1200] flex items-end justify-center" role="dialog" aria-modal="true">
      <div
        className="absolute inset-0 bg-ink/50 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
        aria-hidden="true"
      />
      <div className="relative w-full max-w-lg animate-sheet-up rounded-t-3xl bg-surface shadow-float max-h-[88vh] flex flex-col">
        <div className="flex items-center justify-between px-5 pt-4 pb-2">
          <div className="mx-auto h-1.5 w-11 rounded-full bg-line absolute left-1/2 -translate-x-1/2 top-2.5" />
          <h2 className="font-display text-2xl text-ink pt-2">{title}</h2>
          <button
            onClick={onClose}
            aria-label="Cerrar"
            className="grid h-10 w-10 place-items-center rounded-full bg-muted text-ink-soft transition active:scale-90"
          >
            <X size={20} />
          </button>
        </div>
        <div className="overflow-y-auto px-5 pb-safe pt-1">{children}</div>
      </div>
    </div>
  )
}
