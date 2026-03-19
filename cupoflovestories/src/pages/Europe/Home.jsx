import { Link } from 'react-router-dom'
import ScrollReveal from '../../components/ScrollReveal'

export default function EuropeHome() {
  return (
    <div className="pt-24">
      <ScrollReveal>
        <section className="relative h-[85vh] w-full">
          <img
            key="europe-hero"
            src="/images/europe/cover.jpg"
            alt="Wedding"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/30" />
          <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6 text-white">
            <span className="tracking-widest text-sm mb-4 uppercase">Destination Wedding Photographer</span>
            <h1 className="serif leading-tight mb-8" style={{ fontSize: 'clamp(2rem, 8vw, 5rem)' }}>
              Because Your Love Deserves
              <br />
              To Look Like A Movie
            </h1>
            <p className="max-w-2xl text-lg text-white/90 mb-10">
              Cinematic, nostalgic storytelling for couples who value emotion over perfection.
            </p>
            <Link to="/europe/collection" className="border border-white px-10 py-4 hover:bg-white hover:text-black transition">
              View The Collection
            </Link>
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section className="max-w-4xl mx-auto px-6 py-28 text-center">
          <h2 className="serif text-4xl mb-8">Moments That Feel Like Film Frames</h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            We document stories across cities, coastlines and old streets, focusing on natural emotion, movement and timeless romance.
            Every image is built to feel like cinema.
          </p>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section className="py-24">
          <img src="/images/europe/cover2.jpg" className="w-full max-w-6xl mx-auto rounded-xl object-cover" alt="" />
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section className="py-28 px-6 text-center relative" style={{ backgroundColor: '#ffffff' }}>
          <div className="absolute inset-0 bg-white" style={{ zIndex: 0 }} />
          <div className="relative z-10">
            <h2 className="serif text-4xl mb-10">Europe Coverage</h2>
            <p className="text-lg text-gray-700 mb-10">Destination Weddings · Elopements · Couple Stories</p>
            <Link to="/europe/information" className="border border-black px-8 py-3 hover:bg-black hover:text-white transition">
              View Experience
            </Link>
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section className="max-w-6xl mx-auto px-6 py-28">
          <div className="columns-1 md:columns-3 gap-6 space-y-6">
            {[1, 2, 3, 4, 5, 6].map(n => <img key={n} src={`/images/europe/photo${n}.jpg`} className="rounded-lg w-full" alt="" />)}
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section className="py-28 px-6 text-center relative" style={{ backgroundColor: '#ece9e2' }}>
          <div className="absolute inset-0" style={{ backgroundColor: '#ece9e2', zIndex: 0 }} />
          <div className="relative z-10">
            <div className="max-w-3xl mx-auto serif text-3xl leading-relaxed">
              "Our gallery looked like a European art film - soft, emotional, timeless."
            </div>
            <div className="mt-6 text-gray-600">- Destination Couple</div>
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section className="py-28 text-center">
          <h2 className="serif text-4xl mb-8">Traveling Across Europe For Stories</h2>
          <Link to="/europe/inquire" className="border border-black px-10 py-4 hover:bg-black hover:text-white transition">
            Start Your Inquiry
          </Link>
        </section>
      </ScrollReveal>

      <footer className="text-center py-12 text-gray-500 text-sm">© 2026 Cup Of Love Stories Europe</footer>
    </div>
  )
}
