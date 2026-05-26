import { useRef, useState, useEffect, useCallback } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, MapPin } from 'lucide-react'
import profile from '../data/profile'

const accentColor = 'text-amber-400'
const accentBorder = 'border-amber-500/20'
const accentBadge = 'bg-amber-500/10 border-amber-500/20 text-amber-400'
const accentTag = 'bg-amber-500/5 border-amber-500/10 text-amber-300'

export default function EducationDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const index = profile.education.findIndex(e => e.slug === slug)
  const edu = profile.education[index]

  if (!edu) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <div className="text-center">
          <p className="text-gray-500 mb-4">未找到该教育经历</p>
          <Link to="/" className="text-white underline underline-offset-4">
            返回首页
          </Link>
        </div>
      </div>
    )
  }

  const prev = index > 0 ? profile.education[index - 1] : null
  const next = index < profile.education.length - 1 ? profile.education[index + 1] : null

  const scrollRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)

  const checkScroll = useCallback(() => {
    const el = scrollRef.current
    if (!el) return
    setCanScrollLeft(el.scrollLeft > 0)
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4)
  }, [])

  useEffect(() => {
    checkScroll()
    window.addEventListener('resize', checkScroll)
    return () => window.removeEventListener('resize', checkScroll)
  }, [checkScroll])

  const scroll = (dir: 'left' | 'right') => {
    const el = scrollRef.current
    if (!el) return
    const cardWidth = el.firstElementChild?.clientWidth ?? 320
    const gap = 16
    el.scrollBy({ left: dir === 'left' ? -(cardWidth + gap) : cardWidth + gap, behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen relative z-10">
      <div className="h-28" />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto px-6 pb-28"
      >
        {/* 头部 */}
        <div className="mb-10">
          <span className={`text-xs font-medium bg-amber-500/10 text-amber-400 px-3 py-1 rounded-full border ${accentBorder}`}>
            {edu.period}
          </span>
          <h1 className="text-2xl md:text-3xl font-bold text-white mt-4 mb-2">{edu.school}</h1>
          <p className="text-gray-400 font-medium">{edu.degree}</p>
          <div className="flex items-center gap-1.5 mt-3 text-gray-600">
            <MapPin size={14} />
            <span className="text-xs">{edu.location}</span>
          </div>
        </div>

        {/* 描述 */}
        <div className="card p-8 mb-8">
          <p className="text-gray-400 leading-relaxed">{edu.description}</p>
        </div>

        {/* 关键项目 - 横向滚动画廊 */}
        {edu.projects && edu.projects.length > 0 && (
          <div className="mb-8">
            <div className="flex items-end justify-between mb-4">
              <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
                研究与项目
              </h2>
              <div className="flex gap-1">
                <button
                  onClick={() => scroll('left')}
                  disabled={!canScrollLeft}
                  className="p-1.5 rounded-full border border-white/10 text-gray-500 hover:text-white hover:border-white/30 disabled:opacity-30 disabled:cursor-default transition-colors"
                >
                  <ChevronLeft size={16} />
                </button>
                <button
                  onClick={() => scroll('right')}
                  disabled={!canScrollRight}
                  className="p-1.5 rounded-full border border-white/10 text-gray-500 hover:text-white hover:border-white/30 disabled:opacity-30 disabled:cursor-default transition-colors"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>

            <div
              ref={scrollRef}
              onScroll={checkScroll}
              className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {edu.projects.map((proj, i) => (
                <motion.div
                  key={proj.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.15 * (i + 1) }}
                  className="card flex-shrink-0 w-[300px] snap-start overflow-hidden group cursor-default"
                >
                  <div className="h-36 bg-gradient-to-br from-amber-500/5 via-amber-500/[0.02] to-amber-500/10 flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-transparent to-amber-500/[0.03] group-hover:to-amber-500/[0.06] transition-colors duration-500" />
                    <span className="text-3xl font-bold text-amber-400/10 tracking-widest select-none">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <div className="p-5">
                    <h3 className="text-sm font-semibold text-white mb-2 group-hover:text-gray-300 transition-colors">
                      {proj.name}
                    </h3>
                    <p className="text-xs text-gray-500 leading-relaxed mb-3 line-clamp-3">
                      {proj.description}
                    </p>
                    {proj.tags && (
                      <div className="flex flex-wrap gap-1">
                        {proj.tags.map(tag => (
                          <span
                            key={tag}
                            className={`text-[10px] px-1.5 py-0.5 rounded border ${accentTag}`}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* 主要成果 */}
        <div className="card p-8 mb-8">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-6">主要成果</h2>
          <ul className="space-y-3.5">
            {edu.achievements.map((a, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-gray-300 leading-relaxed">
                <div className={`w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0 ${accentColor}`} />
                <span>{a}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* 标签 */}
        <div className="card p-8 mb-12">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">关键能力</h2>
          <div className="flex flex-wrap gap-2">
            {edu.tags.map(tag => (
              <span
                key={tag}
                className={`text-xs font-medium px-2.5 py-1 rounded-md border ${accentBadge}`}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* 上/下导航 */}
        <div className="flex justify-between items-center pt-8 border-t border-white/5">
          {prev ? (
            <Link
              to={`/education/${prev.slug}`}
              className="flex items-center gap-2 text-gray-500 hover:text-white transition-colors no-underline group"
            >
              <ChevronLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
              <div>
                <div className="text-xs text-gray-600 mb-0.5">上一条</div>
                <div className="text-sm font-medium">{prev.school}</div>
              </div>
            </Link>
          ) : (
            <div />
          )}
          {next ? (
            <Link
              to={`/education/${next.slug}`}
              className="flex items-center gap-2 text-right text-gray-500 hover:text-white transition-colors no-underline group"
          >
            <div>
              <div className="text-xs text-gray-600 mb-0.5">下一条</div>
              <div className="text-sm font-medium">{next.school}</div>
            </div>
            <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        ) : (
          <div />
        )}
      </div>
    </motion.div>
    </div>
  )
}
