export const TRIP = {
  name: 'Corea 2026',
  city: 'Seúl',
  country: 'Corea del Sur',
  travelers: 'Mi Jin & Gonchi',
  start: '2026-09-02',
  end: '2026-09-10',
  lat: 37.5665,
  lng: 126.978,
  timezone: 'Asia/Seoul'
}

export const COVER_IMAGE =
  'https://images.unsplash.com/photo-1583833008338-31a6657917ab?auto=format&fit=crop&w=900&q=70'

export const DAYS = [
  { n: 1, title: 'Llegada a Seúl' },
  { n: 2, title: 'Palacios & Bukchon' },
  { n: 3, title: 'Corazón de Seúl' },
  { n: 4, title: 'Namsan & Myeongdong' },
  { n: 5, title: 'Hongdae & Río Han' },
  { n: 6, title: 'Escapada: Isla Nami' },
  { n: 7, title: 'Gangnam & moderno' },
  { n: 8, title: 'Seongsu & cafés' },
  { n: 9, title: 'Despedida' }
]

const raw = [
  [1, 900, '14:00', 'Llegada a Incheon (ICN)', 'transporte', 'Aeropuerto Internacional de Incheon', '1h 30', 'Comprá la T-money en el 7-Eleven del aeropuerto y tomá el AREX directo al centro.', false, 37.4602, 126.4407],
  [1, 1700, '17:00', 'Check-in en Myeongdong', 'alojamiento', 'Myeongdong', '1h', 'Dejá las valijas y estirá las piernas: el barrio es ideal para la primera noche.', false, 37.5636, 126.985],
  [1, 1900, '19:00', 'Primer paseo + cena callejera', 'comida', 'Myeongdong Street Food', '2h', 'Probá tteokbokki y hotteok en los puestos. Andá con hambre.', false, 37.5609, 126.9857],

  [2, 930, '09:30', 'Palacio Gyeongbokgung', 'cultura', 'Gyeongbokgung', '2h 30', 'Alquilá un hanbok cerca: con hanbok la entrada es gratis. Mirá el cambio de guardia (10:00).', true, 37.5796, 126.977],
  [2, 1230, '12:30', 'Almuerzo en Tongin Market', 'comida', 'Tongin Market', '1h 30', 'Comprá monedas de latón y armá tu propia bandeja dosirak.', false, 37.5799, 126.97],
  [2, 1430, '14:30', 'Bukchon Hanok Village', 'cultura', 'Bukchon Hanok Village', '1h 30', 'Silencio: es un barrio con gente viviendo. Las mejores fotos son en la calle Gahoe-dong.', true, 37.5826, 126.983],
  [2, 1630, '16:30', 'Insadong', 'compras', 'Insadong', '2h', 'Té tradicional, papelería hanji y Ssamziegil, la galería en espiral.', false, 37.5717, 126.9852],

  [3, 1000, '10:00', 'Changdeokgung & Jardín Secreto', 'cultura', 'Changdeokgung', '2h', 'Reservá el tour del Huwon con antelación: los cupos vuelan.', false, 37.5794, 126.991],
  [3, 1230, '12:30', 'Brunch en Ikseon-dong', 'cafe', 'Ikseon-dong', '1h 30', 'Callejones hanok convertidos en cafés de diseño. Perfecto para el mediodía.', false, 37.5735, 126.9905],
  [3, 1500, '15:00', 'Gwangjang Market', 'comida', 'Gwangjang Market', '1h 30', 'Bindaetteok (panqueque de mung) y mayak gimbap. Salió en Netflix por algo.', true, 37.5701, 126.9997],
  [3, 1930, '19:30', 'DDP iluminado', 'vista', 'Dongdaemun Design Plaza', '1h 30', 'La nave de Zaha Hadid de noche + el LED Rose Garden. Dongdaemun no duerme.', false, 37.5665, 127.0092],

  [4, 1030, '10:30', 'Namsangol Hanok Village', 'cultura', 'Namsangol Hanok Village', '1h 30', 'Casas tradicionales trasladadas y un jardín precioso. Entrada gratis.', false, 37.5591, 126.993],
  [4, 1300, '13:00', 'N Seoul Tower (Namsan)', 'vista', 'N Seoul Tower', '2h 30', 'Subí en teleférico. Vista 360° de Seúl y los candados del amor arriba.', true, 37.5512, 126.9882],
  [4, 1630, '16:30', 'Namdaemun Market', 'compras', 'Namdaemun Market', '1h 30', 'El mercado más grande. Regateá y probá el kalguksu del callejón.', false, 37.5591, 126.9779],
  [4, 1900, '19:00', 'Noche en Myeongdong', 'compras', 'Myeongdong Shopping', '2h', 'K-beauty a precio de local. Muchas tiendas regalan muestras.', false, 37.5638, 126.9827],

  [5, 1100, '11:00', 'Hongdae', 'ocio', 'Hongdae', '2h 30', 'Zona universitaria: arte callejero, buskers y tiendas raras. Vívelo de día y de noche.', false, 37.5563, 126.9236],
  [5, 1430, '14:30', 'Café en Yeonnam-dong', 'cafe', 'Yeonnam-dong', '1h 30', 'El "Central Park" de Seúl (Gyeongui Line Forest) rodeado de cafés.', false, 37.5605, 126.9256],
  [5, 1700, '17:00', 'Picnic en el Río Han', 'naturaleza', 'Yeouido Hangang Park', '2h', 'Pedí pollo + cerveza por app al parque (chimaek). Alquilá una carpita.', true, 37.5285, 126.9327],
  [5, 2000, '20:00', 'Crucero nocturno por el Han', 'vista', 'Embarcadero Yeouido', '1h 30', 'El crucero pasa bajo el puente Banpo y su fuente arcoíris.', false, 37.5177, 126.9337],

  [6, 830, '08:30', 'Tren a Gapyeong', 'transporte', 'Gapyeong', '2h', 'Salí temprano en el ITX-Cheongchun. Reservá el ferry a la isla.', false, 37.7889, 127.51],
  [6, 1100, '11:00', 'Isla Nami', 'naturaleza', 'Nami Island', '4h', 'La avenida de metasequoias es icónica. Alquilá bicis y comé dak-galbi de Chuncheon.', true, 37.7902, 127.5259],
  [6, 1630, '16:30', 'Garden of Morning Calm', 'naturaleza', 'Garden of Morning Calm', '2h', 'Si queda energía, jardines temáticos preciosos cerca de Gapyeong.', false, 37.7444, 127.3486],
  [6, 2030, '20:30', 'Regreso a Seúl', 'transporte', 'Seúl', '1h 30', 'Cena tranquila cerca del hotel. Día largo pero vale la pena.', false, 37.5665, 126.978],

  [7, 1030, '10:30', 'Templo Bongeunsa', 'cultura', 'Bongeunsa', '1h 30', 'Templo budista con rascacielos de fondo. Contraste puro de Seúl.', false, 37.515, 127.0577],
  [7, 1230, '12:30', 'Starfield Library (COEX)', 'vista', 'Starfield Library COEX', '1h', 'La biblioteca-instagram de estanterías gigantes. Entrada libre.', true, 37.5127, 127.059],
  [7, 1400, '14:00', 'Almuerzo + COEX Mall', 'comida', 'COEX Mall', '2h', 'El mall subterráneo más grande de Asia. Acuario opcional.', false, 37.5116, 127.059],
  [7, 1700, '17:00', 'Lotte World Tower & Seokchon', 'vista', 'Lotte World Tower', '2h 30', 'Mirador Seoul Sky (piso 118) o paseo por el lago Seokchon al atardecer.', false, 37.5125, 127.1025],

  [8, 1100, '11:00', 'Seongsu-dong', 'cafe', 'Seongsu-dong', '2h 30', 'El "Brooklyn de Seúl": fábricas recicladas en cafés y flagship stores.', false, 37.5445, 127.056],
  [8, 1400, '14:00', 'Common Ground', 'compras', 'Common Ground', '1h 30', 'Mall de contenedores azules con marcas locales independientes.', false, 37.541, 127.0695],
  [8, 1600, '16:00', 'Seoul Forest', 'naturaleza', 'Seoul Forest', '1h 30', 'Parque enorme con ciervos, ideal para desconectar entre café y café.', false, 37.5443, 127.0374],
  [8, 1900, '19:00', 'Barbacoa coreana', 'comida', 'Seongsu BBQ', '2h', 'Samgyeopsal (panceta) a la parrilla. Que el mozo lo corte y lo dé vuelta por vos.', false, 37.5447, 127.0557],

  [9, 930, '09:30', 'Brunch de despedida', 'cafe', 'Café en Myeongdong', '1h 30', 'Un último café coreano tranquilo antes del aeropuerto.', false, 37.5628, 126.984],
  [9, 1100, '11:00', 'Paseo por Cheonggyecheon', 'naturaleza', 'Cheonggyecheon', '1h', 'Última caminata por el arroyo restaurado en pleno centro antes de partir.', false, 37.5696, 126.9779],
  [9, 1230, '12:30', 'Souvenirs de último minuto', 'compras', 'Myeongdong', '1h', 'Snacks, máscaras faciales de Olive Young y regalos.', false, 37.5636, 126.985],
  [9, 1400, '14:00', 'Salida a Incheon', 'transporte', 'Aeropuerto Internacional de Incheon', '2h', 'Salí con 3h de anticipación. AREX directo desde Seoul Station. ¡Annyeong!', false, 37.4602, 126.4407]
]

