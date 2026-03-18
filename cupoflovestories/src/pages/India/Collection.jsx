import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'
import ScrollReveal from '../../components/ScrollReveal'
import GLightbox from 'glightbox'
import 'glightbox/dist/css/glightbox.min.css'

export default function IndiaCollection() {
  const [photos, setPhotos] = useState([])

  useEffect(() => {
    async function fetchPhotos() {
      // Fetch photos from Supabase storage bucket "india-photos"
      const { data, error } = await supabase.storage.from('india-photos').list('', {
        sortBy: { column: 'name', order: 'asc' }
      })
      if (data && !error) {
        const urls = data
          .filter(f => f.name.match(/\.(jpg|jpeg|png|webp)$/i))
          .map(f => {
            const { data: { publicUrl } } = supabase.storage.from('india-photos').getPublicUrl(f.name)
            return publicUrl
          })
        setPhotos(urls)
      } else {
        // Fallback to local photos if Supabase not set up yet
        setPhotos([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15].map(n => `/images/india/photo${n}.jpg`))
      }
    }
    fetchPhotos()
  }, [])

  useEffect(() => {
    if (photos.length === 0) return
    setTimeout(() => {
      const lb = GLightbox({ selector: '.glightbox-india', loop: true })
      return () => lb.destroy()
    }, 100)
  }, [photos])

  return (
    <div className="pt-24" style={{ backgroundImage: "url('/backgrounds/texture.jpg')", backgroundRepeat: 'repeat' }}>
      <section className="pt-40 px-6 max-w-6xl mx-auto">
        <h1 className="serif text-5xl text-center mb-16">Collection</h1>
        <div className="columns-1 sm:columns-2 md:columns-3 gap-6">
          {photos.map((url, i) => (
            <a key={i} href={url} className="glightbox-india" data-gallery="india">
              <img
                src={url}
                alt={`Photo ${i+1}`}
                className="mb-6 w-full rounded-xl cursor-pointer transition-transform duration-500 hover:scale-105 hover:shadow-2xl"
              />
            </a>
          ))}
        </div>
      </section>
      <footer className="text-center py-12 text-gray-500 text-sm">© 2026 Cup Of Love Stories India</footer>
    </div>
  )
}
