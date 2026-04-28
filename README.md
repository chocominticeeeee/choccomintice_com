# ばぶ宮ちょこみん 個人サイト

ばぶ宮ちょこみん ([choccomintice.netlify.app](https://choccomintice.netlify.app/)) の個人ホームページのソースコードです。

## 概要

自己紹介・イラスト・VRChat の思い出などを掲載したパーソナルサイトです。

**主なコンテンツ**
- 自己紹介・SNSリンク
- イラスト（Artworks カルーセル）
- VRChat 写真ギャラリー / Chrome 拡張機能の紹介
- note 記事一覧
- ウニクリッカー（ミニゲーム）

## 技術スタック

| カテゴリ | 技術 |
|---|---|
| フレームワーク | React 19 + TypeScript |
| ビルドツール | Vite 7 |
| スタイリング | Tailwind CSS v4 / SCSS |
| アニメーション | Framer Motion |
| カルーセル | Embla Carousel |
| ルーティング | React Router v7 |
| デプロイ | Netlify |

## 開発環境

**必要なもの:** [Bun](https://bun.sh/) または Node.js

```bash
# 依存関係のインストール
bun install

# 開発サーバー起動 (http://localhost:5173)
bun run dev

# プロダクションビルド
bun run build

# ビルド結果のプレビュー
bun run preview
```

## ディレクトリ構成

```
src/
├── assets/images/
│   ├── Artworks/       # イラスト画像
│   ├── VRChat/         # VRChat スクリーンショット
│   └── keyVisual/      # キービジュアル
├── components/
│   ├── layout/         # KeyVisual, Footer
│   ├── UniClicker/     # ウニクリッカー ミニゲーム
│   └── ...
├── pages/
│   ├── P_Home.tsx      # トップページ
│   └── P_Notfound.tsx  # 404 ページ
└── App.tsx
```

## デプロイ

main ブランチへのプッシュで Netlify が自動デプロイします。  
SPA のルーティングは `netlify.toml` の全パス → `index.html` リダイレクトで対応しています。

[![Netlify Status](https://api.netlify.com/api/v1/badges/ef1ebccb-fa59-4b67-b6f7-797644225253/deploy-status)](https://app.netlify.com/projects/choccomintice/deploys)
