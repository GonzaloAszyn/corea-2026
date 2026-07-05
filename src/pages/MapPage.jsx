import { useMemo, useState, useEffect } from 'react'
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet'
import L from 'leaflet'
import { renderToStaticMarkup } from 'react-dom/server'
import { TRIP, DAYS } from '../data/trip'
import { typeInfo, TYPES } from '../lib/types'
import { useEvents, usePhotos, useRatings } from '../lib/hooks'
import { getEvents } from '../lib/events'
import { countByEvent } from '../lib/photos'
import SpotSheet from '../components/SpotSheet'

function makeIcon(event, photoCount) {
  const info = typeInfo(event.type)
  const Icon = info.Icon
  const iconSvg = renderToStaticMarkup(<Icon size={16} color="#fff" strokeWidth={2.2} />)
  const badge = photoCount > 0 ? `<span class="pin-badge">${photoCount}</span>` : ''
  const html = `
    <div class="trip-pin" style="position:relative;width:34px;height:44px;">
      <svg width="34" height="44" viewBox="0 0 34 44" xmlns="http://www.w3.org/2000/svg">
        <path d="M17 0C7.6 0 0 7.6 0 17c0 12.4 17 27 17 27s17-14.6 17-27C34 7.6 26.4 0 17 0z" fill="${info.color}"/>
        <circle cx="17" cy="16.5" r="12.5" fill="${info.color}"/>
      </svg>
      <span style="position:absolute;top:8px;left:9px;width:16px;height:16px;display:grid;place-items:center;">${iconSvg}</span>
      ${badge}
    </div>`
  return L.divIcon({ html, className: '', iconSize: [34, 44], iconAnchor: [17, 44], popupAnchor: [0, -40] })
}

function FitBounds({ points }) {
  const map = useMap()
  useEffect(() => {
    if (!points.length) return
    if (points.length === 1) {
      map.setView(points[0], 15)
      return
    }
    map.fitBounds(points, { padding: [48, 48], maxZoom: 15 })
  }, [points, map])
  return null
}

export default function MapPage() {
  useEvents()
  usePhotos()
  useRatings()
  const events = getEvents()
  const photoCounts = countByEvent()

  const [day, setDay] = useState('all')
  const [selected, setSelected] = useState(null)

  const filtered = useMemo(
    () => events.filter((e) => e.lat != null && e.lng != null && (day === 'all' || e.day === day)),
    [events, day]
  )
  const points = useMemo(() => filtered.map((e) => [e.lat, e.lng]), [filtered])

  const usedTypes = useMemo(() => {
    const set = new Set(filtered.map((e) => e.type))
    return Object.keys(TYPES).filter((t) => set.has(t))
  }, [filtered])

  return (
    <div
      className="relative overflow-hidden"
      style={{ height: 'calc(100dvh - var(--nav-height) - var(--safe-bottom))' }}
    >
      <MapContainer
        center={[TRIP.lat, TRIP.lng]}
        zoom={12}
        zoomControl={false}
        className="h-full w-full"
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; OpenStreetMap &copy; CARTO'
          subdomains="abcd"
          maxZoom={20}
        />
        {filtered.map((event) => (
          <Marker
            key={event.id}
            position={[event.lat, event.lng]}
            icon={makeIcon(event, photoCounts[event.id] || 0)}
            eventHandlers={{ click: () => setSelected(event) }}
          />
        ))}
        <FitBounds points={points} />
      </MapContainer>

      <div className="pointer-events-none absolute inset-x-0 top-0 z-[500] space-y-2 p-3" style={{ paddingTop: 'calc(var(--safe-top) + 0.5rem)' }}>
        <div className="pointer-events-auto flex items-center justify-between rounded-2xl bg-surface/95 px-4 py-2.5 shadow-card backdrop-blur">
          <div>
            <h1 className="font-display text-2xl leading-none text-ink">Mapa & Ratings</h1>
            <p className="text-xs text-ink-soft">{filtered.length} lugares · tocá un pin para calificar</p>
          </div>
        </div>

        <div className="pointer-events-auto flex gap-2 overflow-x-auto no-scrollbar">
          <FilterChip active={day === 'all'} onClick={() => setDay('all')}>
            Todos
          </FilterChip>
          {DAYS.map((d) => (
            <FilterChip key={d.n} active={day === d.n} onClick={() => setDay(d.n)}>
              Día {d.n}
            </FilterChip>
          ))}
        </div>
      </div>

      {usedTypes.length > 0 && (
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[500] p-3">
          <div className="pointer-events-auto flex flex-wrap gap-1.5 rounded-2xl bg-surface/95 px-3 py-2 shadow-card backdrop-blur">
            {usedTypes.map((t) => {
              const info = TYPES[t]
              const Icon = info.Icon
              return (
                <span key={t} className="inline-flex items-center gap-1 text-xs font-semibold text-ink-soft">
                  <span className="grid h-5 w-5 place-items-center rounded-full text-white" style={{ backgroundColor: info.color }}>
                    <Icon size={11} />
                  </span>
                  {info.label}
                </span>
              )
            })}
          </div>
        </div>
      )}

      <SpotSheet spot={selected} onClose={() => setSelected(null)} />
    </div>
  )
}

function FilterChip({ active, onClick, children }) {
  return (
    <button
      onClick={onClick}
      className={`shrink-0 rounded-full px-3.5 py-1.5 text-sm font-semibold shadow-sm transition active:scale-95 ${
        active ? 'bg-primary text-white' : 'bg-surface/95 text-ink-soft backdrop-blur'
      }`}
    >
      {children}
    </button>
  )
}
