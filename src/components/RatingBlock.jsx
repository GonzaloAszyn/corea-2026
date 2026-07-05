import { useState } from 'react'
import { Send, UserRound } from 'lucide-react'
import StarRating from './StarRating'
import { useRatings } from '../lib/hooks'
import { getRatingsForSpot, getAverage, saveRating } from '../lib/ratings'

const AUTHOR_KEY = 'corea2026.author'

export default function RatingBlock({ spot }) {
  useRatings()
  const list = getRatingsForSpot(spot.id)
  const avg = getAverage(spot.id)

  const [author, setAuthor] = useState(() => {
    try {
      return localStorage.getItem(AUTHOR_KEY) || ''
    } catch {
      return ''
    }
  })
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')

  async function submit(e) {
    e.preventDefault()
    if (!author.trim()) return setError('Escribí tu nombre.')
    if (!rating) return setError('Elegí cuántas estrellas.')
    setError('')
    setBusy(true)
    try {
      try {
        localStorage.setItem(AUTHOR_KEY, author.trim())
      } catch {
        /* ignore */
      }
      await saveRating({
        spot_id: spot.id,
        spot_name: spot.title || spot.place,
        rating,
        comment,
        author
      })
      setComment('')
    } catch (err) {
      setError('No se pudo guardar: ' + (err.message || err))
    }
    setBusy(false)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 rounded-2xl bg-muted/60 px-4 py-3">
        {avg != null ? (
          <>
            <span className="text-3xl font-bold tabular-nums text-ink">{avg.toFixed(1)}</span>
            <div>
              <StarRating value={avg} readOnly size={18} />
              <p className="text-xs text-ink-soft">
                {list.length} calificación{list.length !== 1 ? 'es' : ''}
              </p>
            </div>
          </>
        ) : (
          <p className="text-sm text-ink-soft">Todavía nadie calificó este lugar. ¡Sé el primero!</p>
        )}
      </div>

      {list.length > 0 && (
        <ul className="space-y-2">
          {list.map((r) => (
            <li key={r.id} className="rounded-2xl border border-line px-3 py-2.5">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 font-semibold text-ink">
                  <UserRound size={15} className="text-ink-faint" /> {r.author}
                </span>
                <StarRating value={r.rating} readOnly size={15} />
              </div>
              {r.comment && <p className="mt-1 text-sm text-ink-soft">{r.comment}</p>}
            </li>
          ))}
        </ul>
      )}

      <form onSubmit={submit} className="space-y-3 rounded-2xl border border-line bg-surface p-3">
        <p className="font-semibold text-ink">Tu calificación</p>
        <StarRating value={rating} onChange={setRating} size={30} />
        <input
          className="field"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="Tu nombre"
        />
        <textarea
          className="field min-h-[64px] resize-none"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="¿Qué te pareció? (opcional)"
        />
        {error && <p className="text-sm font-semibold text-destructive">{error}</p>}
        <button type="submit" disabled={busy} className="btn-primary w-full">
          <Send size={17} /> {busy ? 'Guardando…' : 'Publicar calificación'}
        </button>
      </form>
    </div>
  )
}
