"use client"
import { Suspense, useState } from "react"
import { useSearchParams } from "next/navigation"
import { Check, Shield, ArrowLeft, Zap, Loader2 } from "lucide-react"
import Link from "next/link"
import { apiPost } from "@/lib/api"

// 요금제 정보 (이벤트 가격)
const PLANS: Record<string, { name: string; price: number; priceLabel: string; features: string[]; eventLabel?: string }> = {
  premium: {
    name: "Premium",
    price: 0,
    priceLabel: "무료",
    eventLabel: "이벤트 기간 무료!",
    features: [
      "전체 브리핑 (모닝/점심/클로징)",
      "AI 리서치 전문 읽기",
      "토론방 상세 분석",
      "밸류에이션 차트 + 팟캐스트",
    ],
  },
  vip: {
    name: "VIP",
    price: 9000,
    priceLabel: "₩9,000/월",
    eventLabel: "할인 중",
    features: [
      "광고 완전 제거",
      "매매 전략 설정 (12개 전략)",
      "실시간 매매 신호 알림",
      "전략 백테스트",
      "자동 손절 서비스 (KIS 연동)",
      "1:1 AI 애널리스트 상담",
    ],
  },
}

interface RegisterResponse {
  access_token: string
  refresh_token: string
  token_type: string
}

export default function SubscribePage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><span className="h-8 w-8 border-2 border-blue-500/30 border-t-blue-500 rounded-full animate-spin" /></div>}>
      <SubscribeContent />
    </Suspense>
  )
}

function SubscribeContent() {
  const searchParams = useSearchParams()
  const planId = searchParams.get("plan") || "premium"
  const plan = PLANS[planId] || PLANS.premium

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [nickname, setNickname] = useState("")
  const [agreed, setAgreed] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  // 이메일 형식 검사
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  const isFormValid = isEmailValid && password.length >= 8 && nickname.length >= 1 && agreed

  // 회원가입 → 바로 성공 (결제 없이 가입만)
  const handleSubmit = async () => {
    if (!isFormValid || loading) return
    setLoading(true)
    setError("")

    try {
      // 회원가입 → JWT 획득 (백엔드에서 Premium 1개월 자동 적용)
      const data = await apiPost<RegisterResponse>("/auth/register", {
        email,
        password,
        nickname,
      })

      // JWT 저장
      localStorage.setItem("access_token", data.access_token)
      localStorage.setItem("refresh_token", data.refresh_token)

      // 성공 페이지로 이동
      window.location.href = `/subscribe/success?tier=${planId}`
    } catch (e) {
      setError(e instanceof Error ? e.message : "오류가 발생했습니다")
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[hsl(var(--background))]">
      {/* 상단 네비 */}
      <div className="flex items-center gap-3 px-6 py-4 border-b border-[hsl(var(--border))]">
        <Link href="/#pricing" className="p-2 rounded-xl hover:bg-[hsl(var(--muted))] transition-colors">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <span className="font-semibold">무료로 시작하기</span>
      </div>

      <div className="mx-auto max-w-lg px-6 py-8 space-y-8">

        {/* ─── 선택된 플랜 ─── */}
        <div className={`rounded-2xl p-6 border-2 ${planId === "vip" ? "border-yellow-500/30 bg-yellow-500/5" : "border-blue-500/30 bg-blue-500/5"}`}>
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                {planId === "vip" && <Zap className="h-5 w-5 text-yellow-400" />}
                <h2 className="text-xl font-bold">{plan.name}</h2>
              </div>
              <p className="text-2xl font-bold mt-1">{plan.priceLabel}</p>
            </div>
            {plan.eventLabel && (
              <div className="rounded-full bg-emerald-500/10 px-4 py-2 text-sm font-bold text-emerald-500">
                {plan.eventLabel}
              </div>
            )}
          </div>
          <ul className="mt-4 space-y-2">
            {plan.features.map((f) => (
              <li key={f} className="flex items-start gap-2 text-sm text-[hsl(var(--muted-foreground))]">
                <Check className={`h-4 w-4 mt-0.5 shrink-0 ${planId === "vip" ? "text-yellow-400" : "text-blue-400"}`} />
                {f}
              </li>
            ))}
          </ul>
        </div>

        {/* ─── 이벤트 배너 ─── */}
        <div className="rounded-2xl bg-emerald-500/5 border border-emerald-500/20 p-5">
          <div className="flex items-start gap-3">
            <Shield className="h-6 w-6 text-emerald-500 shrink-0 mt-0.5" />
            <div className="space-y-2">
              <p className="font-bold text-emerald-600 dark:text-emerald-400">🎉 오픈 이벤트 진행 중</p>
              <p className="text-sm text-[hsl(var(--muted-foreground))]">
                지금 가입하면 <strong>Premium 1개월 무료</strong>! 결제 없이 바로 시작하세요.
                모든 프리미엄 콘텐츠를 이용할 수 있습니다.
              </p>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[hsl(var(--muted-foreground))]">
                <span>✓ 결제 정보 불필요</span>
                <span>✓ 가입 즉시 Premium 적용</span>
                <span>✓ 1개월 무료 이용</span>
              </div>
            </div>
          </div>
        </div>

        {/* ─── 회원가입 폼 ─── */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold">계정 만들기</h3>

          <div>
            <label className="block text-sm font-medium mb-2">이메일</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@email.com"
              className="w-full rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--background))] px-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
            />
            {email && !isEmailValid && (
              <p className="text-xs text-red-400 mt-1">올바른 이메일 형식을 입력해주세요</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">비밀번호</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="8자 이상"
              className="w-full rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--background))] px-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
            />
            {password && password.length < 8 && (
              <p className="text-xs text-red-400 mt-1">비밀번호는 8자 이상이어야 합니다</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">닉네임</label>
            <input
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              placeholder="브리핀에서 사용할 이름"
              className="w-full rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--background))] px-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
            />
          </div>

          {/* 약관 동의 */}
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="mt-1 h-4 w-4 rounded border-[hsl(var(--border))] accent-blue-500"
            />
            <span className="text-sm text-[hsl(var(--muted-foreground))]">
              <Link href="/terms" className="underline" target="_blank">이용약관</Link> 및{" "}
              <Link href="/privacy" className="underline" target="_blank">개인정보처리방침</Link>에
              동의합니다
            </span>
          </label>
        </div>

        {/* ─── 에러 메시지 ─── */}
        {error && (
          <div className="rounded-xl bg-red-500/10 border border-red-500/20 px-4 py-3 text-sm text-red-400">
            {error}
          </div>
        )}

        {/* ─── 가입 버튼 ─── */}
        <button
          onClick={handleSubmit}
          disabled={!isFormValid || loading}
          className="w-full rounded-2xl bg-[#3182F6] py-4 font-bold text-lg text-white transition-all hover:bg-[#2272E6] disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <Loader2 className="h-5 w-5 animate-spin" />
              가입 중...
            </span>
          ) : (
            "무료로 시작하기"
          )}
        </button>

        {/* ─── 하단 안내 ─── */}
        <div className="text-center space-y-2 pb-8">
          <p className="text-sm font-medium text-[hsl(var(--muted-foreground))]">
            결제 없이 가입 · Premium 1개월 무료
          </p>
          <p className="text-xs text-[hsl(var(--muted-foreground))]">
            이벤트 종료 후 Free로 전환됩니다.<br />
            유료 구독은 앱 내에서 진행할 수 있습니다.
          </p>
        </div>

      </div>
    </div>
  )
}
