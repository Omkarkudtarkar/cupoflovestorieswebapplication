import ScrollReveal from '../../components/ScrollReveal'

export default function EuropeInformation() {
  return (
    <div className="pt-24 bg-[#f5f3ef]">
      <section className="text-center pt-32 pb-12 px-6">
        <ScrollReveal><h1 className="serif text-5xl mb-4">Honest, Nostalgic, Story-Driven Photography</h1></ScrollReveal>
        <ScrollReveal delay="delay-1">
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Every story is unique — so your experience and coverage should be too. We create custom cinematic photo experiences that reflect your personality and moments.
          </p>
        </ScrollReveal>
      </section>

      <section className="max-w-4xl mx-auto px-6 py-12 space-y-8">
        <ScrollReveal><h2 className="serif text-4xl text-center mb-6">The Way We Photograph Your Story</h2></ScrollReveal>
        {[
          ['01. Inquiry & Chat', 'Tell us about your vision. We discuss location, mood, and what matters most.'],
          ['02. Creative Planning', 'Together we plan your timeline, moodboard, and what feels authentic.'],
          ['03. The Session', 'Casual, natural, emotional — no stiff posing. We follow real moments.'],
          ['04. Gallery Delivery', 'Your photos are delivered with care and cinematic finishing.'],
        ].map(([title, desc], i) => (
          <ScrollReveal key={i} delay={`delay-${i+1}`}>
            <h3 className="text-2xl">{title}</h3>
            <p className="text-gray-700">{desc}</p>
          </ScrollReveal>
        ))}
      </section>

      <section className="bg-white py-12 px-6">
        <ScrollReveal><h2 className="serif text-4xl text-center mb-8">What We Offer</h2></ScrollReveal>
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            ['Wedding Coverage', 'Full day or partial — moments from prep to celebration.', 'Starting at €2,000'],
            ['Portraits & Couples', 'Emotional portrait sessions in natural light.', 'Starting at €300'],
            ['Destination Stories', 'Cinematic travel shoots, tailor-made.', 'Custom pricing'],
            ['Albums & Keepsakes', 'High-quality printed storybooks.', 'Ask for pricing'],
          ].map(([title, desc, price], i) => (
            <ScrollReveal key={i} delay={`delay-${i+1}`}>
              <h3 className="text-2xl">{title}</h3>
              <p className="text-gray-700">{desc}</p>
              <p className="mt-1 font-bold">{price}</p>
            </ScrollReveal>
          ))}
        </div>
      </section>

      <section className="py-12 px-6">
        <ScrollReveal><h2 className="serif text-4xl text-center mb-6">Frequently Asked Questions</h2></ScrollReveal>
        <div className="max-w-4xl mx-auto space-y-6 text-gray-700">
          {[
            ['How do we book a session?', "Send an inquiry via our form or email and we'll take it from there."],
            ['Do you travel?', 'Yes — across Europe and internationally — travel fees may apply.'],
            ['When do we get photos?', 'Delivery is typically 2–6 weeks after your session.'],
          ].map(([q, a], i) => (
            <ScrollReveal key={i} delay={`delay-${i+1}`}>
              <p className="font-bold">{q}</p>
              <p>{a}</p>
            </ScrollReveal>
          ))}
        </div>
      </section>

      <footer className="text-center py-12 text-gray-500 text-sm">© 2026 Cup Of Love Stories Europe</footer>
    </div>
  )
}
