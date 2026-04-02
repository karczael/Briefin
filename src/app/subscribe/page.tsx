"use client"
import { Suspense, useState, useEffect, useRef } from "react"
import { useSearchParams } from "next/navigation"
import { Check, Shield, ArrowLeft, Zap, Loader2 } from "lucide-react"
import Link from "next/link"
import { apiPost } from "@/lib/api"
import { loadTossPayments } from "@tosspayments/tosspayments-sdk"

const TOSS_CLIENT_KEY = process.env.NEXT_PUBLIC_TOSS_CLIENT_KEY || ""

// 요금제 정보
const PLANS: Record<string, { name: string; price: number; priceLabel: string; features: string[] }> = {
  premium: {
    name: "Premium",
    price: 9900,
    priceLabel: "₩9,900/월",
    features: [
      "전체 브리핑 (모닝/점심/클로징)",
      "AI 리서치 전문 읽기",
      "토론방 상세 분석",
      "밸류에이션 차트 + 적정가 계산기",
      "팟캐스트 (출퇴근길 청취)",
      "기업 분석 + 실적 전망",
    ],
  },
  vip: {
    name: "VIP",
    price: 19800,
    priceLabel: "₩19,800/월",
    features: [
      "Premium 전체 기능",
      "매매 전략 설정 (12개 전략)",
      "실시간 매매 신호 알림",
      "전략 백테스트",
      "자동 손절 서비스 (KIS 연동)",
      "토론방 직접 참여 (AI 답변)",
    ],
  },
}

// 고객 키 생성 (빌링용)
function generateCustomerKey(): string {
  const timestamp = Date.now()
  const random = Math.random().toString(36).substring(2, 10)
  return `cust-${timestamp}-${random}`
}

interface RegisterResponse {
  access_token: string
  refresh_token: string
  token_type: string
}

interface BillingKeyResponse {
  success: boolean
  tier: string
  trial_ends_at: string
  expires_at: string
  message: string
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
  const [step, setStep] = useState<"form" | "billing_callback">("form")
  const tossRef = useRef<any>(null)

  // SDK 초기화
  useEffect(() => {
    if (!TOSS_CLIENT_KEY) return
    loadTossPayments(TOSS_CLIENT_KEY)
      .then((toss) => { tossRef.current = toss })
      .catch((err) => console.error("토스 SDK 로드 실패:", err))
  }, [])

  // URL 파라미터에서 토스 빌링 인증 결과 처리 (콜백)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const authKey = params.get("authKey")
    const customerKey = params.get("customerKey")
    const callbackPlanId = params.get("planId")

    if (authKey && customerKey && callbackPlanId) {
      setStep("billing_callback")
      handleBillingCallback(authKey, customerKey, callbackPlanId)
    }

