import { MapPin, Camera } from 'lucide-react'
import Sheet from './Sheet'
import RatingBlock from './RatingBlock'
import PhotoUploader from './PhotoUploader'
import { typeInfo } from '../lib/types'
import { gmapsUrl } from '../lib/geo'
import { usePhotos } from '../lib/hooks'
import { getPhotosForEvent } from '../lib/photos'

export default function SpotSheet({ spot, onClose }) {
  usePhotos()
  const photos = spot ? getPhotosForEvent(spot.id) : []
  if (!spot) return null
  const info = typeInfo(spot.type)
  const Icon = info.Icon

  return (
    <Sheet open={!!spot} onClose={onClose} title={spot.title}>
      <div className="space-y-4 pb-2">
        <div className="flex flex-wrap items-center gap-2">
          <span className="chip text-white" style={{ backgroundColor: info.color }}>
            <Icon size={14} /> {info.label}
          </span>
          <span className="chip bg-muted text-ink-soft">Día {spot.day}</span>
          {spot.time && <span className="chip bg-muted text-ink-soft">{spot.time}</span>}
        </div>

        <a href={gmapsUrl(spot)} target="_blank" rel="noreferrer" className="btn-ghost w-full text-secondary">
          <MapPin size={17} /> {spot.place} · Abrir en Google Maps
        </a>

        <div>
          <div className="mb-2 flex items-center justify-between">
            <h3 className="inline-flex items-center gap-1.5 font-display text-2xl text-ink">
              <Camera size={18} className="text-secondary" /> Fotos ({photos.length})
            </h3>
            <PhotoUploader
              presetEvent={spot}
              compact
              triggerLabel="Agregar"
              triggerClassName="btn-ghost py-2 text-sm text-primary"
            />
          </div>
          {photos.length > 0 ? (
            <div className="flex gap-2 overflow-x-auto no-scrollbar">
              {photos.map((p) => (
                <a
                  key={p.id}
                  href={p.url}
                  target="_blank"
                  rel="noreferrer"
                  className="h-24 w-24 shrink-0 overflow-hidden rounded-2xl border border-line"
                >
                  <img src={p.url} alt={p.caption || spot.title} className="h-full w-full object-cover" />
                </a>
              ))}
            </div>
          ) : (
            <p className="text-sm text-ink-soft">Sin fotos todavía.</p>
          )}
        </div>

        <div>
          <h3 className="mb-2 font-display text-2xl text-ink">Calificaciones</h3>
          <RatingBlock spot={spot} />
        </div>
      </div>
    </Sheet>
  )
}
