import TrackEventOnMount from "../../../components/ga/TrackEventOnMount";
import { getContent } from "../../../lib/content";
import { getRokumeiId, getRokumeiName } from "../../../lib/rokumei";
import { verifyPurchase } from "../../../lib/purchase";

export default async function PaidResultPage({
  searchParams,
}: {
  searchParams: { dob?: string; mbti?: string; session_id?: string };
}) {
  const dob = searchParams.dob;
  const mbti = searchParams.mbti?.toUpperCase();
  const sessionId = searchParams.session_id;
  const rokumeiId = dob ? getRokumeiId(dob) : null;
  const content = rokumeiId && mbti ? getContent(rokumeiId, mbti) : null;
  const rokumeiName = rokumeiId ? getRokumeiName(rokumeiId) : null;
  const typeLabel = rokumeiName && mbti ? `${rokumeiName} × ${mbti}` : "-";
  const purchaseVerified = sessionId ? await verifyPurchase(sessionId) : false;
  const payHref =
    dob && mbti ? `/pay?dob=${encodeURIComponent(dob)}&mbti=${encodeURIComponent(mbti)}` : "/pay";
  const card = "rounded-2xl bg-white/80 p-5 shadow-soft ring-1 ring-line";

  if (!purchaseVerified) {
    return (
      <main className="mx-auto w-full max-w-md px-6 py-12 space-y-6">
        <section className={card}>
          <h1 className="text-2xl leading-tight">有料結果</h1>
          <p className="mt-2 text-sm text-muted">購入が確認できません。</p>
          <a
            href={payHref}
            className="mt-4 inline-flex w-full items-center justify-center rounded-xl bg-accent px-4 py-3 text-sm font-semibold text-white shadow-soft transition hover:bg-accentDark"
          >
            決済に進む
          </a>
        </section>
      </main>
    );
  }

  return (
    <main className="mx-auto w-full max-w-md px-6 py-12 space-y-6">
      {purchaseVerified && (
        <>
          <TrackEventOnMount eventName="purchase_success" params={{ type: typeLabel }} />
          <TrackEventOnMount eventName="paid_result_view" params={{ type: typeLabel }} />
        </>
      )}
      <h1 className="text-2xl leading-tight">有料結果</h1>

      <section className={card}>
        <h2 className="text-xs font-semibold text-accent">回避行動</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-ink">
          {(
            content?.paid.avoidance_actions ?? [
              "{{TODO: 未確定}}",
              "{{TODO: 未確定}}",
              "{{TODO: 未確定}}",
            ]
          ).map((item, index) => (
            <li key={`${index}-${item}`}>{item}</li>
          ))}
        </ul>
      </section>

      <section className={card}>
        <h2 className="text-xs font-semibold text-accent">注意月</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-ink">
          {(content?.paid.caution_months ?? ["{{TODO: 未確定}}"]).map((item, index) => (
            <li key={`${index}-${item}`}>{item}</li>
          ))}
        </ul>
      </section>

      <section className={card}>
        <h2 className="text-xs font-semibold text-accent">相性が難しいタイプ</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-ink">
          {(content?.paid.difficult_types ?? ["{{TODO: 未確定}}"]).map((item, index) => (
            <li key={`${index}-${item}`}>{item}</li>
          ))}
        </ul>
      </section>

      <section className={card}>
        <h2 className="text-xs font-semibold text-accent">救済</h2>
        <p className="mt-2 text-sm text-ink">
          {content?.paid.relief_text ??
            "あなたが悪いのではなく、今年は『やり方が合っていなかった』だけです。"}
        </p>
      </section>
    </main>
  );
}
