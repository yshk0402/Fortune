"use client";

import { useCallback, useState } from "react";
import { trackGaEvent } from "../../lib/ga";

type CheckoutButtonProps = {
  dob?: string;
  mbti?: string;
};

export function CheckoutButton({ dob, mbti }: CheckoutButtonProps) {
  const [loading, setLoading] = useState(false);
  const disabled = loading || !dob || !mbti;

  const handleClick = useCallback(async () => {
    if (disabled) {
      return;
    }

    trackGaEvent("checkout_start");
    setLoading(true);

    try {
      const response = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ dob, mbti }),
      });
      const payload = await response.json();

      if (!response.ok || !payload?.url) {
        throw new Error(payload?.error ?? "決済セッションが作成できませんでした");
      }

      window.location.assign(payload.url);
    } catch (error) {
      console.error("Checkout initiation error", error);
      setLoading(false);
      window.alert("決済を開始できませんでした。再度お試しください。");
    }
  }, [disabled, dob, mbti]);

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={disabled}
      className="relative w-full overflow-hidden rounded-full bg-accent px-4 py-4 text-sm font-semibold text-white shadow-soft transition hover:bg-accentDark hover:shadow-lg hover:-translate-y-0.5 group disabled:opacity-50 disabled:hover:bg-accent"
    >
      <span className="relative z-10">{loading ? "決済に移動中…" : "¥980で回避方法を受け取る"}</span>
      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-0 bg-white/20 transition-transform duration-500 ease-in-out skew-x-12"></div>
    </button>
  );
}
