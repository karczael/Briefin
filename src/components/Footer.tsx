import Link from "next/link"
import { ANALYSTS } from "@/lib/constants"

export default function Footer() {
  return (
    <>
      {/* Final CTA */}
      <section className="px-6 py-24 text-center">
        <div className="mx-auto max-w-2xl">
          <h2 className="text-3xl font-bold">지금 시작하면<br /><span className="text-blue-400">14일간 무료</span></h2>
          <p className="mt-4 text-[hsl(var(--muted-foreground))]">언제든 해지 가능 · 자동 결제</p>
          <Link href="/#pricing" className="mt-8 inline-block rounded-2xl bg-blue-500 px-12 py-4 font-semibold text-white hover:bg-blue-600 transition-all hover:scale-[1.02]">
            무료 체험 시작하기
          </Link>
          <div className="mt-6 flex justify-center -space-x-2">
            {ANALYSTS.slice(0, 6).map((a) => (
              <img key={a.id} src={`/analysts/${a.id}.png`} alt="" className="h-8 w-8 rounded-full object-cover border-2 border-[hsl(var(--background))]" />
            ))}
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500/20 text-[10px] font-bold text-blue-400 border-2 border-[hsl(var(--background))]">+4</div>
          </div>
          <p className="mt-2 text-xs text-[hsl(var(--muted-foreground))]">10명의 AI 전문가가 기다리고 있어요</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[hsl(var(--border))] px-6 py-12">
        <div className="mx-auto max-w-5xl flex flex-col items-center gap-6 sm:flex-row sm:justify-between">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded-md bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white text-[10px] font-bold">B</div>
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
