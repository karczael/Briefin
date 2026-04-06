"use client"
import { useState } from "react"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"

export default function ContactPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [category, setCategory] = useState("inquiry")
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<{ ok: boolean; msg: string } | null>(null)

  const API = process.env.NEXT_PUBLIC_API_URL || "https://api.briefin.kr/api/v1"

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !email.trim() || !title.trim() || !content.trim()) return
    setLoading(true)
    setResult(null)
    try {
      const res = await fetch(`${API}/inquiries/public`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), email: email.trim(), category, title: title.trim(), content: content.trim() }),
      })
      if (!res.ok) throw new Error()
      setResult({ ok: true, msg: "문의가 등록되었습니다. 빠르게 확인 후 답변드리겠습니다." })
      setName(""); setEmail(""); setTitle(""); setContent("")
    } catch {
      setResult({ ok: false, msg: "문의 등록에 실패했습니다. 잠시 후 다시 시도해주세요." })
    }
    setLoading(false)
  }

  const categories = [
    { value: "inquiry", label: "문의" },
    { value: "suggestion", label: "건의" },
    { value: "bug", label: "버그 신고" },
  ]

  return (
    <div className="min-h-screen">
      <Navbar />

      <section className="px-6 pt-28 pb-24">
        <div className="mx-auto max-w-2xl">
          <h1 className="text-center text-3xl font-bold sm:text-4xl">문의하기</h1>
          <p className="mt-4 text-center text-[hsl(var(--muted-foreground))]">
            궁금한 점이나 건의사항이 있으시면 편하게 남겨주세요.
          </p>

          <form onSubmit={handleSubmit} className="mt-10 space-y-5">
            {/* 이름 + 이메일 */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium mb-1.5">이름</label>
                <input
                  type="text" value={name} onChange={(e) => setName(e.target.value)}
                  placeholder="홍길동" required maxLength={50}
                  className="w-full rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] px-4 py-3 text-sm outline-none focus:border-blue-500 transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">이메일</label>
                <input
                  type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                  placeholder="email@example.com" required maxLength={200}
                  className="w-full rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] px-4 py-3 text-sm outline-none focus:border-blue-500 transition-colors"
                />
              </div>
            </div>

            {/* 카테고리 */}
            <div>
              <label className="block text-sm font-medium mb-1.5">분류</label>
              <div className="flex gap-2">
                {categories.map((c) => (
                  <button
                    key={c.value} type="button"
                    onClick={() => setCategory(c.value)}
                    className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                      category === c.value
                        ? "bg-blue-500 text-white"
                        : "border border-[hsl(var(--border))] text-[hsl(var(--muted-foreground))] hover:bg-[hsl(var(--card))]"
                    }`}
                  >
                    {c.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 제목 */}
            <div>
              <label className="block text-sm font-medium mb-1.5">제목</label>
              <input
                type="text" value={title} onChange={(e) => setTitle(e.target.value)}
                placeholder="문의 제목을 입력해주세요" required maxLength={200}
                className="w-full rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] px-4 py-3 text-sm outline-none focus:border-blue-500 transition-colors"
              />
            </div>

            {/* 내용 */}
            <div>
              <label className="block text-sm font-medium mb-1.5">내용</label>
              <textarea
                value={content} onChange={(e) => setContent(e.target.value)}
                placeholder="문의 내용을 상세히 작성해주세요" required maxLength={5000} rows={6}
                className="w-full rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] px-4 py-3 text-sm outline-none focus:border-blue-500 transition-colors resize-none"
              />
            </div>

            {/* 결과 메시지 */}
            {result && (
              <p className={`text-sm text-center font-medium ${result.ok ? "text-emerald-500" : "text-red-500"}`}>
                {result.msg}
              </p>
            )}

            {/* 제출 */}
            <button
              type="submit" disabled={loading || !name.trim() || !email.trim() || !title.trim() || !content.trim()}
              className="w-full rounded-2xl bg-blue-500 py-4 font-semibold text-white hover:bg-blue-600 disabled:opacity-40 transition-colors"
            >
              {loading ? "등록 중..." : "문의 등록"}
            </button>
          </form>
        </div>
      </section>

      <Footer />
    </div>
  )
}
