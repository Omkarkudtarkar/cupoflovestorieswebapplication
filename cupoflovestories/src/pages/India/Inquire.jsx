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

const INDIA_LOCATIONS = [
  'Goa', 'Mumbai', 'Delhi', 'Jaipur', 'Udaipur', 'Jodhpur',
  'Kerala (Alleppey)', 'Kerala (Munnar)', 'Bangalore', 'Chennai',
  'Hyderabad', 'Kolkata', 'Agra', 'Varanasi', 'Rishikesh',
  'Shimla', 'Manali', 'Coorg', 'Ooty', 'Mysore',
  'Andaman Islands', 'Lakshadweep', 'Ranthambore', 'Pushkar',
  'Amritsar', 'Chandigarh', 'Ahmedabad', 'Surat', 'Pune',
]

const SHOOT_TYPES = [
  'Wedding - Full Day',
  'Wedding - Partial Coverage',
  'Pre-Wedding / Engagement',
  'Haldi / Mehendi / Sangeet',
  'Couple Portrait Session',
  'Family Portrait',
  'Special Moments / Surprise Proposal',
  'Destination Story',
]

const DAY_OPTIONS = ['1 Day', '2 Days', '3 Days', '4-5 Days', 'Full Week', 'Not Sure Yet']
const GUEST_OPTIONS = ['Just the Couple', 'Under 50', '50-150', '150-300', '300-500', '500+']
const BUDGET_OPTIONS = [
  'Under Rs 50,000',
  'Rs 50,000 - Rs 1,00,000',
  'Rs 1,00,000 - Rs 2,00,000',
  'Rs 2,00,000 - Rs 5,00,000',
  'Rs 5,00,000+',
  'Flexible / Open to Discuss',
]
const REFERRAL_OPTIONS = [
  'Instagram',
  'Google Search',
  'Friend / Family Referral',
  'Wedding Platform (WedMeGood, ShaadiSaga etc.)',
  'Seen our previous work',
  'Other',
]

export default function IndiaInquire() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    coupleName: '',
    email: '',
    countryCode: '+91',
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
  const [locationOpen, setLocationOpen] = useState(false)
  const codeRef = useRef(null)
  const locationRef = useRef(null)

  const selectedCode = COUNTRY_CODES.find(c => c.code === form.countryCode) || COUNTRY_CODES[0]
  const requiredLen = selectedCode.length || 10
  const filteredCodes = useMemo(() => COUNTRY_CODES.filter(c =>
    c.label.toLowerCase().includes(codeSearch.toLowerCase()) || c.code.includes(codeSearch)
  ), [codeSearch])
  const filteredLocations = useMemo(() => INDIA_LOCATIONS.filter(l =>
    l.toLowerCase().includes(form.location.toLowerCase())
  ), [form.location])

  const inputClass = 'w-full bg-transparent border-0 border-b border-gray-400 py-3 outline-none text-base tracking-wide placeholder-gray-500 focus:border-black focus:border-b-2 transition-all'
  const fieldClass = 'w-full bg-transparent border-0 border-b border-gray-400 py-3 outline-none text-base tracking-wide text-gray-700 placeholder-gray-500 focus:border-black focus:border-b-2 transition-all'

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
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      />

      <div className="pt-24 relative" style={{ isolation: 'isolate' }}>
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
                background: 'rgba(255,255,255,0.9)',
                backdropFilter: 'blur(8px)',
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
                  placeholder="Couple Names (e.g. Arjun & Priya)"
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
                  <div className="relative min-w-[170px]" ref={codeRef}>
                    <button
                      type="button"
                      onClick={() => setCodeOpen(open => !open)}
                      className="w-full flex items-center justify-between gap-2 border-b border-gray-400 py-3 bg-transparent outline-none text-base text-left"
                    >
                      <span>{form.countryCode}</span>
                      <span className="text-xs text-gray-400">v</span>
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
                    className={inputClass}
                    type="tel"
                    name="phone"
                    placeholder={`${requiredLen} digit number`}
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

                <input
                  list="india-shoot-types"
                  name="shootType"
                  value={form.shootType}
                  onChange={handleChange}
                  placeholder="Type of Shoot"
                  className={fieldClass}
                  required
                />
                <datalist id="india-shoot-types">
                  {SHOOT_TYPES.map(option => <option key={option} value={option} />)}
                </datalist>

                <div className="relative" ref={locationRef}>
                  <input
                    className={inputClass}
                    type="text"
                    name="location"
                    placeholder="Location / Venue"
                    value={form.location}
                    onChange={e => {
                      handleChange(e)
                      setLocationOpen(true)
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

                <input
                  list="india-day-options"
                  name="days"
                  value={form.days}
                  onChange={handleChange}
                  placeholder="Number of Days"
                  className={fieldClass}
                  required
                />
                <datalist id="india-day-options">
                  {DAY_OPTIONS.map(option => <option key={option} value={option} />)}
                </datalist>

                <input
                  list="india-guest-options"
                  name="guestCount"
                  value={form.guestCount}
                  onChange={handleChange}
                  placeholder="Approximate Guest Count"
                  className={fieldClass}
                />
                <datalist id="india-guest-options">
                  {GUEST_OPTIONS.map(option => <option key={option} value={option} />)}
                </datalist>

                <input
                  list="india-budget-options"
                  name="budget"
                  value={form.budget}
                  onChange={handleChange}
                  placeholder="Approximate Budget (INR)"
                  className={fieldClass}
                />
                <datalist id="india-budget-options">
                  {BUDGET_OPTIONS.map(option => <option key={option} value={option} />)}
                </datalist>

                <input
                  list="india-referral-options"
                  name="referral"
                  value={form.referral}
                  onChange={handleChange}
                  placeholder="How did you find us?"
                  className={fieldClass}
                />
                <datalist id="india-referral-options">
                  {REFERRAL_OPTIONS.map(option => <option key={option} value={option} />)}
                </datalist>

                <textarea
                  name="message"
                  rows={5}
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Tell us about your love story, wedding vision, mood, and anything special you'd like us to know..."
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
              <a href="https://instagram.com/cupoflovestories" target="_blank" rel="noreferrer" className="text-gray-800 hover:text-amber-500 transition-all duration-500 hover:-translate-y-1 font-medium tracking-wide">Instagram</a>
              <a href="https://wa.me/917022130464" target="_blank" rel="noreferrer" className="text-gray-800 hover:text-amber-500 transition-all duration-500 hover:-translate-y-1 font-medium tracking-wide">WhatsApp / Call</a>
              <a href="https://mail.google.com/mail/?view=cm&fs=1&to=cupoflovestories06@gmail.com" target="_blank" rel="noreferrer" className="text-gray-800 hover:text-amber-500 transition-all duration-500 hover:-translate-y-1 font-medium tracking-wide">Email</a>
            </div>
          </section>
        </ScrollReveal>

        <footer className="text-center pb-16 text-gray-500 text-sm">Copyright 2026 Cup Of Love Stories India</footer>
      </div>
    </div>
  )
}
