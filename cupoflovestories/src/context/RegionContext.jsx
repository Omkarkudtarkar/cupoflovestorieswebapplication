import { createContext, useContext, useState } from 'react'

const RegionContext = createContext()

export function RegionProvider({ children }) {
  const [region, setRegion] = useState(() => {
    return localStorage.getItem('region') || 'india'
  })

  const toggleRegion = () => {
    const next = region === 'india' ? 'europe' : 'india'
    setRegion(next)
    localStorage.setItem('region', next)
  }

  return (
    <RegionContext.Provider value={{ region, toggleRegion }}>
      {children}
    </RegionContext.Provider>
  )
}

export function useRegion() {
  return useContext(RegionContext)
}
