export const TRIP = {
  name: 'Corea 2026',
  city: 'Seúl · Jeonju · Busan',
  country: 'Corea del Sur',
  travelers: 'Mi Jin & Gonchi',
  start: '2026-09-02',
  end: '2026-09-14',
  lat: 37.5665,
  lng: 126.978,
  timezone: 'Asia/Seoul'
}

export const COVER_IMAGE =
  'https://images.unsplash.com/photo-1583833008338-31a6657917ab?auto=format&fit=crop&w=900&q=70'

export const DAYS = [
  { n: 1, title: 'Llegada a Seúl' },
  { n: 2, title: 'Palacios & Bukchon' },
  { n: 3, title: 'Corazón de Seúl & Namsan' },
  { n: 4, title: 'Hongdae & Río Han' },
  { n: 5, title: 'Escapada: Isla Nami' },
  { n: 6, title: 'Gangnam & Seongsu' },
  { n: 7, title: 'Seúl → Jeonju' },
  { n: 8, title: 'Jeonju hanok' },
  { n: 9, title: 'Jeonju → Busan' },
  { n: 10, title: 'Busan clásico' },
  { n: 11, title: 'Haeundae & mar' },
  { n: 12, title: 'Costa & despedida de Busan' },
  { n: 13, title: 'Vuelta a casa' }
]

