# HANDOFF · Corea 2026

Documento técnico: arquitectura, modelo de datos, capa de datos, deploy y decisiones.
Viaje a Seúl: **2 al 10 de septiembre 2026** (9 días).

## Stack

| Capa | Tecnología |
|------|-----------|
| Build | Vite 5 |
| UI | React 18 (JavaScript, sin TypeScript) |
| Estilos | Tailwind CSS 3 |
| Routing | react-router-dom 6 · **HashRouter** (clave para GitHub Pages) |
| Mapa | react-leaflet 4 + leaflet · tiles **CartoDB Positron** (gratis, sin key) |
| Íconos | lucide-react (SVG, nunca emojis) |
| Backend | Supabase (Postgres + Storage) vía @supabase/supabase-js 2 |
| Clima | Open-Meteo (sin API key) |
| Deploy | GitHub Actions → GitHub Pages |

## Diseño

Sistema derivado con la skill **ui-ux-pro-max**:
- Paleta: naranja aventura `#EA580C` + teal de mapa `#0891B2` sobre crema `#FFF7ED`, tinta `#0F172A`.
- Tipografía: **Caveat** (display, manuscrita, cálida) + **Quicksand** (cuerpo, redondeada, amable).
- Mobile-first, navegación inferior por pestañas, touch targets ≥44px, `prefers-reduced-motion` respetado,
  safe-areas (notch / barra de gestos) contempladas.

## Estructura de archivos

```
corea-2026/
├── index.html                  # viewport, fuentes, theme-color
├── vite.config.js              # base:'./' (Pages)
├── tailwind.config.js          # tokens de color, fuentes, animaciones
├── postcss.config.js
├── supabase-setup.sql          # tablas + storage + RLS (idempotente)
├── README.md
├── HANDOFF.md
├── .github/workflows/deploy.yml
├── public/favicon.svg
└── src/
    ├── main.jsx                # monta React + dispara loads iniciales
    ├── App.jsx                 # HashRouter + rutas (lazy) + BottomNav
    ├── index.css               # tokens, componentes @layer, overrides Leaflet
    ├── data/
    │   └── trip.js             # SEMILLA: TRIP, DAYS, SEED_EVENTS, HIGHLIGHTS, COVER
    ├── lib/
    │   ├── supabaseConfig.js   # URL + anon key (placeholders)
    │   ├── supabaseClient.js   # cliente + isSupabaseConfigured()
    │   ├── store.js            # emit() + useStore() (useSyncExternalStore) + uid()
    │   ├── hooks.js            # useEvents/useRatings/usePhotos/useWeather/useUnlocked
    │   ├── events.js           # capa de datos de eventos (+ auto-seed, cascada)
    │   ├── ratings.js          # capa de datos de calificaciones (upsert por autor)
    │   ├── photos.js           # capa de datos de fotos (storage + resize)
    │   ├── weather.js          # Open-Meteo: pronóstico o promedio histórico
    │   ├── editAccess.js       # PIN hasheado (SHA-256) + lock/unlock
    │   ├── image.js            # resize en el cliente (canvas)
    │   ├── dates.js            # fechas, weekday es-ES, countdown
    │   ├── geo.js              # gmapsUrl()
    │   └── types.js            # TYPES: label + color + ícono por tipo
    ├── components/
    │   ├── BottomNav.jsx       SmartImage.jsx    Sheet.jsx
    │   ├── Countdown.jsx       WeatherStrip.jsx  HighlightCard.jsx
    │   ├── EventCard.jsx       EventForm.jsx     StarRating.jsx
    │   ├── RatingBlock.jsx     SpotSheet.jsx     PhotoUploader.jsx
    │   ├── PhotoLightbox.jsx   LockButton.jsx    PinModal.jsx
    └── pages/
        ├── Itinerary.jsx       # "/"      itinerario + clima + imperdibles
        ├── MapPage.jsx         # "/mapa"  mapa + filtros + ratings (lazy)
        └── Photos.jsx          # "/fotos" galería + subida (lazy)
```

## Modelo de datos (Supabase)

**events** — un evento del itinerario
| col | tipo | nota |
|-----|------|------|
| id | uuid PK | `gen_random_uuid()` |
| day | int | 1–9 |
| time_sort | numeric | orden dentro del día (HHMM, ej 1430) |
| time | text | "14:30" |
| title, type, place, duration, tip | text | `type` ∈ comida/cultura/compras/naturaleza/vista/cafe/ocio/transporte/alojamiento |
| highlight | bool | marca imperdible |
| lat, lng | float8 | posición en el mapa |

