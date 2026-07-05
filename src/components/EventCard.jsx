import { useState } from 'react'
import { ChevronDown, Lightbulb, Clock, MapPin, Camera, Pencil, Trash2, Star } from 'lucide-react'
import { typeInfo } from '../lib/types'
import { gmapsUrl } from '../lib/geo'

export default function EventCard({ event, photoCount = 0, unlocked, onEdit, onDelete }) {
  const [open, setOpen] = useState(false)
  const [confirming, setConfirming] = useState(false)
  const info = typeInfo(event.type)
  const Icon = info.Icon

  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-surface shadow-sm">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center gap-3 px-3 py-3 text-left active:bg-muted/60"
      >
        <span className="w-12 shrink-0 text-center">
          <span className="block tabular-nums text-sm font-bold text-ink">{event.time}</span>
        </span>
        <span
          className="grid h-9 w-9 shrink-0 place-items-center rounded-xl text-white"
          style={{ backgroundColor: info.color }}
        >
          <Icon size={18} />
        </span>
        <span className="min-w-0 flex-1">
          <span className="flex items-center gap-1.5">
            <span className="truncate font-semibold text-ink">{event.title}</span>
            {event.highlight && <Star size={14} className="shrink-0 fill-amber-400 text-amber-400" />}
          </span>
          <span className="truncate block text-xs text-ink-soft">{event.place}</span>
        </span>
        {photoCount > 0 && (
          <span className="inline-flex items-center gap-0.5 rounded-full bg-secondary/10 px-2 py-0.5 text-xs font-semibold text-secondary">
            <Camera size={12} /> {photoCount}
          </span>
        )}
        <ChevronDown
          size={20}
          className={`shrink-0 text-ink-faint transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
        />
      </button>

      <div className={`grid transition-all duration-300 ${open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
        <div className="overflow-hidden">
          <div className="border-t border-line px-3 py-3 space-y-3">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-sm text-ink-soft">
              <span className="inline-flex items-center gap-1.5">
                <Clock size={15} className="text-ink-faint" /> {event.duration}
              </span>
              <a
                href={gmapsUrl(event)}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 font-semibold text-secondary active:opacity-70"
              >
                <MapPin size={15} /> {event.place}
              </a>
            </div>

            {event.tip && (
              <div className="flex gap-2 rounded-xl bg-accent/10 px-3 py-2.5">
                <Lightbulb size={17} className="mt-0.5 shrink-0 text-accent" />
                <p className="text-sm text-ink">{event.tip}</p>
              </div>
            )}

            {unlocked && (
              <div className="flex items-center gap-2 pt-1">
                {!confirming ? (
                  <>
                    <button onClick={() => onEdit(event)} className="btn-ghost flex-1 py-2 text-sm">
                      <Pencil size={15} /> Editar
                    </button>
                    <button
                      onClick={() => setConfirming(true)}
                      className="btn-ghost flex-1 py-2 text-sm text-destructive"
                    >
                      <Trash2 size={15} /> Borrar
                    </button>
                  </>
                ) : (
                  <>
                    <span className="flex-1 text-sm font-semibold text-ink">¿Borrar este evento?</span>
                    <button onClick={() => setConfirming(false)} className="btn-ghost py-2 text-sm">
                      Cancelar
                    </button>
                    <button
                      onClick={() => onDelete(event)}
                      className="rounded-full bg-destructive px-4 py-2 text-sm font-semibold text-white active:scale-95"
                    >
                      Sí, borrar
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
