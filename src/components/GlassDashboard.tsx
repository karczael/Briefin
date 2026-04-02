"use client"
import { useEffect, useRef, useState } from "react"

// 브리핑 히어로용 — 떠다니는 글래스모피즘 카드 + 카운트업 숫자
// 실제 대시보드의 축소판처럼 보이는 연출

interface CountUpProps {
  end: number
  prefix?: string
  suffix?: string
  duration?: number
  decimals?: number
}

function CountUp({ end, prefix = "", suffix = "", duration = 2000, decimals = 0 }: CountUpProps) {
  const [value, setValue] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const started = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true
          const startTime = performance.now()
          const animate = (now: number) => {
            const elapsed = now - startTime
            const progress = Math.min(elapsed / duration, 1)
            // easeOutExpo
            const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress)
            setValue(eased * end)
            if (progress < 1) requestAnimationFrame(animate)
          }
          requestAnimationFrame(animate)
        }
      },
      { threshold: 0.3 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [end, duration])

  return (
    <span ref={ref}>
      {prefix}{decimals > 0 ? value.toFixed(decimals) : Math.round(value).toLocaleString()}{suffix}
    </span>
  )
}

// 미니 차트 SVG (사인파 기반)
function MiniChart({ color, seed }: { color: string; seed: number }) {
  const points: string[] = []
  for (let i = 0; i <= 30; i++) {
    const x = (i / 30) * 120
    const y = 20 + Math.sin(i * 0.4 + seed) * 8 + Math.sin(i * 0.15 + seed * 2) * 6
    points.push(`${x},${y}`)
  }
  return (
    <svg width="120" height="40" viewBox="0 0 120 40" className="opacity-60">
      <polyline points={points.join(" ")} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

const GLASS_CARDS = [
  {
    label: "KOSPI",
    value: 2680,
    change: "+1.2%",
    changeColor: "text-red-400",
    chartColor: "#F04452",
    seed: 1,
    delay: "0s",
    position: "top-8 left-[5%] sm:left-[8%]",
    float: "animate-float-slow",
  },
  {
    label: "AI 분석 완료",
    value: 147,
    suffix: "건",
    chartColor: "#3B82F6",
    seed: 3,
    delay: "0.5s",
    position: "top-4 right-[5%] sm:right-[8%]",
    float: "animate-float-medium",
  },
  {
    label: "S&P 500",
    value: 5820,
    change: "+0.8%",
    changeColor: "text-red-400",
    chartColor: "#10B981",
    seed: 5,
    delay: "1s",
    position: "bottom-12 left-[10%] sm:left-[15%]",
    float: "animate-float-medium",
  },
  {
    label: "뉴스 수집",
    value: 342,
    suffix: "건",
    chartColor: "#8B5CF6",
    seed: 7,
    delay: "1.5s",
    position: "bottom-8 right-[8%] sm:right-[12%]",
    float: "animate-float-slow",
  },
]

export default function GlassDashboard() {
  return (
    <>
      {/* 커스텀 float 애니메이션 스타일 */}
      <style jsx global>{`
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        @keyframes float-medium {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
        }
        .animate-float-slow {
          animation: float-slow 6s ease-in-out infinite;
        }
        .animate-float-medium {
          animation: float-medium 4.5s ease-in-out infinite;
        }
      `}</style>

      <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
        {/* 배경 그라데이션 원형들 */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/8 rounded-full blur-[120px]" />

        {/* 글래스 카드들 */}
        {GLASS_CARDS.map((card) => (
          <div
            key={card.label}
            className={`absolute ${card.position} ${card.float} hidden sm:block`}
            style={{ animationDelay: card.delay }}
          >
            <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md px-5 py-4 shadow-lg min-w-[160px]">
              <p className="text-[10px] text-white/50 uppercase tracking-wider">{card.label}</p>
              <div className="flex items-baseline gap-2 mt-1">
                <p className="text-lg font-bold text-white/80">
                  <CountUp end={card.value} suffix={card.suffix} />
                </p>
                {card.change && (
                  <span className={`text-xs font-medium ${card.changeColor}`}>{card.change}</span>
                )}
              </div>
              <div className="mt-2">
                <MiniChart color={card.chartColor} seed={card.seed} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
