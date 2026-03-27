"use client"
import { BarChart3, Flame, Headphones, Check, Zap, LineChart, ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { ANALYSTS } from "@/lib/constants"

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      <Navbar />

      {/* ─── Hero ─── */}
      <section className="relative flex min-h-screen flex-col items-center justify-center px-6 pt-16 text-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <iframe
            src="https://my.spline.design/ailandingpagewebdesign3danimation-wCBnWItnHsNYRat2X2sBaOcy/"
            frameBorder="0" width="100%" height="100%"
            style={{ position: "absolute", top: 0, left: 0, border: "none" }}
            allow="autoplay" loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--background))] via-transparent to-transparent pointer-events-none" />
          <div className="absolute inset-0 bg-[hsl(var(--background))]/40 pointer-events-none" />
        </div>
        <div className="relative z-10 mx-auto max-w-3xl space-y-6 pointer-events-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-2 text-sm font-medium text-blue-400">
            <span className="h-2 w-2 rounded-full bg-blue-400 animate-pulse" />
            AI 주식 브리핑 서비스
          </div>
          <h1 className="text-4xl font-bold leading-[1.2] sm:text-6xl">
            아침 10분,<br />
            <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">AI가 브리핑</span>합니다
          </h1>
          <p className="text-lg text-[hsl(var(--muted-foreground))] max-w-xl mx-auto">
            시간 없는 당신을 위해, AI 전문가 10명이 매일 시장을 분석하고
            실시간으로 토론합니다. 전략 설정부터 자동 손절까지.
          </p>
          <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center pt-2">
            <Link href="/#pricing" className="w-full sm:w-auto rounded-2xl bg-blue-500 px-8 py-4 text-center font-semibold text-white hover:bg-blue-600 transition-all hover:scale-[1.02]">
              14일 무료 체험 시작하기
            </Link>
            <Link href="/#podcast" className="w-full sm:w-auto rounded-2xl border border-[hsl(var(--border))] px-8 py-4 text-center font-medium hover:bg-[hsl(var(--muted))] transition-colors">
              🎧 팟캐스트 듣기
            </Link>
          </div>
          <div className="flex justify-center gap-8 pt-8">
            {[
              { num: "10명", label: "AI 애널리스트" },
              { num: "매일 6회", label: "실시간 토론" },
              { num: "7개", label: "투자 전략" },
              { num: "24시간", label: "시장 모니터링" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <p className="text-2xl font-bold text-[hsl(var(--foreground))]">{s.num}</p>
                <p className="text-xs text-[hsl(var(--muted-foreground))] mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 기능 개요 (4개 피처 카드) ─── */}
      <section id="features" className="px-6 py-24">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold">투자에 필요한 모든 것,<br /><span className="text-blue-400">AI가 준비</span>합니다</h2>
            <p className="mt-4 text-[hsl(var(--muted-foreground))]">분석부터 실행까지. 당신은 결정만 하세요.</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            {/* 브리핑 */}
            <Link href="/briefing" className="group rounded-3xl bg-gradient-to-br from-blue-600 to-blue-800 p-8 text-white transition-all hover:scale-[1.02]">
              <BarChart3 className="h-8 w-8 mb-4 opacity-80" />
              <h3 className="text-xl font-bold">모닝·점심·클로징 브리핑</h3>
              <p className="mt-3 text-sm opacity-80">매일 3번, 10명의 AI 전문가가 뉴스·시장데이터·해외 헤드라인을 종합 분석합니다. 출근 전 10분이면 충분합니다.</p>
              <ul className="mt-4 space-y-1.5 text-sm opacity-70">
                <li>• 실시간 뉴스 기반 분석 (일반론 아님)</li>
                <li>• 관심종목 기반 개인화 브리핑</li>
                <li>• 팟캐스트로 출퇴근길에 청취</li>
              </ul>
              <div className="mt-6 flex items-center gap-1 text-sm font-medium opacity-80 group-hover:opacity-100">
                자세히 보기 <ArrowRight className="h-4 w-4" />
              </div>
            </Link>

            {/* AI 리서치 */}
            <Link href="/research" className="group rounded-3xl bg-gradient-to-br from-emerald-600 to-emerald-800 p-8 text-white transition-all hover:scale-[1.02]">
              <LineChart className="h-8 w-8 mb-4 opacity-80" />
              <h3 className="text-xl font-bold">AI 리서치 리포트</h3>
              <p className="mt-3 text-sm opacity-80">기관급 시황 분석, 종목 심층 분석, 섹터 리포트를 AI가 매일 발행합니다. 적정가 계산기와 DART 공시 조회도 제공합니다.</p>
              <ul className="mt-4 space-y-1.5 text-sm opacity-70">
                <li>• 시황·종목·섹터 3종 리포트</li>
                <li>• PER/PBR/그레이엄/DCF 적정가 계산</li>
                <li>• 실적 전망 + DART 공시 실시간</li>
              </ul>
              <div className="mt-6 flex items-center gap-1 text-sm font-medium opacity-80 group-hover:opacity-100">
                자세히 보기 <ArrowRight className="h-4 w-4" />
              </div>
            </Link>

            {/* 토론 */}
            <Link href="/debate" className="group rounded-3xl bg-[hsl(var(--card))] p-8 border border-[hsl(var(--border))] transition-all hover:scale-[1.02] hover:border-red-500/20">
              <div className="flex items-center gap-2 mb-4">
                <Flame className="h-8 w-8 text-red-400" />
                <span className="flex items-center gap-1 text-xs font-medium text-red-400 bg-red-500/10 rounded-full px-2 py-0.5">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-red-500" />LIVE
                </span>
              </div>
              <h3 className="text-xl font-bold">실시간 AI 토론</h3>
              <p className="mt-3 text-sm text-[hsl(var(--muted-foreground))]">매일 7회, AI 애널리스트들이 매수 vs 매도로 격돌합니다. 뉴스 기반 주제를 자동 선정하고, 대립 관점이 보장됩니다.</p>
              <div className="mt-4 flex gap-2">
                {["08:20", "08:30", "08:40", "12:30", "12:40", "17:30", "17:40"].map((time) => (
                  <span key={time} className="text-[10px] bg-[hsl(var(--muted))] rounded-full px-2 py-0.5 text-[hsl(var(--muted-foreground))]">{time}</span>
                ))}
              </div>
              <div className="mt-6 flex items-center gap-1 text-sm font-medium text-blue-400 group-hover:text-blue-300">
                자세히 보기 <ArrowRight className="h-4 w-4" />
              </div>
            </Link>

            {/* 투자 도구 */}
            <Link href="/invest" className="group rounded-3xl bg-[hsl(var(--card))] p-8 border border-[hsl(var(--border))] transition-all hover:scale-[1.02] hover:border-yellow-500/20">
              <div className="flex items-center gap-2 mb-4">
                <Zap className="h-8 w-8 text-yellow-400" />
                <span className="text-xs font-medium text-yellow-400 bg-yellow-500/10 rounded-full px-2 py-0.5">VIP</span>
              </div>
              <h3 className="text-xl font-bold">VIP 투자 도구</h3>
              <p className="mt-3 text-sm text-[hsl(var(--muted-foreground))]">7개 매매 전략 설정, 실시간 신호 알림, 자동 손절 서비스. 분석을 넘어 실전 투자까지 AI가 실행합니다.</p>
              <ul className="mt-4 space-y-1.5 text-sm text-[hsl(var(--muted-foreground))]">
                <li>• 골든크로스, RSI, MACD 등 7개 전략</li>
                <li>• 한국투자증권 API 연동 자동 손절</li>
                <li>• 전략 백테스트 (최대 5년)</li>
              </ul>
              <div className="mt-6 flex items-center gap-1 text-sm font-medium text-blue-400 group-hover:text-blue-300">
                자세히 보기 <ArrowRight className="h-4 w-4" />
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* ─── AI 애널리스트 ─── */}
      <section id="analysts" className="px-6 py-24">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">10명의 <span className="text-blue-400">AI 전문가</span></h2>
            <p className="mt-4 text-[hsl(var(--muted-foreground))]">각자의 전문성과 성격으로 매일 시장을 분석합니다</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
            {ANALYSTS.map((a) => (
              <div key={a.id} className="rounded-2xl bg-[hsl(var(--card))] p-4 text-center hover:bg-[hsl(var(--muted))] transition-colors border border-transparent hover:border-blue-500/20">
                <div className="relative inline-block">
                  <Image src={`/analysts/${a.id}.png`} alt={a.name} width={64} height={64} className="h-16 w-16 rounded-full object-cover mx-auto border-2 border-[hsl(var(--border))]" />
                  <span className={`absolute -bottom-1 left-1/2 -translate-x-1/2 text-[9px] font-bold px-1.5 py-0.5 rounded-full ${
                    a.model === "Gemini" ? "bg-blue-500/20 text-blue-400" :
                    a.model === "Claude" ? "bg-amber-500/20 text-amber-400" :
                    "bg-emerald-500/20 text-emerald-400"
                  }`}>{a.model}</span>
                </div>
                <p className="mt-3 text-sm font-bold">{a.name}</p>
                <p className="text-[11px] text-[hsl(var(--muted-foreground))]">{a.title}</p>
                <p className="text-[10px] text-blue-400 mt-1 italic">&ldquo;{a.quote}&rdquo;</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Podcast ─── */}
      <section id="podcast" className="px-6 py-24">
        <div className="mx-auto max-w-3xl text-center">
          <Headphones className="mx-auto h-12 w-12 text-blue-400" />
          <h2 className="mt-6 text-3xl font-bold">출퇴근길에<br /><span className="text-blue-400">이어폰으로 듣는</span> AI 브리핑</h2>
          <p className="mt-4 text-[hsl(var(--muted-foreground))]">매일 아침·저녁, Apple Podcasts와 Spotify에서 들어보세요</p>
          <div className="mt-8 flex justify-center gap-3">
            {["kim_seongjin", "lee_junhyuk", "han_mirae", "na_daeun"].map((id) => (
              <Image key={id} src={`/analysts/${id}.png`} alt="" width={48} height={48} className="h-12 w-12 rounded-full object-cover border-2 border-[hsl(var(--border))]" />
            ))}
          </div>
          <p className="mt-3 text-sm text-[hsl(var(--muted-foreground))]">4명의 AI 전문가가 매일 브리핑합니다</p>
          <div className="mt-6 flex justify-center gap-4">
            <div className="rounded-2xl bg-[hsl(var(--card))] px-6 py-3 text-sm font-medium border border-[hsl(var(--border))]">🎵 Apple Podcasts</div>
            <div className="rounded-2xl bg-[hsl(var(--card))] px-6 py-3 text-sm font-medium border border-[hsl(var(--border))]">🎵 Spotify</div>
          </div>
        </div>
      </section>

      {/* ─── Pricing ─── */}
      <section id="pricing" className="px-6 py-24">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-center text-3xl font-bold">요금제</h2>
          <p className="mt-4 text-center text-[hsl(var(--muted-foreground))]">14일간 모든 기능을 무료로 체험해보세요</p>

          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            {/* Free */}
            <div className="rounded-3xl border border-[hsl(var(--border))] p-8">
              <h3 className="text-lg font-bold">Free</h3>
              <p className="mt-6 text-3xl font-bold">₩0</p>
              <p className="text-sm text-[hsl(var(--muted-foreground))]">영구 무료</p>
              <ul className="mt-6 space-y-3 text-sm">
                {["브리핑 요약 3줄", "토론방 시청", "리서치 제목", "기본 시황", "관심종목 관리"].map((f) => (
                  <li key={f} className="flex items-center gap-2"><Check className="h-4 w-4 text-[hsl(var(--muted-foreground))]" />{f}</li>
                ))}
              </ul>
            </div>

            {/* Premium */}
            <div className="relative rounded-3xl border-2 border-blue-500 bg-blue-500/5 p-8">
              <div className="absolute -top-3 left-6 rounded-full bg-blue-500 px-4 py-1 text-xs font-bold text-white">추천</div>
              <h3 className="text-lg font-bold">Premium</h3>
              <p className="mt-6"><span className="text-3xl font-bold">₩14,900</span><span className="text-sm text-[hsl(var(--muted-foreground))]">/월</span></p>
              <p className="text-xs text-[hsl(var(--muted-foreground))]">하루 약 500원</p>
              <ul className="mt-6 space-y-3 text-sm">
                {[
                  "전체 브리핑 (모닝/점심/클로징)", "개인화 브리핑 (관심종목 기반)",
                  "AI 리서치 전문 읽기", "토론방 상세 분석",
                  "밸류에이션 차트 + 적정가 계산기", "팟캐스트 (출퇴근길 청취)",
                  "기업 분석 + 실적 전망",
                ].map((f) => (
                  <li key={f} className="flex items-center gap-2"><Check className="h-4 w-4 text-blue-400" />{f}</li>
                ))}
              </ul>
              <Link href="/subscribe?plan=premium" className="mt-8 block w-full rounded-2xl bg-blue-500 py-4 font-semibold text-white text-center hover:bg-blue-600 transition-colors">14일 무료 체험</Link>
            </div>

            {/* VIP */}
            <div className="rounded-3xl border border-[hsl(var(--border))] bg-gradient-to-b from-[hsl(var(--card))] to-transparent p-8">
              <h3 className="text-lg font-bold flex items-center gap-2"><Zap className="h-5 w-5 text-yellow-400" /> VIP</h3>
              <p className="mt-6"><span className="text-3xl font-bold">₩29,900</span><span className="text-sm text-[hsl(var(--muted-foreground))]">/월</span></p>
              <p className="text-xs text-[hsl(var(--muted-foreground))]">프로 투자자를 위한</p>
              <ul className="mt-6 space-y-3 text-sm">
                {[
                  "Premium 전체 기능",
                  "매매 전략 설정 (7개 전략)",
                  "실시간 매매 신호 알림",
                  "전략 백테스트",
                  "자동 손절 서비스 (KIS 연동)",
                  "토론방 직접 참여 (AI 답변)",
                ].map((f) => (
                  <li key={f} className="flex items-center gap-2"><Check className="h-4 w-4 text-yellow-400" />{f}</li>
                ))}
              </ul>
              <Link href="/subscribe?plan=vip" className="mt-8 block w-full rounded-2xl border border-yellow-500/30 bg-yellow-500/10 py-4 font-semibold text-yellow-400 text-center hover:bg-yellow-500/20 transition-colors">VIP 시작하기</Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
