import { useEffect, useState } from 'react'
import { Plane, PartyPopper } from 'lucide-react'
import { countdown } from '../lib/dates'

function Unit({ value, label }) {
  return (
    <div className="flex flex-col items-center">
      <span className="tabular-nums text-2xl font-bold leading-none text-white">
        {String(value).padStart(2, '0')}
      </span>
      <span className="mt-1 text-[10px] font-semibold uppercase tracking-wider text-white/70">{label}</span>
    </div>
  )
}

export default function Countdown() {
  const [state, setState] = useState(() => countdown())

  useEffect(() => {
    const id = setInterval(() => setState(countdown()), 1000)
    return () => clearInterval(id)
  }, [])

  if (state.phase === 'during') {
    return (
      <div className="inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 backdrop-blur-md">
        <Plane size={18} className="text-white" />
        <span className="font-semibold text-white">
          ¡Estás en Seúl! · Día {state.dayIndex} de {state.total}
        </span>
      </div>
    )
  }

  if (state.phase === 'after') {
    return (
      <div className="inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 backdrop-blur-md">
        <PartyPopper size={18} className="text-white" />
        <span className="font-semibold text-white">¡Viaje completado!</span>
      </div>
    )
  }

  return (
    <div className="inline-flex items-center gap-3 rounded-2xl bg-white/15 px-4 py-2.5 backdrop-blur-md ring-1 ring-white/25">
      <span className="text-xs font-semibold text-white/80">Faltan</span>
      <Unit value={state.days} label="días" />
      <span className="text-white/40">:</span>
      <Unit value={state.hours} label="hs" />
      <span className="text-white/40">:</span>
      <Unit value={state.minutes} label="min" />
      <span className="text-white/40">:</span>
      <Unit value={state.seconds} label="seg" />
    </div>
  )
}