    // 결제 실패/취소 시
    const payError = params.get("error")
    if (payError) {
      setError("결제가 취소되었거나 실패했습니다. 다시 시도해주세요.")
    }
  }, [])

  // 빌링 인증 콜백 → 백엔드에 빌링키 발급 요청
  const handleBillingCallback = async (authKey: string, customerKey: string, callbackPlanId: string) => {
    setLoading(true)
    const token = localStorage.getItem("access_token")
    if (!token) {
      setError("인증 정보가 없습니다. 처음부터 다시 시도해주세요.")
      setStep("form")
      setLoading(false)
      return
    }

    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8002/api/v1"
      const res = await fetch(`${API_URL}/subscriptions/toss/billing-key`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({
          auth_key: authKey,
          customer_key: customerKey,
          plan_id: callbackPlanId,
        }),
      })

      if (!res.ok) {
        const err = await res.json().catch(() => ({ detail: "빌링키 발급에 실패했습니다" }))
        throw new Error(err.detail || "구독 처리에 실패했습니다")
      }

      const data: BillingKeyResponse = await res.json()
      if (data.success) {
        // 성공 → 성공 페이지로 이동
        window.location.href = `/subscribe/success?token=${token}&tier=${callbackPlanId}`
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "구독 처리 중 오류가 발생했습니다")
      setStep("form")
    } finally {
      setLoading(false)
    }
  }

  // 이메일 형식 검사
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  const isFormValid = isEmailValid && password.length >= 8 && nickname.length >= 1 && agreed

  // 회원가입 → 토스 빌링 인증 요청
  const handleSubmit = async () => {
    if (!isFormValid || loading) return
    if (!tossRef.current) {
      setError("결제 모듈을 불러오는 중입니다. 잠시 후 다시 시도해주세요.")
      return
    }

    setLoading(true)
    setError("")

    try {
      // 1단계: 회원가입 → JWT 획득
      const data = await apiPost<RegisterResponse>("/auth/register", {
        email,
        password,
        nickname,
      })

      // JWT 저장 (빌링키 발급 시 필요)
      localStorage.setItem("access_token", data.access_token)
      localStorage.setItem("refresh_token", data.refresh_token)

      // 2단계: 토스 빌링 인증 (카드 등록)
      const customerKey = generateCustomerKey()
      const currentUrl = `${window.location.origin}/subscribe`
      const payment = tossRef.current.payment({ customerKey })

      await payment.requestBillingAuth({
        method: "CARD",
        successUrl: `${currentUrl}?planId=${planId}`,
        failUrl: `${currentUrl}?error=billing_failed`,
      })
    } catch (e) {
      setError(e instanceof Error ? e.message : "오류가 발생했습니다")
      setLoading(false)
    }
  }

  // 빌링 콜백 처리 중 화면
  if (step === "billing_callback") {
    return (
      <div className="min-h-screen flex items-center justify-center px-6 bg-[hsl(var(--background))]">
        <div className="text-center space-y-4">
          <Loader2 className="h-10 w-10 animate-spin mx-auto text-blue-500" />
          <p className="text-lg font-medium">구독을 처리하고 있습니다...</p>
          <p className="text-sm text-[hsl(var(--muted-foreground))]">잠시만 기다려주세요</p>
          {error && (
            <div className="rounded-xl bg-red-500/10 border border-red-500/20 px-4 py-3 text-sm text-red-400 mt-4">
              {error}
              <Link href={`/subscribe?plan=${planId}`} className="block mt-2 underline">
                다시 시도하기
              </Link>
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[hsl(var(--background))]">
      {/* 상단 네비 */}
      <div className="flex items-center gap-3 px-6 py-4 border-b border-[hsl(var(--border))]">
        <Link href="/#pricing" className="p-2 rounded-xl hover:bg-[hsl(var(--muted))] transition-colors">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <span className="font-semibold">구독 시작하기</span>
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
            <div className="rounded-full bg-green-500/10 px-4 py-2 text-sm font-bold text-green-500">
              14일 무료
            </div>
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

        {/* ─── 안심 배너 ─── */}
        <div className="rounded-2xl bg-green-500/5 border border-green-500/20 p-5">
          <div className="flex items-start gap-3">
            <Shield className="h-6 w-6 text-green-500 shrink-0 mt-0.5" />
            <div className="space-y-2">
              <p className="font-bold text-green-600 dark:text-green-400">지금은 절대 결제되지 않습니다</p>
              <p className="text-sm text-[hsl(var(--muted-foreground))]">
                결제 정보를 등록만 해두고, <strong>14일간 모든 기능을 무료</strong>로 이용해보세요.
                14일이 되기 전에 언제든 취소할 수 있으며, 취소 시 비용이 청구되지 않습니다.
              </p>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[hsl(var(--muted-foreground))]">
                <span>✓ 0원 결제</span>
                <span>✓ 14일 내 취소 가능</span>
                <span>✓ 자동 갱신 해지 자유</span>
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

        {/* ─── 토스 결제 버튼 ─── */}
        <button
          onClick={handleSubmit}
          disabled={!isFormValid || loading}
          className="w-full rounded-2xl bg-[#3182F6] py-4 font-bold text-lg text-white transition-all hover:bg-[#2272E6] disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <Loader2 className="h-5 w-5 animate-spin" />
              처리 중...
            </span>
          ) : (
            "무료 체험 시작하기"
          )}
        </button>

        {/* ─── 하단 안심 문구 ─── */}
        <div className="text-center space-y-2 pb-8">
          <p className="text-sm font-medium text-[hsl(var(--muted-foreground))]">
            지금 결제되지 않습니다 · 14일 무료 체험
          </p>
          <p className="text-xs text-[hsl(var(--muted-foreground))]">
            무료 체험 기간 중 언제든 해지할 수 있으며,<br />
            해지 시 요금이 청구되지 않습니다.
          </p>
          <p className="text-xs text-[hsl(var(--muted-foreground))]">
            체험 종료 후 월 {plan.priceLabel} 자동 결제 · 언제든 해지 가능
          </p>
        </div>

      </div>
    </div>
  )
}
