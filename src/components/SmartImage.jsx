import { useState } from 'react'
import { ImageIcon } from 'lucide-react'

export default function SmartImage({
  src,
  alt = '',
  className = '',
  gradient = 'from-primary via-accent to-secondary',
  children,
  Icon = ImageIcon
}) {
  const [loaded, setLoaded] = useState(false)
  const [failed, setFailed] = useState(false)

  return (
    <div className={`relative overflow-hidden bg-gradient-to-br ${gradient} ${className}`}>
      {!failed && src ? (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          onLoad={() => setLoaded(true)}
          onError={() => setFailed(true)}
          className={`h-full w-full object-cover transition-opacity duration-500 ${
            loaded ? 'opacity-100' : 'opacity-0'
          }`}
        />
      ) : null}

      {(failed || !src || !loaded) && (
        <div className="absolute inset-0 grid place-items-center text-white/70">
          <Icon size={30} strokeWidth={1.6} aria-hidden="true" />
        </div>
      )}

      {children}
    </div>
  )
}
