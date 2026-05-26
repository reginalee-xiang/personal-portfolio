import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import profile from '../data/profile'

// 青色科技感配色
const colors = {
  glow: 'bg-cyan-500',
  heading: 'text-cyan-400',
  node: 'bg-cyan-400',
  nodeRing: 'ring-cyan-500/20',
  line: 'bg-cyan-500/10',
  cardBorder: 'hover:border-cyan-500/30',
  cardHover: 'hover:bg-cyan-500/5',
  badge: 'bg-cyan-500/10 border-cyan-500/20 text-cyan-400',
  tag: 'bg-cyan-500/5 border-cyan-500/10 text-cyan-300',
  desc: 'text-gray-400',
  subtext: 'text-gray-500',
}

interface Props {
  onNext?: () => void
}

export default function ExperienceTimeline({ onNext }: Props) {
  return (
    <section id="experience" className="relative py-48 px-6">
      {/* 青色光斑 */}
      <div className={`glow-orb w-[500px] h-[500px] ${colors.glow} top-1/3 -left-48 opacity-[0.06]`} />
      <div className={`glow-orb w-[300px] h-[300px] ${colors.glow} bottom-1/4 right-0 opacity-[0.04]`} />

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-32"
        >
          <p className={`text-xs font-semibold tracking-widest uppercase mb-4 ${colors.heading}`}>
            Experience
          </p>
          <h2 className={`text-3xl md:text-5xl font-bold mb-4 tracking-tight ${colors.heading}`}>
            工作经历
          </h2>
          <p className={colors.subtext}>点击卡片查看完整经历与业绩</p>
        </motion.div>

        <div className="relative">
          {/* 青色竖线 */}
          <div className={`absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 ${colors.line}`} />

          <div className="space-y-24">
            {profile.experiences.map((exp, i) => {
              const isLeft = i % 2 === 0

              return (
                <motion.div
                  key={exp.slug}
                  initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 + i * 0.15 }}
                  className={`relative flex items-center ${
                    isLeft ? 'justify-start' : 'justify-end'
                  }`}
                >
                  {/* 青色节点 */}
                  <div className="absolute left-1/2 -translate-x-1/2 z-20">
                    <div className={`w-5 h-5 rounded-full ${colors.node} ring-4 ${colors.nodeRing} ring-offset-4 ring-offset-[#08090a]`} />
                  </div>

                  <div className={`w-full md:w-[calc(50%-40px)] ${isLeft ? 'md:pr-10' : 'md:pl-10'}`}>
                    <Link
                      to={`/experience/${exp.slug}`}
                      className={`card p-7 block no-underline cursor-pointer group ${colors.cardHover} ${colors.cardBorder} transition-all duration-500`}
                    >
                      <span className={`inline-block text-xs font-medium px-3 py-1 rounded-full border mb-4 ${colors.badge}`}>
                        {exp.period}
                      </span>
                      <h3 className="text-xl font-bold text-white mb-2">
                        {exp.company}
                      </h3>
                      <p className={`text-sm mb-5 ${colors.desc}`}>{exp.role}</p>
                      <p className={`text-sm leading-relaxed mb-5 line-clamp-2 ${colors.subtext}`}>
                        {exp.description}
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {exp.tags.map(tag => (
                          <span
                            key={tag}
                            className={`text-xs font-medium px-2 py-0.5 rounded border ${colors.tag}`}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </Link>
                  </div>
                </motion.div>
              )
            })}
          </div>
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
              className={`px-8 py-3 rounded-full border text-sm font-medium transition-all duration-300 cursor-pointer bg-cyan-500/10 border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/20 hover:border-cyan-500/50`}
            >
              查看专业技能 →
            </button>
          </motion.div>
          </>
        )}
      </div>
    </section>
  )
}
