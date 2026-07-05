export function gmapsUrl(item) {
  if (item && item.lat != null && item.lng != null) {
    return `https://www.google.com/maps/search/?api=1&query=${item.lat},${item.lng}`
  }
  const q = (item && (item.place || item.name || item.title)) || 'Seoul'
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q + ' Seoul')}`
}
