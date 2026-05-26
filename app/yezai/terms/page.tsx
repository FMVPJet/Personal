import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "也在场 - 用户服务协议",
  description: "也在场 App 用户服务协议",
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-[var(--page-bg)] px-6 py-12">
      <article className="mx-auto max-w-[640px] font-[var(--font-sans)] text-[var(--text-primary)]">
        <h1 className="text-[28px] font-bold leading-tight">用户服务协议</h1>
        <p className="mt-2 text-[13px] text-[var(--text-secondary)]">
          生效日期：2026 年 5 月 26 日 &nbsp;|&nbsp; 最后更新：2026 年 5 月 26 日
        </p>

        <p className="mt-8 text-[15px] leading-relaxed text-[var(--text-secondary)]">
          欢迎使用「也在场」（以下简称&ldquo;本应用&rdquo;）。使用本应用即表示您同意以下条款。如不同意，请停止使用。
        </p>

        <Section title="1. 服务说明">
          <p>本应用是一款演出记录与打卡工具，帮助用户记录参加过的演出、管理演出照片、生成分享卡片。所有数据存储在用户设备本地。</p>
        </Section>

        <Section title="2. 账户与使用">
          <ul className="list-disc space-y-2 pl-5">
            <li>本应用无需注册账户即可使用。</li>
            <li>您应确保设备安全，因设备丢失导致的数据丢失，我们不承担责任。</li>
            <li>您不得将本应用用于任何违反法律法规的用途。</li>
          </ul>
        </Section>

        <Section title="3. 会员服务">
          <ul className="list-disc space-y-2 pl-5">
            <li>本应用提供免费版和付费会员（Pro）两种模式。</li>
            <li>免费版可记录最多 5 场演出，会员版无限制并享有额外功能。</li>
            <li>会员购买通过 Apple App Store 内购完成，适用 Apple 的付款和退款政策。</li>
            <li>永久会员为一次性买断，不会自动续费。</li>
            <li>订阅制会员（如有）将按周期自动续费，可在 Apple ID 设置中取消。</li>
          </ul>
        </Section>

        <Section title="4. 用户内容">
          <ul className="list-disc space-y-2 pl-5">
            <li>您在应用中创建的内容（演出记录、笔记、照片关联）归您所有。</li>
            <li>我们不会以任何方式使用、展示或分享您的内容。</li>
            <li>生成的打卡卡片供您个人分享使用，卡片中可能包含应用水印（免费版）。</li>
          </ul>
        </Section>

        <Section title="5. 知识产权">
          <ul className="list-disc space-y-2 pl-5">
            <li>本应用的界面设计、代码、图标等知识产权归开发者所有。</li>
            <li>您不得对本应用进行反编译、逆向工程或未经授权的修改。</li>
          </ul>
        </Section>

        <Section title="6. 免责声明">
          <ul className="list-disc space-y-2 pl-5">
            <li>本应用按&ldquo;现状&rdquo;提供，不对数据完整性或服务可用性作任何明示或暗示的保证。</li>
            <li>因系统更新、设备故障等不可控因素导致的数据丢失，我们不承担责任。</li>
            <li>建议您定期通过 iCloud 同步（会员功能）备份重要数据。</li>
          </ul>
        </Section>

        <Section title="7. 协议变更">
          <p>我们保留修改本协议的权利。重大变更将在应用内通知。继续使用即视为接受变更后的条款。</p>
        </Section>

        <Section title="8. 适用法律">
          <p>本协议适用中华人民共和国法律。如发生争议，双方应友好协商解决。</p>
        </Section>

        <Section title="9. 联系方式">
          <p>如有任何问题，请联系：<a href="mailto:jetkwok827@gmail.com" className="text-[var(--accent)] underline">jetkwok827@gmail.com</a></p>
        </Section>

        <div className="mt-10 border-t border-[var(--card-border)] pt-6">
          <p className="text-[13px] text-[var(--text-secondary)]">© 2026 Yezai. All rights reserved.</p>
        </div>
      </article>
    </main>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-8">
      <h2 className="text-[20px] font-semibold">{title}</h2>
      <div className="mt-3 space-y-2 text-[15px] leading-relaxed text-[var(--text-secondary)]">
        {children}
      </div>
    </section>
  );
}
