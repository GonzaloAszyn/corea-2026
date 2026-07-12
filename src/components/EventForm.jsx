import { useState } from 'react'
import { Check, Star } from 'lucide-react'
import { TYPES, TYPE_KEYS } from '../lib/types'
import { DAYS } from '../data/trip'

function timeToSort(time) {
  const m = /^(\d{1,2}):(\d{2})$/.exec((time || '').trim())
  if (!m) return 0
  return Number(m[1]) * 100 + Number(m[2])
}

const empty = {
  title: '',
  day: 1,
  time: '09:00',
  type: 'cultura',
  place: '',
  duration: '1h',
  tip: '',
  url: '',
  highlight: false,
  lat: '',
  lng: ''
}

export default function EventForm({ event, defaultDay = 1, onSubmit, onCancel }) {
  const [form, setForm] = useState(() =>
    event ? { ...empty, ...event } : { ...empty, day: defaultDay }
  )
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')

  function set(key, value) {
    setForm((f) => ({ ...f, [key]: value }))
  }

  async function submit(e) {
    e.preventDefault()
    if (!form.title.trim()) {
      setError('Poné un título.')
      return
    }
    setError('')
    setBusy(true)
    const payload = {
      day: Number(form.day),
      time: form.time.trim(),
      time_sort: timeToSort(form.time),
      title: form.title.trim(),
      type: form.type,
      place: form.place.trim(),
      duration: form.duration.trim(),
      tip: form.tip.trim(),
      url: form.url.trim(),
      highlight: !!form.highlight,
      lat: form.lat === '' ? null : Number(form.lat),
      lng: form.lng === '' ? null : Number(form.lng)
    }
    try {
      await onSubmit(payload)
    } catch (err) {
      setError('No se pudo guardar: ' + (err.message || err))
      setBusy(false)
    }
  }

  return (
    <form onSubmit={submit} className="space-y-4 pb-2">
      <div>
        <label className="mb-1 block text-sm font-semibold text-ink-soft">Título</label>
        <input
          className="field"
          value={form.title}
          onChange={(e) => set('title', e.target.value)}
          placeholder="Ej: Palacio Gyeongbokgung"
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="mb-1 block text-sm font-semibold text-ink-soft">Día</label>
          <select className="field" value={form.day} onChange={(e) => set('day', e.target.value)}>
            {DAYS.map((d) => (
              <option key={d.n} value={d.n}>
                Día {d.n} · {d.title}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="mb-1 block text-sm font-semibold text-ink-soft">Hora</label>
          <input
            className="field"
            type="time"
            value={form.time}
            onChange={(e) => set('time', e.target.value)}
          />
        </div>
      </div>

      <div>
        <label className="mb-1 block text-sm font-semibold text-ink-soft">Tipo</label>
        <div className="flex flex-wrap gap-2">
          {TYPE_KEYS.map((key) => {
            const info = TYPES[key]
            const Icon = info.Icon
            const active = form.type === key
            return (
              <button
                key={key}
                type="button"
                onClick={() => set('type', key)}
                className={`chip border transition ${
                  active ? 'text-white border-transparent' : 'bg-muted text-ink-soft border-line'
                }`}
                style={active ? { backgroundColor: info.color } : undefined}
              >
                <Icon size={14} /> {info.label}
              </button>
            )
          })}
        </div>
      </div>

      <div>
        <label className="mb-1 block text-sm font-semibold text-ink-soft">Lugar</label>
        <input
          className="field"
          value={form.place}
          onChange={(e) => set('place', e.target.value)}
          placeholder="Nombre del lugar"
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-semibold text-ink-soft">Duración</label>
        <input
          className="field"
          value={form.duration}
          onChange={(e) => set('duration', e.target.value)}
          placeholder="Ej: 2h 30"
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-semibold text-ink-soft">Link / sitio web (opcional)</label>
        <input
          className="field"
          type="url"
          inputMode="url"
          value={form.url ?? ''}
          onChange={(e) => set('url', e.target.value)}
          placeholder="https://…"
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-semibold text-ink-soft">Tip</label>
        <textarea
          className="field min-h-[80px] resize-none"
          value={form.tip}
          onChange={(e) => set('tip', e.target.value)}
          placeholder="Un consejo útil para este lugar…"
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="mb-1 block text-sm font-semibold text-ink-soft">Latitud</label>
          <input
            className="field"
            inputMode="decimal"
            value={form.lat ?? ''}
            onChange={(e) => set('lat', e.target.value)}
            placeholder="37.5796"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-semibold text-ink-soft">Longitud</label>
          <input
            className="field"
            inputMode="decimal"
            value={form.lng ?? ''}
            onChange={(e) => set('lng', e.target.value)}
            placeholder="126.9770"
          />
        </div>
      </div>

      <button
        type="button"
        onClick={() => set('highlight', !form.highlight)}
        className={`flex w-full items-center justify-between rounded-2xl border px-4 py-3 transition ${
          form.highlight ? 'border-amber-300 bg-amber-50' : 'border-line bg-muted/50'
        }`}
      >
        <span className="inline-flex items-center gap-2 font-semibold text-ink">
          <Star size={18} className={form.highlight ? 'fill-amber-400 text-amber-400' : 'text-ink-faint'} />
          Marcar como imperdible
        </span>
        <span
          className={`relative h-6 w-11 rounded-full transition ${form.highlight ? 'bg-amber-400' : 'bg-line'}`}
        >
          <span
            className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all ${
              form.highlight ? 'left-[22px]' : 'left-0.5'
            }`}
          />
        </span>
      </button>

      {error && <p className="text-sm font-semibold text-destructive">{error}</p>}

      <div className="flex gap-3 pt-1">
        <button type="button" onClick={onCancel} className="btn-ghost flex-1">
          Cancelar
        </button>
        <button type="submit" disabled={busy} className="btn-primary flex-1">
          <Check size={18} /> {busy ? 'Guardando…' : 'Guardar'}
        </button>
      </div>
    </form>
  )
}
