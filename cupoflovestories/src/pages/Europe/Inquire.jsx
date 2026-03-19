import { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ScrollReveal from '../../components/ScrollReveal'

const COUNTRY_CODES = [
  { code: '+91', label: 'India', length: 10 },
  { code: '+1', label: 'USA/Canada', length: 10 },
  { code: '+44', label: 'UK', length: 10 },
  { code: '+33', label: 'France', length: 9 },
  { code: '+49', label: 'Germany', length: 10 },
  { code: '+39', label: 'Italy', length: 10 },
  { code: '+34', label: 'Spain', length: 9 },
  { code: '+31', label: 'Netherlands', length: 9 },
  { code: '+32', label: 'Belgium', length: 9 },
  { code: '+41', label: 'Switzerland', length: 9 },
  { code: '+43', label: 'Austria', length: 10 },
  { code: '+351', label: 'Portugal', length: 9 },
  { code: '+30', label: 'Greece', length: 10 },
  { code: '+48', label: 'Poland', length: 9 },
  { code: '+420', label: 'Czech Republic', length: 9 },
  { code: '+36', label: 'Hungary', length: 9 },
  { code: '+45', label: 'Denmark', length: 8 },
  { code: '+46', label: 'Sweden', length: 9 },
  { code: '+47', label: 'Norway', length: 8 },
  { code: '+358', label: 'Finland', length: 9 },
  { code: '+353', label: 'Ireland', length: 9 },
  { code: '+7', label: 'Russia', length: 10 },
  { code: '+971', label: 'UAE', length: 9 },
  { code: '+966', label: 'Saudi Arabia', length: 9 },
  { code: '+65', label: 'Singapore', length: 8 },
  { code: '+61', label: 'Australia', length: 9 },
  { code: '+64', label: 'New Zealand', length: 9 },
  { code: '+81', label: 'Japan', length: 10 },
  { code: '+82', label: 'South Korea', length: 10 },
  { code: '+86', label: 'China', length: 11 },
  { code: '+55', label: 'Brazil', length: 11 },
  { code: '+52', label: 'Mexico', length: 10 },
  { code: '+27', label: 'South Africa', length: 9 },
]

const EUROPE_LOCATIONS = [
  'Paris, France', 'Nice, France', 'Lyon, France', 'Bordeaux, France',
  'Provence, France', "Cote d'Azur, France", 'Normandy, France',
  'Rome, Italy', 'Florence, Italy', 'Venice, Italy', 'Milan, Italy',
  'Amalfi Coast, Italy', 'Tuscany, Italy', 'Positano, Italy',
  'Lake Como, Italy', 'Cinque Terre, Italy', 'Sicily, Italy',
  'Barcelona, Spain', 'Madrid, Spain', 'Seville, Spain', 'Ibiza, Spain',
  'Mallorca, Spain', 'San Sebastian, Spain',
  'Santorini, Greece', 'Mykonos, Greece', 'Athens, Greece', 'Crete, Greece',
  'Lisbon, Portugal', 'Porto, Portugal', 'Algarve, Portugal', 'Sintra, Portugal',
  'London, UK', 'Edinburgh, Scotland', 'Dublin, Ireland', 'Cotswolds, UK',
  'Swiss Alps, Switzerland', 'Zurich, Switzerland', 'Vienna, Austria', 'Salzburg, Austria',
  'Amsterdam, Netherlands', 'Bruges, Belgium',
  'Prague, Czech Republic', 'Budapest, Hungary', 'Dubrovnik, Croatia',
  'Kotor, Montenegro', 'Ljubljana, Slovenia',
  'Copenhagen, Denmark', 'Stockholm, Sweden', 'Oslo, Norway',
  'Maldives', 'Bali, Indonesia', 'Dubai, UAE', 'New York, USA',
  'Mauritius', 'Seychelles',
]

export default function EuropeInquire() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    coupleName: '',
    email: '',
    countryCode: '',
    phone: '',
    eventDate: '',
    shootType: '',
    location: '',
    days: '',
    guestCount: '',
    budget: '',
    referral: '',
    message: '',
  })
  const [sending, setSending] = useState(false)
  const [codeSearch, setCodeSearch] = useState('')
  const [codeOpen, setCodeOpen] = useState(false)
  const [locationInput, setLocationInput] = useState('')
  const [locationOpen, setLocationOpen] = useState(false)
  const codeRef = useRef(null)
  const locationRef = useRef(null)

  const selectedCode = COUNTRY_CODES.find(c => c.code === form.countryCode) || null
  const requiredLen = selectedCode?.length || 10
  const filteredCodes = useMemo(() => COUNTRY_CODES.filter(c =>
    c.label.toLowerCase().includes(codeSearch.toLowerCase()) || c.code.includes(codeSearch)
  ), [codeSearch])
  const filteredLocations = useMemo(() => EUROPE_LOCATIONS.filter(l =>
    l.toLowerCase().includes(locationInput.toLowerCase())
  ), [locationInput])

  const inputClass = 'w-full bg-transparent border-0 border-b border-gray-400 py-3 outline-none text-base tracking-wide placeholder-gray-500 focus:border-black focus:border-b-2 transition-all'
  const fieldClass = 'w-full bg-transparent border-0 border-b border-gray-400 py-3 outline-none text-base tracking-wide text-gray-700 focus:border-black focus:border-b-2 transition-all appearance-none cursor-pointer'

  useEffect(() => {
    function handleOutsideClick(e) {
      if (codeRef.current && !codeRef.current.contains(e.target)) setCodeOpen(false)
      if (locationRef.current && !locationRef.current.contains(e.target)) setLocationOpen(false)
    }
    document.addEventListener('mousedown', handleOutsideClick)
    return () => document.removeEventListener('mousedown', handleOutsideClick)
  }, [])

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = async e => {
    e.preventDefault()
    if (!form.countryCode) {
      alert('Please select a country code.')
      return
    }
    if (form.phone.length !== requiredLen) {
      alert(`Phone must be exactly ${requiredLen} digits.`)
      return
    }

    setSending(true)
    const data = new FormData()
    data.append('coupleName', form.coupleName)
    data.append('email', form.email)
    data.append('phone', form.countryCode + form.phone)
    data.append('eventDate', form.eventDate)
    data.append('shootType', form.shootType)
    data.append('location', form.location)
    data.append('days', form.days)
    data.append('guestCount', form.guestCount)
    data.append('budget', form.budget)
    data.append('referral', form.referral)
    data.append('message', form.message)

    try {
      await fetch('https://formsubmit.co/ajax/cupoflovestories06@gmail.com', { method: 'POST', body: data })
      navigate('/thankyou')
    } catch {
      alert('Something went wrong. Try again.')
    } finally {
      setSending(false)
    }
  }

  return (
    <div style={{ background: 'none' }} className="relative">
      <div
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: -1,
          backgroundImage: "url('/backgrounds/texture.jpg')",
          backgroundSize: 'cover',
          backgroundAttachment: 'fixed',
          backgroundRepeat: 'no-repeat',
        }}
      />
      <div
        className="pt-24 relative"
        style={{
          backgroundImage: "url('/backgrounds/texture.jpg')",
          backgroundSize: 'cover',
          backgroundAttachment: 'fixed',
          backgroundRepeat: 'no-repeat',
          isolation: 'isolate',
        }}
      >
        <ScrollReveal>
          <section className="pt-44 pb-20 text-center px-6">
            <h1 className="serif text-6xl md:text-7xl mb-6 text-black">Let&apos;s Begin Your Story</h1>
            <p className="max-w-2xl mx-auto text-lg text-gray-700 leading-relaxed">
              Tell us about your vision, your connection, and the atmosphere you want to preserve.
              We&apos;ll craft something timeless together.
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
                <input
                  className={inputClass}
                  type="text"
                  name="coupleName"
                  placeholder="Couple Names (e.g. James & Sofia)"
                  value={form.coupleName}
                  onChange={handleChange}
                  required
                />

                <input
                  className={inputClass}
                  type="email"
                  name="email"
                  placeholder="Your Email Address"
                  value={form.email}
                  onChange={handleChange}
                  required
                />

                <div className="flex gap-3 items-start">
                  <div className="relative min-w-[200px]" ref={codeRef}>
                    <button
                      type="button"
                      onClick={() => setCodeOpen(open => !open)}
                      className="w-full flex items-center justify-between gap-2 border-b border-gray-400 py-3 bg-transparent outline-none text-base text-left"
                    >
                      <span>{form.countryCode || 'Select Country Code'}</span>
                      <span className="text-xs text-gray-400">▼</span>
                    </button>
                    {codeOpen && (
                      <div className="absolute top-12 left-0 z-50 bg-white border border-gray-200 rounded-lg shadow-xl w-72 max-h-64 overflow-y-auto">
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
                            <span>{c.label}</span>
                            <span className="ml-auto text-gray-400 text-xs">{c.code}</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  <input
                    className="flex-1 bg-transparent border-0 border-b border-gray-400 py-3 outline-none text-base tracking-wide placeholder-gray-500 focus:border-black focus:border-b-2 transition-all"
                    type="tel"
                    name="phone"
                    placeholder={form.countryCode ? `${requiredLen} digit number` : 'Enter phone number'}
                    maxLength={requiredLen}
                    value={form.phone}
                    onChange={e => setForm(f => ({ ...f, phone: e.target.value.replace(/[^0-9]/g, '') }))}
                    required
                  />
                </div>

                <input
                  type="date"
                  name="eventDate"
                  value={form.eventDate}
                  onChange={handleChange}
                  className={fieldClass}
                  required
                />

                <select name="shootType" value={form.shootType} onChange={handleChange} className={fieldClass} required>
                  <option value="">Type of Shoot</option>
                  <option>Destination Wedding - Full Day</option>
                  <option>Destination Wedding - Partial Coverage</option>
                  <option>Elopement</option>
                  <option>Engagement / Pre-Wedding Session</option>
                  <option>Couple Portrait Session</option>
                  <option>Honeymoon Story</option>
                  <option>Destination Family Portrait</option>
                  <option>Anniversary Story</option>
                </select>

                <div className="relative" ref={locationRef}>
                  <input
                    className={inputClass}
                    type="text"
                    name="location"
                    placeholder="Location / Venue"
                    value={locationInput}
                    onChange={e => {
                      const value = e.target.value
                      setLocationInput(value)
                      setLocationOpen(true)
                      setForm(f => ({ ...f, location: value }))
                    }}
                    onFocus={() => setLocationOpen(true)}
                    required
                  />
                  {locationOpen && filteredLocations.length > 0 && (
                    <div className="absolute top-12 left-0 z-50 bg-white border border-gray-200 rounded-lg shadow-xl w-full max-h-52 overflow-y-auto">
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

                <select name="days" value={form.days} onChange={handleChange} className={fieldClass} required>
                  <option value="">Number of Days</option>
                  <option>1 Day</option>
                  <option>2 Days</option>
                  <option>3 Days</option>
                  <option>4-7 Days</option>
                  <option>More than a Week</option>
                  <option>Not Sure Yet</option>
                </select>

                <select name="guestCount" value={form.guestCount} onChange={handleChange} className={fieldClass}>
                  <option value="">Approximate Guest Count</option>
                  <option>Just the Two of Us (Elopement)</option>
                  <option>Under 30</option>
                  <option>30-80</option>
                  <option>80-150</option>
                  <option>150+</option>
                </select>

                <select name="budget" value={form.budget} onChange={handleChange} className={fieldClass}>
                  <option value="">Approximate Budget (EUR)</option>
                  <option>Under EUR 1,000</option>
                  <option>EUR 1,000 - EUR 2,500</option>
                  <option>EUR 2,500 - EUR 5,000</option>
                  <option>EUR 5,000 - EUR 10,000</option>
                  <option>EUR 10,000+</option>
                  <option>Flexible / Open to Discuss</option>
                </select>

                <select name="referral" value={form.referral} onChange={handleChange} className={fieldClass}>
                  <option value="">How did you find us?</option>
                  <option>Instagram</option>
                  <option>Google Search</option>
                  <option>Friend / Family Referral</option>
                  <option>Wedding Blog or Magazine</option>
                  <option>Wedding Planner Recommendation</option>
                  <option>Seen our previous work</option>
                  <option>Other</option>
                </select>

                <textarea
                  name="message"
                  rows={5}
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Tell us about your love story, where you're from, the vibe you want, and anything that makes your celebration unique..."
                  className={fieldClass}
                  required
                />

                <div className="text-center pt-6">
                  <button
                    type="submit"
                    disabled={sending}
                    className="serif border-2 border-black px-10 py-4 text-base tracking-widest hover:bg-black hover:text-white transition-all duration-300 disabled:opacity-50"
                  >
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
    </div>
  )
}
