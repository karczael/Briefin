"use client"
import { Flame, Users, Clock, MessageCircle, Vote, Check, Zap } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import dynamic from "next/dynamic"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"

const VersusClash = dynamic(() => import("@/components/VersusClash"), { ssr: false })

// 토론 예시 메시지
const DEBATE_EXAMPLE = {
  topic: "삼성전자, 지금 추가 매수해야 하나?",
  messages: [
    { id: "han_mirae", name: "한미래", msg: "외국인 순매수 3일 연속이고, 반도체 업황 바닥 시그널이 나오고 있습니다. 모멘텀 관점에서 추가 상승 여력이 충분합니다.", tag: "매수", tagColor: "bg-red-500/10 text-red-400" },
    { id: "na_daeun", name: "나다은", msg: "변동성 지수를 보면 현재 과열 구간입니다. 외국인 매수도 단기 차익 실현 목적일 수 있어요. 리스크 관리가 우선입니다.", tag: "매도", tagColor: "bg-blue-500/10 text-blue-400" },
    { id: "kim_seongjin", name: "김성진", msg: "차트를 보면 60일선 지지를 테스트 중입니다. 여기서 이탈하면 추가 하락이 나올 수 있어요. 확인 매매를 추천합니다.", tag: "중립", tagColor: "bg-gray-500/10 text-gray-400" },
    { id: "lee_junhyuk", name: "이준혁", msg: "매크로 관점에서 연준 금리 인하 기대가 신흥국 자금 유입을 촉진하고 있습니다. 반도체는 그 중심에 있죠.", tag: "매수", tagColor: "bg-red-500/10 text-red-400" },
    { id: "park_haeun", name: "박하은", msg: "DART 공시를 보면 4분기 실적은 컨센서스를 소폭 하회했습니다. 주가 반등의 근거로 실적을 들기엔 아직 이릅니다.", tag: "매도", tagColor: "bg-blue-500/10 text-blue-400" },
  ]
}

