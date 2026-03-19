import { Link } from 'react-router-dom'
import ScrollReveal from '../../components/ScrollReveal'

export default function IndiaHome() {
  return (
    <div
      className="pt-24"
      style={{
        backgroundImage: "url('/backgrounds/vintage.jpg')",
        backgroundRepeat: 'repeat',
        backgroundSize: '400px 400px',
      }}
    >
      {/* HERO */}
      <ScrollReveal>
        <section className="relative h-[85vh] w-full">
          <img src="/images/india/cover.jpg" alt="Wedding" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/30" />
          <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6 text-white">
            <span className="tracking-widest text-sm mb-4 uppercase">Destination Wedding Photographer</span>
            <h1 className="serif leading-tight mb-8" style={{ fontSize: 'clamp(2rem, 8vw, 5rem)' }}>
              Because Your Love Deserves<br />To Look Like A Movie
            </h1>
            <p className="max-w-2xl text-lg text-white/90 mb-10">
              Cinematic, nostalgic storytelling for couples who value emotion over perfection.
            </p>
            <Link to="/india/collection" className="border border-white px-10 py-4 hover:bg-white hover:text-black transition">
              View The Collection
            </Link>
          </div>
        </section>
      </ScrollReveal>

      {/* FEATURE IMAGE */}
      <ScrollReveal>
        <section className="py-24">
          <img src="/images/india/cover2.jpg" className="w-full h-auto object-cover" alt="" />
        </section>
      </ScrollReveal>

      {/* OFFERINGS */}
      <ScrollReveal>
        <section className="py-28 px-6 text-center bg-white">
          <h2 className="serif text-4xl mb-10">What We Photograph</h2>
          <p className="text-lg text-gray-700 mb-10">Weddings · Engagements · Couples · Vintage Stories</p>
          <Link to="/india/information" className="border border-black px-8 py-3 hover:bg-black hover:text-white transition">
            View Experience
          </Link>
        </section>
      </ScrollReveal>

      {/* MASONRY GRID */}
      <ScrollReveal>
        <section className="max-w-6xl mx-auto px-6 py-28">
          <div className="columns-1 md:columns-3 gap-6 space-y-6">
            {[1,2,3,4,5,6].map(n => (
              <img key={n} src={`/images/india/photo${n}.jpg`} className="rounded-lg w-full" alt="" />
            ))}
          </div>
        </section>
      </ScrollReveal>

      {/* TESTIMONIAL */}
      <ScrollReveal>
        <section className="py-28 px-6 text-center bg-[#ece9e2]">
          <div className="max-w-3xl mx-auto serif text-3xl leading-relaxed">
            "It didn't feel like a photoshoot — it felt like a memory unfolding."
          </div>
          <div className="mt-6 text-gray-600">— Couple Story</div>
        </section>
      </ScrollReveal>

      {/* CTA */}
      <ScrollReveal>
        <section className="py-28 text-center">
          <h2 className="serif text-4xl mb-8">Let's Tell Your Story</h2>
          <Link to="/india/inquire" className="border border-black px-10 py-4 hover:bg-black hover:text-white transition">
            Start Your Inquiry
          </Link>
        </section>
      </ScrollReveal>

      <footer className="text-center py-12 text-gray-500 text-sm">
        © 2026 Cup Of Love Stories India
      </footer>
    </div>
  )
}
