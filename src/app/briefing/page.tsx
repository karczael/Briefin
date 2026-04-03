"use client"
import { BarChart3, Headphones, Clock, Check, ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import dynamic from "next/dynamic"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { ANALYSTS } from "@/lib/constants"

const GlassDashboard = dynamic(() => import("@/components/GlassDashboard"), { ssr: false })

// 브리핑 담당 애널리스트
const BRIEFING_ANALYSTS = ANALYSTS.filter(a =>
  ["kim_seongjin", "lee_junhyuk", "han_mirae", "na_daeun"].includes(a.id)
)

export default function BriefingPage() {
  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero — 글래스모피즘 대시보드 프리뷰 */}
      <section className="relative px-6 pt-32 pb-20 overflow-hidden" style={{ background: "linear-gradient(180deg, #070b1a 0%, #0d1117 60%, hsl(var(--background)) 100%)" }}>
        <GlassDashboard />
        <div className="absolute inset-0 bg-gradient-to-b from-[#070b1a]/40 via-transparent to-[#0d1117]/70 pointer-events-none" style={{ zIndex: 1 }} />
        <div className="relative mx-auto max-w-4xl text-center" style={{ zIndex: 2 }}>
          <div className="inline-flex items-center gap-2 rounded-full bg-blue-500/10 px-4 py-2 text-sm font-medium text-blue-400 mb-6 backdrop-blur-sm">
            <BarChart3 className="h-4 w-4" /> AI 브리핑
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold leading-tight">
            매일 아침·점심·저녁<br />
            <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">AI가 시장을 정리</span>합니다
          </h1>
          <p className="mt-6 text-lg text-[hsl(var(--muted-foreground))] max-w-2xl mx-auto">
            10명의 AI 전문가가 뉴스, 시장 데이터, 해외 헤드라인을 종합 분석하여
            하루 3번 브리핑을 생성합니다. 출근 전 10분이면 충분합니다.
          </p>
          <Link href="/#pricing" className="mt-8 inline-block rounded-2xl bg-blue-500 px-8 py-4 font-semibold text-white hover:bg-blue-600 transition-all hover:scale-[1.02]">
            무료로 시작하기
          </Link>
        </div>
      </section>

      {/* 브리핑 타임라인 */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-2xl font-bold text-center mb-4">하루 3번, 시장의 흐름을 잡습니다</h2>
          <p className="text-center text-[hsl(var(--muted-foreground))] mb-12">각 브리핑은 해당 시간대에 맞는 데이터를 기반으로 생성됩니다</p>

          <div className="grid gap-6 md:grid-cols-3">
            {/* 모닝 브리핑 */}
            <div className="rounded-3xl bg-gradient-to-br from-blue-600 to-blue-800 p-8 text-white">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="h-5 w-5 opacity-70" />
                <p className="text-sm font-medium opacity-70">AM 07:00</p>
              </div>
              <h3 className="text-xl font-bold">모닝 브리핑</h3>
              <p className="mt-3 text-sm opacity-80">전일 미국·유럽 마감과 조간 뉴스를 분석하여 오늘의 시장 전망을 제시합니다.</p>
              <ul className="mt-5 space-y-2.5 text-sm opacity-85">
                <li className="flex items-start gap-2"><span className="mt-0.5 h-1.5 w-1.5 rounded-full bg-white/60 shrink-0" />전일 미국/유럽 증시 마감 요약</li>
                <li className="flex items-start gap-2"><span className="mt-0.5 h-1.5 w-1.5 rounded-full bg-white/60 shrink-0" />CNBC·Investing.com 해외 헤드라인</li>
                <li className="flex items-start gap-2"><span className="mt-0.5 h-1.5 w-1.5 rounded-full bg-white/60 shrink-0" />오늘 KOSPI/KOSDAQ 전망</li>
                <li className="flex items-start gap-2"><span className="mt-0.5 h-1.5 w-1.5 rounded-full bg-white/60 shrink-0" />주목할 종목 3~5개 분석</li>
                <li className="flex items-start gap-2"><span className="mt-0.5 h-1.5 w-1.5 rounded-full bg-white/60 shrink-0" />애널리스트 4명의 관점 비교</li>
              </ul>
            </div>

            {/* 점심 브리핑 */}
            <div className="rounded-3xl bg-gradient-to-br from-emerald-600 to-teal-800 p-8 text-white">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="h-5 w-5 opacity-70" />
                <p className="text-sm font-medium opacity-70">PM 12:00</p>
              </div>
              <h3 className="text-xl font-bold">점심 브리핑</h3>
              <p className="mt-3 text-sm opacity-80">오전 장 흐름과 수급 데이터를 기반으로 오후 전략을 제안합니다.</p>
              <ul className="mt-5 space-y-2.5 text-sm opacity-85">
                <li className="flex items-start gap-2"><span className="mt-0.5 h-1.5 w-1.5 rounded-full bg-white/60 shrink-0" />오전 장 흐름 + 등락률 분석</li>
                <li className="flex items-start gap-2"><span className="mt-0.5 h-1.5 w-1.5 rounded-full bg-white/60 shrink-0" />외국인/기관 오전 순매매 동향</li>
                <li className="flex items-start gap-2"><span className="mt-0.5 h-1.5 w-1.5 rounded-full bg-white/60 shrink-0" />섹터별 강약 분석</li>
                <li className="flex items-start gap-2"><span className="mt-0.5 h-1.5 w-1.5 rounded-full bg-white/60 shrink-0" />오후 전략 제안</li>
              </ul>
            </div>

            {/* 클로징 브리핑 */}
            <div className="rounded-3xl bg-gradient-to-br from-indigo-600 to-purple-800 p-8 text-white">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="h-5 w-5 opacity-70" />
                <p className="text-sm font-medium opacity-70">PM 04:00</p>
              </div>
              <h3 className="text-xl font-bold">클로징 브리핑</h3>
              <p className="mt-3 text-sm opacity-80">하루 전체를 리뷰하고 해외 이슈를 반영하여 내일 전략을 제시합니다.</p>
              <ul className="mt-5 space-y-2.5 text-sm opacity-85">
                <li className="flex items-start gap-2"><span className="mt-0.5 h-1.5 w-1.5 rounded-full bg-white/60 shrink-0" />오늘 시장 종합 리뷰</li>
                <li className="flex items-start gap-2"><span className="mt-0.5 h-1.5 w-1.5 rounded-full bg-white/60 shrink-0" />수급 분석 + 섹터 마감 정리</li>
                <li className="flex items-start gap-2"><span className="mt-0.5 h-1.5 w-1.5 rounded-full bg-white/60 shrink-0" />해외 헤드라인 + 내일 이슈</li>
                <li className="flex items-start gap-2"><span className="mt-0.5 h-1.5 w-1.5 rounded-full bg-white/60 shrink-0" />애널리스트별 고유 관점 비교 (Premium)</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 브리핑 데이터 파이프라인 */}
      <section className="px-6 py-20 bg-[hsl(var(--card))]/50">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-2xl font-bold text-center mb-4">일반론이 아닙니다</h2>
          <p className="text-center text-[hsl(var(--muted-foreground))] mb-12">실제 뉴스와 시장 데이터를 기반으로 생성됩니다</p>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { emoji: "📰", title: "실시간 뉴스", desc: "한국경제, 매일경제 등 4개 매체 RSS 크롤링 + AI 요약" },
              { emoji: "🌐", title: "해외 헤드라인", desc: "CNBC, Investing.com에서 글로벌 이슈 실시간 수집" },
              { emoji: "📊", title: "시장 데이터", desc: "글로벌 25개 지표 + 섹터별 등락 + 투자자 수급" },
              { emoji: "🔥", title: "급등/급락 종목", desc: "상승률·하락률 상위 종목 + 거래대금 상위" },
            ].map((item) => (
              <div key={item.title} className="rounded-2xl bg-[hsl(var(--card))] p-6 border border-[hsl(var(--border))]">
                <span className="text-2xl">{item.emoji}</span>
                <h4 className="mt-3 font-bold text-sm">{item.title}</h4>
                <p className="mt-2 text-xs text-[hsl(var(--muted-foreground))] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-sm text-[hsl(var(--muted-foreground))]">
            <span className="rounded-full bg-blue-500/10 px-3 py-1 text-blue-400 text-xs sm:text-sm">데이터 수집</span>
            <ArrowRight className="h-4 w-4 hidden sm:block" />
            <span className="rounded-full bg-blue-500/10 px-3 py-1 text-blue-400 text-xs sm:text-sm">AI 분석</span>
            <ArrowRight className="h-4 w-4 hidden sm:block" />
            <span className="rounded-full bg-blue-500/10 px-3 py-1 text-blue-400 text-xs sm:text-sm">브리핑 생성</span>
            <ArrowRight className="h-4 w-4 hidden sm:block" />
            <span className="rounded-full bg-blue-500/10 px-3 py-1 text-blue-400 text-xs sm:text-sm">푸시 알림</span>
          </div>
        </div>
      </section>

      {/* 담당 애널리스트 */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-2xl font-bold text-center mb-4">브리핑 담당 AI 애널리스트</h2>
          <p className="text-center text-[hsl(var(--muted-foreground))] mb-12">각 애널리스트의 고유한 관점으로 시장을 다각도 분석합니다</p>

          <div className="grid gap-6 sm:grid-cols-2">
            {BRIEFING_ANALYSTS.map((a) => (
              <div key={a.id} className="rounded-2xl bg-[hsl(var(--card))] p-6 border border-[hsl(var(--border))] flex gap-4">
                <Image src={`/analysts/${a.id}.png`} alt={a.name} width={64} height={64} className="h-16 w-16 rounded-full object-cover border-2 border-[hsl(var(--border))] shrink-0" />
                <div>
                  <p className="font-bold">{a.name}</p>
                  <p className="text-sm text-blue-400">{a.title}</p>
                  <p className="text-xs text-[hsl(var(--muted-foreground))] mt-1">{a.school}</p>
                  <p className="text-xs text-[hsl(var(--muted-foreground))] mt-2 italic">&ldquo;{a.quote}&rdquo;</p>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-6 text-center text-sm text-[hsl(var(--muted-foreground))]">
            Premium 이상 구독 시 10명 전원의 브리핑을 확인할 수 있습니다
          </p>
        </div>
      </section>

      {/* 팟캐스트 */}
      <section className="px-6 py-20 bg-[hsl(var(--card))]/50">
        <div className="mx-auto max-w-4xl">
          <div className="rounded-3xl bg-[hsl(var(--card))] p-8 border border-[hsl(var(--border))] flex flex-col sm:flex-row items-center gap-8">
            <div className="shrink-0 text-center">
              <Headphones className="mx-auto h-16 w-16 text-blue-400" />
              <div className="mt-4 flex justify-center -space-x-2">
                {BRIEFING_ANALYSTS.map((a) => (
                  <Image key={a.id} src={`/analysts/${a.id}.png`} alt="" width={40} height={40} className="h-10 w-10 rounded-full object-cover border-2 border-[hsl(var(--border))]" />
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold">출퇴근길에 이어폰으로 듣는 AI 브리핑</h3>
              <p className="mt-2 text-sm text-[hsl(var(--muted-foreground))]">
                매일 아침·점심·저녁 브리핑을 팟캐스트로 들어보세요. 각 애널리스트의 고유 음성으로
                자연스럽게 들을 수 있습니다. Gemini TTS 기반으로 사람처럼 자연스러운 나레이션을 제공합니다.
              </p>
              <div className="mt-4 flex gap-3">
                <div className="rounded-2xl bg-[hsl(var(--muted))] px-5 py-2.5 text-sm font-medium">🎵 Spotify</div>
                <div className="rounded-2xl bg-[hsl(var(--muted))] px-5 py-2.5 text-sm font-medium">🎵 YouTube Music</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Free vs Premium 비교 */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-2xl font-bold text-center mb-12">Free vs Premium 브리핑 비교</h2>
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="rounded-2xl border border-[hsl(var(--border))] p-6">
              <h3 className="font-bold text-lg mb-4">Free</h3>
              <ul className="space-y-3 text-sm text-[hsl(var(--muted-foreground))]">
                <li className="flex items-start gap-2"><Check className="h-4 w-4 mt-0.5 shrink-0" />모닝 브리핑 전문 (매일)</li>
                <li className="flex items-start gap-2"><Check className="h-4 w-4 mt-0.5 shrink-0" />AI 리서치 하루 1편</li>
                <li className="flex items-start gap-2"><Check className="h-4 w-4 mt-0.5 shrink-0" />기본 시황 정보</li>
              </ul>
            </div>
            <div className="rounded-2xl border-2 border-blue-500 bg-blue-500/5 p-6">
              <h3 className="font-bold text-lg mb-4 text-blue-400">Premium</h3>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-2"><Check className="h-4 w-4 mt-0.5 text-blue-400 shrink-0" />모닝·점심·클로징 전체 브리핑</li>
                <li className="flex items-start gap-2"><Check className="h-4 w-4 mt-0.5 text-blue-400 shrink-0" />10명 애널리스트 전원 관점</li>
                <li className="flex items-start gap-2"><Check className="h-4 w-4 mt-0.5 text-blue-400 shrink-0" />AI 리서치 리포트 전문</li>
                <li className="flex items-start gap-2"><Check className="h-4 w-4 mt-0.5 text-blue-400 shrink-0" />팟캐스트 청취</li>
                <li className="flex items-start gap-2"><Check className="h-4 w-4 mt-0.5 text-blue-400 shrink-0" />푸시 알림</li>
              </ul>
              <Link href="/#pricing" className="mt-6 block text-center rounded-2xl bg-blue-500 py-3 text-sm font-semibold text-white hover:bg-blue-600 transition-colors">
                무료로 시작하기
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
