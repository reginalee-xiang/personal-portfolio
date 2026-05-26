import { useState, useEffect, useRef } from 'react'
import { useLocation, Link } from 'react-router-dom'
import { Menu, X, ArrowLeft } from 'lucide-react'

const links = [
  { id: 'hero', label: '首页' },
  { id: 'experience', label: '经历' },
  { id: 'skills', label: '技能' },
  { id: 'contact', label: '联系' },
]

export default function Navbar() {
  const [active, setActive] = useState('hero')
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  const isDetailPage = location.pathname !== '/' && location.pathname !== ''
  const rafRef = useRef(0)

  useEffect(() => {
    if (isDetailPage) return

    const onScroll = () => {
      cancelAnimationFrame(rafRef.current)
      rafRef.current = requestAnimationFrame(() => {
        setScrolled(window.scrollY > 50)

        const sections = links.map(l => document.getElementById(l.id)).filter(Boolean)
        for (let i = sections.length - 1; i >= 0; i--) {
          const el = sections[i]!
          if (el.getBoundingClientRect().top <= 120) {
            setActive(links[i].id)
            break
          }
        }
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(rafRef.current)
    }
  }, [isDetailPage])

  const scrollTo = (id: string) => {
    setMenuOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || isDetailPage
          ? 'bg-black/40 backdrop-blur-xl border-b border-white/5 shadow-lg shadow-black/20'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        {isDetailPage ? (
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors no-underline"
          >
            <ArrowLeft size={18} />
            <span className="text-sm font-medium">返回首页</span>
          </Link>
        ) : (
          <>
            <button
              onClick={() => scrollTo('hero')}
              className="text-lg font-bold text-white tracking-tight cursor-pointer"
            >
              Portfolio
            </button>

            <div className="hidden md:flex items-center gap-1">
              {links.map(l => (
                <button
                  key={l.id}
                  onClick={() => scrollTo(l.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer ${
                    active === l.id
                      ? 'text-white bg-white/10'
                      : 'text-gray-500 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {l.label}
                </button>
              ))}
            </div>

            <button
              className="md:hidden text-gray-400 p-2 cursor-pointer"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </>
        )}
      </div>

      {!isDetailPage && menuOpen && (
        <div className="md:hidden bg-black/60 backdrop-blur-xl border-b border-white/5 px-6 pb-4">
          {links.map(l => (
            <button
              key={l.id}
              onClick={() => scrollTo(l.id)}
              className={`block w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                active === l.id
                  ? 'text-white bg-white/10'
                  : 'text-gray-500 hover:text-white'
              }`}
            >
              {l.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  )
}
