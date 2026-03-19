import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import { useRegion } from '../context/RegionContext'

export default function Navbar() {
  const { region, toggleRegion } = useRegion()
  const location = useLocation()
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)
  const base = `/${region}`

  const links = [
    { to: `${base}/`, label: 'Home' },
    { to: `${base}/behind`, label: 'Behind' },
    { to: `${base}/collection`, label: 'Collection' },
    { to: `${base}/information`, label: 'Info' },
    { to: `${base}/inquire`, label: 'Inquire' },
  ]

  const clickCount = useRef(0)
  const clickTimer = useRef(null)

  const handleLogoClick = () => {
    clickCount.current += 1
    clearTimeout(clickTimer.current)
    if (clickCount.current >= 15) {
      clickCount.current = 0
      navigate('/admin')
      return
    }
    clickTimer.current = setTimeout(() => {
      clickCount.current = 0
    }, 5000)
  }

  const handleRegionToggle = () => {
    const newRegion = region === 'india' ? 'europe' : 'india'

    toggleRegion()
    navigate(`/${newRegion}/`, { replace: true })
    window.scrollTo(0, 0)
    setMenuOpen(false)
  }

  useEffect(() => {
    return () => clearTimeout(clickTimer.current)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  useEffect(() => {
    if (!menuOpen) {
      document.body.style.overflow = ''
      return
    }
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  return (
    <nav className="fixed top-0 w-full bg-white/80 backdrop-blur shadow-sm z-50">
      <div className="max-w-6xl mx-auto px-6 py-5 flex justify-between items-center gap-4">
        <h1
          className="text-lg md:text-xl serif tracking-wide cursor-pointer select-none hover:opacity-70 transition"
          onClick={handleLogoClick}
          title="Cup Of Love Stories"
        >
          Cup Of Love Stories {region === 'india' ? 'India' : 'Europe'}
        </h1>

        <div className="hidden md:flex space-x-6 text-sm tracking-wide">
          {links.map(({ to, label }) => {
            const path = location.pathname
            const isActive = path === to || path === to.replace(/\/$/, '')
            return isActive ? (
              <span key={to} className="opacity-40 pointer-events-none">{label}</span>
            ) : (
              <Link key={to} to={to} className="hover:opacity-70 transition">{label}</Link>
            )
          })}
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 md:gap-3 text-xs md:text-sm">
            <span className={region === 'india' ? 'font-semibold' : 'opacity-50'}>India</span>
            <button
              type="button"
              onClick={handleRegionToggle}
              className={`w-12 md:w-14 h-6 md:h-7 rounded-full relative transition-all duration-300 ${
                region === 'europe' ? 'bg-gray-800' : 'bg-gray-300'
              }`}
              aria-label="Toggle region"
            >
              <span
                className={`absolute top-0.5 md:top-1 w-5 h-5 bg-white rounded-full shadow-md transition-all duration-300 ${
                  region === 'europe' ? 'left-6 md:left-8' : 'left-1'
                }`}
              />
            </button>
            <span className={region === 'europe' ? 'font-semibold' : 'opacity-50'}>Europe</span>
          </div>

          <button
            type="button"
            className="md:hidden text-2xl leading-none"
            aria-label="Toggle menu"
            onClick={() => setMenuOpen(open => !open)}
          >
            {menuOpen ? '\u2715' : '\u2630'}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="fixed inset-0 bg-white z-[70] flex flex-col items-center justify-center gap-10 text-2xl serif md:hidden">
          <button
            type="button"
            className="absolute top-6 right-6 text-3xl leading-none"
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
          >
            {'\u2715'}
          </button>
          {links.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className="hover:opacity-60 transition"
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </Link>
          ))}
          <div className="flex items-center gap-4 mt-6 text-base">
            <span>India</span>
            <button
              type="button"
              onClick={handleRegionToggle}
              className={`w-14 h-7 rounded-full relative transition-all duration-300 ${
                region === 'europe' ? 'bg-gray-800' : 'bg-gray-300'
              }`}
              aria-label="Toggle region"
            >
              <span
                className={`absolute top-1 w-5 h-5 bg-white rounded-full shadow-md transition-all duration-300 ${
                  region === 'europe' ? 'left-8' : 'left-1'
                }`}
              />
            </button>
            <span>Europe</span>
          </div>
        </div>
      )}
    </nav>
  )
}
