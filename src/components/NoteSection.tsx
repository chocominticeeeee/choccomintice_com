import { useState, useEffect } from "react";
import { fetchNoteArticles } from "../utils";
import type { NoteArticle } from "../utils";
import "./NoteSection.scss";

export default function NoteSection() {
    const [articles, setArticles] = useState<NoteArticle[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        fetchNoteArticles("choccomintice")
            .then(setArticles)
            .catch(() => setError(true))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <p className="note-status">読み込み中...</p>;
    if (error) return <p className="note-status">記事の取得に失敗しました</p>;

    return (
        <>
            <div className="note-articles">
                {articles.map((article) => (
                    <a
                        key={article.key}
                        href={article.noteUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="note-article-card"
                    >
                        {article.eyecatch && (
                            <img src={article.eyecatch} alt={article.name} loading="lazy" />
                        )}
                        <div className="note-article-card__body">
                            <p className="note-article-card__title">{article.name}</p>
                            <div className="note-article-card__meta">
                                <p className="note-article-card__date">
                                    {new Date(article.publishAt).toLocaleDateString("ja-JP")}
                                </p>
                                <p className="note-article-card__likes">♡ {article.likeCount}</p>
                            </div>
                        </div>
                    </a>
                ))}
            </div>
            <a
                href="https://note.com/choccomintice"
                target="_blank"
                rel="noopener noreferrer"
                className="note-all-link"
            >
                全ての記事を見る →
            </a>
        </>
    );
}