const raw = [
  [1, 1845, '18:45', 'Llegada a Incheon (ICN)', 'transporte', 'Aeropuerto Internacional de Incheon', '1h 15', 'Migraciones y valijas. Comprá la T-money en el 7-Eleven y activá el eSIM antes de salir.', false, 37.4602, 126.4407],
  [1, 2015, '20:15', 'AREX al centro de Seúl', 'transporte', 'AREX · Seoul Station', '1h', 'Tren directo del aeropuerto a Seoul Station; desde ahí, subte o taxi corto hasta el Airbnb.', false, 37.5547, 126.9707],
  [1, 2130, '21:30', 'Check-in en el Airbnb (Seúl)', 'alojamiento', 'Airbnb Seúl', '30 min', 'Dejá las valijas y respirá: primera noche coreana. El barrio invita a estirar las piernas.', false, 37.5636, 126.985],
  [1, 2215, '22:15', 'Cena callejera nocturna', 'comida', 'Myeongdong Street Food', '1h', 'Algo rápido y rico cerca: tteokbokki, hotteok o un gimbap. Andá con hambre pero sin apuro.', false, 37.5609, 126.9857],

  [2, 930, '09:30', 'Palacio Gyeongbokgung', 'cultura', 'Gyeongbokgung', '2h 30', 'Alquilá un hanbok cerca: con hanbok la entrada es gratis. Mirá el cambio de guardia (10:00).', true, 37.5796, 126.977],
  [2, 1230, '12:30', 'Almuerzo en Tongin Market', 'comida', 'Tongin Market', '1h 30', 'Comprá monedas de latón y armá tu propia bandeja dosirak.', false, 37.5799, 126.97],
  [2, 1430, '14:30', 'Bukchon Hanok Village', 'cultura', 'Bukchon Hanok Village', '1h 30', 'Silencio: es un barrio con gente viviendo. Las mejores fotos son en la calle Gahoe-dong.', true, 37.5826, 126.983],
  [2, 1630, '16:30', 'Insadong', 'compras', 'Insadong', '2h', 'Té tradicional, papelería hanji y Ssamziegil, la galería en espiral.', false, 37.5717, 126.9852],

  [3, 1000, '10:00', 'Changdeokgung & Jardín Secreto', 'cultura', 'Changdeokgung', '2h', 'Reservá el tour del Huwon con antelación: los cupos vuelan.', false, 37.5794, 126.991],
  [3, 1230, '12:30', 'Brunch en Ikseon-dong', 'cafe', 'Ikseon-dong', '1h 30', 'Callejones hanok convertidos en cafés de diseño. Perfecto para el mediodía.', false, 37.5735, 126.9905],
  [3, 1500, '15:00', 'Gwangjang Market', 'comida', 'Gwangjang Market', '1h 30', 'Bindaetteok (panqueque de mung) y mayak gimbap. Salió en Netflix por algo.', true, 37.5701, 126.9997],
  [3, 1730, '17:30', 'N Seoul Tower (Namsan)', 'vista', 'N Seoul Tower', '2h', 'Subí en teleférico para el atardecer. Vista 360° y los candados del amor arriba.', true, 37.5512, 126.9882],
  [3, 2000, '20:00', 'Noche en Myeongdong', 'compras', 'Myeongdong Shopping', '1h 30', 'K-beauty a precio de local y street food. Muchas tiendas regalan muestras.', false, 37.5638, 126.9827],

  [4, 1100, '11:00', 'Hongdae', 'ocio', 'Hongdae', '2h 30', 'Zona universitaria: arte callejero, buskers y tiendas raras. Vívelo de día y de noche.', false, 37.5563, 126.9236],
  [4, 1430, '14:30', 'Café en Yeonnam-dong', 'cafe', 'Yeonnam-dong', '1h 30', 'El "Central Park" de Seúl (Gyeongui Line Forest) rodeado de cafés.', false, 37.5605, 126.9256],
  [4, 1700, '17:00', 'Picnic en el Río Han', 'naturaleza', 'Yeouido Hangang Park', '2h', 'Pedí pollo + cerveza por app al parque (chimaek). Alquilá una carpita.', true, 37.5285, 126.9327],
  [4, 2000, '20:00', 'Crucero nocturno por el Han', 'vista', 'Embarcadero Yeouido', '1h 30', 'El crucero pasa bajo el puente Banpo y su fuente arcoíris.', false, 37.5177, 126.9337],

  [5, 830, '08:30', 'Tren a Gapyeong', 'transporte', 'Gapyeong', '2h', 'Salí temprano en el ITX-Cheongchun. Reservá el ferry a la isla.', false, 37.7889, 127.51],
  [5, 1100, '11:00', 'Isla Nami', 'naturaleza', 'Nami Island', '4h', 'La avenida de metasequoias es icónica. Alquilá bicis y comé dak-galbi de Chuncheon.', true, 37.7902, 127.5259],
  [5, 1630, '16:30', 'Garden of Morning Calm', 'naturaleza', 'Garden of Morning Calm', '2h', 'Jardines temáticos preciosos cerca de Gapyeong si queda energía.', false, 37.7444, 127.3486],
  [5, 2030, '20:30', 'Regreso a Seúl', 'transporte', 'Seúl', '1h 30', 'Cena tranquila cerca del Airbnb. Día largo pero vale la pena.', false, 37.5665, 126.978],

  [6, 1000, '10:00', 'Templo Bongeunsa', 'cultura', 'Bongeunsa', '1h 30', 'Templo budista con rascacielos de fondo. Contraste puro de Seúl.', false, 37.515, 127.0577],
  [6, 1200, '12:00', 'Starfield Library (COEX)', 'vista', 'Starfield Library COEX', '1h 30', 'La biblioteca-instagram de estanterías gigantes. Almorzá en el mall subterráneo.', true, 37.5127, 127.059],
  [6, 1500, '15:00', 'Seongsu-dong', 'cafe', 'Seongsu-dong', '2h', 'El "Brooklyn de Seúl": fábricas recicladas en cafés y flagship stores.', false, 37.5445, 127.056],
  [6, 1700, '17:00', 'Seoul Forest', 'naturaleza', 'Seoul Forest', '1h 30', 'Parque enorme con ciervos, ideal para desconectar entre café y café.', false, 37.5443, 127.0374],
  [6, 1930, '19:30', 'Barbacoa coreana', 'comida', 'Seongsu BBQ', '2h', 'Samgyeopsal a la parrilla. Que el mozo lo corte y lo dé vuelta por vos.', true, 37.5447, 127.0557],

  [7, 900, '09:00', 'Café de despedida en Seúl', 'cafe', 'Café en el centro', '1h', 'Un último flat white coreano antes de dejar la ciudad.', false, 37.5696, 126.9779],
  [7, 1015, '10:15', 'Paseo por Cheonggyecheon', 'naturaleza', 'Cheonggyecheon', '1h', 'Última caminata por el arroyo restaurado. Volvé a hacer el check-out antes de las 11.', false, 37.5696, 126.9779],
  [7, 1300, '13:00', 'KTX a Jeonju', 'transporte', 'Seoul Station → Jeonju', '1h 45', 'KTX directo desde Seoul Station (~1h45). Reservá asiento con la app Korail.', false, 37.5547, 126.9707],
  [7, 1530, '15:30', 'Check-in + Jeonju Hanok Village', 'cultura', 'Jeonju Hanok Village', '2h 30', 'Más de 700 casas hanok. Alquilá hanbok y perdete por los callejones al atardecer.', true, 35.8151, 127.153],
  [7, 1900, '19:00', 'Bibimbap de Jeonju', 'comida', 'Jeonju (barrio hanok)', '1h 30', 'Estás en la cuna del bibimbap: pedilo tradicional en olla de piedra + un makgeolli.', true, 35.8145, 127.152],

  [8, 930, '09:30', 'Santuario Gyeonggijeon', 'cultura', 'Gyeonggijeon', '1h 30', 'Guarda el retrato real de la dinastía Joseon, entre bambúes. Muy fotogénico temprano.', true, 35.8156, 127.1497],
  [8, 1100, '11:00', 'Catedral de Jeondong', 'cultura', 'Jeondong Catholic Cathedral', '45 min', 'Ladrillo romano-bizantino de 1914, una de las iglesias más lindas de Corea.', false, 35.8138, 127.1503],
  [8, 1230, '12:30', 'Kongnamul gukbap', 'comida', 'Barrio hanok de Jeonju', '1h', 'Sopa de brotes de soja con arroz, el almuerzo típico de Jeonju. Reconfortante.', false, 35.814, 127.151],
  [8, 1400, '14:00', 'Omokdae & Jaman Mural Village', 'vista', 'Jaman Mural Village', '2h', 'Subí al mirador Omokdae y seguí al pueblo de murales en la ladera.', false, 35.818, 127.156],
  [8, 1630, '16:30', 'Café hanok + hanji', 'cafe', 'Jeonju Hanok Village', '1h 30', 'Cafés de patio tradicional y talleres de papel hanji. Probá el choco pie de PNB.', false, 35.8155, 127.152],
  [8, 1900, '19:00', 'Mercado nocturno Nambu', 'comida', 'Nambu Market', '2h', 'De noche el mercado se llena de puestos de street food y bares (Yataicheon).', true, 35.811, 127.144],

  [9, 900, '09:00', 'Desayuno + últimas fotos hanok', 'cafe', 'Jeonju Hanok Village', '1h 30', 'Un último café y fotos del pueblo vacío temprano, antes de que llegue la gente.', false, 35.8151, 127.153],
  [9, 1100, '11:00', 'Tren/bus a Busan', 'transporte', 'Jeonju → Busan', '3h', 'Bus express directo (~3h) o tren vía Iksan. Hacé el check-out antes de salir.', false, 35.8494, 127.1608],
  [9, 1430, '14:30', 'Check-in en el Airbnb (Busan)', 'alojamiento', 'Airbnb Busan', '45 min', 'Dejá las valijas y activá el modo playa: Busan es otra energía respecto de Seúl.', false, 35.1587, 129.1604],
  [9, 1600, '16:00', 'Playa de Gwangalli', 'naturaleza', 'Gwangalli Beach', '2h 30', 'Arena, cafés frente al mar y el puente Gwangan de fondo. Ideal para el atardecer.', true, 35.1532, 129.1187],
  [9, 1900, '19:00', 'Mariscos + puente iluminado', 'comida', 'Gwangalli', '1h 30', 'Hoe (pescado crudo) frente al show de luces del puente Gwangan, cada hora.', false, 35.1535, 129.119],

  [10, 1000, '10:00', 'Gamcheon Culture Village', 'vista', 'Gamcheon Culture Village', '2h 30', 'El "Santorini de Busan": casas de colores en la ladera. Seguí al Principito para las fotos.', true, 35.0975, 129.0106],
  [10, 1300, '13:00', 'Mercado de pescado Jagalchi', 'comida', 'Jagalchi Market', '1h 30', 'Elegí tu pescado abajo y te lo cocinan arriba (hoe). El mercado marino más famoso de Corea.', true, 35.0966, 129.0306],
  [10, 1500, '15:00', 'BIFF Square & Gukje Market', 'compras', 'Nampo-dong', '2h', 'Cine, street food (ssiat hotteok) y el mercadazo de Gukje. Regateá tranquilo.', false, 35.0978, 129.0286],
  [10, 1700, '17:00', 'Busan Tower (Yongdusan)', 'vista', 'Busan Tower', '1h', 'Vista del puerto desde el parque Yongdusan, en pleno centro de Nampo.', false, 35.1006, 129.0325],
  [10, 1830, '18:30', 'Huinnyeoul Culture Village', 'vista', 'Huinnyeoul Culture Village', '1h 30', 'Sendero al borde del acantilado sobre el mar al atardecer. El barrio-postal de Yeongdo.', false, 35.0778, 129.0206],

  [11, 930, '09:30', 'Templo Haedong Yonggungsa', 'cultura', 'Haedong Yonggungsa', '2h', 'Templo budista sobre las rocas, con el mar rompiendo abajo. Salí temprano por la gente.', true, 35.1884, 129.2233],
  [11, 1230, '12:30', 'Almuerzo en Haeundae', 'comida', 'Haeundae', '1h 30', 'Milmyeon (fideos fríos de Busan) o dwaeji gukbap (sopa de cerdo), platos de la ciudad.', false, 35.1587, 129.1604],
  [11, 1400, '14:00', 'Blueline Park Sky Capsule', 'ocio', 'Cheongsapo', '2h', 'Cápsulas pastel sobre las vías junto al mar, de Mipo a Cheongsapo. Reservá online.', true, 35.1583, 129.1922],
  [11, 1630, '16:30', 'Playa de Haeundae & Dongbaek', 'naturaleza', 'Haeundae Beach', '1h 30', 'La playa más famosa + el sendero de la isla Dongbaek hasta The Bay 101.', false, 35.1587, 129.1604],
  [11, 1900, '19:00', 'The Bay 101', 'vista', 'The Bay 101', '2h', 'El skyline de Marine City reflejado en el agua. Fish & chips y cerveza frente a las torres.', false, 35.158, 129.151],

  [12, 1000, '10:00', 'Taejongdae', 'naturaleza', 'Taejongdae', '2h 30', 'Acantilados, faro y bosque en la punta sur. Subí al tren Danubi para recorrerlo.', true, 35.0517, 129.087],
  [12, 1300, '13:00', 'Almuerzo junto al mar', 'comida', 'Busan', '1h', 'Última tanda de mariscos frescos antes de seguir la costa.', false, 35.0778, 129.0206],
  [12, 1430, '14:30', 'Oryukdo Skywalk', 'vista', 'Oryukdo Skywalk', '1h 30', 'Pasarela de vidrio suspendida sobre el mar. Mirá los islotes Oryukdo desde el borde.', false, 35.1017, 129.1245],
  [12, 1630, '16:30', 'Tarde de playa', 'naturaleza', 'Songdo / Gwangalli', '2h', 'Relax final: teleférico marino de Songdo o volver a Gwangalli a tomar algo.', false, 35.0758, 129.0158],
  [12, 1930, '19:30', 'Última cena en Busan', 'comida', 'Busan', '2h', 'Date el gusto: barbacoa o cangrejo real (king crab). Última noche del viaje.', true, 35.1532, 129.1187],

  [13, 930, '09:30', 'Última mañana en Busan', 'cafe', 'Busan', '1h 30', 'Café frente al mar y souvenirs de último minuto. Guardá energía para el viaje largo.', false, 35.1587, 129.1604],
  [13, 1130, '11:30', 'Check-out + almuerzo', 'comida', 'Busan Station', '1h', 'Dejá el Airbnb y almorzá cerca de la estación algo rico y liviano.', false, 35.115, 129.0403],
  [13, 1330, '13:30', 'KTX Busan → Seúl', 'transporte', 'Busan Station → Seoul Station', '2h 45', 'KTX directo (~2h45). Reservá con anticipación; llevá agua y snacks.', false, 35.115, 129.0403],
  [13, 1645, '16:45', 'AREX a Incheon', 'transporte', 'Seoul Station → ICN', '1h', 'Del KTX bajás en Seoul Station y ahí mismo tomás el AREX directo al aeropuerto.', false, 37.5547, 126.9707],
  [13, 1815, '18:15', 'Check-in + cena en el aeropuerto', 'transporte', 'Aeropuerto Internacional de Incheon', '2h 30', 'Con 3h de margen: despachá valijas, tax-free y una última comida coreana. Vuelo 23:00. ¡Annyeong!', false, 37.4602, 126.4407]
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
  lng: r[10],
  url: r[11] || ''
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
    name: 'Isla Nami',
    type: 'naturaleza',
    blurb: 'La avenida de metasequoias, escape clásico de Seúl.',
    image: '',
    lat: 37.7902,
    lng: 127.5259
  },
  {
    name: 'Jeonju Hanok Village',
    type: 'cultura',
    blurb: '700 casas hanok y la cuna del bibimbap.',
    image: '',
    lat: 35.8151,
    lng: 127.153
  },
  {
    name: 'Gamcheon Culture Village',
    type: 'vista',
    blurb: 'El "Santorini de Busan": casas de colores en la ladera.',
    image: '',
    lat: 35.0975,
    lng: 129.0106
  },
  {
    name: 'Haedong Yonggungsa',
    type: 'cultura',
    blurb: 'Templo budista sobre las rocas, junto al mar de Busan.',
    image: '',
    lat: 35.1884,
    lng: 129.2233
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
  }
]
