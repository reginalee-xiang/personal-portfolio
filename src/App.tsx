import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import HomePage from './pages/HomePage'
import StarBackground from './components/StarBackground'

const ExperienceDetailPage = lazy(() => import('./pages/ExperienceDetailPage'))
const EducationDetailPage = lazy(() => import('./pages/EducationDetailPage'))
const CodingDetailPage = lazy(() => import('./pages/CodingDetailPage'))

function DetailFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-6 h-6 border-2 border-white/20 border-t-white/60 rounded-full animate-spin" />
    </div>
  )
}

export default function App() {
  return (
    <div className="min-h-screen relative">
      <StarBackground />
      <div className="relative z-10">
        <Navbar />
        <Suspense fallback={<DetailFallback />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/experience/:slug" element={<ExperienceDetailPage />} />
            <Route path="/education/:slug" element={<EducationDetailPage />} />
            <Route path="/coding/:slug" element={<CodingDetailPage />} />
          </Routes>
        </Suspense>
      </div>
    </div>
  )
}