**spot_ratings** — calificación abierta de un lugar
| col | tipo | nota |
|-----|------|------|
| id | uuid PK | |
| spot_id | uuid FK→events.id | `on delete cascade` |
| spot_name | text | |
| rating | int 1–5 | `check` |
| comment, author | text | **unique (spot_id, author)** → 1 voto por persona, editable |

**photos** — foto atada opcionalmente a un evento
| col | tipo | nota |
|-----|------|------|
| id | uuid PK | |
| event_id | uuid FK→events.id | `on delete set null` |
| lat, lng | float8 | copiadas del evento asociado |
| caption | text | |
| path | text | ruta dentro del bucket `fotos` |

**Storage:** bucket público `fotos`. **RLS:** políticas abiertas (select/insert/update/delete)
para `anon` — suficiente para un link privado.

## Capa de datos (patrón común)

`events.js`, `ratings.js`, `photos.js` siguen el **mismo patrón**:

1. **Caché en memoria** (`cache`) → lectura **sincrónica** en render (`getEvents()`, etc).
2. **Funciones async** contra Supabase (`loadX`, `addX`, `updateX`, `deleteX`).
3. **Aviso de cambios** con un evento de `window` (`emit('events')`), consumido por
   `useStore(channel, getSnapshot)` (envuelve `useSyncExternalStore`). Al mutar, se reemplaza
   la referencia de `cache` y se emite → React re-renderiza.

**Fuentes de verdad compartidas:** el itinerario y el mapa leen la **misma** capa `events.js`,
así un cambio se refleja en ambos al instante.

**Auto-seed:** `loadEvents()` — si la tabla `events` está vacía, la siembra desde
`SEED_EVENTS` (`trip.js`). Si Supabase no está configurado o falla, cae a `trip.js` en modo
local (`isFallback() === true`) y **nunca se rompe**.

**Cascada:** `deleteEvent(id)` borra primero las fotos y calificaciones del evento
(`removePhotosForEvent`, `removeRatingsForSpot`, incluyendo los archivos del storage) y
después el evento.

## Clima (Open-Meteo, sin key)

`weather.js` decide por día:
- Si faltan **≤16 días** para ese día → **pronóstico real** (`/v1/forecast`).
- Si falta más (o ya pasó) → **promedio histórico**: `/v1/archive` de 2022–2024 para las
  mismas fechas, promediado por día y etiquetado "promedio".
- Si la red falla, muestra "—" sin romper la app.

## PIN de edición

`editAccess.js` guarda el PIN como **hash SHA-256** (no texto plano). `unlock(pin)` hashea lo
ingresado y compara. Estado desbloqueado persiste en `sessionStorage`. El PIN protege **solo**
la edición de eventos; calificar y subir fotos quedan abiertos. Candado del lado del cliente:
no es seguridad fuerte, es un freno suave para un link privado.

PIN actual: **0408** → `sha256 = 0d4d1c94890441d6fc5a505e2fa36881420fd783b306256cebcdf2dccf3d2b18`.

## Fotos (subida desde el celular)

`PhotoUploader` → `image.js` redimensiona en el cliente (canvas, lado máx 1600px, JPEG q0.82,
respeta orientación EXIF vía `createImageBitmap`) → sube al bucket `fotos` → inserta fila en
`photos`. Se puede asociar a un evento (hereda su lat/lng) para que aparezca el contador de
fotos en el pin del mapa y en la tarjeta del evento.

## Deploy (GitHub Pages)

- `vite.config.js`: `base: './'` → assets relativos, anda en subcarpeta `/repo/`.
- `HashRouter` → rutas en el hash (`#/mapa`), sin config de servidor.
- `.github/workflows/deploy.yml`: `push` a `main` → `npm ci` → `npm run build` →
  `upload-pages-artifact` → `deploy-pages`. Requiere **Settings → Pages → Source: GitHub Actions**.

## Verificación

`npm run build` compila limpio. Smoke test en navegador (390×844): las 3 pestañas renderizan
sin errores de consola; countdown en vivo; clima trae promedios reales; mapa dibuja 35 pines
por tipo con tiles CartoDB; flujo de PIN 0408 desbloquea y muestra controles de edición.

## Notas / decisiones

- **JavaScript, no TypeScript** (pedido explícito).
- **Sin sección de "recuerdos"/muro** (pedido explícito).
- Rutas **lazy** (`MapPage`, `Photos`): el itinerario carga sin el peso de Leaflet.
- Íconos de pin: se rasterizan los SVG de lucide con `renderToStaticMarkup` dentro de un
  `L.divIcon` coloreado por tipo, con badge de cantidad de fotos.
- Imágenes con `SmartImage`: degradado de marca de fondo + `<img>` que aparece solo si carga;
  si falla, el degradado queda (la UI nunca muestra imágenes rotas).
