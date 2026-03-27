"use client"
import { AlertTriangle } from "lucide-react"
import Link from "next/link"

export default function SubscribeFailPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-[hsl(var(--background))]">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="flex justify-center">
          <div className="rounded-full bg-red-500/10 p-6">
            <AlertTriangle className="h-16 w-16 text-red-400" />
          </div>
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-bold">결제 처리 중 오류가 발생했습니다</h1>
          <p className="text-[hsl(var(--muted-foreground))]">
            결제 처리 중 문제가 발생했습니다. 다시 시도해주세요.
          </p>
        </div>

        <div className="space-y-3 pt-2">
          <Link
            href="/#pricing"
            className="block w-full rounded-2xl bg-blue-500 py-4 font-semibold text-white text-center hover:bg-blue-600 transition-colors"
          >
            다시 시도하기
          </Link>
          <Link href="/" className="block text-sm text-[hsl(var(--muted-foreground))] hover:underline">
            홈으로 돌아가기
          </Link>
        </div>
      </div>
    </div>
  )
}
