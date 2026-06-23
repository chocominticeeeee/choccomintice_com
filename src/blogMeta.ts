// ブログ記事のマークダウンから素のメタ情報を取り出す純粋関数。
// ブラウザ側（blog.ts）とビルド時のViteプラグイン（Node）の両方から使うため、
// import.meta.glob などの環境依存を一切持たない。

/** マークダウンの先頭の見出し1（# ...）を取り出す。無ければ null */
export function extractTitle(markdown: string): string | null {
    const match = markdown.match(/^\s*#\s+(.+?)\s*$/m);
    return match ? match[1].trim() : null;
}

/** マークダウンからプレーンテキストの抜粋を作る */
export function buildExcerpt(markdown: string, max = 120): string {
    const text = markdown
        .replace(/^\s*#.*$/gm, "") // 見出し行を除去
        .replace(/!\[[^\]]*\]\([^)]*\)/g, "") // 画像
        .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1") // リンクはラベルだけ残す
        .replace(/[`*_>#~-]/g, "") // 記号
        .replace(/\s+/g, " ")
        .trim();
    if (text.length <= max) return text;
    return text.slice(0, max) + "…";
}

/** マークダウン本文中の最初の画像参照のsrc（"./images/photo.png" など）を返す。無ければ null */
export function extractFirstImage(markdown: string): string | null {
    const match = markdown.match(/!\[[^\]]*\]\(([^)\s]+)/);
    return match ? match[1].trim() : null;
}