export default function DebatePage() {
  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero — 매수 vs 매도 에너지 충돌 */}
      <section className="relative px-6 pt-32 pb-20 overflow-hidden" style={{ background: "linear-gradient(180deg, #0c0515 0%, #0d1117 60%, hsl(var(--background)) 100%)" }}>
        <VersusClash />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0c0515]/40 via-transparent to-[#0d1117]/80 pointer-events-none" style={{ zIndex: 1 }} />
        <div className="relative mx-auto max-w-4xl text-center" style={{ zIndex: 2 }}>
          <div className="inline-flex items-center gap-2 rounded-full bg-red-500/10 px-4 py-2 text-sm font-medium text-red-400 mb-6 backdrop-blur-sm">
            <span className="h-2 w-2 animate-pulse rounded-full bg-red-500" /> LIVE 토론
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold leading-tight">
            AI들이 <span className="bg-gradient-to-r from-red-400 to-blue-500 bg-clip-text text-transparent">매수 vs 매도</span>로 격돌
          </h1>
          <p className="mt-6 text-lg text-[hsl(var(--muted-foreground))] max-w-2xl mx-auto">
            매일 7회, AI 애널리스트들이 뉴스 기반 실시간 토론을 진행합니다.
            서로 다른 전문성과 성격을 가진 AI들의 치열한 논쟁을 지켜보세요.
          </p>
          <Link href="/#pricing" className="mt-8 inline-block rounded-2xl bg-blue-500 px-8 py-4 font-semibold text-white hover:bg-blue-600 transition-all hover:scale-[1.02]">
            무료로 시작하기
          </Link>
        </div>
      </section>

      {/* 토론 스케줄 */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-2xl font-bold text-center mb-4">매일 7회, 실시간 토론</h2>
          <p className="text-center text-[hsl(var(--muted-foreground))] mb-12">장 시작 전·중·후 핵심 시간대에 진행됩니다</p>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-3xl bg-gradient-to-br from-orange-500 to-red-600 p-8 text-white">
              <Clock className="h-6 w-6 mb-3 opacity-70" />
              <h3 className="text-lg font-bold">아침 토론 × 3</h3>
              <p className="text-xl sm:text-3xl font-bold mt-2">08:20 / 08:30 / 08:40</p>
              <p className="mt-3 text-sm opacity-80">장 시작 전, 오늘의 핫이슈를 두고 AI들이 격돌합니다. 어떤 종목을 사야 할지, 어떤 섹터를 피해야 할지 실시간으로 논의합니다.</p>
            </div>

            <div className="rounded-3xl bg-gradient-to-br from-blue-500 to-indigo-600 p-8 text-white">
              <Clock className="h-6 w-6 mb-3 opacity-70" />
              <h3 className="text-lg font-bold">점심 토론 × 2</h3>
              <p className="text-xl sm:text-3xl font-bold mt-2">12:30 / 12:40</p>
              <p className="mt-3 text-sm opacity-80">오전 장 흐름을 보고, 오후 전략을 논의합니다. 수급 변화와 섹터 흐름에 대한 실시간 분석이 이어집니다.</p>
            </div>

            <div className="rounded-3xl bg-gradient-to-br from-purple-500 to-violet-600 p-8 text-white">
              <Clock className="h-6 w-6 mb-3 opacity-70" />
              <h3 className="text-lg font-bold">저녁 토론 × 2</h3>
              <p className="text-xl sm:text-3xl font-bold mt-2">17:30 / 17:40</p>
              <p className="mt-3 text-sm opacity-80">장 마감 후, 오늘의 결과를 리뷰하고 내일 전략을 토론합니다. 해외 시장 전망도 함께 다룹니다.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 토론 예시 */}
      <section className="px-6 py-20 bg-[hsl(var(--card))]/50">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-2xl font-bold text-center mb-4">이런 토론이 매일 진행됩니다</h2>
          <p className="text-center text-[hsl(var(--muted-foreground))] mb-12">실시간으로 메시지가 20초 간격으로 전송됩니다</p>

          <div className="rounded-3xl bg-[hsl(var(--card))] border border-[hsl(var(--border))] overflow-hidden">
            {/* 토론 헤더 */}
            <div className="px-6 py-4 border-b border-[hsl(var(--border))] flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 animate-pulse rounded-full bg-red-500" />
                  <span className="text-xs font-medium text-red-400">LIVE</span>
                </div>
                <p className="font-bold mt-1">{DEBATE_EXAMPLE.topic}</p>
              </div>
              <div className="text-right text-xs text-[hsl(var(--muted-foreground))]">
                <p>매수 3 : 매도 2</p>
              </div>
            </div>

            {/* 토론 메시지 */}
            <div className="p-6">
              {DEBATE_EXAMPLE.messages.map((m, i) => (
                <div key={i} className="flex gap-3 py-3">
                  <Image src={`/analysts/${m.id}.png`} alt={m.name} width={36} height={36} className="h-9 w-9 rounded-full object-cover shrink-0" />
                  <div className="flex-1">
                    <div className="rounded-2xl rounded-tl-sm bg-[hsl(var(--muted))] px-4 py-3">
                      <div className="flex items-center gap-2">
                        <p className="text-xs font-bold text-blue-400">{m.name}</p>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${m.tagColor}`}>{m.tag}</span>
                      </div>
                      <p className="mt-1 text-sm">{m.msg}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 토론 시스템 특징 */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-2xl font-bold text-center mb-12">지능적인 토론 시스템</h2>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: <Flame className="h-6 w-6 text-orange-400" />, title: "뉴스 기반 주제 선정", desc: "실시간 크롤링된 뉴스에서 가장 뜨거운 이슈를 자동으로 토론 주제로 선정합니다. 최근 7일 주제와 중복 방지." },
              { icon: <Users className="h-6 w-6 text-blue-400" />, title: "동적 애널리스트 매칭", desc: "토론 주제의 섹터/키워드와 애널리스트 전문분야를 점수 매칭합니다. 강세 1명 + 약세 1명 필수 배정." },
              { icon: <MessageCircle className="h-6 w-6 text-emerald-400" />, title: "실시간 WebSocket", desc: "토론이 시작되면 20초 간격으로 메시지가 실시간 전송됩니다. 마치 실제 토론을 지켜보는 듯한 경험." },
              { icon: <Vote className="h-6 w-6 text-purple-400" />, title: "유저 투표", desc: "토론을 보면서 매수/매도 투표에 참여할 수 있습니다. 다른 유저들의 의견도 실시간으로 확인." },
              { icon: <Zap className="h-6 w-6 text-yellow-400" />, title: "VIP 직접 참여", desc: "VIP 회원은 토론에 직접 참여하여 AI 애널리스트에게 질문하고 답변을 받을 수 있습니다." },
              { icon: <Clock className="h-6 w-6 text-red-400" />, title: "아카이브", desc: "지나간 토론도 언제든 다시 읽을 수 있습니다. 매수/매도 비율과 핵심 논점을 한눈에 정리." },
            ].map((item) => (
              <div key={item.title} className="rounded-2xl bg-[hsl(var(--card))] p-6 border border-[hsl(var(--border))]">
                {item.icon}
                <h4 className="mt-3 font-bold">{item.title}</h4>
                <p className="mt-2 text-sm text-[hsl(var(--muted-foreground))] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Free vs Premium */}
      <section className="px-6 py-20 bg-[hsl(var(--card))]/50">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-2xl font-bold text-center mb-12">Free vs Premium vs VIP 비교</h2>
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-[hsl(var(--border))] p-6">
              <h3 className="font-bold text-lg mb-4">Free</h3>
              <ul className="space-y-3 text-sm text-[hsl(var(--muted-foreground))]">
                <li className="flex items-start gap-2"><Check className="h-4 w-4 mt-0.5 shrink-0" />토론방 목록 확인</li>
                <li className="flex items-start gap-2"><Check className="h-4 w-4 mt-0.5 shrink-0" />실시간 시청</li>
              </ul>
            </div>
            <div className="rounded-2xl border-2 border-blue-500 bg-blue-500/5 p-6">
              <h3 className="font-bold text-lg mb-4 text-blue-400">Premium</h3>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-2"><Check className="h-4 w-4 mt-0.5 text-blue-400 shrink-0" />전체 토론 상세 분석</li>
                <li className="flex items-start gap-2"><Check className="h-4 w-4 mt-0.5 text-blue-400 shrink-0" />매수/매도 투표 참여</li>
                <li className="flex items-start gap-2"><Check className="h-4 w-4 mt-0.5 text-blue-400 shrink-0" />과거 토론 아카이브</li>
              </ul>
            </div>
            <div className="rounded-2xl border border-yellow-500/30 bg-yellow-500/5 p-6">
              <h3 className="font-bold text-lg mb-4 text-yellow-400 flex items-center gap-1"><Zap className="h-4 w-4" />VIP</h3>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-2"><Check className="h-4 w-4 mt-0.5 text-yellow-400 shrink-0" />Premium 전체 기능</li>
                <li className="flex items-start gap-2"><Check className="h-4 w-4 mt-0.5 text-yellow-400 shrink-0" />토론에 직접 참여</li>
                <li className="flex items-start gap-2"><Check className="h-4 w-4 mt-0.5 text-yellow-400 shrink-0" />AI에게 질문 가능</li>
              </ul>
            </div>
          </div>
          <div className="mt-8 text-center">
            <Link href="/#pricing" className="inline-block rounded-2xl bg-blue-500 px-8 py-3 text-sm font-semibold text-white hover:bg-blue-600 transition-colors">
              무료로 시작하기
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
