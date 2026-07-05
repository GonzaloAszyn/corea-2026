import { supabase, PHOTO_BUCKET } from './supabaseClient'
import { emit, uid } from './store'
import { resizeImage } from './image'

let cache = []
let ready = false
let fallback = false

export function getPhotos() {
  return cache
}

export function getPhotosForEvent(eventId) {
  return cache.filter((p) => p.event_id === eventId)
}

export function countByEvent() {
  const map = {}
  for (const p of cache) {
    if (p.event_id) map[p.event_id] = (map[p.event_id] || 0) + 1
  }
  return map
}

export function isReady() {
  return ready
}

export function isFallback() {
  return fallback
}

function publicUrl(path) {
  if (!supabase) return path
  const { data } = supabase.storage.from(PHOTO_BUCKET).getPublicUrl(path)
  return data.publicUrl
}

function withUrl(row) {
  return { ...row, url: publicUrl(row.path) }
}

export async function loadPhotos() {
  if (!supabase) {
    fallback = true
    ready = true
    emit('photos')
    return
  }
  try {
    const { data, error } = await supabase
      .from('photos')
      .select('*')
      .order('created_at', { ascending: false })
    if (error) throw error
    cache = (data || []).map(withUrl)
    fallback = false
  } catch (err) {
    console.warn('[photos] sin conexión:', err.message || err)
    cache = []
    fallback = true
  }
  ready = true
  emit('photos')
}

export async function uploadPhoto(file, meta = {}) {
  if (!supabase || fallback) {
    const url = URL.createObjectURL(file)
    const row = {
      id: uid(),
      event_id: meta.event_id || null,
      lat: meta.lat ?? null,
      lng: meta.lng ?? null,
      caption: meta.caption || '',
      path: url,
      url,
      local: true
    }
    cache = [row, ...cache]
    emit('photos')
    return row
  }

  const blob = await resizeImage(file)
  const path = `${uid()}.jpg`
  const up = await supabase.storage.from(PHOTO_BUCKET).upload(path, blob, {
    contentType: 'image/jpeg',
    upsert: false
  })
  if (up.error) throw up.error

  const insert = {
    event_id: meta.event_id || null,
    lat: meta.lat ?? null,
    lng: meta.lng ?? null,
    caption: meta.caption || '',
    path
  }
  const { data, error } = await supabase.from('photos').insert(insert).select().single()
  if (error) throw error

  const row = withUrl(data)
  cache = [row, ...cache]
  emit('photos')
  return row
}

export async function deletePhoto(id) {
  const photo = cache.find((p) => p.id === id)
  if (supabase && !fallback && photo && !photo.local) {
    await supabase.storage.from(PHOTO_BUCKET).remove([photo.path])
    await supabase.from('photos').delete().eq('id', id)
  }
  cache = cache.filter((p) => p.id !== id)
  emit('photos')
}

export async function removePhotosForEvent(eventId) {
  const toRemove = cache.filter((p) => p.event_id === eventId)
  if (supabase && !fallback && toRemove.length) {
    const paths = toRemove.filter((p) => !p.local).map((p) => p.path)
    if (paths.length) await supabase.storage.from(PHOTO_BUCKET).remove(paths)
    await supabase.from('photos').delete().eq('event_id', eventId)
  }
  cache = cache.filter((p) => p.event_id !== eventId)
  emit('photos')
}
