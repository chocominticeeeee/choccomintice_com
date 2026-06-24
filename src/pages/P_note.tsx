import { useState, useEffect } from "react";
import { fetchAllNoteArticles } from "../content/note";
import type { NoteArticle } from "../content/note";
import KeyVisual from "../components/layout/KeyVisual";
import PageHeader from "../components/layout/PageHeader";
import Breadcrumb from "../components/layout/Breadcrumb";
import "./P_note.scss";

const PER_PAGE = 5;

function excerpt(body: string, max = 140): string {
    const text = body
        .replace(/<[^>]*>/g, " ")
        .replace(/&nbsp;/g, " ")
        .replace(/\s+/g, " ")
        .trim();
    if (text.length <= max) return text;
    return text.slice(0, max) + "…";
}

export default function P_note() {
    const [articles, setArticles] = useState<NoteArticle[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [page, setPage] = useState(1);

    useEffect(() => {
        fetchAllNoteArticles("choccomintice")
            .then(setArticles)
            .catch(() => setError(true))
            .finally(() => {
                setLoading(false);
            });
    }, []);

    const totalPages = Math.max(1, Math.ceil(articles.length / PER_PAGE));
    const start = (page - 1) * PER_PAGE;
    const visibleArticles = articles.slice(start, start + PER_PAGE);

    const goToPage = (next: number) => {
        setPage(next);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <>
            <KeyVisual compact />
            <main className="note-page">
            <Breadcrumb items={["note"]} />
            <PageHeader
                title="note"
                emoji="📖"
                description="VRChatでの出来事とか、ちょこっと個人的なニュースを記事に書いてるよ〜"
            />

            {loading && (
                <p className="note-status">よみこみ中だよ〜ちょっと待っててね…(´｡• ᵕ •｡`)</p>
            )}
            {error && (
                <p className="note-status">記事のよみこみに失敗しちゃった…ごめんね(´;ω;`)</p>
            )}

            {!loading && !error && (
                <div className="note-page__list">
                    {visibleArticles.map((article) => (
                        <a
                            key={article.key}
                            href={article.noteUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="note-post"
                        >
                            {article.eyecatch && (
                                <div className="note-post__thumb">
                                    <img src={article.eyecatch} alt={article.name} loading="lazy" />
                                </div>
                            )}
                            <div className="note-post__body">
                                <div className="note-post__meta">
                                    <span className="note-post__date">
                                        {new Date(article.publishAt).toLocaleDateString("ja-JP")}
                                    </span>
                                    <span className="note-post__likes">♡ {article.likeCount}</span>
                                </div>
                                <h2 className="note-post__title">{article.name}</h2>
                                {article.body && (
                                    <p className="note-post__excerpt">{excerpt(article.body)}</p>
                                )}
                            </div>
                        </a>
                    ))}
                </div>
            )}

            {!loading && !error && totalPages > 1 && (
                <nav className="note-pager" aria-label="ページ送り">
                    <button
                        type="button"
                        className="note-pager__arrow"
                        onClick={() => goToPage(page - 1)}
                        disabled={page === 1}
                    >
                        ← 前へ
                    </button>
                    <ul className="note-pager__nums">
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                            <li key={n}>
                                <button
                                    type="button"
                                    className={
                                        "note-pager__num" +
                                        (n === page ? " note-pager__num--active" : "")
                                    }
                                    onClick={() => goToPage(n)}
                                    aria-current={n === page ? "page" : undefined}
                                >
                                    {n}
                                </button>
                            </li>
                        ))}
                    </ul>
                    <button
                        type="button"
                        className="note-pager__arrow"
                        onClick={() => goToPage(page + 1)}
                        disabled={page === totalPages}
                    >
                        次へ →
                    </button>
                </nav>
            )}
            </main>
        </>
    );
}
