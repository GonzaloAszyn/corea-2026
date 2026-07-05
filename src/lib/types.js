import {
  Utensils,
  Landmark,
  ShoppingBag,
  Trees,
  Mountain,
  Coffee,
  Sparkles,
  Plane,
  BedDouble,
  MapPin
} from 'lucide-react'

export const TYPES = {
  comida: { label: 'Comida', color: '#EA580C', Icon: Utensils },
  cultura: { label: 'Cultura', color: '#7C3AED', Icon: Landmark },
  compras: { label: 'Compras', color: '#DB2777', Icon: ShoppingBag },
  naturaleza: { label: 'Naturaleza', color: '#059669', Icon: Trees },
  vista: { label: 'Vista', color: '#0891B2', Icon: Mountain },
  cafe: { label: 'Café', color: '#B45309', Icon: Coffee },
  ocio: { label: 'Ocio', color: '#2563EB', Icon: Sparkles },
  transporte: { label: 'Transporte', color: '#475569', Icon: Plane },
  alojamiento: { label: 'Alojamiento', color: '#6B7280', Icon: BedDouble }
}

export const TYPE_KEYS = Object.keys(TYPES)

export function typeInfo(type) {
  return TYPES[type] || { label: 'Lugar', color: '#EA580C', Icon: MapPin }
}
