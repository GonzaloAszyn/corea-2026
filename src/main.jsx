import React from 'react'
import ReactDOM from 'react-dom/client'
import 'leaflet/dist/leaflet.css'
import './index.css'
import App from './App'
import { loadEvents } from './lib/events'
import { loadRatings } from './lib/ratings'
import { loadPhotos } from './lib/photos'
import { loadWeather } from './lib/weather'

loadEvents()
loadRatings()
loadPhotos()
loadWeather()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
