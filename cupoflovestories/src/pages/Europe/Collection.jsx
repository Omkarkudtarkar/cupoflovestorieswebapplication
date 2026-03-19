import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'
import GLightbox from 'glightbox'
import 'glightbox/dist/css/glightbox.min.css'

export default function EuropeCollection() {
  const [photos, setPhotos] = useState([])

  useEffect(() => {
    async function fetchPhotos() {
      const { data, error } = await supabase.storage.from('europe-photos').list('', {
        sortBy: { column: 'name', order: 'asc' }
      })
      if (data && !error) {
        const urls = data
          .filter(f => f.name.match(/\.(jpg|jpeg|png|webp)$/i))
          .map(f => {
            const { data: { publicUrl } } = supabase.storage.from('europe-photos').getPublicUrl(f.name, {
              transform: {
                width: 800,
                quality: 75,
                format: 'webp',
              }
            })
            return publicUrl
          })
        setPhotos(urls)
      } else {
        setPhotos([1,2,3,4,5,6].map(n => `/images/europe/photo${n}.jpg`))
      }
    }
    fetchPhotos()
  }, [])

  useEffect(() => {
    if (photos.length === 0) return
    setTimeout(() => {
      const lb = GLightbox({ selector: '.glightbox-europe', loop: true })
      return () => lb.destroy()
    }, 100)
  }, [photos])

  return (
    <div className="pt-24">
      <section className="pt-40 px-6 max-w-6xl mx-auto">
        <h1 className="serif text-5xl text-center mb-16">Collection</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {photos.map((url, i) => (
            <a key={i} href={url} className="glightbox-europe" data-gallery="europe">
              <img
                src={url}
                alt={`Photo ${i+1}`}
                loading="lazy"
                decoding="async"
                className="mb-6 w-full rounded-xl cursor-pointer transition-all duration-500 hover:scale-105 hover:shadow-2xl"
              />
            </a>
          ))}
        </div>
      </section>
      <footer className="text-center py-12 text-gray-500 text-sm">© 2026 Cup Of Love Stories Europe</footer>
    </div>
  )
}
