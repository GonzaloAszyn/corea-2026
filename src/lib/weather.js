import { TRIP, DAYS } from '../data/trip'
import { dayDate, ymd } from './dates'
import { emit } from './store'

let cache = []
let ready = false

export function getWeather() {
  return cache
}

export function isReady() {
  return ready
}

export function describeCode(code) {
  if (code == null) return { label: 'Sin datos', icon: 'na' }
  if (code === 0) return { label: 'Despejado', icon: 'sun' }
  if (code <= 2) return { label: 'Parcial', icon: 'cloud-sun' }
  if (code === 3) return { label: 'Nublado', icon: 'cloud' }
  if (code <= 48) return { label: 'Niebla', icon: 'fog' }
  if (code <= 57) return { label: 'Llovizna', icon: 'drizzle' }
  if (code <= 67) return { label: 'Lluvia', icon: 'rain' }
  if (code <= 77) return { label: 'Nieve', icon: 'snow' }
  if (code <= 82) return { label: 'Chaparrones', icon: 'rain' }
  if (code <= 86) return { label: 'Nieve', icon: 'snow' }
  return { label: 'Tormenta', icon: 'storm' }
}

function startOfToday() {
  const t = new Date()
  t.setHours(0, 0, 0, 0)
  return t
}

async function fetchForecast() {
  const url =
    `https://api.open-meteo.com/v1/forecast?latitude=${TRIP.lat}&longitude=${TRIP.lng}` +
    `&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max` +
    `&timezone=${encodeURIComponent(TRIP.timezone)}&forecast_days=16`
  const res = await fetch(url)
  if (!res.ok) throw new Error('forecast ' + res.status)
  const json = await res.json()
  const map = {}
  const t = json.daily.time
  for (let i = 0; i < t.length; i++) {
    map[t[i]] = {
      code: json.daily.weather_code[i],
      tmax: json.daily.temperature_2m_max[i],
      tmin: json.daily.temperature_2m_min[i],
      precip: json.daily.precipitation_probability_max[i]
    }
  }
  return map
}

async function fetchClimatology() {
  const years = [2024, 2023, 2022]
  const start = TRIP.start.slice(5)
  const end = TRIP.end.slice(5)
  const requests = years.map(async (y) => {
    const url =
      `https://archive-api.open-meteo.com/v1/archive?latitude=${TRIP.lat}&longitude=${TRIP.lng}` +
      `&start_date=${y}-${start}&end_date=${y}-${end}` +
      `&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum` +
      `&timezone=${encodeURIComponent(TRIP.timezone)}`
    const res = await fetch(url)
    if (!res.ok) throw new Error('archive ' + res.status)
    return res.json()
  })
  const results = await Promise.all(requests)

  return DAYS.map((_, idx) => {
    let tmaxSum = 0
    let tminSum = 0
    let rainDays = 0
    let count = 0
    for (const json of results) {
      const tmax = json?.daily?.temperature_2m_max?.[idx]
      const tmin = json?.daily?.temperature_2m_min?.[idx]
      const rain = json?.daily?.precipitation_sum?.[idx]
      if (tmax == null || tmin == null) continue
      tmaxSum += tmax
      tminSum += tmin
      if (rain != null && rain > 1) rainDays += 1
      count += 1
    }
    if (count === 0) return { tmax: null, tmin: null, code: null, precip: null }
    const rainShare = rainDays / count
    let code = 1
    if (rainShare >= 0.5) code = 63
    else if (rainShare >= 0.25) code = 61
    else if (rainShare > 0) code = 2
    return {
      tmax: Math.round(tmaxSum / count),
      tmin: Math.round(tminSum / count),
      code,
      precip: Math.round(rainShare * 100)
    }
  })
}

export async function loadWeather() {
  const today = startOfToday()
  const horizon = new Date(today)
  horizon.setDate(today.getDate() + 16)

  const dayInfos = DAYS.map((d) => {
    const date = dayDate(d.n)
    const inForecast = date >= today && date <= horizon
    return { n: d.n, date, key: ymd(date), inForecast }
  })

  const needForecast = dayInfos.some((d) => d.inForecast)
  const needClimo = dayInfos.some((d) => !d.inForecast)

  let forecast = null
  let climo = null
  try {
    ;[forecast, climo] = await Promise.all([
      needForecast ? fetchForecast() : Promise.resolve(null),
      needClimo ? fetchClimatology() : Promise.resolve(null)
    ])
  } catch (err) {
    console.warn('[weather] no disponible:', err.message || err)
  }

  cache = dayInfos.map((d, idx) => {
    if (d.inForecast && forecast && forecast[d.key]) {
      return { n: d.n, source: 'forecast', ...forecast[d.key] }
    }
    if (climo && climo[idx]) {
      return { n: d.n, source: 'promedio', ...climo[idx] }
    }
    return { n: d.n, source: 'na', tmax: null, tmin: null, code: null, precip: null }
  })
  ready = true
  emit('weather')
  return cache
}
