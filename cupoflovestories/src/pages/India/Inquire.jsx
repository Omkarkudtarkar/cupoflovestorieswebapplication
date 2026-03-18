import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ScrollReveal from '../../components/ScrollReveal'

const COUNTRY_CODES = [
  { code: '+91', flag: '🇮🇳', length: 10 },
  { code: '+33', flag: '🇫🇷', length: 9 },
  { code: '+39', flag: '🇮🇹', length: 10 },
  { code: '+44', flag: '🇬🇧', length: 10 },
]

export default function IndiaInquire() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ name:'', email:'', phone:'', countryCode:'+91', location:'', package:'', message:'' })
  const [sending, setSending] = useState(false)

  const requiredLen = COUNTRY_CODES.find(c => c.code === form.countryCode)?.length || 10

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = async e => {
    e.preventDefault()
    if (form.phone.length !== requiredLen) {
      alert(`Phone must be exactly ${requiredLen} digits.`); return
    }
    setSending(true)
    const data = new FormData()
    data.append('name', form.name)
    data.append('email', form.email)
    data.append('phone', form.countryCode + form.phone)
    data.append('location', form.location)
    data.append('package', form.package)
    data.append('message', form.message)
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

              <div className="flex gap-3">
                <select name="countryCode" value={form.countryCode} onChange={handleChange} className="bg-transparent border-b border-gray-400 py-3 outline-none text-base">
                  {COUNTRY_CODES.map(c => <option key={c.code} value={c.code}>{c.flag} {c.code}</option>)}
                </select>
                <input className="flex-1 bg-transparent border-b border-gray-400 py-3 outline-none text-base placeholder-gray-500" type="tel" name="phone" placeholder={`${requiredLen} digit number`} maxLength={requiredLen} value={form.phone} onChange={e => setForm(f => ({...f, phone: e.target.value.replace(/[^0-9]/g,'')}))} required />
              </div>

              <select name="location" value={form.location} onChange={handleChange} required className="w-full bg-transparent border-b border-gray-400 py-3 outline-none text-base">
                <option value="">Select Location</option>
                {['Goa','Mumbai','Paris','Italy'].map(l => <option key={l}>{l}</option>)}
              </select>

              <select name="package" value={form.package} onChange={handleChange} required className="w-full bg-transparent border-b border-gray-400 py-3 outline-none text-base">
                <option value="">Select Package</option>
                {['Pre-Wedding','Wedding','Special Moments'].map(p => <option key={p}>{p}</option>)}
              </select>

              <textarea className={inputClass} name="message" rows={4} placeholder="Tell us about your requirement" value={form.message} onChange={handleChange} required />

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
            <a href="https://instagram.com/cupoflovestories" target="_blank" rel="noreferrer" className="text-gray-800 hover:text-amber-500 transition-all duration-500 hover:-translate-y-1 font-medium tracking-wide">Instagram</a>
            <a href="https://wa.me/917022130464" target="_blank" rel="noreferrer" className="text-gray-800 hover:text-amber-500 transition-all duration-500 hover:-translate-y-1 font-medium tracking-wide">WhatsApp / Call</a>
            <a href="https://mail.google.com/mail/?view=cm&fs=1&to=cupoflovestories06@gmail.com" target="_blank" rel="noreferrer" className="text-gray-800 hover:text-amber-500 transition-all duration-500 hover:-translate-y-1 font-medium tracking-wide">Email</a>
          </div>
        </section>
      </ScrollReveal>

      <footer className="text-center pb-16 text-gray-500 text-sm">© 2026 Cup Of Love Stories India</footer>
    </div>
  )
}
