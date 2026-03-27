// 백엔드 API 호출 유틸리티
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8002/api/v1"

export async function apiPost<T>(path: string, body: Record<string, unknown>): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: "서버 오류가 발생했습니다" }))
    throw new Error(err.detail || "요청에 실패했습니다")
  }
  return res.json()
}
