import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "也在场 - 隐私政策",
  description: "也在场 App 隐私政策",
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-[var(--page-bg)] px-6 py-12">
      <article className="mx-auto max-w-[640px] font-[var(--font-sans)] text-[var(--text-primary)]">
        <h1 className="text-[28px] font-bold leading-tight">隐私政策</h1>
        <p className="mt-2 text-[13px] text-[var(--text-secondary)]">
          生效日期：2026 年 5 月 26 日 &nbsp;|&nbsp; 最后更新：2026 年 5 月 26 日
        </p>

        <p className="mt-8 text-[15px] leading-relaxed text-[var(--text-secondary)]">
          「也在场」（以下简称&ldquo;本应用&rdquo;）由独立开发者运营。我们深知隐私的重要性，本政策说明我们如何处理您的信息。
        </p>

        <Section title="1. 核心原则">
          <p>
            本应用采用<strong className="text-[var(--text-primary)]">本地优先</strong>架构，您的所有数据（演出记录、照片引用、个人资料）均存储在您的设备本地。我们没有服务器，不收集、不上传、不存储您的任何个人数据。
          </p>
        </Section>

        <Section title="2. 我们访问的权限">
          <ul className="list-disc space-y-2 pl-5">
            <li><strong className="text-[var(--text-primary)]">相册读取权限</strong> — 用于扫描并匹配演出期间拍摄的照片。照片不会被复制到应用内，仅保存引用标识符。</li>
            <li><strong className="text-[var(--text-primary)]">相册写入权限</strong> — 用于将生成的打卡卡片保存到您的相册。</li>
            <li><strong className="text-[var(--text-primary)]">Apple Music 权限</strong> — 用于获取艺人封面图片，提升展示效果。</li>
          </ul>
          <p className="mt-3">所有权限均为可选，拒绝授权不影响应用核心功能的使用。</p>
        </Section>

        <Section title="3. 数据存储">
          <ul className="list-disc space-y-2 pl-5">
            <li>演出记录、笔记、歌单等数据使用 Apple SwiftData 框架存储在设备本地。</li>
            <li>如您开启 iCloud 同步（会员功能），数据将通过 Apple iCloud 在您的设备间同步，我们无法访问 iCloud 中的数据。</li>
            <li>我们不使用任何第三方云存储服务。</li>
          </ul>
        </Section>

        <Section title="4. 购买与订阅">
          <p>应用内购买通过 Apple StoreKit 框架处理，所有交易由 Apple 管理。我们不收集您的支付信息、Apple ID 或交易详情。</p>
        </Section>

        <Section title="5. 第三方服务">
          <p>本应用<strong className="text-[var(--text-primary)]">不集成</strong>任何第三方分析、广告、崩溃收集或追踪 SDK。</p>
        </Section>

        <Section title="6. 儿童隐私">
          <p>本应用不面向 13 岁以下儿童，不会有意收集儿童的个人信息。</p>
        </Section>

        <Section title="7. 数据删除">
          <p>您可以随时在应用内删除任何演出记录或照片关联。卸载应用将永久删除所有本地数据。</p>
        </Section>

        <Section title="8. 政策变更">
          <p>如本政策有重大变更，我们将在应用内通知您。继续使用本应用即表示您同意更新后的政策。</p>
        </Section>

        <Section title="9. 联系我们">
          <p>如有任何隐私相关问题，请联系：<a href="mailto:jetkwok827@gmail.com" className="text-[var(--accent)] underline">jetkwok827@gmail.com</a></p>
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
