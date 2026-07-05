import { Sun, Cloud, CloudSun, CloudFog, CloudDrizzle, CloudRain, CloudSnow, CloudLightning, Droplets, HelpCircle } from 'lucide-react'
import { DAYS } from '../data/trip'
import { dayDate, weekday } from '../lib/dates'
import { describeCode } from '../lib/weather'
import { useWeather } from '../lib/hooks'
import { isReady as weatherReady } from '../lib/weather'

const ICONS = {
  sun: Sun,
  'cloud-sun': CloudSun,
  cloud: Cloud,
  fog: CloudFog,
  drizzle: CloudDrizzle,
  rain: CloudRain,
  snow: CloudSnow,
  storm: CloudLightning,
  na: HelpCircle
}

export default function WeatherStrip() {
  const weather = useWeather()
  const ready = weatherReady()

  return (
    <section className="px-4">
      <div className="flex items-center justify-between px-1">
        <h2 className="font-display text-2xl text-ink">Clima del viaje</h2>
        <span className="text-xs text-ink-faint">Seúl · °C</span>
      </div>
      <div className="mt-2 flex gap-2.5 overflow-x-auto no-scrollbar pb-1 -mx-1 px-1">
        {DAYS.map((d, i) => {
          const w = weather[i]
          const date = dayDate(d.n)
          const desc = describeCode(w?.code)
          const Icon = ICONS[desc.icon] || HelpCircle
          const forecast = w?.source === 'forecast'
          return (
            <div
              key={d.n}
              className="flex min-w-[74px] flex-col items-center rounded-2xl border border-line bg-surface px-2.5 py-3 shadow-sm"
            >
              <span className="text-[11px] font-semibold uppercase text-ink-soft">
                {weekday(date).slice(0, 3)}
              </span>
              <span className="text-xs text-ink-faint">{date.getDate()} sep</span>
              {ready && w ? (
                <>
                  <Icon size={26} className="my-1.5 text-secondary" strokeWidth={1.8} />
                  <span className="tabular-nums text-sm font-bold text-ink">
                    {w.tmax != null ? `${Math.round(w.tmax)}°` : '—'}
                  </span>
                  <span className="tabular-nums text-xs text-ink-faint">
                    {w.tmin != null ? `${Math.round(w.tmin)}°` : ''}
                  </span>
                  {w.precip != null && (
                    <span className="mt-1 inline-flex items-center gap-0.5 text-[10px] font-semibold text-secondary">
                      <Droplets size={11} /> {w.precip}%
                    </span>
                  )}
                  <span
                    className={`mt-1 rounded-full px-1.5 py-0.5 text-[9px] font-bold ${
                      forecast ? 'bg-secondary/10 text-secondary' : 'bg-accent/10 text-accent'
                    }`}
                  >
                    {forecast ? 'pronóstico' : 'promedio'}
                  </span>
                </>
              ) : (
                <div className="my-2 h-16 w-10 skeleton" />
              )}
            </div>
          )
        })}
      </div>
    </section>
  )
}
