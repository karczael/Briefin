import Image from "next/image"
import Link from "next/link"

export default function Footer() {
  return (
    <>
      {/* Footer */}
      <footer className="border-t border-[hsl(var(--border))] px-6 py-12">
        <div className="mx-auto max-w-5xl flex flex-col items-center gap-6 sm:flex-row sm:justify-between">
          <div className="flex items-center gap-2">
            <Image src="/logo.png" alt="브리핀" width={24} height={24} className="h-6 w-6" />
            <span className="font-bold">브리핀</span>
          </div>
          <div className="flex gap-6 text-sm text-[hsl(var(--muted-foreground))]">
            <Link href="/terms" className="hover:text-[hsl(var(--foreground))]">이용약관</Link>
            <Link href="/privacy" className="hover:text-[hsl(var(--foreground))]">개인정보처리방침</Link>
            <a href="mailto:corecodecto@gmail.com" className="hover:text-[hsl(var(--foreground))]">문의</a>
          </div>
        </div>
        <p className="mt-8 text-center text-xs text-[hsl(var(--muted-foreground))]">
          ⚠️ 본 서비스의 정보는 투자 권유가 아닌 AI 기반 시장 분석 자료입니다. 투자 판단은 본인 책임입니다.
        </p>
        <p className="mt-2 text-center text-xs text-[hsl(var(--muted-foreground))]">© 2026 Briefin. All rights reserved.</p>
      </footer>
    </>
  )
}
