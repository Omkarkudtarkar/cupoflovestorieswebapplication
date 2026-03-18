import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import { useRegion } from './context/RegionContext'
import Navbar from './components/Navbar'

import IndiaHome from './pages/India/Home'
import IndiaBehind from './pages/India/Behind'
import IndiaCollection from './pages/India/Collection'
import IndiaInformation from './pages/India/Information'
import IndiaInquire from './pages/India/Inquire'

import EuropeHome from './pages/Europe/Home'
import EuropeBehind from './pages/Europe/Behind'
import EuropeCollection from './pages/Europe/Collection'
import EuropeInformation from './pages/Europe/Information'
import EuropeInquire from './pages/Europe/Inquire'

import ThankYou from './pages/ThankYou'
import AdminPage from './pages/Admin/AdminPage'

function RegionRedirect() {
  const { region } = useRegion()
  return <Navigate to={`/${region}/`} replace />
}

export default function App() {
  return (
    <Routes>
      {/* Admin — no navbar */}
      <Route path="/admin" element={<AdminPage />} />

      {/* Thank you — no navbar */}
      <Route path="/thankyou" element={<ThankYou />} />

      {/* All other pages get navbar */}
      <Route path="/*" element={<WithNav />} />
    </Routes>
  )
}

function WithNav() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<RegionRedirect />} />

        <Route path="/india/" element={<IndiaHome />} />
        <Route path="/india/behind" element={<IndiaBehind />} />
        <Route path="/india/collection" element={<IndiaCollection />} />
        <Route path="/india/information" element={<IndiaInformation />} />
        <Route path="/india/inquire" element={<IndiaInquire />} />

        <Route path="/europe/" element={<EuropeHome />} />
        <Route path="/europe/behind" element={<EuropeBehind />} />
        <Route path="/europe/collection" element={<EuropeCollection />} />
        <Route path="/europe/information" element={<EuropeInformation />} />
        <Route path="/europe/inquire" element={<EuropeInquire />} />

        <Route path="*" element={<RegionRedirect />} />
      </Routes>
    </>
  )
}
