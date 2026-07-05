import { useEffect, useState } from 'react'
import { X, ChevronLeft, ChevronRight, Trash2, MapPin } from 'lucide-react'
import { getEventById } from '../lib/events'
import { deletePhoto } from '../lib/photos'

export default function PhotoLightbox({ photos, index, onClose, onIndex }) {
  const [confirming, setConfirming] = useState(false)
  const photo = photos[index]

  useEffect(() => {
    setConfirming(false)
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') onIndex(Math.max(0, index - 1))
      if (e.key === 'ArrowRight') onIndex(Math.min(photos.length - 1, index + 1))
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [index, photos.length, onClose, onIndex])

  if (!photo) return null
  const event = photo.event_id ? getEventById(photo.event_id) : null

  async function del() {
    await deletePhoto(photo.id)
    if (photos.length <= 1) onClose()
    else onIndex(Math.min(index, photos.length - 2))
  }

  return (
    <div className="fixed inset-0 z-[1400] flex flex-col bg-ink/95 animate-fade-in">
      <div className="flex items-center justify-between p-4" style={{ paddingTop: 'calc(var(--safe-top) + 0.5rem)' }}>
        <span className="text-sm font-semibold text-white/70">
          {index + 1} / {photos.length}
        </span>
        <button onClick={onClose} aria-label="Cerrar" className="grid h-10 w-10 place-items-center rounded-full bg-white/15 text-white active:scale-90">
          <X size={22} />
        </button>
      </div>

      <div className="relative flex flex-1 items-center justify-center px-2">
        {index > 0 && (
          <button
            onClick={() => onIndex(index - 1)}
            aria-label="Anterior"
            className="absolute left-2 z-10 grid h-11 w-11 place-items-center rounded-full bg-white/15 text-white active:scale-90"
          >
            <ChevronLeft size={24} />
          </button>
        )}
        <img src={photo.url} alt={photo.caption || 'Foto'} className="max-h-full max-w-full rounded-2xl object-contain" />
        {index < photos.length - 1 && (
          <button
            onClick={() => onIndex(index + 1)}
            aria-label="Siguiente"
            className="absolute right-2 z-10 grid h-11 w-11 place-items-center rounded-full bg-white/15 text-white active:scale-90"
          >
            <ChevronRight size={24} />
          </button>
        )}
      </div>

      <div className="space-y-3 p-5 pb-safe">
        {photo.caption && <p className="text-center text-white">{photo.caption}</p>}
        {event && (
          <p className="flex items-center justify-center gap-1.5 text-sm text-white/70">
            <MapPin size={14} /> Día {event.day} · {event.title}
          </p>
        )}
        <div className="flex justify-center">
          {!confirming ? (
            <button onClick={() => setConfirming(true)} className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white/90 active:scale-95">
              <Trash2 size={16} /> Borrar foto
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <button onClick={() => setConfirming(false)} className="rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white active:scale-95">
                Cancelar
              </button>
              <button onClick={del} className="rounded-full bg-destructive px-4 py-2 text-sm font-semibold text-white active:scale-95">
                Sí, borrar
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
