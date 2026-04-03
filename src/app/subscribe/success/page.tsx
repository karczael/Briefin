"use client"
import { Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { CheckCircle } from "lucide-react"
import Link from "next/link"
import { useEffect } from "react"

export default function SubscribeSuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><span className="h-8 w-8 border-2 border-green-500/30 border-t-green-500 rounded-full animate-spin" /></div>}>
      <SuccessContent />
    </Suspense>
  )
}

function SuccessContent() {
  const searchParams = useSearchParams()
  const token = searchParams.get("token")

  // 토큰 저장
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
          <h1 className="text-2xl font-bold">가입 완료!</h1>
          <p className="text-[hsl(var(--muted-foreground))]">
            🎉 <strong>Premium 1개월 무료</strong> 이벤트가 적용되었습니다.
          </p>
        </div>

        {/* 안내 카드 */}
        <div className="rounded-2xl bg-[hsl(var(--card))] border border-[hsl(var(--border))] p-6 text-left space-y-3">
          <div className="flex items-center gap-3">
            <span className="text-green-500 text-lg">✓</span>
            <span className="text-sm">모든 콘텐츠를 광고 없이 1개월간 이용하세요</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-green-500 text-lg">✓</span>
            <span className="text-sm">결제 정보 등록 없이 바로 시작됩니다</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-green-500 text-lg">✓</span>
            <span className="text-sm">이벤트 종료 후 Free로 자동 전환됩니다</span>
          </div>
        </div>

        {/* CTA 버튼 */}
        <div className="space-y-3 pt-2">
          <a
            href="https://app.briefin.kr"
            className="block w-full rounded-2xl bg-blue-500 py-4 font-semibold text-white text-center hover:bg-blue-600 transition-colors"
          >
            브리핀 시작하기
          </a>
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
