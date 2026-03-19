import { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ScrollReveal from '../../components/ScrollReveal'

const COUNTRY_CODES = [
  { code: '+91', flag: '🇮🇳', label: 'India', length: 10 },
  { code: '+1', flag: '🇺🇸', label: 'USA/Canada', length: 10 },
  { code: '+44', flag: '🇬🇧', label: 'UK', length: 10 },
  { code: '+33', flag: '🇫🇷', label: 'France', length: 9 },
  { code: '+49', flag: '🇩🇪', label: 'Germany', length: 10 },
  { code: '+39', flag: '🇮🇹', label: 'Italy', length: 10 },
  { code: '+34', flag: '🇪🇸', label: 'Spain', length: 9 },
  { code: '+31', flag: '🇳🇱', label: 'Netherlands', length: 9 },
  { code: '+32', flag: '🇧🇪', label: 'Belgium', length: 9 },
  { code: '+41', flag: '🇨🇭', label: 'Switzerland', length: 9 },
  { code: '+43', flag: '🇦🇹', label: 'Austria', length: 10 },
  { code: '+351', flag: '🇵🇹', label: 'Portugal', length: 9 },
  { code: '+30', flag: '🇬🇷', label: 'Greece', length: 10 },
  { code: '+48', flag: '🇵🇱', label: 'Poland', length: 9 },
  { code: '+420', flag: '🇨🇿', label: 'Czech Republic', length: 9 },
  { code: '+36', flag: '🇭🇺', label: 'Hungary', length: 9 },
  { code: '+45', flag: '🇩🇰', label: 'Denmark', length: 8 },
  { code: '+46', flag: '🇸🇪', label: 'Sweden', length: 9 },
  { code: '+47', flag: '🇳🇴', label: 'Norway', length: 8 },
  { code: '+358', flag: '🇫🇮', label: 'Finland', length: 9 },
  { code: '+353', flag: '🇮🇪', label: 'Ireland', length: 9 },
  { code: '+7', flag: '🇷🇺', label: 'Russia', length: 10 },
  { code: '+971', flag: '🇦🇪', label: 'UAE', length: 9 },
  { code: '+966', flag: '🇸🇦', label: 'Saudi Arabia', length: 9 },
  { code: '+65', flag: '🇸🇬', label: 'Singapore', length: 8 },
  { code: '+61', flag: '🇦🇺', label: 'Australia', length: 9 },
  { code: '+64', flag: '🇳🇿', label: 'New Zealand', length: 9 },
  { code: '+81', flag: '🇯🇵', label: 'Japan', length: 10 },
  { code: '+82', flag: '🇰🇷', label: 'South Korea', length: 10 },
  { code: '+86', flag: '🇨🇳', label: 'China', length: 11 },
  { code: '+55', flag: '🇧🇷', label: 'Brazil', length: 11 },
  { code: '+52', flag: '🇲🇽', label: 'Mexico', length: 10 },
  { code: '+27', flag: '🇿🇦', label: 'South Africa', length: 9 },
]

const LOCATIONS = [
  'Goa, India', 'Mumbai, India', 'Delhi, India', 'Jaipur, India',
  'Udaipur, India', 'Kerala, India', 'Bangalore, India', 'Chennai, India',
  'Paris, France', 'Rome, Italy', 'Amalfi Coast, Italy', 'Tuscany, Italy',
  'Santorini, Greece', 'Barcelona, Spain', 'Amsterdam, Netherlands',
  'Prague, Czech Republic', 'Vienna, Austria', 'Swiss Alps, Switzerland',
  'London, UK', 'Dublin, Ireland', 'Lisbon, Portugal', 'Mykonos, Greece',
  'Lake Como, Italy', 'Positano, Italy', 'Dubrovnik, Croatia',
  'Maldives', 'Bali, Indonesia', 'Dubai, UAE', 'New York, USA',
]

export default function IndiaInquire() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    countryCode: '+91',
    location: '',
    package: '',
    message: '',
  })
  const [sending, setSending] = useState(false)
  const [codeSearch, setCodeSearch] = useState('')
  const [codeOpen, setCodeOpen] = useState(false)
  const [locationInput, setLocationInput] = useState('')
  const [locationOpen, setLocationOpen] = useState(false)
  const codeRef = useRef(null)
  const locationRef = useRef(null)

  const selectedCode = COUNTRY_CODES.find(c => c.code === form.countryCode) || COUNTRY_CODES[0]
  const requiredLen = selectedCode.length || 10
  const filteredCodes = useMemo(() => COUNTRY_CODES.filter(c =>
    c.label.toLowerCase().includes(codeSearch.toLowerCase()) ||
    c.code.includes(codeSearch)
  ), [codeSearch])
  const filteredLocations = useMemo(() => LOCATIONS.filter(l =>
    l.toLowerCase().includes(locationInput.toLowerCase())
  ), [locationInput])

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  useEffect(() => {
    function handleOutsideClick(e) {
      if (codeRef.current && !codeRef.current.contains(e.target)) {
        setCodeOpen(false)
      }
      if (locationRef.current && !locationRef.current.contains(e.target)) {
        setLocationOpen(false)
      }
    }
    document.addEventListener('mousedown', handleOutsideClick)
    return () => document.removeEventListener('mousedown', handleOutsideClick)
  }, [])

  const handleSubmit = async e => {
    e.preventDefault()
    if (form.phone.length !== requiredLen) {
      alert(`Phone must be exactly ${requiredLen} digits.`)
      return
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
      await fetch('https://formsubmit.co/ajax/cupoflovestories06@gmail.com', { method: 'POST', body: data })
      navigate('/thankyou')
    } catch {
      alert('Something went wrong. Try again.')
    }
    setSending(false)
  }

  const inputClass = 'w-full bg-transparent border-0 border-b border-gray-400 py-3 outline-none text-base tracking-wide placeholder-gray-500 focus:border-black focus:border-b-2 transition-all'

  return (
    <div className="pt-24" style={{ backgroundImage: "url('/backgrounds/texture.jpg')", backgroundSize: 'cover', backgroundAttachment: 'fixed' }}>
      <ScrollReveal>
        <section className="pt-44 pb-20 text-center px-6">
          <h1 className="serif text-6xl md:text-7xl mb-6 text-black">Let's Begin Your Story</h1>
          <p className="max-w-2xl mx-auto text-lg text-gray-700 leading-relaxed">
            Tell us about your vision, your connection, and the atmosphere you want to preserve. We&apos;ll craft something timeless together.
          </p>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section className="max-w-2xl mx-auto px-6 pb-32">
          <form
            onSubmit={handleSubmit}
            style={{
              background: 'rgba(255,255,255,0.85)',
              backdropFilter: 'blur(12px)',
              borderRadius: 16,
              padding: 'clamp(24px, 5vw, 48px) clamp(16px, 4vw, 36px)',
              boxShadow: '0 20px 50px rgba(0,0,0,0.15)',
            }}
          >
            <div className="space-y-8">
              <input className={inputClass} type="text" name="name" placeholder="Your Name" value={form.name} onChange={handleChange} required />
              <input className={inputClass} type="email" name="email" placeholder="Your Email" value={form.email} onChange={handleChange} required />

              <div className="flex gap-3 items-start">
                <div className="relative" ref={codeRef}>
                  <button
                    type="button"
                    onClick={() => setCodeOpen(open => !open)}
                    className="flex items-center gap-2 border-b border-gray-400 py-3 bg-transparent outline-none text-base min-w-[130px]"
                  >
                    <span>{selectedCode.flag}</span>
                    <span>{form.countryCode}</span>
                    <span className="ml-1 text-xs text-gray-400">▼</span>
                  </button>
                  {codeOpen && (
                    <div className="absolute top-12 left-0 z-50 bg-white border border-gray-200 rounded-lg shadow-xl w-64 max-h-60 overflow-y-auto">
                      <input
                        type="text"
                        placeholder="Search country..."
                        value={codeSearch}
                        onChange={e => setCodeSearch(e.target.value)}
                        className="w-full px-3 py-2 text-sm border-b border-gray-100 outline-none sticky top-0 bg-white"
                        autoFocus
                      />
                      {filteredCodes.map(c => (
                        <button
                          key={`${c.code}-${c.label}`}
                          type="button"
                          onClick={() => {
                            setForm(f => ({ ...f, countryCode: c.code, phone: '' }))
                            setCodeOpen(false)
                            setCodeSearch('')
                          }}
                          className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50 flex items-center gap-2"
                        >
                          <span>{c.flag}</span>
                          <span>{c.label}</span>
                          <span className="ml-auto text-gray-400 text-xs">{c.code}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <input
                  className="flex-1 bg-transparent border-b border-gray-400 py-3 outline-none text-base placeholder-gray-500"
                  type="tel"
                  name="phone"
                  placeholder={`${requiredLen} digit number`}
                  maxLength={requiredLen}
                  value={form.phone}
                  onChange={e => setForm(f => ({ ...f, phone: e.target.value.replace(/[^0-9]/g, '') }))}
                  required
                />
              </div>

              <div className="relative" ref={locationRef}>
                <input
                  type="text"
                  placeholder="Type your location..."
                  value={locationInput}
                  onChange={e => {
                    setLocationInput(e.target.value)
                    setLocationOpen(true)
                    setForm(f => ({ ...f, location: e.target.value }))
                  }}
                  onFocus={() => setLocationOpen(true)}
                  className={inputClass}
                  required
                />
                {locationOpen && filteredLocations.length > 0 && (
                  <div className="absolute top-12 left-0 z-50 bg-white border border-gray-200 rounded-lg shadow-xl w-full max-h-48 overflow-y-auto">
                    {filteredLocations.map(loc => (
                      <button
                        key={loc}
                        type="button"
                        onMouseDown={() => {
                          setLocationInput(loc)
                          setForm(f => ({ ...f, location: loc }))
                          setLocationOpen(false)
                        }}
                        className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50"
                      >
                        {loc}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <select name="package" value={form.package} onChange={handleChange} required className="w-full bg-transparent border-b border-gray-400 py-3 outline-none text-base">
                <option value="">Select Package</option>
                {['Pre-Wedding', 'Wedding', 'Special Moments'].map(p => <option key={p}>{p}</option>)}
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
