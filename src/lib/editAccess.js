import { emit } from './store'

const PIN_HASH = '0d4d1c94890441d6fc5a505e2fa36881420fd783b306256cebcdf2dccf3d2b18'
const STORAGE_KEY = 'corea2026.edit.unlocked'

let unlocked = readInitial()

function readInitial() {
  try {
    return sessionStorage.getItem(STORAGE_KEY) === '1'
  } catch {
    return false
  }
}

async function sha256(text) {
  const bytes = new TextEncoder().encode(text)
  const digest = await crypto.subtle.digest('SHA-256', bytes)
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
}

export function isUnlocked() {
  return unlocked
}

export async function unlock(pin) {
  try {
    const hash = await sha256(String(pin).trim())
    if (hash === PIN_HASH) {
      unlocked = true
      try {
        sessionStorage.setItem(STORAGE_KEY, '1')
      } catch {
        /* sessionStorage unavailable */
      }
      emit('access')
      return true
    }
  } catch {
    /* subtle crypto unavailable */
  }
  return false
}

export function lock() {
  unlocked = false
  try {
    sessionStorage.removeItem(STORAGE_KEY)
  } catch {
    /* ignore */
  }
  emit('access')
}
