import { useEffect } from 'react'
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
} from 'react-router-dom'
import AOS from 'aos'
import Footer from './components/Footer'
import Navbar from './components/navbar/Navbar'
import { sectionPageContent } from './data/siteContent'
import ComplaintsPage from './pages/ComplaintsPage'
import HomePage from './pages/HomePage'
import LoanPage from './pages/LoanPage'
import SectionPage from './pages/SectionPage'
import './mobile.css'

function AppRoutes() {
  const location = useLocation()

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'auto',
    })
  }, [location.pathname])

  useEffect(() => {
    AOS.refresh()
  }, [location.pathname])

  return (
    <div className="app-shell">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/loans" element={<LoanPage />} />
          <Route path="/complaints" element={<ComplaintsPage />} />
          <Route
            path="/about"
            element={<SectionPage {...sectionPageContent.about} />}
          />
          <Route
            path="/products"
            element={<SectionPage {...sectionPageContent.products} />}
          />
          <Route
            path="/services"
            element={<SectionPage {...sectionPageContent.services} />}
          />
          <Route
            path="/digital"
            element={<SectionPage {...sectionPageContent.digital} />}
          />
          <Route
            path="/publications"
            element={<SectionPage {...sectionPageContent.publications} />}
          />
          <Route
            path="/announcements"
            element={<SectionPage {...sectionPageContent.announcements} />}
          />
          <Route
            path="/amalgamation"
            element={<SectionPage {...sectionPageContent.amalgamation} />}
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

function App() {
  useEffect(() => {
    AOS.init({
      duration: 700,
      easing: 'ease-out-cubic',
      once: true,
      offset: 60,
    })
  }, [])

  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  )
}

export default App
