import { CheckoutButton } from "../../components/pay/CheckoutButton";
import { getContent } from "../../lib/content";
import { getRokumeiId } from "../../lib/rokumei";

export default function PayPage({
  searchParams,
}: {
  searchParams: { dob?: string; mbti?: string };
}) {
  const dob = searchParams.dob;
  const mbti = searchParams.mbti?.toUpperCase();
  const rokumeiId = dob ? getRokumeiId(dob) : null;
  const content = rokumeiId && mbti ? getContent(rokumeiId, mbti) : null;

  return (
    <main className="mx-auto w-full max-w-md px-6 py-16 space-y-8">
      <section className="card-paper">
        <div className="flex justify-center mb-4">
          <span className="text-gold text-sm tracking-widest">STEP 3 / 3</span>
        </div>
        <h1 className="text-2xl leading-tight text-center font-serif text-ink">回避方法を受け取る</h1>
        <p className="mt-3 text-sm text-muted text-center leading-relaxed">
          ここから先は有料です。<br />
          必要な人だけ受け取ってください。
        </p>
      </section>

      <section className="card-paper relative overflow-hidden">
        <div className="flex items-center justify-between border-b border-gold/20 pb-3 mb-4">
          <h2 className="text-sm font-semibold text-accent tracking-widest">回避行動</h2>
          <span className="text-[10px] font-bold text-accent bg-accent/5 border border-accent/20 px-2 py-0.5 rounded-full tracking-wider">LOCKED</span>
        </div>
        <div className="space-y-4 relative">
          <div className="space-y-3 blur-sm select-none opacity-50">
            <div className="flex items-start gap-3">
              <div className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-ink/30" />
              <div className="h-4 w-3/4 rounded bg-ink/10" />
            </div>
            <div className="flex items-start gap-3">
              <div className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-ink/30" />
              <div className="h-4 w-5/6 rounded bg-ink/10" />
            </div>
            <div className="flex items-start gap-3">
              <div className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-ink/30" />
              <div className="h-4 w-2/3 rounded bg-ink/10" />
            </div>
          </div>

          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-white/80 backdrop-blur-sm rounded-full p-4 shadow-paper border border-gold/30">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-accent">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
              </svg>
            </div>
          </div>
        </div>
        <p className="mt-6 text-xs text-center text-muted font-serif">
          あなたのタイプに特化した<br />3つの具体的な回避アクション
        </p>
      </section>

      <section className="card-paper relative overflow-hidden">
        <div className="flex items-center justify-between border-b border-gold/20 pb-3 mb-4">
          <h2 className="text-sm font-semibold text-accent tracking-widest">注意月</h2>
          <span className="text-[10px] font-bold text-accent bg-accent/5 border border-accent/20 px-2 py-0.5 rounded-full tracking-wider">LOCKED</span>
        </div>
        <div className="relative py-2">
          <div className="blur-sm select-none opacity-50 flex justify-center gap-4">
            <div className="h-10 w-20 rounded bg-ink/10" />
            <div className="h-10 w-20 rounded bg-ink/10" />
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-white/80 backdrop-blur-sm rounded-full p-3 shadow-paper border border-gold/30">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-accent">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
              </svg>
            </div>
          </div>
        </div>
        <p className="mt-4 text-xs text-center text-muted font-serif">
          特に気をつけるべき時期（1〜3ヶ月）
        </p>
      </section>

      <section className="card-paper relative overflow-hidden">
        <div className="flex items-center justify-between border-b border-gold/20 pb-3 mb-4">
          <h2 className="text-sm font-semibold text-accent tracking-widest">相性が難しいタイプ</h2>
          <span className="text-[10px] font-bold text-accent bg-accent/5 border border-accent/20 px-2 py-0.5 rounded-full tracking-wider">LOCKED</span>
        </div>
        <div className="relative py-2">
          <div className="blur-sm select-none opacity-50 space-y-3">
            <div className="h-6 w-2/3 rounded bg-ink/10 mx-auto" />
            <div className="h-6 w-1/2 rounded bg-ink/10 mx-auto" />
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-white/80 backdrop-blur-sm rounded-full p-3 shadow-paper border border-gold/30">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-accent">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
              </svg>
            </div>
          </div>
        </div>
        <p className="mt-4 text-xs text-center text-muted font-serif">
          距離感に注意が必要な相手
        </p>
      </section>

      <section className="card-paper border-2 border-gold/40 bg-white/60">
        <div className="text-center">
          <p className="text-sm font-bold text-accent tracking-widest">鑑定料金</p>
          <div className="mt-2 flex items-baseline justify-center gap-1 font-serif">
            <span className="text-3xl font-bold text-ink">¥980</span>
            <span className="text-xs text-muted">（税込）</span>
          </div>
          <p className="mt-3 text-[10px] text-muted leading-relaxed">
            ※月額課金ではありません。<br />
            一度きりのお支払いで、ずっと閲覧できます。
          </p>
        </div>
      </section>

      <div className="text-center pb-8">
        <CheckoutButton dob={dob ?? undefined} mbti={mbti ?? undefined} />
        <p className="mt-4 text-xs text-muted">Stripe Checkoutに移動します。</p>
      </div>
    </main>
  );
}
