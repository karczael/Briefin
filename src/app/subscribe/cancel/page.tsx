"use client"
import { XCircle } from "lucide-react"
import Link from "next/link"

export default function SubscribeCancelPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-[hsl(var(--background))]">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="flex justify-center">
          <div className="rounded-full bg-[hsl(var(--muted))] p-6">
            <XCircle className="h-16 w-16 text-[hsl(var(--muted-foreground))]" />
          </div>
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-bold">결제가 취소되었습니다</h1>
          <p className="text-[hsl(var(--muted-foreground))]">
            결제를 취소하셨습니다. 언제든 다시 시작할 수 있습니다.
          </p>
        </div>

        <div className="space-y-3 pt-2">
          <Link
            href="/#pricing"
            className="block w-full rounded-2xl bg-blue-500 py-4 font-semibold text-white text-center hover:bg-blue-600 transition-colors"
          >
            요금제 다시 보기
          </Link>
          <Link href="/" className="block text-sm text-[hsl(var(--muted-foreground))] hover:underline">
            홈으로 돌아가기
          </Link>
        </div>
      </div>
    </div>
  )
}
