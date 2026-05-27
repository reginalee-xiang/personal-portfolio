import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Smartphone, ExternalLink, Wrench, Palette, ChevronLeft, ChevronRight,
  Users, Image, MessageCircle, LayoutGrid, Clock, SwatchBook, Search,
  Sparkles, Box,
} from 'lucide-react'
import profile from '../data/profile'

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  users: Users,
  image: Image,
  'message-circle': MessageCircle,
  'layout-grid': LayoutGrid,
  palette: Palette,
  clock: Clock,
  'swatch-book': SwatchBook,
  search: Search,
}

// 温暖的 Neo-Brutalism 灵感配色
const colors = {
  glow: 'bg-orange-500',
  accent: 'text-orange-400',
  accentBorder: 'border-orange-500/20',
  accentBadge: 'bg-orange-500/10 border-orange-500/20 text-orange-400',
  accentBg: 'bg-orange-500/10',
  heading: 'text-white',
  subtext: 'text-gray-500',
  desc: 'text-gray-400',
  cardBorder: 'border-white/5',
  highlightBorder: 'border-orange-500/30',
  highlightBg: 'bg-orange-500/[0.03]',
}

export default function CodingDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const index = profile.codingProjects.findIndex(c => c.slug === slug)
  const project = profile.codingProjects[index]

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <div className="text-center">
          <p className="text-gray-500 mb-4">未找到该项目</p>
          <Link to="/" className="text-white underline underline-offset-4">
            返回首页
          </Link>
        </div>
      </div>
    )
  }

  const prev = index > 0 ? profile.codingProjects[index - 1] : null
  const next = index < profile.codingProjects.length - 1 ? profile.codingProjects[index + 1] : null
  const hasScreenshots = project.screenshots && project.screenshots.length > 0

  return (
    <div className="min-h-screen relative z-10">
      <div className="h-28" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto px-6 pb-28"
      >
        {/* ========== App Header ========== */}
        <div className="flex flex-col md:flex-row md:items-start gap-8 mb-16">
          {/* App Icon */}
          <div className="flex-shrink-0">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="w-24 h-24 md:w-28 md:h-28 rounded-[22%] bg-gradient-to-br from-orange-400 via-pink-400 to-amber-300 flex items-center justify-center shadow-xl shadow-orange-500/20 ring-1 ring-white/10"
            >
              <Sparkles size={40} className="text-white" />
            </motion.div>
          </div>

          <div className="flex-1 min-w-0">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.15 }}
            >
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 tracking-tight">
                {project.name}
              </h1>
              <p className={`text-lg font-medium mb-3 ${colors.accent}`}>
                {project.tagline}
              </p>
              <p className="text-gray-400 leading-relaxed max-w-2xl">
                {project.description}
              </p>
            </motion.div>
          </div>
        </div>

        {/* ========== Core Concept ========== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className={`card p-6 mb-12 border ${colors.highlightBorder} ${colors.highlightBg}`}
        >
          <div className="flex items-start gap-3">
            <Box size={20} className={`flex-shrink-0 mt-0.5 ${colors.accent}`} />
            <p className="text-gray-300 leading-relaxed italic">
              &ldquo;{project.coreConcept}&rdquo;
            </p>
          </div>
        </motion.div>

        {/* ========== Screenshot Gallery ========== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="mb-16"
        >
          <div className="flex items-end justify-between mb-6">
            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
              应用截图
            </h2>
            {hasScreenshots && (
              <span className="text-xs text-gray-600">{project.screenshots!.length} 张截图</span>
            )}
          </div>

          {hasScreenshots ? (
            <div
              className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-2"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {project.screenshots!.map((src, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 + i * 0.08 }}
                  className="flex-shrink-0 w-[220px] snap-start"
                >
                  {/* Phone Frame */}
                  <div className="relative bg-gray-900 rounded-[2rem] p-2 border-2 border-gray-700 shadow-2xl">
                    <div className="absolute top-3 left-1/2 -translate-x-1/2 w-16 h-1 bg-gray-600 rounded-full z-10" />
                    <div className="rounded-[1.4rem] overflow-hidden bg-gray-100 aspect-[9/16]">
                      <img
                        src={src}
                        alt={`${project.name} 截图 ${i + 1}`}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-2">
              {[1, 2, 3, 4].map(i => (
                <div
                  key={i}
                  className="flex-shrink-0 w-[220px]"
                >
                  <div className="relative bg-gray-900 rounded-[2rem] p-2 border-2 border-gray-800 shadow-2xl opacity-40">
                    <div className="absolute top-3 left-1/2 -translate-x-1/2 w-16 h-1 bg-gray-700 rounded-full z-10" />
                    <div className="rounded-[1.4rem] overflow-hidden bg-gray-800 aspect-[9/16] flex items-center justify-center">
                      <Smartphone size={32} className="text-gray-600" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {!hasScreenshots && (
            <p className="text-center text-gray-600 text-sm mt-4">
              截图即将补充，敬请期待
            </p>
          )}
        </motion.div>

        {/* ========== Features Grid ========== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mb-16"
        >
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-6">
            主要功能
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {project.features.map((feat, i) => {
              const Icon = iconMap[feat.icon] || Box
              return (
                <motion.div
                  key={feat.title}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: 0.35 + i * 0.06 }}
                  className="card p-5 hover:bg-white/[0.04] transition-colors group"
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-9 h-9 rounded-lg ${colors.accentBg} border ${colors.accentBorder} flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform`}>
                      <Icon size={18} className={colors.accent} />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-white mb-1.5">{feat.title}</h3>
                      <p className="text-xs text-gray-500 leading-relaxed">{feat.description}</p>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        {/* ========== Tech Stack ========== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.45 }}
          className="mb-16"
        >
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-6">
            技术实现
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {project.techStack.map((stack, i) => (
              <motion.div
                key={stack.category}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.5 + i * 0.08 }}
                className="card p-5"
              >
                <div className="flex items-center gap-2 mb-3">
                  <Wrench size={14} className="text-gray-600" />
                  <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    {stack.category}
                  </h3>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {stack.items.map(item => (
                    <span
                      key={item}
                      className="text-xs font-medium text-gray-500 bg-white/[0.03] px-2 py-1 rounded border border-white/5"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ========== Links & QR Code ========== */}
        {project.links && project.links.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mb-16"
          >
            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-6">
              体验与联系
            </h2>
            <div className="space-y-4">
              {project.links.map((link, i) => (
                <div key={link.label}>
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.55 + i * 0.08 }}
                    className="card p-4 flex items-center gap-4 hover:bg-white/[0.04] transition-colors group"
                  >
                    <div className={`w-10 h-10 rounded-lg ${colors.accentBg} border ${colors.accentBorder} flex items-center justify-center flex-shrink-0`}>
                      {i === 0 ? (
                        <Smartphone size={20} className={colors.accent} />
                      ) : (
                        <ExternalLink size={20} className={colors.accent} />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      {link.url ? (
                        <Link
                          to={link.url}
                          className="text-sm font-medium text-white group-hover:text-orange-300 transition-colors no-underline"
                        >
                          {link.label}
                        </Link>
                      ) : (
                        <div className="text-sm font-medium text-white group-hover:text-orange-300 transition-colors">
                          {link.label}
                        </div>
                      )}
                      {link.note && (
                        <div className="text-xs text-gray-500 mt-0.5">{link.note}</div>
                      )}
                    </div>
                    {link.url ? (
                      <Link
                        to={link.url}
                        className="text-gray-600 hover:text-white transition-colors"
                      >
                        <ExternalLink size={16} />
                      </Link>
                    ) : (
                      <span className="text-gray-700 text-xs">敬请期待</span>
                    )}
                  </motion.div>

                  {/* QR Code under 体验小程序 */}
                  {i === 0 && project.qrcode && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.6 }}
                      className="card p-5 flex flex-col items-center gap-2 mx-4 mt-3"
                    >
                      <img
                        src={project.qrcode}
                        alt="小程序二维码"
                        className="w-32 h-32 rounded-xl border border-white/5"
                      />
                      <span className="text-xs text-gray-500">微信扫码体验</span>
                    </motion.div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* ========== Navigation ========== */}
        <div className="flex justify-between items-center pt-8 border-t border-white/5">
          {prev ? (
            <Link
              to={`/coding/${prev.slug}`}
              className="flex items-center gap-2 text-gray-500 hover:text-white transition-colors no-underline group"
            >
              <ChevronLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
              <div>
                <div className="text-xs text-gray-600 mb-0.5">上一条</div>
                <div className="text-sm font-medium">{prev.name}</div>
              </div>
            </Link>
          ) : (
            <div />
          )}
          {next ? (
            <Link
              to={`/coding/${next.slug}`}
              className="flex items-center gap-2 text-right text-gray-500 hover:text-white transition-colors no-underline group"
            >
              <div>
                <div className="text-xs text-gray-600 mb-0.5">下一条</div>
                <div className="text-sm font-medium">{next.name}</div>
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
