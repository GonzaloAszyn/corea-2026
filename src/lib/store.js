import { useSyncExternalStore } from 'react'

const subscribers = {}

export function emit(channel) {
  window.dispatchEvent(new Event(`store:${channel}`))
}

function subscribeTo(channel) {
  if (!subscribers[channel]) {
    subscribers[channel] = (cb) => {
      const name = `store:${channel}`
      window.addEventListener(name, cb)
      return () => window.removeEventListener(name, cb)
    }
  }
  return subscribers[channel]
}

export function useStore(channel, getSnapshot) {
  return useSyncExternalStore(subscribeTo(channel), getSnapshot, getSnapshot)
}

export function uid() {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) return crypto.randomUUID()
  return 'id-' + Math.random().toString(36).slice(2) + Date.now().toString(36)
}
