"use client"
import { LineChart, TrendingUp, Clock, User } from "lucide-react"
import Link from "next/link"
import dynamic from "next/dynamic"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"

const NeuralNetwork = dynamic(() => import("@/components/NeuralNetwork"), { ssr: false })

export default function ResearchPage() {
  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero — AI 뉴런 네트워크 */}
      <section className="relative px-6 pt-32 pb-20 overflow-hidden" style={{ background: "linear-gradient(180deg, #05100d 0%, #0d1117 60%, hsl(var(--background)) 100%)" }}>
        <NeuralNetwork />
        <div className="absolute inset-0 bg-gradient-to-b from-[#05100d]/50 via-transparent to-[#0d1117]/80 pointer-events-none" style={{ zIndex: 1 }} />
        <div className="relative mx-auto max-w-4xl text-center" style={{ zIndex: 2 }}>
          <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-4 py-2 text-sm font-medium text-emerald-400 mb-6 backdrop-blur-sm">
            <LineChart className="h-4 w-4" /> AI 리서치
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold leading-tight">
            <span className="bg-gradient-to-r from-emerald-400 to-blue-500 bg-clip-text text-transparent">기관급 리서치</span>를<br />
            AI가 매일 발행합니다
          </h1>
          <p className="mt-6 text-lg text-[hsl(var(--muted-foreground))] max-w-2xl mx-auto">
            10명의 AI 애널리스트가 각자의 전문 분야에서 시황 분석, 종목 심층 분석,
            섹터 리포트를 매일 작성합니다.
          </p>
        </div>
      </section>

      {/* 실제 리서치 예시 */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-3xl">
          <p className="text-center text-sm text-[hsl(var(--muted-foreground))] mb-8">실제 발행된 리서치 리포트 예시</p>

          {/* 리포트 카드 */}
          <article className="rounded-3xl bg-[hsl(var(--card))] border border-[hsl(var(--border))] overflow-hidden">
            {/* 리포트 헤더 */}
            <div className="bg-gradient-to-r from-emerald-600 to-blue-600 px-8 py-6">
              <div className="flex items-center gap-2 text-white/70 text-xs mb-3">
                <Clock className="h-3.5 w-3.5" />
                <span>2025.03.25 07:30</span>
                <span className="mx-1">·</span>
                <span>시황/이벤트 리포트</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white leading-snug">
                미 반도체 수출 규제 완화 시그널 — 한국 반도체 섹터 수혜 시나리오 분석
              </h2>
              <div className="mt-4 flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-white/20 flex items-center justify-center">
                    <User className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">이준혁</p>
                    <p className="text-xs text-white/60">매크로 전략가 · 시카고대 박사</p>
                  </div>
                </div>
              </div>
            </div>

            {/* KPI 요약 */}
            <div className="px-8 py-6 border-b border-[hsl(var(--border))]">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  { label: "투자 시그널", value: "긍정적", color: "text-emerald-400" },
                  { label: "필라델피아 반도체", value: "+2.8%", color: "text-[#F04452]" },
                  { label: "SK하이닉스", value: "+4.1%", color: "text-[#F04452]" },
                  { label: "원/달러", value: "1,342원", color: "text-[hsl(var(--foreground))]" },
                ].map((kpi) => (
                  <div key={kpi.label} className="text-center">
                    <p className="text-[11px] text-[hsl(var(--muted-foreground))]">{kpi.label}</p>
                    <p className={`text-lg font-bold mt-0.5 ${kpi.color}`}>{kpi.value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* 리포트 본문 미리보기 */}
            <div className="px-8 py-6 space-y-5 text-sm leading-relaxed">
              {/* 핵심 요약 */}
              <div className="rounded-2xl bg-emerald-500/5 border border-emerald-500/20 p-5">
                <p className="text-xs font-bold text-emerald-400 mb-2">핵심 요약</p>
                <p className="text-[hsl(var(--foreground))]">
                  미 상무부가 중국향 반도체 수출 규제의 부분적 완화를 검토 중이라는 보도가 나왔습니다.
                  이는 삼성전자·SK하이닉스의 중국 내 HBM 공급 제약을 줄일 수 있는 시그널로,
                  필라델피아 반도체 지수가 장중 2.8% 급등하며 반응했습니다.
                </p>
              </div>

              {/* 섹션 1 */}
              <div>
                <h3 className="font-bold text-base mb-3">1. 이벤트 배경</h3>
                <p className="text-[hsl(var(--muted-foreground))]">
                  3월 24일(현지시간) 블룸버그는 미 상무부가 중국향 AI 반도체 수출 통제를 일부 완화하는 방안을
                  내부적으로 검토 중이라고 보도했습니다. 구체적으로 HBM3 이하 등급의 메모리 반도체에 대해
                  기존 라이선스 요건을 면제하는 안이 논의되고 있는 것으로 알려졌습니다.
                </p>
              </div>

              {/* 데이터 테이블 */}
              <div>
                <h3 className="font-bold text-base mb-3">2. 수혜 종목 분석</h3>
                <div className="rounded-xl border border-[hsl(var(--border))] overflow-x-auto">
                  <table className="w-full text-sm min-w-0">
                    <thead>
                      <tr className="bg-[hsl(var(--muted))]/50 text-[hsl(var(--muted-foreground))]">
                        <th className="px-4 py-2.5 text-left font-medium">종목</th>
                        <th className="px-4 py-2.5 text-right font-medium">전일 등락</th>
                        <th className="px-4 py-2.5 text-right font-medium">중국 매출비중</th>
                        <th className="px-4 py-2.5 text-right font-medium">시그널</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[hsl(var(--border))]">
                      {[
                        { name: "SK하이닉스", change: "+4.1%", china: "32%", signal: "긍정적" },
                        { name: "삼성전자", change: "+2.3%", china: "28%", signal: "긍정적" },
                        { name: "한미반도체", change: "+5.7%", china: "18%", signal: "긍정적" },
                        { name: "리노공업", change: "+3.2%", china: "41%", signal: "강한 긍정" },
                      ].map((row) => (
                        <tr key={row.name}>
                          <td className="px-4 py-2.5 font-medium">{row.name}</td>
                          <td className="px-4 py-2.5 text-right text-[#F04452] font-medium">{row.change}</td>
                          <td className="px-4 py-2.5 text-right text-[hsl(var(--muted-foreground))]">{row.china}</td>
                          <td className="px-4 py-2.5 text-right">
                            <span className="inline-flex items-center gap-1 text-emerald-400 text-xs font-medium">
                              <TrendingUp className="h-3 w-3" />{row.signal}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="text-[10px] text-[hsl(var(--muted-foreground))] mt-1.5">Source: 네이버금융, 2025.03.24 종가 기준</p>
              </div>

              {/* 리스크 콜아웃 */}
              <div className="rounded-2xl bg-amber-500/5 border border-amber-500/20 p-5">
                <p className="text-xs font-bold text-amber-400 mb-2">리스크 요인</p>
                <p className="text-[hsl(var(--muted-foreground))]">
                  현재 "검토 중" 단계이며 실제 규제 완화 확정까지는 수주~수개월 소요 예상.
                  중국 측 보복 관세 가능성과 미 의회 내 강경파 반발도 변수입니다.
                  단기 급등 시 차익실현 매물 출회에 유의해야 합니다.
                </p>
              </div>

              {/* 블러 처리된 나머지 (Premium 유도) */}
              <div className="relative">
                <div className="space-y-4 blur-sm select-none" aria-hidden="true">
                  <h3 className="font-bold text-base">3. 시나리오별 전망</h3>
                  <p className="text-[hsl(var(--muted-foreground))]">
                    시나리오 A: 규제 완화 확정 시 SK하이닉스 목표가 상향 여력 15~20%로 추정됩니다.
                    시나리오 B: 부분 완화에 그칠 경우에도 심리적 바닥 확인 효과가 기대됩니다.
                    시나리오 C: 무산 시 되돌림은 있겠으나, 이미 선반영된 악재 해소 국면에 진입...
                  </p>
                  <h3 className="font-bold text-base">4. 투자 전략 제안</h3>
                  <p className="text-[hsl(var(--muted-foreground))]">
                    분할 매수 전략을 권장합니다. 1차 진입(30%)은 현재가 기준, 2차(40%)는 규제 완화 발표 확인 후...
                  </p>
                </div>
                {/* 잠금 오버레이 */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <div className="rounded-2xl bg-[hsl(var(--card))]/95 backdrop-blur-sm border border-[hsl(var(--border))] px-8 py-6 text-center shadow-lg">
                    <div className="mx-auto mb-3 h-10 w-10 rounded-full bg-blue-500/10 flex items-center justify-center">
                      <LineChart className="h-5 w-5 text-blue-400" />
                    </div>
                    <p className="font-bold text-sm">시나리오 분석 · 투자 전략은<br />Premium에서 확인하세요</p>
                    <Link href="/#pricing" className="mt-4 inline-block rounded-xl bg-blue-500 px-6 py-2.5 text-sm font-semibold text-white hover:bg-blue-600 transition-colors">
                      무료로 시작하기
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* 면책조항 */}
            <div className="px-8 py-4 border-t border-[hsl(var(--border))] bg-[hsl(var(--muted))]/30">
              <p className="text-[10px] text-[hsl(var(--muted-foreground))] leading-relaxed">
                본 정보는 투자 권유가 아닌 AI 기반 시장 분석 자료입니다. 투자 판단의 최종 책임은 투자자 본인에게 있습니다.
              </p>
            </div>
          </article>

          {/* 안내 문구 */}
          <p className="mt-8 text-center text-sm text-[hsl(var(--muted-foreground))]">
            이런 리서치 리포트가 매일 발행됩니다
          </p>
        </div>
      </section>

      <Footer />
    </div>
  )
}
