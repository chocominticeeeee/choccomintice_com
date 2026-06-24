import { useState, useLayoutEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { getPostBySlug } from "../blog";
import KeyVisual from "../components/layout/KeyVisual";
import Breadcrumb from "../components/layout/Breadcrumb";
import Lightbox from "../components/Lightbox";
import "./P_Blog.scss";

interface SelectedImage {
    src: string;
    alt: string;
}

// 記事ページを開いたときのスクロール位置のオフセット(px)。
// 正の値ほど本文の先頭よりさらに下まで自動スクロールする。
const SCROLL_OFFSET = 70;

export default function P_BlogPost() {
    const { slug = "" } = useParams();
    const post = getPostBySlug(slug);
    const [selectedImage, setSelectedImage] = useState<SelectedImage | null>(null);
    const mainRef = useRef<HTMLElement>(null);

    // 記事ページを開いたらヘッダー(KeyVisual)を飛ばして本文の先頭まで
    // スクロールしておく。描画前に位置を合わせてヘッダーのチラ見せを防ぐ。
    // SCROLL_OFFSET を足すと、本文の先頭よりさらに下までスクロールする
    // (正の値で下方向)。見え方の微調整はこの数値だけ変えればOK。
    useLayoutEffect(() => {
        const el = mainRef.current;
        if (!el) return;
        const top = el.getBoundingClientRect().top + window.scrollY + SCROLL_OFFSET;
        window.scrollTo({ top, behavior: "auto" });
    }, [slug]);

    if (!post) {
        return (
            <>
                <KeyVisual compact />
                <main className="blog-page" ref={mainRef}>
                    <Breadcrumb items={["blog", { label: "記事" }]} />
                    <p className="blog-status">
                        記事が見つからなかったよ…(´;ω;`)
                        <br />
                        <Link to="/blog" className="blog-back">
                            ← ブログ一覧へもどる
                        </Link>
                    </p>
                </main>
            </>
        );
    }

    return (
        <>
            <KeyVisual compact />
            <main className="blog-page" ref={mainRef}>
                <Breadcrumb
                    items={["blog", { label: post.title }]}
                />

                <motion.article
                    className="blog-article"
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                >
                    <time className="blog-article__date" dateTime={post.slug}>
                        {post.dateLabel}
                    </time>
                    <div className="blog-article__body">
                        <ReactMarkdown
                            remarkPlugins={[remarkGfm]}
                            components={{
                                // md内の相対パス画像（./photo.png）を、記事フォルダ内の
                                // バンドル済み画像URLに差し替える。外部URLはそのまま。
                                img: ({ src = "", alt }) => {
                                    // react-markdown は非ASCIIなファイル名（日本語）を
                                    // パーセントエンコードするため、デコードしたキーでも探す。
                                    let decoded = src;
                                    if (typeof src === "string") {
                                        try {
                                            decoded = decodeURIComponent(src);
                                        } catch {
                                            decoded = src;
                                        }
                                    }
                                    const resolved =
                                        (typeof src === "string" &&
                                            (post.images[src] ?? post.images[decoded])) ||
                                        src;
                                    const img = (
                                        <img
                                            src={resolved}
                                            alt={alt ?? ""}
                                            loading="lazy"
                                            className="blog-article__img"
                                            onClick={() =>
                                                setSelectedImage({ src: resolved, alt: alt ?? "" })
                                            }
                                        />
                                    );
                                    // alt があればキャプションとして画像の下に小さく表示する。
                                    // Lightbox 側には適用しない（クリックで開く拡大表示は素の画像のまま）。
                                    if (alt) {
                                        return (
                                            <figure className="blog-article__figure">
                                                {img}
                                                <figcaption className="blog-article__caption">
                                                    {alt}
                                                </figcaption>
                                            </figure>
                                        );
                                    }
                                    return img;
                                },
                                // 記事内のリンクは別タブで開く（外部サイトへ飛ばす想定）
                                a: ({ href = "", children, ...rest }) => (
                                    <a
                                        href={href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        {...rest}
                                    >
                                        {children}
                                    </a>
                                ),
                            }}
                        >
                            {post.content}
                        </ReactMarkdown>
                    </div>
                </motion.article>

                <Link to="/blog" className="blog-back">
                    ← 個人ブログ一覧に戻る 🦀💨
                </Link>

                {selectedImage && (
                    <Lightbox
                        src={selectedImage.src}
                        alt={selectedImage.alt}
                        onClose={() => setSelectedImage(null)}
                    />
                )}
            </main>
        </>
    );
}
