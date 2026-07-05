# Corea 2026 · Seúl 🇰🇷

App web mobile-first para organizar nuestro viaje a Seúl (2–10 de septiembre 2026).
Itinerario por día, mapa con calificaciones y galería de fotos compartida. Para Mi Jin & Gonchi.

Hecha con **Vite + React 18 + Tailwind 3 + Supabase + Leaflet**. Deploy automático a **GitHub Pages**.

---

## Arrancar en local

```bash
npm install
npm run dev      # http://localhost:5173
```

```bash
npm run build    # genera dist/
npm run preview  # sirve el build de producción
```

La app **funciona sin configurar nada**: si Supabase no está listo, cae a los datos de
ejemplo de `src/data/trip.js` (modo local, los cambios no se guardan). Verás un cartelito
"Modo local" en el itinerario.

---

## Conectar Supabase (2 pasos)

Los datos (eventos, calificaciones, fotos) se comparten y sincronizan vía Supabase.

**Paso 1 — Crear el proyecto y correr el SQL**
1. Entrá a [supabase.com](https://supabase.com) → **New project** (gratis).
2. Abrí **SQL Editor**, pegá TODO el contenido de [`supabase-setup.sql`](./supabase-setup.sql) y ejecutá.
   Crea las tablas (`events`, `spot_ratings`, `photos`), el bucket de storage `fotos` y las políticas RLS.
   Es **idempotente**: podés re-ejecutarlo sin romper nada.

**Paso 2 — Pegar las claves**
1. En Supabase: **Project Settings → API Keys** (pestaña *Publishable and secret API keys*).
2. Copiá la **Publishable key** (`sb_publishable_...`) — es la que va en el navegador; segura por diseño con RLS.
   **NO** copies la *Secret key* (`sb_secret_...`): esa es solo para backend y da acceso privilegiado.
3. El **Project URL** (`https://<ref>.supabase.co`) está en **Project Settings → Data API** (o **General**).
4. Pegá ambos en [`src/lib/supabaseConfig.js`](./src/lib/supabaseConfig.js):

```js
export const SUPABASE_URL = 'https://xxxxxxxx.supabase.co'
export const SUPABASE_ANON_KEY = 'sb_publishable_7zEt8pnJYz4JFT7eZz9-SA_...'
```

Listo. La **primera vez** que la app abra con la tabla `events` vacía, se **auto-siembra**
sola con el itinerario de ejemplo. A partir de ahí, todo se guarda en Supabase.

---

## Deploy a GitHub Pages

1. Subí el repo a GitHub.
2. **Settings → Pages → Build and deployment → Source: GitHub Actions**.
3. Cada `push` a `main` dispara [`.github/workflows/deploy.yml`](./.github/workflows/deploy.yml),
   que buildea y publica solo.

Anda en subcarpeta de Pages sin tocar nada: `vite.config.js` usa `base: './'` y el router
es `HashRouter` (las rutas viven en `#/mapa`, `#/fotos`).

---

## PIN de edición

- El **PIN `0408`** desbloquea la edición del itinerario (agregar / editar / borrar eventos).
- **Calificar lugares y subir fotos NO necesitan PIN** — quedan abiertos.
- Es un candado del lado del cliente (el PIN se guarda **hasheado**, no en texto plano).
  No es seguridad fuerte: alcanza para un link privado entre nosotros.
- Botón flotante de candado abajo a la derecha en la pestaña Itinerario.

Para cambiar el PIN, calculá el SHA-256 del nuevo número y reemplazá `PIN_HASH` en
[`src/lib/editAccess.js`](./src/lib/editAccess.js):

```bash
node -e "console.log(require('crypto').createHash('sha256').update('1234').digest('hex'))"
```

---

## Foto de portada

Está en `COVER_IMAGE` dentro de [`src/data/trip.js`](./src/data/trip.js) (link de Google Drive).
Si el link no carga, la portada muestra un degradado de marca (nunca se rompe).
Para cambiarla, pegá otra URL de imagen ahí.

Más detalle de arquitectura y modelo de datos en [`HANDOFF.md`](./HANDOFF.md).
