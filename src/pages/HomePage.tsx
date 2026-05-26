import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import HeroSection from '../components/HeroSection'
import ExperienceTimeline from '../components/ExperienceTimeline'
import Skills from '../components/Skills'
import Footer from '../components/Footer'

export default function HomePage() {
  const [step, setStep] = useState(0)

  const next = useCallback(() => setStep(s => Math.min(s + 1, 3)), [])

  return (
    <>
      <HeroSection onNext={next} step={step} />

      <AnimatePresence mode="wait">
        {step >= 1 && (
          <motion.div
            key="experience"
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <ExperienceTimeline onNext={step < 2 ? next : undefined} />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {step >= 2 && (
          <motion.div
            key="skills"
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <Skills onNext={step < 3 ? next : undefined} />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {step >= 3 && (
          <motion.div
            key="contact"
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
