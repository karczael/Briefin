"use client"
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

  return (
    <nav className="fixed top-0 z-50 w-full max-w-[100vw] border-b border-[hsl(var(--border))] bg-[hsl(var(--background))]/90 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.png" alt="브리핀" width={32} height={32} className="h-8 w-8" />
          <span className="text-lg font-bold text-[hsl(var(--foreground))]">브리핀</span>
        </Link>
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
        <Link href="/#pricing" className="rounded-full bg-blue-500 px-5 py-2 text-sm font-semibold text-white hover:bg-blue-600 transition-colors">
          시작하기
        </Link>
      </div>
    </nav>
  )
}
