import { Star } from 'lucide-react'

export default function StarRating({ value = 0, onChange, size = 22, readOnly = false }) {
  const stars = [1, 2, 3, 4, 5]
  return (
    <div className="inline-flex items-center gap-1">
      {stars.map((n) => {
        const active = n <= Math.round(value)
        const cls = active ? 'fill-amber-400 text-amber-400' : 'fill-none text-line'
        if (readOnly) {
          return <Star key={n} size={size} className={cls} strokeWidth={1.8} aria-hidden="true" />
        }
        return (
          <button
            key={n}
            type="button"
            onClick={() => onChange && onChange(n)}
            aria-label={`${n} estrella${n > 1 ? 's' : ''}`}
            className="p-0.5 transition active:scale-90"
          >
            <Star size={size} className={cls} strokeWidth={1.8} />
          </button>
        )
      })}
    </div>
  )
}
