import { Lock, LockOpen } from 'lucide-react'

export default function LockButton({ unlocked, onClick }) {
  return (
    <button
      onClick={onClick}
      aria-label={unlocked ? 'Bloquear edición' : 'Desbloquear edición'}
      className={`fixed right-4 z-[900] grid h-14 w-14 place-items-center rounded-full shadow-float transition active:scale-90 ${
        unlocked ? 'bg-secondary text-white' : 'bg-surface text-primary border border-line'
      }`}
      style={{ bottom: 'calc(var(--nav-height) + var(--safe-bottom) + 1rem)' }}
    >
      {unlocked ? <LockOpen size={24} /> : <Lock size={24} />}
    </button>
  )
}
