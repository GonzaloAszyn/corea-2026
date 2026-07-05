import { NavLink } from 'react-router-dom'
import { CalendarDays, MapPinned, Images } from 'lucide-react'

const tabs = [
  { to: '/', label: 'Itinerario', Icon: CalendarDays, end: true },
  { to: '/mapa', label: 'Mapa', Icon: MapPinned, end: false },
  { to: '/fotos', label: 'Fotos', Icon: Images, end: false }
]

export default function BottomNav() {
  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-[1000] border-t border-line bg-surface/95 backdrop-blur-lg"
      style={{ paddingBottom: 'var(--safe-bottom)' }}
    >
      <div className="mx-auto flex max-w-lg items-stretch justify-around" style={{ height: 'var(--nav-height)' }}>
        {tabs.map(({ to, label, Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className="group flex flex-1 flex-col items-center justify-center gap-1"
          >
            {({ isActive }) => (
              <>
                <span
                  className={`flex h-8 w-14 items-center justify-center rounded-full transition ${
                    isActive ? 'bg-primary/12 text-primary' : 'text-ink-faint'
                  }`}
                >
                  <Icon size={22} strokeWidth={isActive ? 2.4 : 1.9} />
                </span>
                <span
                  className={`text-[11px] font-semibold transition ${
                    isActive ? 'text-primary' : 'text-ink-faint'
                  }`}
                >
                  {label}
                </span>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  )
}
