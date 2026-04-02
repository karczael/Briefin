import type { Metadata, Viewport } from "next"
import Script from "next/script"
import "./globals.css"

const GA_ID = "G-R39D3PX52X"

export const metadata: Metadata = {
  title: "브리핀 (Briefin) — 아침 10분, AI가 브리핑합니다",
  description: "시간 없는 직장인을 위한 AI 주식 브리핑 서비스. 10명의 AI 전문가가 매일 시장을 분석하고, 실시간 토론하고, 팟캐스트로 들려드립니다.",
  keywords: ["AI 주식", "주식 브리핑", "AI 애널리스트", "모닝 브리핑", "주식 토론", "팟캐스트", "투자 AI", "브리핀"],
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
  },
  openGraph: {
    title: "브리핀 — 아침 10분, AI가 브리핑합니다",
    description: "10명의 AI 전문가가 매일 시장을 분석합니다. 출퇴근길에 팟캐스트로 들어보세요.",
    url: "https://briefin.kr",
    siteName: "브리핀 (Briefin)",
    images: [{ url: "https://briefin.kr/og-image.png", width: 1200, height: 630, alt: "브리핀 — AI 주식 브리핑 서비스" }],
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "브리핀 — AI 주식 브리핑",
    description: "아침 10분이면 오늘 시장을 파악할 수 있습니다",
    images: ["https://briefin.kr/og-image.png"],
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "https://briefin.kr" },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0E1117",
}

// JSON-LD 구조화 데이터
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "브리핀 (Briefin)",
  description: "AI 주식 브리핑 서비스",
  applicationCategory: "FinanceApplication",
  operatingSystem: "Web",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "KRW",
    description: "14일 무료 체험",
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <head>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_ID}');
          `}
        </Script>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
