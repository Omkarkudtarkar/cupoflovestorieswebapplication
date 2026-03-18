import { useRegion } from '../context/RegionContext'

export default function Footer() {
  const { region } = useRegion()
  return (
    <footer className="text-center py-12 text-gray-500 text-sm">
      © 2026 Cup Of Love Stories {region === 'india' ? 'India' : 'Europe'}
    </footer>
  )
}
