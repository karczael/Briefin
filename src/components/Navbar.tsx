"use client"
import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"

const NAV_LINKS = [
  { href: "/briefing", label: "브리핑" },
  { href: "/research", label: "AI 리서치" },
  { href: "/debate", label: "토론" },
  { href: "/invest", label: "투자" },
  { href: "/#analysts", label: "애널리스트" },
  { href: "/#pricing", label: "요금" },
]

export default function Navbar() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <nav className="fixed top-0 z-50 w-full max-w-[100vw] border-b border-[hsl(var(--border))] bg-[hsl(var(--background))]/90 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.png" alt="브리핀" width={32} height={32} className="h-8 w-8" />
          <span className="text-lg font-bold text-[hsl(var(--foreground))]">브리핀</span>
        </Link>

        {/* 데스크톱 메뉴 */}
        <div className="hidden md:flex items-center gap-5 text-sm text-[hsl(var(--muted-foreground))]">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`hover:text-[hsl(var(--foreground))] transition-colors ${
                pathname === link.href ? "text-[hsl(var(--foreground))] font-medium" : ""
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <Link href="/#pricing" className="rounded-full bg-blue-500 px-5 py-2 text-sm font-semibold text-white hover:bg-blue-600 transition-colors">
            시작하기
          </Link>

          {/* 모바일 햄버거 */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden flex flex-col gap-1.5 p-2"
            aria-label="메뉴"
          >
            <span className={`block w-5 h-0.5 bg-[hsl(var(--foreground))] transition-transform ${mobileOpen ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`block w-5 h-0.5 bg-[hsl(var(--foreground))] transition-opacity ${mobileOpen ? "opacity-0" : ""}`} />
            <span className={`block w-5 h-0.5 bg-[hsl(var(--foreground))] transition-transform ${mobileOpen ? "-rotate-45 -translate-y-2" : ""}`} />
          </button>
        </div>
      </div>

      {/* 모바일 드롭다운 메뉴 */}
      {mobileOpen && (
        <div className="md:hidden border-t border-[hsl(var(--border))] bg-[hsl(var(--background))]">
          <div className="flex flex-col px-6 py-4 gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`py-3 text-[15px] border-b border-[hsl(var(--border))]/50 transition-colors ${
                  pathname === link.href
                    ? "text-blue-500 font-semibold"
                    : "text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}
