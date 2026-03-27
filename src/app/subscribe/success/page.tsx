"use client"
import { useSearchParams } from "next/navigation"
import { CheckCircle } from "lucide-react"
import Link from "next/link"
import { useEffect } from "react"

const TIER_NAMES: Record<string, string> = {
  premium: "Premium",
  vip: "VIP",
}

export default function SubscribeSuccessPage() {
  const searchParams = useSearchParams()
  const tier = searchParams.get("tier") || "premium"
  const token = searchParams.get("token")

  // 토큰 저장 (백엔드에서 리다이렉트 시 전달)
  useEffect(() => {
    if (token) {
      localStorage.setItem("access_token", token)
    }
  }, [token])

  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-[hsl(var(--background))]">
      <div className="max-w-md w-full text-center space-y-6">
        {/* 체크 애니메이션 */}
        <div className="flex justify-center">
          <div className="rounded-full bg-green-500/10 p-6">
            <CheckCircle className="h-16 w-16 text-green-500" />
          </div>
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-bold">구독이 시작되었습니다!</h1>
          <p className="text-[hsl(var(--muted-foreground))]">
            {TIER_NAMES[tier] || tier} 요금제의 <strong>14일 무료 체험</strong>이 시작되었습니다.
          </p>
        </div>

        {/* 안내 카드 */}
        <div className="rounded-2xl bg-[hsl(var(--card))] border border-[hsl(var(--border))] p-6 text-left space-y-3">
          <div className="flex items-center gap-3">
            <span className="text-green-500 text-lg">✓</span>
            <span className="text-sm">모든 프리미엄 기능을 14일간 무료로 이용하세요</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-green-500 text-lg">✓</span>
            <span className="text-sm">14일 이내 해지 시 비용이 청구되지 않습니다</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-green-500 text-lg">✓</span>
            <span className="text-sm">설정 &gt; 구독 관리에서 언제든 해지 가능합니다</span>
          </div>
        </div>

        {/* CTA 버튼 */}
        <div className="space-y-3 pt-2">
          <Link
            href="/"
            className="block w-full rounded-2xl bg-blue-500 py-4 font-semibold text-white text-center hover:bg-blue-600 transition-colors"
          >
            브리핀 시작하기
          </Link>
          <Link
            href="/"
            className="block text-sm text-[hsl(var(--muted-foreground))] hover:underline"
          >
            홈으로 돌아가기
          </Link>
        </div>
      </div>
    </div>
  )
}
