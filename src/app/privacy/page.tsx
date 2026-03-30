import Link from "next/link"

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[hsl(var(--background))]">
      {/* 헤더 */}
      <nav className="border-b border-[hsl(var(--border))] px-6 py-4">
        <div className="mx-auto max-w-3xl flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="h-7 w-7 rounded-lg bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white text-xs font-bold">B</div>
            <span className="font-bold">브리핀</span>
          </Link>
          <Link href="/terms" className="text-sm text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]">
            이용약관
          </Link>
        </div>
      </nav>

      <article className="mx-auto max-w-3xl px-6 py-12">
        <h1 className="text-3xl font-bold">개인정보처리방침</h1>
        <p className="mt-2 text-sm text-[hsl(var(--muted-foreground))]">시행일: 2026년 3월 1일 | 최종 수정: 2026년 3월 26일</p>

        <div className="mt-10 space-y-10 text-[15px] leading-relaxed text-[hsl(var(--foreground))]/90">
          <Section title="제1조 (개인정보의 수집 항목)">
            <p className="mb-3">회사는 서비스 제공을 위해 다음의 개인정보를 수집합니다.</p>
            <div className="rounded-xl bg-[hsl(var(--card))] border border-[hsl(var(--border))] overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-[hsl(var(--muted))]">
                    <th className="px-4 py-3 text-left font-semibold">구분</th>
                    <th className="px-4 py-3 text-left font-semibold">수집 항목</th>
                    <th className="px-4 py-3 text-left font-semibold">수집 방법</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-[hsl(var(--border))]">
                    <td className="px-4 py-3 font-medium">필수</td>
                    <td className="px-4 py-3">이메일, 비밀번호(암호화), 닉네임</td>
                    <td className="px-4 py-3">회원가입</td>
                  </tr>
                  <tr className="border-t border-[hsl(var(--border))]">
                    <td className="px-4 py-3 font-medium">소셜 로그인</td>
                    <td className="px-4 py-3">Google ID, 이메일, 프로필 이미지</td>
                    <td className="px-4 py-3">OAuth 인증</td>
                  </tr>
                  <tr className="border-t border-[hsl(var(--border))]">
                    <td className="px-4 py-3 font-medium">선택</td>
                    <td className="px-4 py-3">관심 종목, 투자 성향, 선호 섹터</td>
                    <td className="px-4 py-3">온보딩 설문</td>
                  </tr>
                  <tr className="border-t border-[hsl(var(--border))]">
                    <td className="px-4 py-3 font-medium">자동 수집</td>
                    <td className="px-4 py-3">접속 로그, 기기 정보, 서비스 이용 기록</td>
                    <td className="px-4 py-3">자동 생성</td>
                  </tr>
                  <tr className="border-t border-[hsl(var(--border))]">
                    <td className="px-4 py-3 font-medium">결제</td>
                    <td className="px-4 py-3">결제 수단 정보 (Toss Payments 위탁 처리)</td>
                    <td className="px-4 py-3">결제 시</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Section>

          <Section title="제2조 (개인정보의 수집 및 이용 목적)">
            <ol className="list-decimal pl-5 space-y-2">
              <li><strong>서비스 제공</strong>: 회원 인증, AI 브리핑 생성, 관심종목 기반 콘텐츠 제공</li>
              <li><strong>구독 관리</strong>: 결제 처리, 구독 상태 관리, 요금 청구</li>
              <li><strong>서비스 개선</strong>: 이용 통계 분석, 서비스 품질 향상, 신규 기능 개발</li>
              <li><strong>고객 지원</strong>: 문의 대응, 공지사항 전달, 불만 처리</li>
              <li><strong>마케팅</strong>: 이벤트 안내, 프로모션 알림 (동의 시)</li>
            </ol>
          </Section>

          <Section title="제3조 (개인정보의 보유 및 이용 기간)">
            <div className="rounded-xl bg-[hsl(var(--card))] border border-[hsl(var(--border))] overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-[hsl(var(--muted))]">
                    <th className="px-4 py-3 text-left font-semibold">항목</th>
                    <th className="px-4 py-3 text-left font-semibold">보유 기간</th>
                    <th className="px-4 py-3 text-left font-semibold">근거</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-[hsl(var(--border))]">
                    <td className="px-4 py-3">회원 정보</td>
                    <td className="px-4 py-3">회원 탈퇴 시까지</td>
                    <td className="px-4 py-3">서비스 제공</td>
                  </tr>
                  <tr className="border-t border-[hsl(var(--border))]">
                    <td className="px-4 py-3">결제 기록</td>
                    <td className="px-4 py-3">5년</td>
                    <td className="px-4 py-3">전자상거래법</td>
                  </tr>
                  <tr className="border-t border-[hsl(var(--border))]">
                    <td className="px-4 py-3">접속 로그</td>
                    <td className="px-4 py-3">3개월</td>
                    <td className="px-4 py-3">통신비밀보호법</td>
                  </tr>
                  <tr className="border-t border-[hsl(var(--border))]">
                    <td className="px-4 py-3">소비자 불만/분쟁 기록</td>
                    <td className="px-4 py-3">3년</td>
                    <td className="px-4 py-3">전자상거래법</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Section>

          <Section title="제4조 (개인정보의 제3자 제공)">
            <p>회사는 원칙적으로 이용자의 개인정보를 제3자에게 제공하지 않습니다. 다만, 다음의 경우 예외로 합니다.</p>
            <ol className="list-decimal pl-5 space-y-2 mt-3">
              <li>이용자가 사전에 동의한 경우</li>
              <li>법령에 의거하여 수사 목적으로 법적 절차에 따라 요청된 경우</li>
              <li>통계 작성 등을 위해 개인을 식별할 수 없는 형태로 제공하는 경우</li>
            </ol>
          </Section>

          <Section title="제5조 (개인정보 처리 위탁)">
            <div className="rounded-xl bg-[hsl(var(--card))] border border-[hsl(var(--border))] overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-[hsl(var(--muted))]">
                    <th className="px-4 py-3 text-left font-semibold">수탁자</th>
                    <th className="px-4 py-3 text-left font-semibold">위탁 업무</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-[hsl(var(--border))]">
                    <td className="px-4 py-3">Toss Payments</td>
                    <td className="px-4 py-3">결제 처리 및 관리</td>
                  </tr>
                  <tr className="border-t border-[hsl(var(--border))]">
                    <td className="px-4 py-3">Google Cloud Platform</td>
                    <td className="px-4 py-3">AI 콘텐츠 생성 (Gemini API), TTS 음성 변환</td>
                  </tr>
                  <tr className="border-t border-[hsl(var(--border))]">
                    <td className="px-4 py-3">Amazon Web Services</td>
                    <td className="px-4 py-3">서버 운영 및 데이터 저장</td>
                  </tr>
                  <tr className="border-t border-[hsl(var(--border))]">
                    <td className="px-4 py-3">Firebase (Google)</td>
                    <td className="px-4 py-3">푸시 알림 (FCM)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Section>

          <Section title="제6조 (이용자의 권리)">
            <p>이용자는 다음의 권리를 행사할 수 있습니다.</p>
            <ol className="list-decimal pl-5 space-y-2 mt-3">
              <li><strong>열람권</strong>: 자신의 개인정보 처리 현황을 열람할 수 있습니다.</li>
              <li><strong>정정권</strong>: 부정확한 개인정보의 정정을 요청할 수 있습니다.</li>
              <li><strong>삭제권</strong>: 개인정보의 삭제를 요청할 수 있습니다.</li>
              <li><strong>처리정지권</strong>: 개인정보 처리의 정지를 요구할 수 있습니다.</li>
              <li><strong>동의 철회권</strong>: 선택적 개인정보 수집에 대한 동의를 철회할 수 있습니다.</li>
            </ol>
            <p className="mt-3">위 권리는 서비스 내 &ldquo;내정보 &gt; 계정 설정&rdquo; 또는 고객센터를 통해 행사할 수 있습니다.</p>
          </Section>

          <Section title="제7조 (개인정보의 안전성 확보 조치)">
            <ol className="list-decimal pl-5 space-y-2">
              <li><strong>암호화</strong>: 비밀번호는 bcrypt로 단방향 암호화하여 저장합니다.</li>
              <li><strong>접근 통제</strong>: 개인정보 접근 권한을 최소화하고, 접근 기록을 보관합니다.</li>
              <li><strong>전송 보안</strong>: HTTPS(TLS 1.3)를 통해 데이터를 암호화하여 전송합니다.</li>
              <li><strong>JWT 인증</strong>: Access Token + Refresh Token 기반 인증으로 세션 보안을 확보합니다.</li>
              <li><strong>API 키 보호</strong>: 거래소 API 키 등 민감 정보는 환경변수 또는 암호화된 DB에 저장합니다.</li>
            </ol>
          </Section>

          <Section title="제8조 (쿠키 및 자동 수집)">
            <ol className="list-decimal pl-5 space-y-2">
              <li>서비스는 인증 토큰을 localStorage에 저장하며, 쿠키는 최소한으로 사용합니다.</li>
              <li>이용자는 브라우저 설정을 통해 쿠키 저장을 거부할 수 있으나, 일부 기능 이용이 제한될 수 있습니다.</li>
            </ol>
          </Section>

          <Section title="제9조 (14세 미만 아동)">
            회사는 만 14세 미만 아동의 개인정보를 수집하지 않습니다. 만 14세 미만의 이용을 인지한 경우 해당 계정을 즉시 삭제합니다.
          </Section>

          <Section title="제10조 (개인정보 보호 책임자)">
            <div className="rounded-xl bg-[hsl(var(--card))] border border-[hsl(var(--border))] p-5">
              <p><strong>개인정보 보호 책임자</strong></p>
              <p className="mt-2 text-sm text-[hsl(var(--muted-foreground))]">
                성명: [담당자명]<br />
                직위: [직위]<br />
                이메일: corecodecto@gmail.com<br />
                문의: 서비스 내 &ldquo;내정보 &gt; 문의&rdquo; 또는 이메일
              </p>
            </div>
          </Section>

          <Section title="제11조 (개인정보 처리방침 변경)">
            <ol className="list-decimal pl-5 space-y-2">
              <li>본 방침은 법령, 정책 또는 서비스 변경에 따라 수정될 수 있습니다.</li>
              <li>변경 시 서비스 공지사항 또는 이메일을 통해 7일 전 안내합니다.</li>
            </ol>
          </Section>

          <Section title="부칙">
            본 개인정보처리방침은 2026년 3월 1일부터 시행합니다.
          </Section>
        </div>
      </article>

      <Footer />
    </div>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="text-xl font-bold text-[hsl(var(--foreground))] mb-3">{title}</h2>
      <div className="text-[hsl(var(--foreground))]/80">{children}</div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="border-t border-[hsl(var(--border))] px-6 py-8">
      <div className="mx-auto max-w-3xl flex items-center justify-between text-xs text-[hsl(var(--muted-foreground))]">
        <span>© 2026 Briefin. All rights reserved.</span>
        <div className="flex gap-4">
          <Link href="/terms" className="hover:text-[hsl(var(--foreground))]">이용약관</Link>
          <Link href="/privacy" className="hover:text-[hsl(var(--foreground))]">개인정보처리방침</Link>
        </div>
      </div>
    </footer>
  )
}
