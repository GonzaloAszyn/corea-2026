import { supabase } from './supabaseClient'
import { SEED_EVENTS } from '../data/trip'
import { emit, uid } from './store'
import { removePhotosForEvent } from './photos'
import { removeRatingsForSpot } from './ratings'

let cache = []
let ready = false
let fallback = false

const COLUMNS = ['day', 'time_sort', 'time', 'title', 'type', 'place', 'duration', 'tip', 'highlight', 'lat', 'lng', 'url']

function isMissingUrlColumn(err) {
  const msg = `${err?.message || ''} ${err?.details || ''} ${err?.hint || ''}`
  return /url/i.test(msg) && /(column|schema cache)/i.test(msg)
}

function withoutUrl(row) {
  const { url, ...rest } = row
  return rest
}

function byOrder(a, b) {
  if (a.day !== b.day) return a.day - b.day
  return (a.time_sort || 0) - (b.time_sort || 0)
}

function pick(evt) {
  const out = {}
  for (const key of COLUMNS) out[key] = evt[key]
  return out
}

function seedLocal() {
  return SEED_EVENTS.map((e) => ({ ...e })).sort(byOrder)
}

export function getEvents() {
  return cache
}

export function getEventById(id) {
  return cache.find((e) => e.id === id) || null
}

export function isReady() {
  return ready
}

export function isFallback() {
  return fallback
}

export async function loadEvents() {
  if (!supabase) {
    cache = seedLocal()
    fallback = true
    ready = true
    emit('events')
    return cache
  }
  try {
    let { data, error } = await supabase.from('events').select('*')
    if (error) throw error

    if (!data || data.length === 0) {
      const seed = SEED_EVENTS.map(pick)
      const { error: seedError } = await supabase.from('events').insert(seed)
      if (seedError) throw seedError
      const res = await supabase.from('events').select('*')
      if (res.error) throw res.error
      data = res.data
    }

    cache = (data || []).slice().sort(byOrder)
    fallback = false
  } catch (err) {
    console.warn('[events] usando datos locales:', err.message || err)
    cache = seedLocal()
    fallback = true
  }
  ready = true
  emit('events')
  return cache
}

export async function addEvent(evt) {
  if (!supabase) {
    const local = { ...evt, id: uid() }
    cache = [...cache, local].sort(byOrder)
    emit('events')
    return local
  }
  let { data, error } = await supabase.from('events').insert(pick(evt)).select().single()
  if (error && isMissingUrlColumn(error)) {
    ;({ data, error } = await supabase.from('events').insert(withoutUrl(pick(evt))).select().single())
  }
  if (error) throw error
  cache = [...cache, data].sort(byOrder)
  emit('events')
  return data
}

export async function updateEvent(id, patch) {
  if (!supabase || fallback) {
    cache = cache.map((e) => (e.id === id ? { ...e, ...patch } : e)).sort(byOrder)
    emit('events')
    return
  }
  let { error } = await supabase.from('events').update(pick(patch)).eq('id', id)
  if (error && isMissingUrlColumn(error)) {
    ;({ error } = await supabase.from('events').update(withoutUrl(pick(patch))).eq('id', id))
  }
  if (error) throw error
  cache = cache.map((e) => (e.id === id ? { ...e, ...patch } : e)).sort(byOrder)
  emit('events')
}

export async function deleteEvent(id) {
  await removePhotosForEvent(id)
  await removeRatingsForSpot(id)
  if (supabase && !fallback) {
    const { error } = await supabase.from('events').delete().eq('id', id)
    if (error) throw error
  }
  cache = cache.filter((e) => e.id !== id)
  emit('events')
}
