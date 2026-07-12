import { useRef, useState } from 'react'
import { Upload, ImagePlus, Loader2 } from 'lucide-react'
import Sheet from './Sheet'
import { useEvents } from '../lib/hooks'
import { getEvents } from '../lib/events'
import { uploadPhoto } from '../lib/photos'

export default function PhotoUploader({
  presetEvent = null,
  triggerClassName = 'btn-primary',
  triggerLabel = 'Subir fotos',
  compact = false,
  onUploaded
}) {
  useEvents()
  const events = getEvents()
  const inputRef = useRef(null)

  const [files, setFiles] = useState([])
  const [previews, setPreviews] = useState([])
  const [caption, setCaption] = useState('')
  const [eventId, setEventId] = useState(presetEvent ? presetEvent.id : '')
  const [progress, setProgress] = useState(null)
  const [error, setError] = useState('')

  function pick() {
    inputRef.current?.click()
  }

  function onFiles(e) {
    const list = Array.from(e.target.files || [])
    if (!list.length) return
    setFiles(list)
    setPreviews(list.map((f) => URL.createObjectURL(f)))
    setCaption('')
    setEventId(presetEvent ? presetEvent.id : '')
    setError('')
    e.target.value = ''
  }

  function close() {
    previews.forEach((u) => URL.revokeObjectURL(u))
    setFiles([])
    setPreviews([])
    setProgress(null)
  }

  async function upload() {
    setError('')
    setProgress({ done: 0, total: files.length })
    const linked = presetEvent || events.find((ev) => ev.id === eventId) || null
    try {
      for (let i = 0; i < files.length; i++) {
        await uploadPhoto(files[i], {
          event_id: linked ? linked.id : null,
          lat: linked ? linked.lat : null,
          lng: linked ? linked.lng : null,
          caption
        })
        setProgress({ done: i + 1, total: files.length })
      }
      onUploaded && onUploaded()
      close()
    } catch (err) {
      setError('No se pudo subir: ' + (err.message || err))
      setProgress(null)
    }
  }

  return (
    <>
      <button onClick={pick} className={triggerClassName}>
        {compact ? <ImagePlus size={16} /> : <Upload size={18} />} {triggerLabel}
      </button>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        onChange={onFiles}
        className="hidden"
      />

      <Sheet open={files.length > 0} onClose={close} title={`Subir ${files.length} foto${files.length > 1 ? 's' : ''}`}>
        <div className="space-y-4 pb-2">
          <div className="flex gap-2 overflow-x-auto no-scrollbar">
            {previews.map((src, i) => (
              <img
                key={i}
                src={src}
                alt=""
                className="h-24 w-24 shrink-0 rounded-2xl object-cover border border-line"
              />
            ))}
          </div>

          <div>
            <label className="mb-1 block text-sm font-semibold text-ink-soft">Descripción (opcional)</label>
            <input
              className="field"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="Ej: Atardecer en el Río Han"
            />
          </div>

          {presetEvent ? (
            <p className="rounded-2xl bg-muted/60 px-4 py-3 text-sm text-ink-soft">
              Se asociará a <span className="font-semibold text-ink">{presetEvent.title}</span>.
            </p>
          ) : (
            <div>
              <label className="mb-1 block text-sm font-semibold text-ink-soft">Asociar a un evento (opcional)</label>
              <select className="field" value={eventId} onChange={(e) => setEventId(e.target.value)}>
                <option value="">Sin evento</option>
                {events.map((ev) => (
                  <option key={ev.id} value={ev.id}>
                    Día {ev.day} · {ev.title}
                  </option>
                ))}
              </select>
            </div>
          )}

          {error && <p className="text-sm font-semibold text-destructive">{error}</p>}

          <button onClick={upload} disabled={!!progress} className="btn-primary w-full">
            {progress ? (
              <>
                <Loader2 size={18} className="animate-spin" /> Subiendo {progress.done}/{progress.total}…
              </>
            ) : (
              <>
                <Upload size={18} /> Subir {files.length > 1 ? `las ${files.length}` : ''}
              </>
            )}
          </button>
        </div>
      </Sheet>
    </>
  )
}
