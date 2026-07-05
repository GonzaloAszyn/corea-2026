import { TRIP, DAYS } from '../data/trip'

export function parseYmd(str) {
  const [y, m, d] = str.split('-').map(Number)
  return new Date(y, m - 1, d)
}

export function dayDate(n) {
  const start = parseYmd(TRIP.start)
  const d = new Date(start)
  d.setDate(start.getDate() + (n - 1))
  return d
}

export function ymd(date) {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

const weekdayFmt = new Intl.DateTimeFormat('es-ES', { weekday: 'long' })
const shortFmt = new Intl.DateTimeFormat('es-ES', { weekday: 'short', day: 'numeric', month: 'short' })
const longFmt = new Intl.DateTimeFormat('es-ES', { weekday: 'long', day: 'numeric', month: 'long' })

export function weekday(date) {
  return weekdayFmt.format(date)
}

export function shortDate(date) {
  return shortFmt.format(date).replace('.', '')
}

export function longDate(date) {
  return longFmt.format(date)
}

export function tripRangeLabel() {
  const s = parseYmd(TRIP.start)
  const e = parseYmd(TRIP.end)
  const month = new Intl.DateTimeFormat('es-ES', { month: 'long' }).format(e)
  return `${s.getDate()}–${e.getDate()} ${month} ${e.getFullYear()}`
}

export function countdown(now = new Date()) {
  const start = parseYmd(TRIP.start)
  const end = parseYmd(TRIP.end)
  end.setHours(23, 59, 59, 999)

  if (now < start) {
    const diff = start - now
    const days = Math.floor(diff / 86400000)
    const hours = Math.floor((diff % 86400000) / 3600000)
    const minutes = Math.floor((diff % 3600000) / 60000)
    const seconds = Math.floor((diff % 60000) / 1000)
    return { phase: 'before', days, hours, minutes, seconds }
  }
  if (now <= end) {
    const dayIndex = Math.floor((now - start) / 86400000) + 1
    return { phase: 'during', dayIndex, total: DAYS.length }
  }
  return { phase: 'after' }
}
