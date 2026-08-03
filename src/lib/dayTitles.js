import { supabase } from './supabaseClient'
import { emit } from './store'
import { DAYS } from '../data/trip'

const LS_KEY = 'corea2026:dayTitles'

let overrides = {}
let daysCache = DAYS
let ready = false
let remote = false

function defaultTitle(n) {
  return DAYS.find((d) => d.n === n)?.title ?? ''
}

function recompute() {
  daysCache = DAYS.map((d) => ({ ...d, title: overrides[d.n] ?? d.title }))
}

function readLocal() {
  try {
    const raw = localStorage.getItem(LS_KEY)
    return raw ? JSON.parse(raw) : {}
  } catch {
    return {}
  }
}

function writeLocal() {
  try {
    localStorage.setItem(LS_KEY, JSON.stringify(overrides))
  } catch (err) {
    void err
  }
}

export function getDays() {
  return daysCache
}

export function getDayTitle(n) {
  return overrides[n] ?? defaultTitle(n)
}

export function isReady() {
  return ready
}

export async function loadDayTitles() {
  overrides = readLocal()
  recompute()
  emit('days')

  if (supabase) {
    try {
      const { data, error } = await supabase.from('day_titles').select('n,title')
      if (error) throw error
      remote = true
      const merged = {}
      for (const row of data || []) {
        if (row.title && row.title !== defaultTitle(row.n)) merged[row.n] = row.title
      }
      overrides = merged
      writeLocal()
    } catch (err) {
      console.warn('[days] usando títulos locales:', err.message || err)
      remote = false
    }
  }

  recompute()
  ready = true
  emit('days')
}

export async function setDayTitle(n, title) {
  const clean = (title || '').trim()
  const isDefault = clean === '' || clean === defaultTitle(n)

  const next = { ...overrides }
  if (isDefault) delete next[n]
  else next[n] = clean
  overrides = next

  writeLocal()
  recompute()
  emit('days')

  if (supabase && remote) {
    try {
      if (isDefault) {
        const { error } = await supabase.from('day_titles').delete().eq('n', n)
        if (error) throw error
      } else {
        const { error } = await supabase.from('day_titles').upsert({ n, title: clean }, { onConflict: 'n' })
        if (error) throw error
      }
    } catch (err) {
      remote = false
      console.warn('[days] no se pudo sincronizar el título:', err.message || err)
    }
  }
}
