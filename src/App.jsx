import { Suspense, lazy } from 'react'
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Loader2 } from 'lucide-react'
import BottomNav from './components/BottomNav'
import Itinerary from './pages/Itinerary'

const MapPage = lazy(() => import('./pages/MapPage'))
const Photos = lazy(() => import('./pages/Photos'))

function PageLoader() {
  return (
    <div className="grid h-[70dvh] place-items-center text-primary">
      <Loader2 size={30} className="animate-spin" />
    </div>
  )
}

export default function App() {
  return (
    <HashRouter>
      <div className="mx-auto min-h-[100dvh] max-w-lg bg-background">
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Itinerary />} />
            <Route path="/mapa" element={<MapPage />} />
            <Route path="/fotos" element={<Photos />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
        <BottomNav />
      </div>
    </HashRouter>
  )
}
