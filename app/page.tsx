import TrackEventOnMount from "../components/ga/TrackEventOnMount";
import { TrackedLink } from "../components/ga/TrackedLink";

export default function Page() {
  return (
    <main className="mx-auto w-full max-w-md px-6 py-16 space-y-8">
      <TrackEventOnMount eventName="lp_view" />
      {/* Hero Section */}
      <section className="card-paper animate-float">
        <div className="flex justify-center mb-4">
          <span className="text-gold text-2xl">✦</span>
        </div>
        <p className="text-xs font-semibold text-accent text-center tracking-widest">無料診断</p>
        <h1 className="mt-3 text-3xl leading-relaxed text-center font-serif text-ink text-shadow-sm">
          六命占術×MBTIで、<br />
          今年の<span className="text-accent border-b border-accent/30 pb-1">失敗の癖</span>を止める
        </h1>
        <p className="mt-5 text-sm text-muted leading-loose text-center font-serif">
          30〜40代の女性へ。<br />
          頑張り方を少し変えるだけで、<br />
          本来の流れは戻ります。
        </p>
        <div className="mt-8 flex justify-center">
          <TrackedLink
            href="/start"
            eventName="start_click"
            className="relative inline-flex w-full items-center justify-center rounded-full bg-accent px-8 py-4 text-sm font-semibold text-white shadow-soft transition hover:bg-accentDark hover:shadow-lg hover:-translate-y-0.5"
          >
            <span className="absolute inset-0 rounded-full border border-white/20"></span>
            今すぐ無料で確認する
          </TrackedLink>
        </div>
        <p className="mt-3 text-[10px] text-muted text-center">所要30秒 / 個人情報は保存しません</p>
      </section>

      {/* Free Content Teaser */}
      <section className="card-paper">
        <h2 className="text-base font-semibold text-center text-ink flex items-center justify-center gap-2">
          <span className="text-gold text-xs">◆</span>
          無料でわかること
          <span className="text-gold text-xs">◆</span>
        </h2>
        <ul className="mt-6 space-y-4 px-2">
          <li className="flex items-center gap-3 text-sm text-ink font-serif">
            <span className="h-1.5 w-1.5 rounded-full bg-accent/60"></span>
            あなたのタイプ（六命占術×MBTI）
          </li>
          <li className="flex items-center gap-3 text-sm text-ink font-serif">
            <span className="h-1.5 w-1.5 rounded-full bg-accent/60"></span>
            今年の失敗パターン
          </li>
          <li className="flex items-center gap-3 text-sm text-ink font-serif">
            <span className="h-1.5 w-1.5 rounded-full bg-accent/60"></span>
            不安の言語化
          </li>
        </ul>
      </section>

      {/* Paid Content Teaser */}
      <section className="card-paper bg-white/60">
        <h2 className="text-base font-semibold text-center text-ink flex items-center justify-center gap-2">
          <span className="text-gold text-xs">◆</span>
          ¥980で受け取れること
          <span className="text-gold text-xs">◆</span>
        </h2>
        <ul className="mt-6 space-y-4 px-2">
          <li className="flex items-center gap-3 text-sm text-ink font-serif">
            <span className="h-1.5 w-1.5 rounded-full bg-gold"></span>
            回避行動（3つ）
          </li>
          <li className="flex items-center gap-3 text-sm text-ink font-serif">
            <span className="h-1.5 w-1.5 rounded-full bg-gold"></span>
            注意月（1〜3ヶ月）
          </li>
          <li className="flex items-center gap-3 text-sm text-ink font-serif">
            <span className="h-1.5 w-1.5 rounded-full bg-gold"></span>
            相性が難しいタイプ
          </li>
        </ul>
        <p className="mt-6 text-xs text-muted text-center border-t border-gold/20 pt-4">単発課金 / 追加請求なし</p>
      </section>

      {/* Flow */}
      <section className="px-4 py-8">
        <h2 className="text-sm font-semibold text-center text-muted tracking-widest mb-8">- 診断の流れ -</h2>
        <ol className="relative border-l border-gold/30 ml-4 space-y-8">
          <li className="ml-6 relative">
            <span className="absolute -left-[31px] flex h-4 w-4 items-center justify-center rounded-full bg-gold text-[10px] text-white ring-4 ring-cream">1</span>
            <h3 className="text-sm font-semibold text-ink">生年月日とMBTIを入力</h3>
            <p className="text-xs text-muted mt-1">正確な星回りを算出します</p>
          </li>
          <li className="ml-6 relative">
            <span className="absolute -left-[31px] flex h-4 w-4 items-center justify-center rounded-full bg-gold text-[10px] text-white ring-4 ring-cream">2</span>
            <h3 className="text-sm font-semibold text-ink">無料結果で失敗パターンを確認</h3>
            <p className="text-xs text-muted mt-1">現状を把握します</p>
          </li>
          <li className="ml-6 relative">
            <span className="absolute -left-[31px] flex h-4 w-4 items-center justify-center rounded-full bg-gold text-[10px] text-white ring-4 ring-cream">3</span>
            <h3 className="text-sm font-semibold text-ink">回避方法だけ有料で受け取る</h3>
            <p className="text-xs text-muted mt-1">必要な方のみご購入ください</p>
          </li>
        </ol>
      </section>

      <div className="text-center pb-8">
        <TrackedLink
          href="/start"
          eventName="start_click"
          className="inline-flex w-full items-center justify-center rounded-full bg-accent px-8 py-4 text-sm font-semibold text-white shadow-soft transition hover:bg-accentDark hover:shadow-lg"
        >
          無料で診断を始める
        </TrackedLink>
        <p className="mt-3 text-xs text-muted">入力は生年月日とMBTIだけ</p>
      </div>
    </main>
  );
}
