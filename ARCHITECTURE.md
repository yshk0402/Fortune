# ARCHITECTURE.md（C4-Lite）

このアーキテクチャは短期回収モデル専用。  
拡張性より「壊れにくさ」「迷わなさ」を優先する。

## 1. Context（全体像）

### ユーザー

- Threads 経由で流入
- モバイル利用
- 比較・検討しない

### システム

- 診断Webアプリ
- 無料結果 → Stripe Checkout → 有料結果

### 外部サービス

- Stripe（決済）
- GA4（計測）

## 2. Container（構成要素）

### フロントエンド

- Next.js App Router
- Tailwind CSS
- 5画面固定ルーティング

### バックエンド（最小）

- Next.js Route Handlers
- Stripe Webhook 受信
- 一時トークン or 署名 Cookie による購入検証

### データ

- 永続DB：なし
- コンテンツ：Git 管理 JSON
- 個人情報：保存しない

## 3. Component（主要部品）

### 診断ロジック

- 生年月日 → 六命占術ID（決定論）
- MBTI は入力値をそのまま使用

### コンテンツ解決

- `rokumei_id × mbti` をキーに JSON 参照
- Free / Paid を分離

### 決済フロー

- `/pay` で Checkout Session 作成
- Stripe hosted checkout
- Webhook `checkout.session.completed`
- 購入済みトークン発行
- `/result/paid` で検証

## 設計上の割り切り

- 再利用性：考えない
- 多言語：対応しない
- SEO：無視
- 会員・履歴：持たない

## この構成のゴール

- 迷わず作れる
- 迷わず壊せる
- 迷わず回収できる
