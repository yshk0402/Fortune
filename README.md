# 六命占術 × MBTI 診断サイト

年末年始・短期回収を目的とした、診断 → 即断 → 単発課金（¥980）のWebアプリケーション。

## 概要

- 六命占術（12）× MBTI（16）による診断型Webアプリ
- 流入元は Threads のみ
- 無料結果 → 有料結果（単発 ¥980）
- 運用期間：最大45日
- 改善はコピー差し替えのみ

> ⚠️ 本リポジトリは「回収効率最優先」。
> 親切設計・機能追加・画面追加は禁止。

## 技術スタック

- Next.js（App Router）
- Tailwind CSS
- Stripe Checkout
- Google Analytics 4
- ホスティング：Vercel
- コンテンツ管理：Git 管理 JSON

## 画面構成（固定）

| Route | 内容 |
| --- | --- |
| `/` | LP |
| `/start` | 入力 |
| `/result/free` | 無料結果 |
| `/pay` | 決済 |
| `/result/paid` | 有料結果 |

※ 画面追加禁止

## セットアップ（例）

> ⚠️ 自動実行禁止。必ず内容を確認すること。

```bash
npm install
npm run dev
```

Stripe / GA4 / Webhook の設定は `AGENTS.md` を参照。

## 運用ルール（重要）

- 改善は文言差し替えのみ
- 説明文の増量禁止
- プラン追加・割引禁止
- 回収が回っている状態を壊さないこと

## 注意

このプロジェクトは「長く育てるプロダクト」ではありません。  
短期で回収し、役目を終えたら終了する設計です。

## 環境変数

- `NEXT_PUBLIC_SITE_URL`（例: `https://your-domain.com`）…Stripe Checkoutの`success_url`/`cancel_url`に使用
- `NEXT_PUBLIC_GA_MEASUREMENT_ID`…GA4でイベントを送る測定ID（未設定でもUIは動作します）
- `STRIPE_SECRET_KEY`…APIキー（`sk_live_…`/`sk_test_…`）
- `STRIPE_PRICE_ID`…Checkoutで使う単発課金のPrice ID (`price_...`)
- `STRIPE_WEBHOOK_SECRET`…Webhookの署名検証で利用

所有キーは `.env`（サンプル：`.env.example`）から設定してください。開発時は `cp .env.example .env` して値を差し替えます。
