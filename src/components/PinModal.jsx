import { useState, useRef, useEffect } from 'react'
import { X, Lock } from 'lucide-react'
import { unlock } from '../lib/editAccess'

export default function PinModal({ open, onClose, onUnlocked }) {
  const [pin, setPin] = useState('')
  const [error, setError] = useState(false)
  const [busy, setBusy] = useState(false)
  const inputRef = useRef(null)

  useEffect(() => {
    if (open) {
      setPin('')
      setError(false)
      setTimeout(() => inputRef.current?.focus(), 120)
    }
  }, [open])

  if (!open) return null

  async function attempt(value) {
    setBusy(true)
    const ok = await unlock(value)
    setBusy(false)
    if (ok) {
      onUnlocked && onUnlocked()
      onClose()
    } else {
      setError(true)
      setPin('')
      inputRef.current?.focus()
    }
  }

  function onChange(e) {
    const value = e.target.value.replace(/\D/g, '').slice(0, 4)
    setPin(value)
    setError(false)
    if (value.length === 4) attempt(value)
  }

  return (
    <div className="fixed inset-0 z-[1300] grid place-items-center p-6" role="dialog" aria-modal="true">
      <div className="absolute inset-0 bg-ink/55 backdrop-blur-sm animate-fade-in" onClick={onClose} />
      <div className="relative w-full max-w-xs animate-pop rounded-3xl bg-surface p-6 shadow-float text-center">
        <button
          onClick={onClose}
          aria-label="Cerrar"
          className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-muted text-ink-soft active:scale-90"
        >
          <X size={18} />
        </button>

        <div className="mx-auto mb-3 grid h-14 w-14 place-items-center rounded-2xl bg-primary/10 text-primary">
          <Lock size={26} />
        </div>
        <h2 className="font-display text-3xl text-ink">Desbloquear edición</h2>
        <p className="mt-1 text-sm text-ink-soft">Ingresá el PIN de 4 dígitos para editar el itinerario.</p>

        <input
          ref={inputRef}
          value={pin}
          onChange={onChange}
          inputMode="numeric"
          pattern="[0-9]*"
          autoComplete="off"
          maxLength={4}
          disabled={busy}
          placeholder="● ● ● ●"
          className={`field mt-5 text-center text-2xl tracking-[0.6em] font-semibold ${
            error ? 'border-destructive ring-4 ring-destructive/15' : ''
          }`}
        />
        {error && <p className="mt-2 text-sm font-semibold text-destructive">PIN incorrecto. Probá de nuevo.</p>}
        <p className="mt-4 text-xs text-ink-faint">Calificar y subir fotos no necesitan PIN.</p>
      </div>
    </div>
  )
}
