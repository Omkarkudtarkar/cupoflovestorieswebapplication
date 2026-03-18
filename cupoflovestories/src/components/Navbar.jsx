import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useRef } from 'react'
import { useRegion } from '../context/RegionContext'

export default function Navbar() {
  const { region, toggleRegion } = useRegion()
  const location = useLocation()
  const navigate = useNavigate()
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
    if (clickCount.current >= 5) {
      clickCount.current = 0
      navigate('/admin')
      return
    }
    clickTimer.current = setTimeout(() => { clickCount.current = 0 }, 3000)
  }

  return (
    <nav className="fixed top-0 w-full bg-white/80 backdrop-blur shadow-sm z-50">
      <div className="max-w-6xl mx-auto px-6 py-5 flex justify-between items-center">

        {/* Logo — click 5× fast to open admin */}
        <h1
          className="text-xl serif tracking-wide cursor-pointer select-none hover:opacity-70 transition"
          onClick={handleLogoClick}
          title="Cup Of Love Stories"
        >
          Cup Of Love Stories {region === 'india' ? 'India' : 'Europe'}
        </h1>

        {/* Nav Links */}
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

        {/* Region Toggle */}
        <div className="flex items-center gap-3 text-sm">
          <span className={region === 'india' ? 'font-semibold' : 'opacity-50'}>India</span>
          <button
            onClick={toggleRegion}
            className={`w-14 h-7 rounded-full relative transition-all duration-300 ${
              region === 'europe' ? 'bg-gray-800' : 'bg-gray-300'
            }`}
            aria-label="Toggle region"
          >
            <span className={`absolute top-1 w-5 h-5 bg-white rounded-full shadow-md transition-all duration-300 ${
              region === 'europe' ? 'left-8' : 'left-1'
            }`} />
          </button>
          <span className={region === 'europe' ? 'font-semibold' : 'opacity-50'}>Europe</span>
        </div>

      </div>
    </nav>
  )
}
