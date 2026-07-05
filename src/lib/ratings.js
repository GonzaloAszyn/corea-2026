import { supabase } from './supabaseClient'
import { emit, uid } from './store'

let cache = []
let ready = false
let fallback = false

export function getRatings() {
  return cache
}

export function getRatingsForSpot(spotId) {
  return cache.filter((r) => r.spot_id === spotId)
}

export function getAverage(spotId) {
  const list = getRatingsForSpot(spotId)
  if (list.length === 0) return null
  const sum = list.reduce((acc, r) => acc + (r.rating || 0), 0)
  return sum / list.length
}

export function isReady() {
  return ready
}

export function isFallback() {
  return fallback
}

export async function loadRatings() {
  if (!supabase) {
    fallback = true
    ready = true
    emit('ratings')
    return
  }
  try {
    const { data, error } = await supabase.from('spot_ratings').select('*')
    if (error) throw error
    cache = data || []
    fallback = false
  } catch (err) {
    console.warn('[ratings] sin conexión:', err.message || err)
    cache = []
    fallback = true
  }
  ready = true
  emit('ratings')
}

export async function saveRating({ spot_id, spot_name, rating, comment, author }) {
  const row = { spot_id, spot_name, rating, comment: comment || '', author: author.trim() }

  if (!supabase || fallback) {
    const existing = cache.find((r) => r.spot_id === spot_id && r.author === row.author)
    if (existing) {
      cache = cache.map((r) => (r === existing ? { ...r, ...row } : r))
    } else {
      cache = [...cache, { ...row, id: uid() }]
    }
    emit('ratings')
    return
  }

  const { data, error } = await supabase
    .from('spot_ratings')
    .upsert(row, { onConflict: 'spot_id,author' })
    .select()
    .single()
  if (error) throw error

  const idx = cache.findIndex((r) => r.spot_id === spot_id && r.author === row.author)
  if (idx >= 0) cache = cache.map((r, i) => (i === idx ? data : r))
  else cache = [...cache, data]
  emit('ratings')
}

export async function removeRatingsForSpot(spotId) {
  if (supabase && !fallback) {
    await supabase.from('spot_ratings').delete().eq('spot_id', spotId)
  }
  cache = cache.filter((r) => r.spot_id !== spotId)
  emit('ratings')
}
