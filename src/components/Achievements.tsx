import { motion } from 'framer-motion'
import AnimatedCounter from './AnimatedCounter'
import profile from '../data/profile'

export default function Achievements() {
  return (
    <section id="achievements" className="relative py-36 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">
            核心成就
          </h2>
          <p className="text-gray-500">数据驱动的业绩展示</p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {profile.achievements.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="card p-8 text-center"
            >
              <AnimatedCounter
                value={item.value}
                prefix={item.prefix}
                suffix={item.suffix}
              />
              <p className="text-gray-500 text-sm mt-3">{item.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
