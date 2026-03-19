import { Link } from 'react-router-dom'
import ScrollReveal from '../../components/ScrollReveal'

export default function EuropeBehind() {
  return (
    <div className="pt-24" style={{ background: '#f5f3ef' }}>
      <ScrollReveal>
        <section className="pt-44 pb-24 px-6">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">
            <div className="relative">
              <img src="/images/europe/behind.jpg" className="w-full rounded-xl object-cover" alt="" />
              <div className="absolute bottom-0 left-0 w-full h-[30%] rounded-b-xl bg-gradient-to-t from-black/40 to-transparent" />
              <div className="absolute bottom-10 left-10">
                <h1 className="serif text-5xl md:text-6xl text-white leading-tight">Behind<br />The Lens</h1>
              </div>
            </div>
            <div>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                I don't just photograph weddings — I document emotion. The in-between glances, the quiet tension before the vows, the way light falls when no one is posing.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Cup Of Love Stories was built on nostalgia, intimacy and movement. Every frame is crafted like cinema — natural, timeless, and deeply personal.
              </p>
            </div>
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section className="py-28 px-6 bg-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="serif text-4xl mb-10">Why I Do What I Do</h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">I believe photography should feel like memory. Not staged. Not forced. Just honest.</p>
            <p className="text-lg text-gray-700 leading-relaxed">The kind of images that feel warm ten years later. The kind you show your children. The kind that age beautifully.</p>
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section className="py-28">
          <img src="/images/europe/behind2.jpg" className="w-full object-cover" alt="" />
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section className="py-28 text-center">
          <h2 className="serif text-4xl mb-8">Let's Create Something Timeless</h2>
          <Link to="/europe/inquire" className="border border-black px-10 py-4 hover:bg-black hover:text-white transition duration-500">
            Start Your Inquiry
          </Link>
        </section>
      </ScrollReveal>

      <footer className="text-center py-12 text-gray-500 text-sm">© 2026 Cup Of Love Stories Europe</footer>
    </div>
  )
}
