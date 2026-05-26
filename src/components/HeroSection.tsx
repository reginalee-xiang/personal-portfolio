import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import profile from '../data/profile'

interface Props {
  onNext: () => void
  step: number
}

export default function HeroSection({ onNext, step }: Props) {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  return (
    <section
      id="hero"
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-grid"
    >
      {/* 柔白光斑 */}
      <div className="glow-orb w-[700px] h-[700px] bg-white top-1/4 -left-32 opacity-[0.03]" />
      <div className="glow-orb w-[500px] h-[500px] bg-white bottom-20 right-0 opacity-[0.03]" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20" />

      <motion.div style={{ y, opacity }} className="relative z-10 text-center px-6 max-w-3xl">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-gray-500 text-sm font-medium tracking-widest uppercase mb-8"
        >
          {profile.title}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
          className="text-5xl md:text-8xl font-bold text-white mb-12 leading-none tracking-tight"
        >
          {profile.name}
        </motion.h1>

        {/* 关键词胶囊 */}
        <div className="flex flex-wrap justify-center gap-3 mb-24">
          {profile.keywords.map((kw, i) => {
            const classes =
              'px-5 py-2.5 rounded-full text-sm font-medium bg-white/[0.04] border border-white/[0.08] text-gray-400 hover:bg-white/[0.08] hover:border-white/[0.2] hover:text-white transition-all duration-300'

            if (kw.link) {
              return (
                <motion.span
                  key={kw.text}
                  initial={{ opacity: 0, y: 16, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.25 + i * 0.07, ease: 'easeOut' }}
                >
                  <Link to={kw.link} className={`${classes} no-underline inline-block cursor-pointer`}>
                    {kw.text}
                  </Link>
                </motion.span>
              )
            }

            return (
              <motion.span
                key={kw.text}
                initial={{ opacity: 0, y: 16, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.25 + i * 0.07, ease: 'easeOut' }}
                className={classes}
              >
                {kw.text}
              </motion.span>
            )
          })}
        </div>

        {/* 展开按钮 */}
        {step === 0 && (
          <>
            <div className="h-24" />
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              onClick={onNext}
              className="px-8 py-3 rounded-full bg-white text-black font-medium hover:bg-gray-200 hover:shadow-xl hover:shadow-white/10 transition-all duration-300 cursor-pointer border-none text-base"
            >
            查看工作经历
          </motion.button>
          </>
        )}
      </motion.div>
    </section>
  )
}
