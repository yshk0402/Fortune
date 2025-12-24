"use client";

import { FormEvent, useCallback } from "react";
import { trackGaEvent } from "../../lib/ga";

export default function StartPage() {
  const handleSubmit = useCallback((event: FormEvent<HTMLFormElement>) => {
    trackGaEvent("input_submit");
  }, []);

  return (
    <main className="mx-auto w-full max-w-md px-6 py-16">
      <section className="card-paper">
        <div className="flex justify-center mb-4">
          <span className="text-gold text-sm tracking-widest">STEP 1 / 3</span>
        </div>
        <h1 className="text-2xl leading-tight text-center font-serif text-ink">入力は2つだけ</h1>
        <p className="mt-3 text-sm text-muted text-center leading-relaxed">
          あなたの星回りと性格タイプから、<br />
          運命の傾向を導き出します。
        </p>

        <form action="/result/free" method="GET" className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <label className="block">
            <span className="text-sm font-medium text-ink block mb-2">生年月日</span>
            <input
              type="date"
              name="dob"
              className="w-full rounded-lg border border-gold/30 bg-white/50 px-4 py-3 text-sm text-ink focus:border-accent focus:ring-1 focus:ring-accent outline-none transition shadow-sm"
              required
            />
          </label>
          <label className="block">
            <span className="text-sm font-medium text-ink block mb-2">MBTI</span>
            <div className="relative">
              <select
                name="mbti"
                className="w-full appearance-none rounded-lg border border-gold/30 bg-white/50 px-4 py-3 text-sm text-ink focus:border-accent focus:ring-1 focus:ring-accent outline-none transition shadow-sm"
                required
              >
                <option value="">選択してください</option>
                <option value="INTJ">INTJ（建築家）</option>
                <option value="INTP">INTP（論理学者）</option>
                <option value="ENTJ">ENTJ（指揮官）</option>
                <option value="ENTP">ENTP（討論者）</option>
                <option value="INFJ">INFJ（提唱者）</option>
                <option value="INFP">INFP（仲介者）</option>
                <option value="ENFJ">ENFJ（主人公）</option>
                <option value="ENFP">ENFP（広報運動家）</option>
                <option value="ISTJ">ISTJ（管理者）</option>
                <option value="ISFJ">ISFJ（擁護者）</option>
                <option value="ESTJ">ESTJ（幹部）</option>
                <option value="ESFJ">ESFJ（領事官）</option>
                <option value="ISTP">ISTP（巨匠）</option>
                <option value="ISFP">ISFP（冒険家）</option>
                <option value="ESTP">ESTP（起業家）</option>
                <option value="ESFP">ESFP（エンターテイナー）</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-muted">
                <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20">
                  <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                </svg>
              </div>
            </div>
          </label>

          <div className="pt-4">
            <button
              type="submit"
              className="relative w-full overflow-hidden rounded-full bg-accent px-4 py-4 text-sm font-semibold text-white shadow-soft transition hover:bg-accentDark hover:shadow-lg hover:-translate-y-0.5 group"
            >
              <span className="relative z-10">無料で結果を見る</span>
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-0 bg-white/20 transition-transform duration-500 ease-in-out skew-x-12"></div>
            </button>
            <p className="mt-4 text-xs text-muted text-center">個人情報は保存されません</p>
          </div>
        </form>
      </section>
    </main>
  );
}
