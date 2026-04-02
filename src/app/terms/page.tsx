import Link from "next/link"

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[hsl(var(--background))]">
      {/* 헤더 */}
      <nav className="border-b border-[hsl(var(--border))] px-6 py-4">
        <div className="mx-auto max-w-3xl flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="h-7 w-7 rounded-lg bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white text-xs font-bold">B</div>
            <span className="font-bold">브리핀</span>
          </Link>
          <Link href="/privacy" className="text-sm text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]">
            개인정보처리방침
          </Link>
        </div>
      </nav>

      <article className="mx-auto max-w-3xl px-6 py-12">
        <h1 className="text-3xl font-bold">이용약관</h1>
        <p className="mt-2 text-sm text-[hsl(var(--muted-foreground))]">시행일: 2026년 3월 1일 | 최종 수정: 2026년 3월 26일</p>

        <div className="mt-10 space-y-10 text-[15px] leading-relaxed text-[hsl(var(--foreground))]/90">
          <Section title="제1조 (목적)">
            본 약관은 브리핀(이하 &ldquo;회사&rdquo;)이 제공하는 AI 주식 브리핑 서비스(이하 &ldquo;서비스&rdquo;)의 이용과 관련하여 회사와 이용자 간의 권리, 의무 및 책임 사항을 규정함을 목적으로 합니다.
          </Section>

          <Section title="제2조 (정의)">
            <ol className="list-decimal pl-5 space-y-2">
              <li>&ldquo;서비스&rdquo;란 회사가 제공하는 AI 기반 주식 시장 분석, 브리핑, 리서치, 토론, 팟캐스트 등 일체의 서비스를 의미합니다.</li>
              <li>&ldquo;이용자&rdquo;란 본 약관에 따라 서비스를 이용하는 자를 말합니다.</li>
              <li>&ldquo;AI 애널리스트&rdquo;란 AI 기술을 기반으로 시장 분석 콘텐츠를 생성하는 가상의 캐릭터를 의미합니다.</li>
              <li>&ldquo;구독&rdquo;이란 이용자가 일정 요금을 지불하고 프리미엄 기능을 이용하는 것을 의미합니다.</li>
            </ol>
          </Section>

          <Section title="제3조 (약관의 효력 및 변경)">
            <ol className="list-decimal pl-5 space-y-2">
              <li>본 약관은 서비스 화면에 게시하거나 기타의 방법으로 이용자에게 공지함으로써 효력이 발생합니다.</li>
              <li>회사는 관련 법령을 위배하지 않는 범위에서 약관을 변경할 수 있으며, 변경 시 7일 전 공지합니다.</li>
              <li>변경된 약관에 동의하지 않는 이용자는 서비스 이용을 중단하고 탈퇴할 수 있습니다.</li>
            </ol>
          </Section>

          <Section title="제4조 (회원가입 및 계정)">
            <ol className="list-decimal pl-5 space-y-2">
              <li>이용자는 이메일 또는 소셜 로그인(Google)을 통해 회원가입할 수 있습니다.</li>
              <li>이용자는 정확한 정보를 제공해야 하며, 허위 정보 제공 시 서비스 이용이 제한될 수 있습니다.</li>
              <li>계정 정보의 관리 책임은 이용자에게 있으며, 제3자에게 양도하거나 대여할 수 없습니다.</li>
            </ol>
          </Section>

          <Section title="제5조 (서비스의 내용)">
            <ol className="list-decimal pl-5 space-y-2">
              <li><strong>Free 등급</strong>: 모닝 브리핑 전문, 리서치 하루 1편, 자유 토론방 참여, 기본 시황</li>
              <li><strong>Premium 등급</strong> (월 9,900원): 전체 브리핑, 리서치 전문, 토론 상세, 밸류에이션 차트, 기업 분석, 팟캐스트</li>
              <li><strong>VIP 등급</strong> (월 19,800원): Premium 전체 + 전략 설정, 매매 신호 알림, 토론 참여, 자동 손절 서비스</li>
              <li>서비스 내용은 회사의 사정에 따라 변경될 수 있으며, 변경 시 사전 공지합니다.</li>
            </ol>
          </Section>

          <Section title="제6조 (투자 면책)">
            <div className="rounded-xl bg-amber-500/10 border border-amber-500/20 p-5">
              <ol className="list-decimal pl-5 space-y-2">
                <li><strong>본 서비스에서 제공하는 모든 정보는 AI가 생성한 참고 자료이며, 투자 권유가 아닙니다.</strong></li>
                <li>AI 애널리스트의 분석, 의견, 시그널은 &ldquo;매수/매도 추천&rdquo;이 아닌 &ldquo;분석 결과 긍정적/부정적 시그널&rdquo;로 해석되어야 합니다.</li>
                <li>투자 결정은 전적으로 이용자 본인의 판단과 책임 하에 이루어져야 합니다.</li>
                <li>회사는 서비스 이용으로 인한 투자 손실에 대해 어떠한 법적 책임도 지지 않습니다.</li>
                <li>과거 데이터 기반의 백테스트 결과는 미래 수익을 보장하지 않습니다.</li>
              </ol>
            </div>
          </Section>

          <Section title="제7조 (구독 및 결제)">
            <ol className="list-decimal pl-5 space-y-2">
              <li>유료 구독은 월 단위 자동 결제로 진행됩니다.</li>
              <li>신규 이용자에게는 14일간의 무료 체험이 제공되며, 체험 기간 내 해지 시 요금이 부과되지 않습니다.</li>
              <li>구독 해지는 설정 메뉴에서 언제든 가능하며, 해지 시 남은 이용 기간까지 서비스를 이용할 수 있습니다.</li>
              <li>환불은 관련 법령(전자상거래법)에 따라 처리됩니다.</li>
            </ol>
          </Section>

          <Section title="제8조 (이용자의 의무)">
            <ol className="list-decimal pl-5 space-y-2">
              <li>서비스의 콘텐츠를 무단 복제, 배포, 상업적으로 이용하는 행위를 금지합니다.</li>
              <li>다른 이용자의 계정을 부정 사용하는 행위를 금지합니다.</li>
              <li>서비스의 정상적인 운영을 방해하는 행위를 금지합니다.</li>
              <li>AI 콘텐츠를 자신이 작성한 것처럼 게시하는 행위를 금지합니다.</li>
            </ol>
          </Section>

          <Section title="제9조 (서비스 중단)">
            <ol className="list-decimal pl-5 space-y-2">
              <li>회사는 시스템 점검, 장애, 천재지변 등의 사유로 서비스를 일시 중단할 수 있습니다.</li>
              <li>서비스 중단 시 사전 공지하며, 불가피한 경우 사후 공지할 수 있습니다.</li>
            </ol>
          </Section>

          <Section title="제10조 (지적재산권)">
            <ol className="list-decimal pl-5 space-y-2">
              <li>서비스 내 AI가 생성한 콘텐츠(브리핑, 리서치, 토론 등)의 저작권은 회사에 귀속됩니다.</li>
              <li>AI 애널리스트 캐릭터, 이미지, 이름은 회사의 지적재산입니다.</li>
              <li>이용자는 개인적 용도로만 콘텐츠를 이용할 수 있습니다.</li>
            </ol>
          </Section>

          <Section title="제11조 (분쟁 해결)">
            <ol className="list-decimal pl-5 space-y-2">
              <li>본 약관에 관한 분쟁은 대한민국 법률을 적용합니다.</li>
              <li>서비스 이용과 관련된 분쟁의 관할 법원은 서울중앙지방법원으로 합니다.</li>
            </ol>
          </Section>

          <Section title="부칙">
            본 약관은 2026년 3월 1일부터 시행합니다.
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
