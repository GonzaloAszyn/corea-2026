import { MapPin, Star } from 'lucide-react'
import SmartImage from './SmartImage'
import { typeInfo } from '../lib/types'
import { gmapsUrl } from '../lib/geo'

export default function HighlightCard({ item }) {
  const info = typeInfo(item.type)
  const Icon = info.Icon
  return (
    <div className="w-52 shrink-0 overflow-hidden rounded-3xl bg-surface shadow-card border border-line">
      <SmartImage src={item.image} alt={item.name} className="h-28 w-full" Icon={Icon}>
        <div className="absolute left-2 top-2">
          <span
            className="chip text-white shadow-sm"
            style={{ backgroundColor: info.color }}
          >
            <Icon size={13} /> {info.label}
          </span>
        </div>
        <div className="absolute right-2 top-2 grid h-7 w-7 place-items-center rounded-full bg-white/90 text-korea shadow-sm">
          <Star size={15} className="fill-korea" />
        </div>
      </SmartImage>
      <div className="p-3">
        <h3 className="font-semibold text-ink leading-tight">{item.name}</h3>
        <p className="mt-1 text-xs text-ink-soft line-clamp-2 min-h-[2rem]">{item.blurb}</p>
        <a
          href={gmapsUrl(item)}
          target="_blank"
          rel="noreferrer"
          className="mt-2.5 inline-flex items-center gap-1 text-sm font-semibold text-secondary active:opacity-70"
        >
          <MapPin size={15} /> Ver en Maps
        </a>
      </div>
    </div>
  )
}
