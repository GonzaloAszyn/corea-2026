import { useStore } from './store'
import { getEvents } from './events'
import { getRatings } from './ratings'
import { getPhotos } from './photos'
import { getWeather } from './weather'
import { isUnlocked } from './editAccess'

export const useEvents = () => useStore('events', getEvents)
export const useRatings = () => useStore('ratings', getRatings)
export const usePhotos = () => useStore('photos', getPhotos)
export const useWeather = () => useStore('weather', getWeather)
export const useUnlocked = () => useStore('access', isUnlocked)
