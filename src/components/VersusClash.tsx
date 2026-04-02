"use client"
import { useEffect, useRef } from "react"

// 토론 히어로용 — 매수(빨강) vs 매도(파랑) 에너지 충돌 파티클
// 양쪽에서 중앙으로 파티클이 모여들며 충돌 스파크 발생

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  life: number
  maxLife: number
  side: "buy" | "sell"
  size: number
}

interface Spark {
  x: number
  y: number
  vx: number
  vy: number
  life: number
  maxLife: number
  size: number
  color: string
}

// 매수 = 빨강 계열, 매도 = 파랑 계열
const BUY_COLORS = ["#F04452", "#EF4444", "#F97316", "#FB923C"]
const SELL_COLORS = ["#3182F6", "#3B82F6", "#6366F1", "#818CF8"]

export default function VersusClash() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animRef = useRef(0)
  const particlesRef = useRef<Particle[]>([])
  const sparksRef = useRef<Spark[]>([])
  const mouseRef = useRef({ x: -1000, y: -1000 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let w = 0, h = 0
    const resize = () => {
      const dpr = window.devicePixelRatio || 1
      const rect = canvas.getBoundingClientRect()
      w = rect.width
      h = rect.height
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.scale(dpr, dpr)
    }
    resize()

    const handleMouse = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect()
      mouseRef.current = { x: e.clientX - r.left, y: e.clientY - r.top }
    }
    const handleLeave = () => { mouseRef.current = { x: -1000, y: -1000 } }
    canvas.addEventListener("mousemove", handleMouse)
    canvas.addEventListener("mouseleave", handleLeave)

    const centerX = () => w / 2
    const centerY = () => h / 2

    // 파티클 생성
    const spawnParticle = (side: "buy" | "sell") => {
      const cy = centerY()
      const angle = (Math.random() - 0.5) * Math.PI * 0.6 // +-54도 범위

      let x: number, baseVx: number
      if (side === "buy") {
        x = -10 + Math.random() * w * 0.15
        baseVx = 1.5 + Math.random() * 2
      } else {
        x = w + 10 - Math.random() * w * 0.15
        baseVx = -(1.5 + Math.random() * 2)
      }
      const y = cy + (Math.random() - 0.5) * h * 0.7

      // 약간 중앙을 향하도록
      const toCenterY = (cy - y) * 0.005
      const maxLife = 60 + Math.floor(Math.random() * 80)

      return {
        x, y,
        vx: baseVx + Math.cos(angle) * 0.5,
        vy: Math.sin(angle) * 0.8 + toCenterY,
        life: maxLife,
        maxLife,
        side,
        size: 1 + Math.random() * 2.5,
      } as Particle
    }

    // 충돌 스파크 생성
    const spawnSparks = (x: number, y: number) => {
      const count = 3 + Math.floor(Math.random() * 4)
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2
        const speed = 1 + Math.random() * 3
        const colors = [...BUY_COLORS, ...SELL_COLORS, "#FFFFFF", "#FDE047"]
        sparksRef.current.push({
          x, y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 20 + Math.floor(Math.random() * 20),
          maxLife: 20 + Math.floor(Math.random() * 20),
          size: 0.5 + Math.random() * 1.5,
          color: colors[Math.floor(Math.random() * colors.length)],
        })
      }
    }

    let time = 0
    const animate = () => {
      ctx.clearRect(0, 0, w, h)
      time++

      const particles = particlesRef.current
      const sparks = sparksRef.current
      const cx = centerX()
      const mx = mouseRef.current.x
      const my = mouseRef.current.y

      // 파티클 생성 (매 프레임 1~2개씩 양쪽에서)
      if (time % 2 === 0) {
        particles.push(spawnParticle("buy"))
        particles.push(spawnParticle("sell"))
      }

      // 중앙 에너지 필드 (글로우)
      const centralGlow = ctx.createRadialGradient(cx, h / 2, 0, cx, h / 2, 60)
      const glowIntensity = 0.08 + Math.sin(time * 0.05) * 0.04
      centralGlow.addColorStop(0, `rgba(255, 255, 255, ${glowIntensity})`)
      centralGlow.addColorStop(0.5, `rgba(168, 85, 247, ${glowIntensity * 0.5})`)
      centralGlow.addColorStop(1, "rgba(0, 0, 0, 0)")
      ctx.beginPath()
      ctx.arc(cx, h / 2, 60, 0, Math.PI * 2)
      ctx.fillStyle = centralGlow
      ctx.fill()

      // 파티클 업데이트 + 렌더링
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i]
        p.life--

        // 마우스 근처에서 반발
        const dxm = p.x - mx
        const dym = p.y - my
        const dm = Math.sqrt(dxm * dxm + dym * dym)
        if (dm < 80 && dm > 0) {
          const force = (1 - dm / 80) * 0.5
          p.vx += (dxm / dm) * force
          p.vy += (dym / dm) * force
        }

        p.x += p.vx
        p.y += p.vy
        // 감속
        p.vx *= 0.995
        p.vy *= 0.995

        // 중앙 근처에서 충돌 체크
        const distToCenter = Math.abs(p.x - cx)
        if (distToCenter < 30 && p.life > 10) {
          // 충돌 확률
          if (Math.random() < 0.05) {
            spawnSparks(p.x, p.y)
            p.life = Math.min(p.life, 10) // 소멸 시작
          }
        }

        if (p.life <= 0) {
          particles.splice(i, 1)
          continue
        }

        const alpha = Math.min(p.life / 15, 1) * 0.7
        const colors = p.side === "buy" ? BUY_COLORS : SELL_COLORS
        const color = colors[Math.floor(Math.random() * 0.99 * colors.length)]

        // 트레일 (꼬리)
        const trailAlpha = alpha * 0.3
        ctx.beginPath()
        ctx.arc(p.x - p.vx * 2, p.y - p.vy * 2, p.size * 0.6, 0, Math.PI * 2)
        ctx.fillStyle = color + Math.round(trailAlpha * 255).toString(16).padStart(2, "0")
        ctx.fill()

        // 글로우
        const glow = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 3)
        glow.addColorStop(0, color + Math.round(alpha * 100).toString(16).padStart(2, "0"))
        glow.addColorStop(1, color + "00")
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2)
        ctx.fillStyle = glow
        ctx.fill()

        // 코어
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = color + Math.round(alpha * 255).toString(16).padStart(2, "0")
        ctx.fill()
      }

      // 스파크 업데이트
      for (let i = sparks.length - 1; i >= 0; i--) {
        const s = sparks[i]
        s.life--
        s.x += s.vx
        s.y += s.vy
        s.vx *= 0.95
        s.vy *= 0.95

        if (s.life <= 0) {
          sparks.splice(i, 1)
          continue
        }

        const alpha = (s.life / s.maxLife) * 0.9
        ctx.beginPath()
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2)
        ctx.fillStyle = s.color + Math.round(alpha * 255).toString(16).padStart(2, "0")
        ctx.fill()
      }

      // 파티클 수 제한
      if (particles.length > 300) particles.splice(0, particles.length - 300)
      if (sparks.length > 100) sparks.splice(0, sparks.length - 100)

      animRef.current = requestAnimationFrame(animate)
    }
    animate()

    window.addEventListener("resize", resize)
    return () => {
      cancelAnimationFrame(animRef.current)
      canvas.removeEventListener("mousemove", handleMouse)
      canvas.removeEventListener("mouseleave", handleLeave)
      window.removeEventListener("resize", resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-auto"
      style={{ zIndex: 0 }}
    />
  )
}
