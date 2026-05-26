import { useRef } from 'react'
import { motion } from 'framer-motion'
import profile from '../data/profile'

// 灰色系配色
const colors = {
  glow: 'bg-white',
  heading: 'text-white',
  barFill: 'bg-white/60',
  barTrack: 'bg-white/5',
  subtext: 'text-gray-500',
  catLabel: 'text-gray-500',
}

function SkillBar({ name, level, delay }: { name: string; level: number; delay: number }) {
  const ref = useRef<HTMLDivElement>(null)

  return (
    <div ref={ref} className="space-y-2">
      <div className="flex justify-between text-sm">
        <span className="text-gray-300 font-medium">{name}</span>
        <span className="text-gray-500 text-xs tabular-nums">{level}%</span>
      </div>
      <div className={`h-2 rounded-full overflow-hidden ${colors.barTrack}`}>
        <motion.div
          className={`h-full rounded-full ${colors.barFill}`}
          initial={{ width: 0 }}
          animate={{ width: `${level}%` }}
          transition={{ duration: 0.8, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
        />
      </div>
    </div>
  )
}

interface Props {
  onNext?: () => void
}

export default function Skills({ onNext }: Props) {
  const categories = [...new Set(profile.skills.map(s => s.category))]

  return (
    <section id="skills" className="relative py-48 px-6">
      {/* 灰色光斑 */}
      <div className={`glow-orb w-[500px] h-[500px] ${colors.glow} top-1/2 -right-48 opacity-[0.06]`} />
      <div className={`glow-orb w-[300px] h-[300px] ${colors.glow} bottom-10 left-0 opacity-[0.04]`} />

      <div className="md:flex">
        <div className="hidden md:block md:w-[35%] flex-shrink-0" />
        <div className="max-w-3xl flex-1 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-32 md:text-right"
        >
          <p className={`text-xs font-semibold tracking-widest uppercase mb-4 ${colors.catLabel}`}>
            Skills
          </p>
          <h2 className={`text-3xl md:text-5xl font-bold mb-4 tracking-tight ${colors.heading}`}>
            专业技能
          </h2>
          <p className={colors.subtext}>跨领域积累的能力与资质</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          {categories.map(cat => (
            <div key={cat}>
              <h3 className={`text-xs font-semibold uppercase tracking-widest mb-6 ${colors.catLabel}`}>
                {cat}
              </h3>
              <div className="space-y-6">
                {profile.skills
                  .filter(s => s.category === cat)
                  .map((skill, i) => (
                    <SkillBar
                      key={skill.name}
                      name={skill.name}
                      level={skill.level}
                      delay={0.1 + i * 0.06}
                    />
                  ))}
              </div>
            </div>
          ))}
        </div>

        {onNext && (
          <>
            <div className="h-28" />
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="flex justify-center"
            >
              <button
                onClick={onNext}
                className={`px-8 py-3 rounded-full border text-sm font-medium transition-all duration-300 cursor-pointer bg-white/5 border-white/10 text-gray-400 hover:bg-white/10 hover:border-white/25 hover:text-white`}
              >
                查看联系方式 →
              </button>
            </motion.div>
          </>
        )}
      </div>
      </div>
    </section>
  )
}
