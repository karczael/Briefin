"use client"
import { useEffect, useRef, useCallback } from "react"

// 실제 주요 티커 데이터
const TICKERS = [
  "AAPL +2.3%", "TSLA -1.1%", "NVDA +3.7%", "MSFT +0.8%", "AMZN -0.5%",
  "GOOG +1.2%", "META +2.1%", "NFLX -1.8%", "AMD +4.2%", "INTC -2.3%",
  "삼성전자 +1.5%", "SK하이닉스 +3.2%", "LG에너지 -0.7%", "현대차 +0.9%",
  "KOSPI 2,680", "S&P500 5,820", "NASDAQ 18,430", "BTC $94,200",
  "USD/KRW 1,385", "WTI $78.3", "GOLD $2,340", "US10Y 4.28%",
  "카카오 -1.4%", "네이버 +2.0%", "셀트리온 +1.8%", "POSCO +0.6%",
  "SOX +2.8%", "VIX 14.2", "DXY 104.3", "DAX +0.4%",
]

// 시안/블루/퍼플 그라데이션 색상 팔레트
const COLORS = [
  "rgba(0, 212, 255, A)",   // 시안
  "rgba(59, 130, 246, A)",  // 블루
  "rgba(139, 92, 246, A)",  // 퍼플
  "rgba(6, 182, 212, A)",   // 틸
  "rgba(99, 102, 241, A)",  // 인디고
  "rgba(168, 85, 247, A)",  // 바이올렛
]

interface Particle {
  x: number
  y: number
  speed: number
  text: string
  color: string
  alpha: number
  alphaTarget: number
  fontSize: number
  // 마우스 반발력
  vx: number
  vy: number
}

export default function TickerParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const mouseRef = useRef({ x: -1000, y: -1000 })
  const animFrameRef = useRef<number>(0)

  const createParticle = useCallback((canvasW: number, canvasH: number, startFromTop = false): Particle => {
    const colorTemplate = COLORS[Math.floor(Math.random() * COLORS.length)]
    const alpha = 0.15 + Math.random() * 0.35
    return {
      x: Math.random() * canvasW,
      y: startFromTop ? -20 : Math.random() * canvasH,
      speed: 0.3 + Math.random() * 0.7,
      text: TICKERS[Math.floor(Math.random() * TICKERS.length)],
      color: colorTemplate,
      alpha,
      alphaTarget: alpha,
      fontSize: 10 + Math.floor(Math.random() * 4),
      vx: 0,
      vy: 0,
    }
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // 캔버스 크기 설정
    const resize = () => {
      const dpr = window.devicePixelRatio || 1
      const rect = canvas.getBoundingClientRect()
      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      ctx.scale(dpr, dpr)
    }
    resize()

    // 파티클 수: 화면 크기에 비례 (모바일은 적게)
    const rect = canvas.getBoundingClientRect()
    const count = Math.min(Math.floor((rect.width * rect.height) / 12000), 80)
    particlesRef.current = Array.from({ length: count }, () =>
      createParticle(rect.width, rect.height)
    )

    // 마우스 추적
    const handleMouse = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect()
      mouseRef.current = { x: e.clientX - r.left, y: e.clientY - r.top }
    }
    const handleMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 }
    }
    canvas.addEventListener("mousemove", handleMouse)
    canvas.addEventListener("mouseleave", handleMouseLeave)

    // 애니메이션 루프
    const animate = () => {
      const w = rect.width
      const h = rect.height
      ctx.clearRect(0, 0, w, h)

      const mx = mouseRef.current.x
      const my = mouseRef.current.y
      const repelRadius = 120

      for (const p of particlesRef.current) {
        // 마우스 반발 계산
        const dx = p.x - mx
        const dy = p.y - my
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < repelRadius && dist > 0) {
          const force = (1 - dist / repelRadius) * 3
          p.vx += (dx / dist) * force
          p.vy += (dy / dist) * force
          // 마우스 근처에서 밝아짐
          p.alphaTarget = Math.min(p.alpha + 0.3, 0.8)
        } else {
          p.alphaTarget = p.alpha
        }

        // 감속
        p.vx *= 0.92
        p.vy *= 0.92

        // 위치 업데이트
        p.x += p.vx
        p.y += p.speed + p.vy

        // 화면 밖으로 나가면 재생성
        if (p.y > h + 20) {
          Object.assign(p, createParticle(w, h, true))
        }
        if (p.x < -100) p.x = w + 50
        if (p.x > w + 100) p.x = -50

        // 알파 부드럽게 전환
        const currentAlpha = parseFloat(p.color.split("A)")[0].split(", ").pop() || "0.3")
        const targetAlpha = p.alphaTarget
        const smoothAlpha = currentAlpha + (targetAlpha - currentAlpha) * 0.1
        const renderColor = p.color.replace("A)", `${smoothAlpha.toFixed(2)})`)

        // 렌더링
        ctx.font = `${p.fontSize}px "SF Mono", "Fira Code", "Cascadia Code", monospace`
        ctx.fillStyle = renderColor
        ctx.fillText(p.text, p.x, p.y)
      }

      animFrameRef.current = requestAnimationFrame(animate)
    }
    animate()

    const handleResize = () => {
      resize()
      const newRect = canvas.getBoundingClientRect()
      const newCount = Math.min(Math.floor((newRect.width * newRect.height) / 12000), 80)
      // 파티클 수 조정
      while (particlesRef.current.length < newCount) {
        particlesRef.current.push(createParticle(newRect.width, newRect.height))
      }
      if (particlesRef.current.length > newCount) {
        particlesRef.current.length = newCount
      }
    }
    window.addEventListener("resize", handleResize)

    return () => {
      cancelAnimationFrame(animFrameRef.current)
      canvas.removeEventListener("mousemove", handleMouse)
      canvas.removeEventListener("mouseleave", handleMouseLeave)
      window.removeEventListener("resize", handleResize)
    }
  }, [createParticle])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-auto"
      style={{ zIndex: 0 }}
    />
  )
}