export const SEED_EVENTS = raw.map((r, i) => ({
  id: `seed-${r[0]}-${String(i).padStart(2, '0')}`,
  day: r[0],
  time_sort: r[1],
  time: r[2],
  title: r[3],
  type: r[4],
  place: r[5],
  duration: r[6],
  tip: r[7],
  highlight: r[8],
  lat: r[9],
  lng: r[10]
}))

export const HIGHLIGHTS = [
  {
    name: 'Gyeongbokgung',
    type: 'cultura',
    blurb: 'El gran palacio real. Cambio de guardia y hanbok.',
    image: 'https://images.unsplash.com/photo-1538485399081-7191377e8241?auto=format&fit=crop&w=900&q=70',
    lat: 37.5796,
    lng: 126.977
  },
  {
    name: 'N Seoul Tower',
    type: 'vista',
    blurb: 'Vista 360° de la ciudad desde el monte Namsan.',
    image: 'https://images.unsplash.com/photo-1617541086271-4d43983704de?auto=format&fit=crop&w=900&q=70',
    lat: 37.5512,
    lng: 126.9882
  },
  {
    name: 'Bukchon Hanok Village',
    type: 'cultura',
    blurb: 'Callejones de casas tradicionales entre palacios.',
    image: 'https://images.unsplash.com/photo-1583833008338-31a6657917ab?auto=format&fit=crop&w=900&q=70',
    lat: 37.5826,
    lng: 126.983
  },
  {
    name: 'Gwangjang Market',
    type: 'comida',
    blurb: 'El mercado de street food más famoso de Seúl.',
    image: 'https://images.unsplash.com/photo-1590301157890-4810ed352733?auto=format&fit=crop&w=900&q=70',
    lat: 37.5701,
    lng: 126.9997
  },
  {
    name: 'Río Han (Yeouido)',
    type: 'naturaleza',
    blurb: 'Picnic, chimaek y crucero nocturno junto al río.',
    image: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=900&q=70',
    lat: 37.5285,
    lng: 126.9327
  },
  {
    name: 'Starfield Library',
    type: 'vista',
    blurb: 'Las estanterías gigantes de COEX, entrada libre.',
    image: 'https://images.unsplash.com/photo-1568667256549-094345857637?auto=format&fit=crop&w=900&q=70',
    lat: 37.5127,
    lng: 127.059
  }
]
