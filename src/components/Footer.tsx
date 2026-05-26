import { motion } from 'framer-motion'
import { Mail, MessageCircle } from 'lucide-react'
import profile from '../data/profile'

// 翠绿色科技感配色
const colors = {
  glow: 'bg-emerald-500',
  heading: 'text-emerald-400',
  cardBorder: 'hover:border-emerald-500/30',
  cardHover: 'hover:bg-emerald-500/5',
  icon: 'text-emerald-500/60',
  subtext: 'text-gray-500',
  label: 'text-emerald-400/60',
}

const contacts = [
  { icon: Mail, label: '邮箱', value: profile.contact.email, href: `mailto:${profile.contact.email}` },
  { icon: MessageCircle, label: '微信', value: profile.contact.wechat, href: undefined },
].filter(c => c.value)

export default function Footer() {
  return (
    <footer id="contact" className="relative pt-96 pb-12 px-6 border-t border-emerald-500/5 md:flex md:justify-end">
      {/* 绿色光斑 */}
      <div className={`glow-orb w-[400px] h-[400px] ${colors.glow} top-1/3 right-1/4 opacity-[0.05]`} />
      <div className={`glow-orb w-[300px] h-[300px] ${colors.glow} bottom-10 left-10 opacity-[0.04]`} />

      <div className="relative z-10 md:max-w-md md:mr-12 w-full">
        <div className="h-64" />
        {/* 标题 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-32 md:text-right"
        >
          <p className={`text-xs font-semibold tracking-widest uppercase mb-4 ${colors.label}`}>
            Contact
          </p>
          <h2 className={`text-3xl md:text-5xl font-bold mb-4 tracking-tight ${colors.heading}`}>
            联系我
          </h2>
          <p className={colors.subtext}>欢迎技术交流与合作机会</p>
        </motion.div>

        {/* 卡片 */}
        <div className="grid md:grid-cols-2 gap-8">
          {contacts.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 + i * 0.1 }}
            >
              {item.href ? (
                <a
                  href={item.href}
                  className={`card p-8 flex flex-col items-center gap-4 no-underline hover:scale-[1.02] transition-all duration-500 ${colors.cardBorder} ${colors.cardHover}`}
                >
                  <item.icon size={28} className={colors.icon} />
                  <span className={`text-xs tracking-widest uppercase ${colors.label}`}>{item.label}</span>
                  <span className="text-sm text-gray-300 font-medium text-center break-all">
                    {item.value}
                  </span>
                </a>
              ) : (
                <div className={`card p-8 flex flex-col items-center gap-4 hover:scale-[1.02] transition-all duration-500 ${colors.cardBorder} ${colors.cardHover}`}>
                  <item.icon size={28} className={colors.icon} />
                  <span className={`text-xs tracking-widest uppercase ${colors.label}`}>{item.label}</span>
                  <span className="text-sm text-gray-300 font-medium">{item.value}</span>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="md:text-right text-center text-gray-700 text-xs mt-8"
        >
          &copy; {new Date().getFullYear()} {profile.name}. All rights reserved.
        </motion.p>
      </div>
    </footer>
  )
}
