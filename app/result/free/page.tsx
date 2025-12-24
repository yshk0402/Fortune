import TrackEventOnMount from "../../../components/ga/TrackEventOnMount";
import { TrackedLink } from "../../../components/ga/TrackedLink";
import { getContent } from "../../../lib/content";
import { getRokumeiId, getRokumeiName } from "../../../lib/rokumei";

export default function FreeResultPage({
  searchParams,
}: {
  searchParams: { dob?: string; mbti?: string };
}) {
  const dob = searchParams.dob;
  const mbti = searchParams.mbti?.toUpperCase();
  const rokumeiId = dob ? getRokumeiId(dob) : null;
  const rokumeiName = rokumeiId ? getRokumeiName(rokumeiId) : null;
  const content = rokumeiId && mbti ? getContent(rokumeiId, mbti) : null;
  const typeLabel = rokumeiName && mbti ? `${rokumeiName} × ${mbti}` : "-";
  const payHref =
    dob && mbti ? `/pay?dob=${encodeURIComponent(dob)}&mbti=${encodeURIComponent(mbti)}` : "/pay";
  const hasTraceableParams = Boolean(dob && mbti);

  return (
    <main className="mx-auto w-full max-w-md px-6 py-16 space-y-8">
      {hasTraceableParams && <TrackEventOnMount eventName="free_result_view" params={{ type: typeLabel }} />}
      <div className="text-center space-y-2">
        <p className="text-xs font-semibold text-accent tracking-widest">STEP 2 / 3</p>
        <h1 className="text-2xl leading-tight font-serif text-ink">鑑定結果</h1>
      </div>

      <section className="card-paper">
        <h2 className="text-xs font-semibold text-accent text-center tracking-widest mb-2">あなたのタイプ</h2>
        <p className="text-xl text-center font-serif text-ink border-b border-gold/20 pb-4">{typeLabel}</p>

        <div className="mt-6">
          <h2 className="text-xs font-semibold text-accent text-center tracking-widest mb-3">年末総括</h2>
          <p className="text-sm leading-loose text-ink font-serif text-justify">
            {content?.free.year_summary ?? "{{TODO: 未確定}}"}
          </p>
        </div>
      </section>

      <section className="card-paper">
        <h2 className="text-xs font-semibold text-accent text-center tracking-widest mb-4">失敗パターン</h2>
        <ul className="space-y-4">
          {(content?.free.failure_patterns ?? ["{{TODO: 未確定}}", "{{TODO: 未確定}}"]).map(
            (item, index) => (
              <li key={`${index}-${item}`} className="flex items-start gap-3 text-sm text-ink font-serif leading-relaxed">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent/60"></span>
                {item}
              </li>
            ),
          )}
        </ul>
      </section>

      <section className="card-paper">
        <h2 className="text-xs font-semibold text-accent text-center tracking-widest mb-3">不安の言語化</h2>
        <div className="relative p-4 bg-paper rounded-lg border border-gold/10">
          <span className="absolute top-2 left-2 text-gold/40 text-2xl font-serif">“</span>
          <p className="text-sm text-ink font-serif text-center italic relative z-10 px-2">
            {content?.free.anxiety_line ?? "{{TODO: 未確定}}"}
          </p>
          <span className="absolute bottom-2 right-2 text-gold/40 text-2xl font-serif">”</span>
        </div>
      </section>

      <section className="card-paper relative overflow-hidden ring-2 ring-gold/30">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/40 to-white/90 pointer-events-none z-10" />

        <div className="text-center mb-6">
          <h2 className="text-xs font-semibold text-accent tracking-widest">ここから先は有料</h2>
          <p className="mt-2 text-sm text-ink font-serif">
            回避方法は有料で公開します。<br />今の流れを整えたい人だけ受け取ってください。
          </p>
        </div>

        <div className="space-y-6 opacity-40 blur-[3px] select-none pointer-events-none">
          <div className="space-y-3">
            <div className="h-4 w-3/4 bg-ink/20 rounded mx-auto" />
            <div className="h-4 w-1/2 bg-ink/20 rounded mx-auto" />
          </div>
          <div className="space-y-3">
            <div className="h-4 w-2/3 bg-ink/20 rounded mx-auto" />
            <div className="h-4 w-5/6 bg-ink/20 rounded mx-auto" />
          </div>
        </div>

        <div className="absolute inset-0 flex flex-col items-center justify-end pb-8 z-20">
          <div className="bg-white/80 backdrop-blur-sm p-4 rounded-xl shadow-paper border border-gold/20 text-center w-full max-w-[280px]">
            <p className="text-sm font-bold text-ink font-serif">¥980で全ての回避方法を解除</p>
            <p className="text-[10px] text-muted mt-1">追加請求なし / 買い切り</p>
          </div>
        </div>
      </section>

      <div className="text-center pb-8">
        <TrackedLink
          href={payHref}
          eventName="paywall_click"
          className="relative inline-flex w-full items-center justify-center rounded-full bg-accent px-8 py-4 text-sm font-semibold text-white shadow-soft transition hover:bg-accentDark hover:shadow-lg hover:-translate-y-0.5 group overflow-hidden"
        >
          <span className="relative z-10">{content?.free.cta_text ?? "回避方法を見る（¥980）"}</span>
          <div className="absolute inset-0 -translate-x-full group-hover:translate-x-0 bg-white/20 transition-transform duration-500 ease-in-out skew-x-12"></div>
        </TrackedLink>
        <p className="mt-3 text-xs text-muted">購入後すぐに表示されます。</p>
      </div>
    </main>
  );
}
