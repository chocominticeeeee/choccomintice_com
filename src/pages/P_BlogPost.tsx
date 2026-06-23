import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { getPostBySlug } from "../blog";
import KeyVisual from "../components/layout/KeyVisual";
import Breadcrumb from "../components/layout/Breadcrumb";
import "./P_Blog.scss";

export default function P_BlogPost() {
    const { slug = "" } = useParams();
    const post = getPostBySlug(slug);

    if (!post) {
        return (
            <>
                <KeyVisual compact />
                <main className="blog-page">
                    <Breadcrumb items={[{ label: "ブログ", to: "/blog" }, { label: "記事" }]} />
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
            <main className="blog-page">
                <Breadcrumb
                    items={[{ label: "ブログ", to: "/blog" }, { label: post.title }]}
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
                                    return <img src={resolved} alt={alt ?? ""} loading="lazy" />;
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
                    ← ブログ一覧へもどる
                </Link>
            </main>
        </>
    );
}
