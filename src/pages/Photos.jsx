import { useMemo, useState } from 'react'
import { Camera } from 'lucide-react'
import { DAYS } from '../data/trip'
import { useEvents, usePhotos } from '../lib/hooks'
import { getPhotos, isReady as photosReady } from '../lib/photos'
import { getEventById } from '../lib/events'
import PhotoUploader from '../components/PhotoUploader'
import PhotoLightbox from '../components/PhotoLightbox'

export default function Photos() {
  useEvents()
  usePhotos()
  const photos = getPhotos()
  const ready = photosReady()

  const [filter, setFilter] = useState('all')
  const [lightbox, setLightbox] = useState(null)

  const counts = useMemo(() => {
    const byDay = {}
    for (const p of photos) {
      const ev = p.event_id ? getEventById(p.event_id) : null
      const key = ev ? ev.day : 'none'
      byDay[key] = (byDay[key] || 0) + 1
    }
    return byDay
  }, [photos])

  const filtered = useMemo(() => {
    if (filter === 'all') return photos
    if (filter === 'none') return photos.filter((p) => !p.event_id)
    return photos.filter((p) => {
      const ev = p.event_id ? getEventById(p.event_id) : null
      return ev && ev.day === filter
    })
  }, [photos, filter])

  const dayChips = DAYS.filter((d) => counts[d.n])

  return (
    <div style={{ paddingBottom: 'calc(var(--nav-height) + var(--safe-bottom) + 1.5rem)' }}>
      <header className="px-4 pt-6" style={{ paddingTop: 'calc(var(--safe-top) + 1.5rem)' }}>
        <div className="flex items-end justify-between gap-3">
          <div>
            <h1 className="font-display text-4xl leading-none text-ink">Fotos</h1>
            <p className="mt-1 text-sm text-ink-soft">
              {photos.length} recuerdo{photos.length !== 1 ? 's' : ''} del viaje
            </p>
          </div>
          <PhotoUploader triggerLabel="Subir" onUploaded={() => setFilter('all')} />
        </div>

        {dayChips.length > 0 && (
          <div className="mt-4 flex gap-2 overflow-x-auto no-scrollbar">
            <Chip active={filter === 'all'} onClick={() => setFilter('all')}>
              Todas ({photos.length})
            </Chip>
            {dayChips.map((d) => (
              <Chip key={d.n} active={filter === d.n} onClick={() => setFilter(d.n)}>
                Día {d.n} ({counts[d.n]})
              </Chip>
            ))}
            {counts.none > 0 && (
              <Chip active={filter === 'none'} onClick={() => setFilter('none')}>
                Sueltas ({counts.none})
              </Chip>
            )}
          </div>
        )}
      </header>

      <div className="px-4 pt-4">
        {!ready ? (
          <div className="grid grid-cols-3 gap-2">
            {Array.from({ length: 9 }).map((_, i) => (
              <div key={i} className="aspect-square skeleton" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="grid grid-cols-3 gap-2">
            {filtered.map((p, i) => (
              <button
                key={p.id}
                onClick={() => setLightbox(i)}
                className="group relative aspect-square overflow-hidden rounded-2xl border border-line bg-muted active:scale-[0.98]"
              >
                <img
                  src={p.url}
                  alt={p.caption || 'Foto del viaje'}
                  loading="lazy"
                  className="h-full w-full object-cover transition group-hover:scale-105"
                />
                {p.caption && (
                  <span className="absolute inset-x-0 bottom-0 truncate bg-gradient-to-t from-ink/70 to-transparent px-2 py-1 text-left text-[11px] font-medium text-white">
                    {p.caption}
                  </span>
                )}
              </button>
            ))}
          </div>
        )}
      </div>

      {lightbox != null && (
        <PhotoLightbox
          photos={filtered}
          index={lightbox}
          onIndex={setLightbox}
          onClose={() => setLightbox(null)}
        />
      )}
    </div>
  )
}

function Chip({ active, onClick, children }) {
  return (
    <button
      onClick={onClick}
      className={`shrink-0 rounded-full px-3.5 py-1.5 text-sm font-semibold transition active:scale-95 ${
        active ? 'bg-primary text-white' : 'bg-muted text-ink-soft'
      }`}
    >
      {children}
    </button>
  )
}

function EmptyState() {
  return (
    <div className="mt-10 flex flex-col items-center rounded-3xl border border-dashed border-line bg-surface px-6 py-14 text-center">
      <div className="grid h-16 w-16 place-items-center rounded-2xl bg-primary/10 text-primary">
        <Camera size={30} />
      </div>
      <h2 className="mt-4 font-display text-3xl text-ink">Todavía no hay fotos</h2>
      <p className="mt-1 max-w-xs text-sm text-ink-soft">
        Subí las primeras fotos del viaje desde tu celular. Podés asociarlas a un evento del itinerario.
      </p>
    </div>
  )
}
