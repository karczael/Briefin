"use client"
import { Zap, Shield, Bell, FlaskConical, Check } from "lucide-react"
import Link from "next/link"
import dynamic from "next/dynamic"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"

const TickerParticles = dynamic(() => import("@/components/TickerParticles"), { ssr: false })

const STRATEGIES = [
  { name: "RSI+MACD 복합", desc: "RSI 과매도/과매수 + MACD 골든/데드크로스 조합. 하락장 방어력 우수", color: "text-blue-400", category: "기본" },
  { name: "이평선 정배열", desc: "MA20 > MA60 > MA120 정배열 교차 시 매수. 추세 확인 후 안전 진입", color: "text-emerald-400", category: "추세" },
  { name: "VCP 패턴", desc: "변동성 축소 후 고점 돌파. 패턴 성공 시 큰 수익", color: "text-purple-400", category: "패턴" },
  { name: "MA20 눌림목", desc: "상승 추세 중 MA20 근처 조정 시 매수. 장투 시 높은 수익률", color: "text-orange-400", category: "추세" },
  { name: "컵앤핸들", desc: "U자형 컵 + 소폭 조정 핸들 돌파. 클래식 차트 패턴", color: "text-yellow-400", category: "패턴" },
  { name: "변동성 돌파", desc: "래리 윌리엄스 K값 기반 당일 돌파 전략", color: "text-red-400", category: "변동성" },
  { name: "트레일링 스탑", desc: "모멘텀 진입 + 고점 대비 하락 시 자동 매도. 상승장 폭발적 수익", color: "text-teal-400", category: "리스크" },
  { name: "로테이션", desc: "RSI+MACD+모멘텀 스코어 기반 보유/매도 판단. 상승장 최고 수익률", color: "text-cyan-400", category: "로테이션" },
  { name: "SMMA 프랙탈", desc: "SMMA 정배열 + 프랙탈 고점 돌파. 장기 추세 추종", color: "text-indigo-400", category: "핵심" },
  { name: "스윙 눌림목", desc: "상승 추세 중 MA20 눌림목 양봉 매수. 스윙 트레이딩 특화", color: "text-pink-400", category: "스윙" },
  { name: "스윙 돌파", desc: "횡보 구간 저항선 거래량 동반 돌파. 돌파 성공 시 큰 수익", color: "text-amber-400", category: "스윙" },
  { name: "스윙 반등", desc: "과매도 RSI + 볼린저 하단 반등 매수. 하락장 유일 양수 수익", color: "text-lime-400", category: "스윙" },
]

