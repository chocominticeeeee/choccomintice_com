import { useState, useEffect } from "react";
import { fetchNoteArticles } from "../utils";
import type { NoteArticle } from "../utils";
import "./NoteSection.scss";

export default function NoteSection() {
    const [articles, setArticles] = useState<NoteArticle[]>([]);

    useEffect(() => {
        fetchNoteArticles("choccomintice").then(setArticles).catch(console.error);
    }, []);

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
