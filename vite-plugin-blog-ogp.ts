import { readdirSync, readFileSync, statSync, mkdirSync, copyFileSync, writeFileSync } from "node:fs";
import { resolve, join, extname } from "node:path";
import type { Plugin } from "vite";
import { extractTitle, buildExcerpt, extractFirstImage } from "./src/blog";

// ビルド時に記事ごとのOGPメタデータを dist/blog-ogp.json に書き出すViteプラグイン。
// 併せて各記事の先頭画像を dist/blog-ogp/<slug>.<ext> へコピーし、
// Netlify Edge Function（blog-ogp.ts）がクローラー向けにメタタグを差し替えられるようにする。
//
// 画像URLはマニフェストには相対パス（"/blog-ogp/<slug>.png"）で持たせ、
// Edge Function 側でリクエスト元のオリジンを付けて絶対URLにする。

const BLOG_DIR = "src/ブログ";

export interface BlogOgpEntry {
    title: string;
    excerpt: string;
    /** 記事の先頭画像の公開パス。無ければ null（Edge側で既定画像にフォールバック） */
    image: string | null;
}

export default function blogOgpManifest(): Plugin {
    return {
        name: "blog-ogp-manifest",
        apply: "build",
        // dist が書き出された後に実行する
        writeBundle(options) {
            const outDir = options.dir ?? "dist";
            const blogRoot = resolve(BLOG_DIR);
            const ogpOutDir = join(outDir, "blog-ogp");

            const manifest: Record<string, BlogOgpEntry> = {};

            let dirs: string[];
            try {
                dirs = readdirSync(blogRoot).filter((name) => {
                    try {
                        return statSync(join(blogRoot, name)).isDirectory();
                    } catch {
                        return false;
                    }
                });
            } catch {
                return; // ブログフォルダが無ければ何もしない
            }

            for (const slug of dirs) {
                const dir = join(blogRoot, slug);
                // blog.ts と同様、フォルダ内の最初の .md を本文として扱う（ファイル名は問わない）
                let mdName: string | undefined;
                try {
                    mdName = readdirSync(dir).find((f) => f.toLowerCase().endsWith(".md"));
                } catch {
                    continue;
                }
                if (!mdName) continue; // .md が無いフォルダはスキップ
                const markdown = readFileSync(join(dir, mdName), "utf-8");

                let image: string | null = null;
                const firstImage = extractFirstImage(markdown);
                if (firstImage) {
                    // "./images/サムネ.png" → 記事フォルダ基準の実ファイル
                    const rel = decodeURIComponent(firstImage.replace(/^\.\//, ""));
                    const srcImage = join(dir, rel);
                    try {
                        if (statSync(srcImage).isFile()) {
                            mkdirSync(ogpOutDir, { recursive: true });
                            const ext = extname(srcImage) || ".png";
                            copyFileSync(srcImage, join(ogpOutDir, `${slug}${ext}`));
                            image = `/blog-ogp/${slug}${ext}`;
                        }
                    } catch {
                        image = null; // 画像が見つからなければ既定画像に任せる
                    }
                }

                manifest[slug] = {
                    title: extractTitle(markdown) ?? slug,
                    excerpt: buildExcerpt(markdown),
                    image,
                };
            }

            writeFileSync(join(outDir, "blog-ogp.json"), JSON.stringify(manifest), "utf-8");
        },
    };
}
