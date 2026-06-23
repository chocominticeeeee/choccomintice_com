import type { Context } from "@netlify/edge-functions";

// /blog/:slug へのアクセスで、index.html のOGPメタタグを記事ごとに差し替えて返す。
// OGPクローラー（Twitter / Discord / LINE 等）はJSを実行しないため、
// 初回HTMLの時点で記事のタイトル・抜粋・画像を埋め込む必要がある。
//
// 記事メタデータはビルド時に書き出した /blog-ogp.json（vite-plugin-blog-ogp）を読む。

interface BlogOgpEntry {
    title: string;
    excerpt: string;
    image: string | null;
}

const SITE_NAME = "ばぶ宮ちょこみん🍼🌱";

/** 属性値として安全な文字列にする */
function escapeAttr(value: string): string {
    return value
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;");
}

/** name/property を指定して <meta> の content を置き換える */
function replaceMeta(html: string, key: string, value: string): string {
    const re = new RegExp(
        `(<meta\\s+(?:name|property)="${key}"\\s+content=")[^"]*(")`,
        "i",
    );
    return html.replace(re, `$1${value}$2`);
}

export default async (request: Request, context: Context) => {
    const url = new URL(request.url);
    const slug = url.pathname.replace(/^\/blog\//, "").replace(/\/$/, "");

    // 末尾が無い（= /blog 一覧）やスラッグが空なら何もしない
    if (!slug || slug.includes("/")) {
        return context.next();
    }

    // 記事メタデータを取得
    let entry: BlogOgpEntry | undefined;
    try {
        const manifestRes = await fetch(new URL("/blog-ogp.json", url.origin));
        if (manifestRes.ok) {
            const manifest = (await manifestRes.json()) as Record<string, BlogOgpEntry>;
            entry = manifest[slug];
        }
    } catch {
        // 取得失敗時はそのまま素のページを返す
    }

    // 元のSPAのHTMLを取得
    const response = await context.next();
    const contentType = response.headers.get("content-type") ?? "";
    if (!entry || !contentType.includes("text/html")) {
        return response;
    }

    let html = await response.text();

    const title = `${entry.title}｜${SITE_NAME}`;
    const titleAttr = escapeAttr(title);
    const descAttr = escapeAttr(entry.excerpt);
    const pageUrl = escapeAttr(url.origin + url.pathname);
    const imageUrl = entry.image ? escapeAttr(url.origin + entry.image) : null;

    // <title>
    html = html.replace(/<title>[^<]*<\/title>/i, `<title>${titleAttr}</title>`);

    // 基本メタ
    html = replaceMeta(html, "title", titleAttr);
    html = replaceMeta(html, "description", descAttr);

    // Open Graph
    html = replaceMeta(html, "og:type", "article");
    html = replaceMeta(html, "og:url", pageUrl);
    html = replaceMeta(html, "og:title", titleAttr);
    html = replaceMeta(html, "og:description", descAttr);

    // Twitter
    html = replaceMeta(html, "twitter:url", pageUrl);
    html = replaceMeta(html, "twitter:title", titleAttr);
    html = replaceMeta(html, "twitter:description", descAttr);

    // 記事に画像がある場合のみ画像を差し替える（無ければ既定のogp-image.jpgのまま）
    if (imageUrl) {
        html = replaceMeta(html, "og:image", imageUrl);
        html = replaceMeta(html, "twitter:image", imageUrl);
        // 既定画像のサイズ指定は記事画像と一致しないため取り除く
        html = html.replace(
            /\s*<meta\s+property="og:image:(?:width|height|type)"\s+content="[^"]*"\s*\/?>/gi,
            "",
        );
    }

    return new Response(html, {
        status: response.status,
        headers: {
            "content-type": "text/html; charset=utf-8",
            "cache-control": "public, max-age=300",
        },
    });
};

export const config = { path: "/blog/*" };
