import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ScrollReveal from '../../components/ScrollReveal'

export default function EuropeInquire() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ name:'', email:'', message:'' })
  const [sending, setSending] = useState(false)

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = async e => {
    e.preventDefault()
    setSending(true)
    const data = new FormData()
    Object.entries(form).forEach(([k,v]) => data.append(k, v))
    try {
      await fetch('https://formsubmit.co/ajax/cupoflovestories06@gmail.com', { method:'POST', body: data })
      navigate('/thankyou')
    } catch { alert('Something went wrong. Try again.') }
    setSending(false)
  }

  const inputClass = "w-full bg-transparent border-0 border-b border-gray-400 py-3 outline-none text-base tracking-wide placeholder-gray-500 focus:border-black focus:border-b-2 transition-all"

  return (
    <div className="pt-24" style={{ backgroundImage:"url('/backgrounds/texture.jpg')", backgroundSize:'cover', backgroundAttachment:'fixed' }}>
      <ScrollReveal>
        <section className="pt-44 pb-20 text-center px-6">
          <h1 className="serif text-6xl md:text-7xl mb-6 text-black">Let's Begin Your Story</h1>
          <p className="max-w-2xl mx-auto text-lg text-gray-700 leading-relaxed">
            Tell us about your vision, your connection, and the atmosphere you want to preserve. We'll craft something timeless together.
          </p>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section className="max-w-2xl mx-auto px-6 pb-32">
          <form onSubmit={handleSubmit} style={{ background:'rgba(255,255,255,0.85)', backdropFilter:'blur(12px)', borderRadius:16, padding:'48px 36px', boxShadow:'0 20px 50px rgba(0,0,0,0.15)' }}>
            <div className="space-y-8">
              <input className={inputClass} type="text" name="name" placeholder="Your Name" value={form.name} onChange={handleChange} required />
              <input className={inputClass} type="email" name="email" placeholder="Your Email" value={form.email} onChange={handleChange} required />
              <textarea className={inputClass} name="message" rows={4} placeholder="Tell us about your story, location, and date" value={form.message} onChange={handleChange} required />
              <div className="text-center pt-6">
                <button type="submit" disabled={sending} className="serif border-2 border-black px-10 py-4 text-base tracking-widest hover:bg-black hover:text-white transition-all duration-300 disabled:opacity-50">
                  {sending ? 'SENDING...' : 'SEND INQUIRY'}
                </button>
              </div>
            </div>
          </form>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section className="py-20 text-center">
          <h2 className="serif text-3xl mb-12 font-semibold tracking-wide">Contact Me</h2>
          <div className="flex flex-col md:flex-row justify-center items-center gap-12 text-lg">
            <a href="https://instagram.com/cupoflovestories.eu" target="_blank" rel="noreferrer" className="text-gray-800 hover:text-amber-500 transition-all duration-500 hover:-translate-y-1 font-medium tracking-wide">Instagram</a>
            <a href="https://wa.me/917022130464" target="_blank" rel="noreferrer" className="text-gray-800 hover:text-amber-500 transition-all duration-500 hover:-translate-y-1 font-medium tracking-wide">WhatsApp / Call</a>
            <a href="https://mail.google.com/mail/?view=cm&fs=1&to=cupoflovestories06@gmail.com" target="_blank" rel="noreferrer" className="text-gray-800 hover:text-amber-500 transition-all duration-500 hover:-translate-y-1 font-medium tracking-wide">Email</a>
          </div>
        </section>
      </ScrollReveal>

      <footer className="text-center pb-16 text-gray-500 text-sm">© 2026 Cup Of Love Stories Europe</footer>
    </div>
  )
}