export default function InvestPage() {
  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero — 틱커 파티클 배경 */}
      <section className="relative px-6 pt-32 pb-20 overflow-hidden" style={{ background: "linear-gradient(180deg, #0a0e27 0%, #0d1117 60%, hsl(var(--background)) 100%)" }}>
        <TickerParticles />
        {/* 콘텐츠 위 그라데이션 오버레이 */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e27]/60 via-transparent to-[#0d1117]/80 pointer-events-none" style={{ zIndex: 1 }} />
        <div className="relative mx-auto max-w-4xl text-center" style={{ zIndex: 2 }}>
          <div className="inline-flex items-center gap-2 rounded-full bg-yellow-500/10 px-4 py-2 text-sm font-medium text-yellow-400 mb-6 backdrop-blur-sm">
            <Zap className="h-4 w-4" /> VIP 투자 도구
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold leading-tight">
            분석을 넘어<br />
            <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">실전 투자까지</span>
          </h1>
          <p className="mt-6 text-lg text-[hsl(var(--muted-foreground))] max-w-2xl mx-auto">
            12개의 검증된 매매 전략 설정, 실시간 신호 알림, 손절 알림까지.
            AI가 분석하고, 중요한 순간을 텔레그램으로 알려드립니다.
          </p>
          <Link href="/#pricing" className="mt-8 inline-block rounded-2xl bg-gradient-to-r from-yellow-500 to-orange-500 px-8 py-4 font-semibold text-white hover:opacity-90 transition-all hover:scale-[1.02]">
            VIP 시작하기 (₩9,000/월)
          </Link>
        </div>
      </section>

      {/* 12개 매매 전략 */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-2xl font-bold text-center mb-4">12개의 검증된 매매 전략</h2>
          <p className="text-center text-[hsl(var(--muted-foreground))] mb-12">원하는 전략을 선택하고 파라미터를 조절하세요. 조건 충족 시 실시간 알림을 받습니다.</p>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {STRATEGIES.map((s) => (
              <div key={s.name} className="rounded-2xl bg-[hsl(var(--card))] p-6 border border-[hsl(var(--border))] hover:border-yellow-500/20 transition-colors">
                <div className="flex items-center gap-2 mb-2">
                  <h4 className={`font-bold ${s.color}`}>{s.name}</h4>
                  <span className="text-[10px] font-medium text-[hsl(var(--muted-foreground))] bg-[hsl(var(--muted))] rounded-full px-2 py-0.5">{s.category}</span>
                </div>
                <p className="text-sm text-[hsl(var(--muted-foreground))] leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 text-center text-sm text-yellow-400/80">전략별 파라미터 커스터마이징 + 복수 전략 동시 운용 가능</p>
        </div>
      </section>

      {/* 매매 신호 알림 */}
      <section className="px-6 py-20 bg-[hsl(var(--card))]/50">
        <div className="mx-auto max-w-5xl">
          <div className="grid gap-8 md:grid-cols-2 items-center">
            <div>
              <Bell className="h-10 w-10 text-yellow-400 mb-4" />
              <h2 className="text-2xl font-bold">실시간 매매 신호 알림</h2>
              <p className="mt-4 text-[hsl(var(--muted-foreground))]">
                설정한 전략의 조건이 충족되면 즉시 푸시 알림을 전송합니다.
                시장을 계속 지켜보지 않아도 중요한 순간을 놓치지 않습니다.
              </p>
              <ul className="mt-6 space-y-3 text-sm">
                <li className="flex items-start gap-2"><Check className="h-4 w-4 text-yellow-400 mt-0.5 shrink-0" />장중 실시간 모니터링 (1분 간격)</li>
                <li className="flex items-start gap-2"><Check className="h-4 w-4 text-yellow-400 mt-0.5 shrink-0" />전략별 조건 충족 시 즉시 푸시 알림</li>
                <li className="flex items-start gap-2"><Check className="h-4 w-4 text-yellow-400 mt-0.5 shrink-0" />종목명, 전략명, 현재가, 시그널 상세 포함</li>
                <li className="flex items-start gap-2"><Check className="h-4 w-4 text-yellow-400 mt-0.5 shrink-0" />알림 이력 조회 + 성과 추적</li>
              </ul>
            </div>
            <div className="space-y-4">
              {[
                { stock: "SK하이닉스", strategy: "RSI 과매도 반등", signal: "긍정적 시그널 감지", time: "09:32", emoji: "🔔" },
                { stock: "삼성전자", strategy: "골든크로스", signal: "5일선이 20일선 상향 돌파", time: "10:15", emoji: "📈" },
                { stock: "POSCO홀딩스", strategy: "수급 모멘텀", signal: "외국인 3일 연속 순매수", time: "11:03", emoji: "👥" },
              ].map((alert) => (
                <div key={alert.stock} className="rounded-2xl bg-[hsl(var(--card))] p-5 border border-[hsl(var(--border))]">
                  <div className="flex items-center justify-between">
                    <span className="text-lg">{alert.emoji}</span>
                    <span className="text-xs text-[hsl(var(--muted-foreground))]">{alert.time}</span>
                  </div>
                  <p className="font-bold mt-2">{alert.stock}</p>
                  <p className="text-sm text-yellow-400">{alert.strategy}</p>
                  <p className="text-xs text-[hsl(var(--muted-foreground))] mt-1">{alert.signal}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 자동 손절 */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <div className="grid gap-8 md:grid-cols-2">
            <div className="rounded-3xl border-2 border-red-500/30 bg-red-500/5 p-8">
              <div className="flex items-center gap-3 mb-6">
                <Shield className="h-8 w-8 text-red-400" />
                <h2 className="text-2xl font-bold">손절 알림 서비스</h2>
              </div>
              <p className="text-[hsl(var(--muted-foreground))] mb-6">
                장중에도 시장을 계속 지켜볼 수 없으시죠? 설정한 손절선에 도달하면
                텔레그램으로 즉시 알림을 보내드립니다. 매도 판단은 직접 하세요.
              </p>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-2"><Check className="h-4 w-4 text-red-400 mt-0.5 shrink-0" />종목별 손절 비율 설정 (-3% ~ -30%)</li>
                <li className="flex items-start gap-2"><Check className="h-4 w-4 text-red-400 mt-0.5 shrink-0" />장중 3분 간격 실시간 모니터링</li>
                <li className="flex items-start gap-2"><Check className="h-4 w-4 text-red-400 mt-0.5 shrink-0" />손절선 도달 시 텔레그램 즉시 알림</li>
                <li className="flex items-start gap-2"><Check className="h-4 w-4 text-red-400 mt-0.5 shrink-0" />종목명, 등락률, 현재가, 손실액 상세 표시</li>
                <li className="flex items-start gap-2"><Check className="h-4 w-4 text-red-400 mt-0.5 shrink-0" />손절 알림 이력 대시보드</li>
              </ul>

              <div className="mt-6 rounded-2xl bg-red-500/10 p-4">
                <p className="text-xs text-red-400 font-medium">작동 예시</p>
                <p className="text-sm mt-1">삼성전자 보유가 72,000원 / 손절 -5% 설정</p>
                <p className="text-sm">→ 68,400원 이하 도달 시 텔레그램 알림 전송</p>
              </div>
            </div>

            <div className="rounded-3xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-8">
              <div className="flex items-center gap-3 mb-6">
                <FlaskConical className="h-8 w-8 text-purple-400" />
                <h2 className="text-2xl font-bold">전략 백테스트</h2>
              </div>
              <p className="text-[hsl(var(--muted-foreground))] mb-6">
                실제 돈을 투자하기 전에, 과거 데이터로 전략의 성과를 검증하세요.
                수수료와 세금까지 반영한 실전 수익률을 확인할 수 있습니다.
              </p>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-2"><Check className="h-4 w-4 text-purple-400 mt-0.5 shrink-0" />최대 5년 과거 데이터 시뮬레이션</li>
                <li className="flex items-start gap-2"><Check className="h-4 w-4 text-purple-400 mt-0.5 shrink-0" />수수료(0.015%) + 세금(0.18%) 반영</li>
                <li className="flex items-start gap-2"><Check className="h-4 w-4 text-purple-400 mt-0.5 shrink-0" />승률, MDD, 샤프비율 종합 분석</li>
                <li className="flex items-start gap-2"><Check className="h-4 w-4 text-purple-400 mt-0.5 shrink-0" />Buy & Hold 대비 초과수익 비교</li>
                <li className="flex items-start gap-2"><Check className="h-4 w-4 text-purple-400 mt-0.5 shrink-0" />수익률 곡선 차트 + 매매 타이밍 표시</li>
              </ul>

              <div className="mt-6 rounded-2xl bg-purple-500/10 p-4">
                <p className="text-xs text-purple-400 font-medium">백테스트 결과 예시</p>
                <div className="mt-2 grid grid-cols-3 gap-3 text-center text-sm">
                  <div><p className="text-emerald-400 font-bold">+23.4%</p><p className="text-xs text-[hsl(var(--muted-foreground))]">총 수익률</p></div>
                  <div><p className="font-bold">67%</p><p className="text-xs text-[hsl(var(--muted-foreground))]">승률</p></div>
                  <div><p className="text-red-400 font-bold">-8.2%</p><p className="text-xs text-[hsl(var(--muted-foreground))]">MDD</p></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 실시간 시장 데이터 */}
      <section className="px-6 py-20 bg-[hsl(var(--card))]/50">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-2xl font-bold text-center mb-4">실시간 시장 데이터</h2>
          <p className="text-center text-[hsl(var(--muted-foreground))] mb-12">글로벌 시장을 한눈에 파악하세요. 1분 간격으로 자동 갱신됩니다.</p>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { emoji: "📈", title: "글로벌 25개 지표", desc: "KOSPI, S&P500, 나스닥, 다우, 니케이, 상해 등 주요 지수 + 환율(원/달러, 엔/달러) + 원자재(WTI, 금) + 채권(미국10년) + 암호화폐(BTC, ETH)", color: "text-blue-400" },
              { emoji: "🗺️", title: "섹터 히트맵", desc: "한국+미국 21개 섹터별 등락률을 히트맵으로 한눈에. 어떤 섹터가 강하고 약한지 직관적으로 파악.", color: "text-emerald-400" },
              { emoji: "👥", title: "투자자 매매동향", desc: "외국인·기관·개인 투자자의 순매매 데이터. 수급의 흐름을 읽어 시장 방향을 예측.", color: "text-purple-400" },
              { emoji: "🔥", title: "급등/급락 종목", desc: "상승률·하락률 상위 50개 주요 종목 실시간 모니터링. 거래대금 상위 종목도 함께 표시.", color: "text-orange-400" },
            ].map((d) => (
              <div key={d.title} className="rounded-2xl bg-[hsl(var(--card))] p-6 border border-[hsl(var(--border))]">
                <span className="text-2xl">{d.emoji}</span>
                <h4 className={`mt-3 font-bold text-sm ${d.color}`}>{d.title}</h4>
                <p className="mt-2 text-xs text-[hsl(var(--muted-foreground))] leading-relaxed">{d.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-2xl bg-[hsl(var(--card))] p-6 border border-[hsl(var(--border))]">
            <h4 className="font-bold mb-4">투자 지표 상세 차트</h4>
            <p className="text-sm text-[hsl(var(--muted-foreground))] mb-4">
              각 지표를 클릭하면 기간별 상세 차트를 확인할 수 있습니다. Canvas 기반 인터랙티브 차트로
              터치/클릭으로 특정 시점의 가격을 확인하세요.
            </p>
            <div className="flex flex-wrap gap-2">
              {["1일", "5일", "1개월", "3개월", "6개월", "1년", "5년"].map(period => (
                <span key={period} className="text-xs bg-[hsl(var(--muted))] rounded-full px-3 py-1.5">{period}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 연동 증권사 */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl font-bold mb-4">증권사 API 연동</h2>
          <p className="text-[hsl(var(--muted-foreground))] mb-8">보유종목 조회 + 손절 알림을 위해 증권사 API를 연동합니다</p>
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              { name: "한국투자증권", status: "지원", statusColor: "text-emerald-400 bg-emerald-500/10" },
              { name: "키움증권", status: "준비중", statusColor: "text-yellow-400 bg-yellow-500/10" },
              { name: "미래에셋증권", status: "준비중", statusColor: "text-yellow-400 bg-yellow-500/10" },
            ].map((broker) => (
              <div key={broker.name} className="rounded-2xl bg-[hsl(var(--card))] p-6 border border-[hsl(var(--border))]">
                <p className="font-bold">{broker.name}</p>
                <span className={`mt-2 inline-block text-xs font-medium rounded-full px-3 py-1 ${broker.statusColor}`}>{broker.status}</span>
              </div>
            ))}
          </div>
          <p className="mt-6 text-xs text-[hsl(var(--muted-foreground))]">
            API 키는 암호화되어 저장되며, 보유종목 조회 목적으로만 사용됩니다
          </p>
        </div>
      </section>

      <Footer />
    </div>
  )
}
