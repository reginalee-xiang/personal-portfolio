import { useRef, useState, useEffect, useCallback } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { CheckCircle, ChevronLeft, ChevronRight } from 'lucide-react'
import profile from '../data/profile'

export default function ExperienceDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const index = profile.experiences.findIndex(e => e.slug === slug)
  const exp = profile.experiences[index]

  if (!exp) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <div className="text-center">
          <p className="text-gray-500 mb-4">未找到该经历</p>
          <Link to="/" className="text-white underline underline-offset-4">
            返回首页
          </Link>
        </div>
      </div>
    )
  }

  const prev = index > 0 ? profile.experiences[index - 1] : null
  const next = index < profile.experiences.length - 1 ? profile.experiences[index + 1] : null

  // 横向滚动画廊逻辑
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
        <span className="text-xs font-medium text-gray-500 bg-white/5 px-3 py-1 rounded-full border border-white/5">
          {exp.period}
        </span>
        <h1 className="text-2xl md:text-3xl font-bold text-white mt-4 mb-2">{exp.company}</h1>
        <p className="text-gray-400 font-medium">{exp.role}</p>
      </div>

      {/* 描述 */}
      <div className="card p-8 mb-8">
        <p className="text-gray-400 leading-relaxed">{exp.description}</p>
      </div>

      {/* 关键项目 - 横向滚动画廊 */}
      {exp.projects && exp.projects.length > 0 && (
        <div className="mb-8">
          <div className="flex items-end justify-between mb-4">
            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
              关键项目
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
            {exp.projects.map((proj, i) => (
              <motion.div
                key={proj.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.15 * (i + 1) }}
                className="card flex-shrink-0 w-[300px] snap-start overflow-hidden group cursor-default"
              >
                {/* 项目图片 */}
                <div className="h-36 bg-gradient-to-br from-white/5 via-white/[0.02] to-white/10 flex items-center justify-center relative overflow-hidden">
                  {proj.image ? (
                    <img
                      src={proj.image}
                      alt={proj.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <>
                      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-transparent to-white/[0.03] group-hover:to-white/[0.06] transition-colors duration-500" />
                      <span className="text-3xl font-bold text-white/10 tracking-widest select-none">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                    </>
                  )}
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
                          className="text-[10px] text-gray-600 bg-white/[0.03] px-1.5 py-0.5 rounded border border-white/5"
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

      {/* 业绩列表 */}
      <div className="card p-8 mb-8">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-6">主要业绩</h2>
        <ul className="space-y-3.5">
          {exp.achievements.map((a, i) => (
            <li key={i} className="flex items-start gap-3 text-sm text-gray-300 leading-relaxed">
              <CheckCircle size={16} className="text-gray-600 flex-shrink-0 mt-0.5" />
              <span>{a}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* 标签 */}
      <div className="card p-8 mb-12">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">关键能力</h2>
        <div className="flex flex-wrap gap-2">
          {exp.tags.map(tag => (
            <span
              key={tag}
              className="text-xs font-medium text-gray-500 bg-white/5 px-2.5 py-1 rounded-md border border-white/5"
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
            to={`/experience/${prev.slug}`}
            className="flex items-center gap-2 text-gray-500 hover:text-white transition-colors no-underline group"
          >
            <ChevronLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            <div>
              <div className="text-xs text-gray-600 mb-0.5">上一条</div>
              <div className="text-sm font-medium">{prev.company}</div>
            </div>
          </Link>
        ) : (
          <div />
        )}
        {next ? (
          <Link
            to={`/experience/${next.slug}`}
            className="flex items-center gap-2 text-right text-gray-500 hover:text-white transition-colors no-underline group"
          >
            <div>
              <div className="text-xs text-gray-600 mb-0.5">下一条</div>
              <div className="text-sm font-medium">{next.company}</div>
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
