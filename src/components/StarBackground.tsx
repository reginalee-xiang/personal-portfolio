import { useEffect, useRef } from 'react'

interface Star {
  x: number
  y: number
  r: number
  brightness: number
  phase: number
}

interface Constellation {
  color: string
  stars: { x: number; y: number }[]
}

// 北斗七星 — 位于右上角边缘，避开中心内容区
const bigDipper = {
  color: 'rgba(180, 200, 255, 0.55)',
  stars: [
    { x: 0.94, y: 0.06 },
    { x: 0.89, y: 0.10 },
    { x: 0.84, y: 0.14 },
    { x: 0.80, y: 0.18 },
    { x: 0.76, y: 0.17 },
    { x: 0.73, y: 0.14 },
    { x: 0.70, y: 0.10 },
  ],
}

// 北极星 + 紫微垣 — 左上角
const purpleForbidden = {
  color: 'rgba(200, 180, 220, 0.35)',
  stars: [
    { x: 0.08, y: 0.08 },
    { x: 0.12, y: 0.10 },
    { x: 0.06, y: 0.14 },
    { x: 0.14, y: 0.06 },
  ],
}

// 太微垣 — 左下区域
const supremePalace = {
  color: 'rgba(180, 200, 220, 0.3)',
  stars: [
    { x: 0.15, y: 0.60 },
    { x: 0.20, y: 0.57 },
    { x: 0.18, y: 0.65 },
    { x: 0.24, y: 0.62 },
    { x: 0.22, y: 0.68 },
  ],
}

// 天市垣 — 右下角
const heavenlyMarket = {
  color: 'rgba(190, 200, 210, 0.3)',
  stars: [
    { x: 0.82, y: 0.65 },
    { x: 0.87, y: 0.61 },
    { x: 0.85, y: 0.69 },
    { x: 0.91, y: 0.66 },
    { x: 0.89, y: 0.72 },
    { x: 0.94, y: 0.68 },
  ],
}

// 东方苍龙七宿 — 右上散布
const azureDragon = {
  color: 'rgba(160, 200, 210, 0.28)',
  stars: [
    { x: 0.92, y: 0.30 },
    { x: 0.90, y: 0.26 },
    { x: 0.94, y: 0.24 },
    { x: 0.96, y: 0.28 },
    { x: 0.95, y: 0.33 },
    { x: 0.93, y: 0.36 },
    { x: 0.97, y: 0.32 },
  ],
}

// 西方白虎七宿 — 左侧散布
const whiteTiger = {
  color: 'rgba(200, 200, 210, 0.28)',
  stars: [
    { x: 0.04, y: 0.42 },
    { x: 0.08, y: 0.38 },
    { x: 0.03, y: 0.36 },
    { x: 0.09, y: 0.44 },
    { x: 0.06, y: 0.49 },
    { x: 0.11, y: 0.46 },
  ],
}

// 南方朱雀七宿 — 底部散布
const vermilionBird = {
  color: 'rgba(210, 200, 190, 0.28)',
  stars: [
    { x: 0.35, y: 0.80 },
    { x: 0.40, y: 0.77 },
    { x: 0.38, y: 0.83 },
    { x: 0.44, y: 0.79 },
    { x: 0.42, y: 0.85 },
    { x: 0.47, y: 0.82 },
    { x: 0.37, y: 0.87 },
  ],
}

const constellations: Constellation[] = [
  bigDipper,
  purpleForbidden,
  supremePalace,
  heavenlyMarket,
  azureDragon,
  whiteTiger,
  vermilionBird,
]

export default function StarBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animRef = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // 生成随机背景星
    const bgStars: Star[] = []
    const rng = mulberry32(42) // 固定种子保证一致性
    for (let i = 0; i < 180; i++) {
      bgStars.push({
        x: rng(),
        y: rng(),
        r: 0.3 + rng() * 0.9,
        brightness: 0.15 + rng() * 0.35,
        phase: rng() * Math.PI * 2,
      })
    }

    function resize() {
      const dpr = window.devicePixelRatio || 1
      const w = window.innerWidth
      const h = window.innerHeight
      canvas!.width = w * dpr
      canvas!.height = h * dpr
      canvas!.style.width = w + 'px'
      canvas!.style.height = h + 'px'
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    resize()
    window.addEventListener('resize', resize)

    const C = { w: 0, h: 0 }
    function updateSize() {
      C.w = window.innerWidth
      C.h = window.innerHeight
    }
    updateSize()

    function drawConstellation(con: Constellation, t: number) {
      const { stars, color } = con
      if (stars.length < 2) return

      const pts = stars.map(s => ({ x: s.x * C.w, y: s.y * C.h }))

      // 连线
      ctx!.beginPath()
      ctx!.strokeStyle = color
      ctx!.lineWidth = 0.6
      for (let i = 0; i < pts.length - 1; i++) {
        ctx!.beginPath()
        ctx!.moveTo(pts[i].x, pts[i].y)
        ctx!.lineTo(pts[i + 1].x, pts[i + 1].y)
        ctx!.stroke()
      }

      // 星点 + 光晕
      for (let i = 0; i < stars.length; i++) {
        const { x, y } = pts[i]
        const twinkle = 1 + Math.sin(t * 0.8 + i) * 0.25

        const glowR = 3.5
        const glow = ctx!.createRadialGradient(x, y, 0, x, y, glowR * twinkle)
        glow.addColorStop(0, 'rgba(170,190,220,0.22)')
        glow.addColorStop(1, 'rgba(0,0,0,0)')
        ctx!.beginPath()
        ctx!.arc(x, y, glowR * twinkle, 0, Math.PI * 2)
        ctx!.fillStyle = glow
        ctx!.fill()

        ctx!.beginPath()
        ctx!.arc(x, y, 0.8 * twinkle, 0, Math.PI * 2)
        ctx!.fillStyle = 'rgba(180,200,230,0.7)'
        ctx!.fill()
      }
    }

    function draw(t: number) {
      updateSize()
      ctx!.clearRect(0, 0, C.w, C.h)

      // 背景随机星
      for (const star of bgStars) {
        const sx = star.x * C.w
        const sy = star.y * C.h
        const twinkle = 0.6 + 0.4 * Math.sin(t * 1.2 + star.phase)
        const alpha = star.brightness * twinkle

        ctx!.beginPath()
        ctx!.arc(sx, sy, star.r * twinkle, 0, Math.PI * 2)
        ctx!.fillStyle = `rgba(200,210,230,${alpha})`
        ctx!.fill()
      }

      // 星座连线与星点
      for (const con of constellations) {
        drawConstellation(con, t)
      }

      animRef.current = requestAnimationFrame(draw)
    }

    animRef.current = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(animRef.current)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    />
  )
}

// 确定性伪随机数生成器
function mulberry32(seed: number) {
  return function () {
    seed |= 0
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}
