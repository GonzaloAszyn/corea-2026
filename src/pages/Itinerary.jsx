import { useState, useRef } from 'react'
import { Plus, Sparkles, WifiOff, Pencil, Check, X } from 'lucide-react'
import { TRIP, COVER_IMAGE, HIGHLIGHTS } from '../data/trip'
import { tripRangeLabel, dayDate, shortDate, countdown } from '../lib/dates'
import { useEvents, usePhotos, useUnlocked, useDays } from '../lib/hooks'
import { getEvents, addEvent, updateEvent, deleteEvent, isFallback } from '../lib/events'
import { setDayTitle } from '../lib/dayTitles'
import { countByEvent } from '../lib/photos'
import { lock } from '../lib/editAccess'

import SmartImage from '../components/SmartImage'
import Countdown from '../components/Countdown'
import WeatherStrip from '../components/WeatherStrip'
import HighlightCard from '../components/HighlightCard'
import EventCard from '../components/EventCard'
import EventForm from '../components/EventForm'
import Sheet from '../components/Sheet'
import LockButton from '../components/LockButton'
import PinModal from '../components/PinModal'

export default function Itinerary() {
  useEvents()
  usePhotos()
  const unlocked = useUnlocked()
  const days = useDays()
  const events = getEvents()
  const photoCounts = countByEvent()
  const fallback = isFallback()
  const cd = countdown()
  const todayIndex = cd.phase === 'during' ? cd.dayIndex : null

  const [pinOpen, setPinOpen] = useState(false)
  const [formOpen, setFormOpen] = useState(false)
  const [editing, setEditing] = useState(null)
  const [formDay, setFormDay] = useState(1)
  const [editingDay, setEditingDay] = useState(null)
  const [dayTitleDraft, setDayTitleDraft] = useState('')
  const pendingRef = useRef(null)

  function startEditDay(day) {
    setEditingDay(day.n)
    setDayTitleDraft(day.title)
  }

  function commitDayTitle() {
    if (editingDay != null) setDayTitle(editingDay, dayTitleDraft)
    setEditingDay(null)
  }

  function openForm(day, event = null) {
    setFormDay(day)
    setEditing(event)
    setFormOpen(true)
  }

  function guardedAdd(day) {
    if (unlocked) return openForm(day)
    pendingRef.current = () => openForm(day)
    setPinOpen(true)
  }

  function onUnlocked() {
    const fn = pendingRef.current
    pendingRef.current = null
    if (fn) fn()
  }

  function toggleLock() {
    if (unlocked) lock()
    else setPinOpen(true)
  }

  async function submitForm(payload) {
    if (editing) await updateEvent(editing.id, payload)
    else await addEvent(payload)
    setFormOpen(false)
    setEditing(null)
  }

  return (
    <div style={{ paddingBottom: 'calc(var(--nav-height) + var(--safe-bottom) + 1.5rem)' }}>
      <header className="relative">
        <SmartImage src={COVER_IMAGE} alt="Seúl" className="h-72 w-full" gradient="from-primary via-blush to-secondary">
          <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-5" style={{ paddingTop: 'var(--safe-top)' }}>
            <p className="font-semibold uppercase tracking-widest text-white/80 text-xs">{TRIP.country}</p>
            <h1 className="font-display text-6xl leading-none text-white drop-shadow-sm">{TRIP.name}</h1>
            <p className="mt-1 font-medium text-white/90">
              {TRIP.city} · {tripRangeLabel()}
            </p>
            <p className="text-sm text-white/80">{TRIP.travelers}</p>
            <div className="mt-3">
              <Countdown />
            </div>
          </div>
        </SmartImage>
      </header>

      {fallback && (
        <div className="mx-4 mt-4 flex items-center gap-2 rounded-2xl bg-accent/10 px-4 py-2.5 text-sm text-accent">
          <WifiOff size={16} />
          <span>Modo local: conectá Supabase para guardar cambios (ver README).</span>
        </div>
      )}

      <div className="mt-5">
        <WeatherStrip />
      </div>

      <section className="mt-6">
        <div className="flex items-center gap-2 px-4">
          <span className="grid h-8 w-8 place-items-center rounded-xl bg-blush/40 text-korea">
            <Sparkles size={18} />
          </span>
          <h2 className="font-display text-2xl text-ink">Imperdibles</h2>
        </div>
        <div className="mt-3 flex gap-3 overflow-x-auto no-scrollbar px-4 pb-2 pt-1">
          {HIGHLIGHTS.map((h) => (
            <HighlightCard key={h.name} item={h} />
          ))}
        </div>
      </section>

      <section className="mt-6 space-y-6 px-4">
        {days.map((day) => {
          const dayEvents = events.filter((e) => e.day === day.n)
          const isToday = todayIndex === day.n
          const isEditingTitle = editingDay === day.n
          return (
            <div key={day.n}>
              <div className="mb-2.5 flex items-center gap-3 px-1">
                <div
                  className={`grid h-11 w-11 shrink-0 place-items-center rounded-2xl font-display text-2xl ${
                    isToday ? 'bg-primary text-white shadow-soft' : 'bg-primary/10 text-primary'
                  }`}
                >
                  {day.n}
                </div>
                <div className="min-w-0 flex-1">
                  {isEditingTitle ? (
                    <div className="flex items-center gap-2">
                      <input
                        autoFocus
                        value={dayTitleDraft}
                        onChange={(e) => setDayTitleDraft(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') commitDayTitle()
                          if (e.key === 'Escape') setEditingDay(null)
                        }}
                        className="min-w-0 flex-1 rounded-lg border border-line bg-surface px-2 py-1 text-sm font-semibold text-ink outline-none focus:border-primary"
                        placeholder="Título del día"
                      />
                      <button
                        type="button"
                        onClick={commitDayTitle}
                        className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-primary text-white"
                        aria-label="Guardar título"
                      >
                        <Check size={15} />
                      </button>
                      <button
                        type="button"
                        onClick={() => setEditingDay(null)}
                        className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-muted text-ink-soft"
                        aria-label="Cancelar"
                      >
                        <X size={15} />
                      </button>
                    </div>
                  ) : (
                    <>
                      <div className="flex items-center gap-2">
                        <h3 className="truncate font-semibold text-ink">{day.title}</h3>
                        {isToday && (
                          <span className="rounded-full bg-primary px-2 py-0.5 text-[10px] font-bold text-white">
                            HOY
                          </span>
                        )}
                        {unlocked && (
                          <button
                            type="button"
                            onClick={() => startEditDay(day)}
                            className="shrink-0 text-ink-faint transition active:text-primary"
                            aria-label="Editar título del día"
                          >
                            <Pencil size={14} />
                          </button>
                        )}
                      </div>
                      <p className="text-xs capitalize text-ink-soft">{shortDate(dayDate(day.n))}</p>
                    </>
                  )}
                </div>
              </div>

              <div className="space-y-2.5">
                {dayEvents.map((event) => (
                  <EventCard
                    key={event.id}
                    event={event}
                    photoCount={photoCounts[event.id] || 0}
                    unlocked={unlocked}
                    onEdit={(ev) => openForm(ev.day, ev)}
                    onDelete={(ev) => deleteEvent(ev.id)}
                  />
                ))}

                <button
                  onClick={() => guardedAdd(day.n)}
                  className="flex w-full items-center justify-center gap-1.5 rounded-2xl border border-dashed border-line py-2.5 text-sm font-semibold text-ink-soft transition active:bg-muted"
                >
                  <Plus size={16} /> Agregar evento
                </button>
              </div>
            </div>
          )
        })}
      </section>

      <LockButton unlocked={unlocked} onClick={toggleLock} />
      <PinModal open={pinOpen} onClose={() => setPinOpen(false)} onUnlocked={onUnlocked} />

      <Sheet
        open={formOpen}
        onClose={() => {
          setFormOpen(false)
          setEditing(null)
        }}
        title={editing ? 'Editar evento' : 'Nuevo evento'}
      >
        <EventForm
          event={editing}
          defaultDay={formDay}
          onSubmit={submitForm}
          onCancel={() => {
            setFormOpen(false)
            setEditing(null)
          }}
        />
      </Sheet>
    </div>
  )
}
