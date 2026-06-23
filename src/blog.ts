// src/ブログ/<日付>/ を1記事のフォルダとして扱うユーティリティ。
//   src/ブログ/2026-06-23/2026-06-23.md  … 記事本文（タイトルは見出し1）
//   src/ブログ/2026-06-23/photo.png      … その記事用の画像（md内で ![](./photo.png) と相対参照）
// フォルダ名は必ず YYYY-MM-DD の形式。URL のスラッグも兼ねる。

import { extractTitle, buildExcerpt, extractFirstImage } from "./blogMeta";

const RAW_POSTS = import.meta.glob("./ブログ/*/*.md", {
    query: "?raw",
    import: "default",
    eager: true,
}) as Record<string, string>;

// 記事フォルダ内の画像。パス→公開URL（Viteがハッシュ付きで出力）に解決される。
const POST_IMAGES = import.meta.glob("./ブログ/**/*.{png,jpg,jpeg,gif,webp,svg,avif}", {
    eager: true,
    import: "default",
}) as Record<string, string>;

export interface BlogPost {
    /** フォルダ名から取った日付（YYYY-MM-DD）。URL のスラッグも兼ねる */
    slug: string;
    /** 表示用の日付文字列（ja-JP） */
    dateLabel: string;
    /** 見出し1から取ったタイトル */
    title: string;
    /** マークダウン本文（見出し1を含む全文） */
    content: string;
    /** 一覧用の抜粋（マークダウン記法を除去したテキスト） */
    excerpt: string;
    /** 一覧サムネイル用。本文中の最初の画像の公開URL。無ければ null */
    thumbnail: string | null;
    /** 記事フォルダ内の画像。相対パス（"photo.png" / "./photo.png"）→ 公開URL */
    images: Record<string, string>;
}

/** 記事フォルダのパス（"./ブログ/2026-06-23"）からスラッグを取り出す */
function slugFromDir(dir: string): string {
    return dir.split("/").pop() ?? "";
}

function formatDate(slug: string): string {
    const date = new Date(slug);
    if (Number.isNaN(date.getTime())) return slug;
    return date.toLocaleDateString("ja-JP", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
}

/**
 * 指定した記事フォルダに属する画像を、相対パス→URL のマップにする。
 * 1枚の画像につき複数の書き方を受け付ける:
 *   images/photo.png ・ ./images/photo.png ・ photo.png ・ ./photo.png
 * （ファイル名だけでも images フォルダ内から見つかる）
 */
function imagesForDir(dir: string): Record<string, string> {
    const prefix = dir + "/";
    const map: Record<string, string> = {};
    for (const [path, url] of Object.entries(POST_IMAGES)) {
        if (!path.startsWith(prefix)) continue;
        const rel = path.slice(prefix.length); // 例: "images/photo.png"
        const base = rel.split("/").pop() ?? rel; // 例: "photo.png"
        for (const key of [rel, "./" + rel, base, "./" + base]) {
            // 明示パス（rel側）を優先し、ファイル名だけの解決は衝突時に上書きしない
            if (!(key in map)) map[key] = url;
        }
    }
    return map;
}

/**
 * 本文中の最初の画像を一覧サムネイル用の公開URLに解決する。
 * 記事フォルダ内の相対参照は images マップ経由でバンドル済みURLに、
 * 外部URL（http〜）はそのまま返す。見つからなければ null。
 */
function resolveThumbnail(content: string, images: Record<string, string>): string | null {
    const src = extractFirstImage(content);
    if (!src) return null;
    if (/^https?:\/\//.test(src)) return src;
    let decoded = src;
    try {
        decoded = decodeURIComponent(src);
    } catch {
        decoded = src;
    }
    return images[src] ?? images[decoded] ?? null;
}

/** 全ブログ記事を新しい日付順（降順）で返す */
export function getAllPosts(): BlogPost[] {
    return Object.entries(RAW_POSTS)
        .map(([path, content]) => {
            const dir = path.slice(0, path.lastIndexOf("/"));
            const slug = slugFromDir(dir);
            const images = imagesForDir(dir);
            return {
                slug,
                dateLabel: formatDate(slug),
                title: extractTitle(content) ?? slug,
                content,
                excerpt: buildExcerpt(content),
                thumbnail: resolveThumbnail(content, images),
                images,
            };
        })
        .sort((a, b) => b.slug.localeCompare(a.slug));
}

/** スラッグ（日付）から1記事を返す。無ければ undefined */
export function getPostBySlug(slug: string): BlogPost | undefined {
    return getAllPosts().find((post) => post.slug === slug);
}
