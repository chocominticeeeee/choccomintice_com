import { useState, useEffect } from "react";
import { fetchNoteArticles } from "../content/note";
import type { NoteArticle } from "../content/note";
import ArticleCard from "./ArticleCard";

export default function NoteSection() {
    const [articles, setArticles] = useState<NoteArticle[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        fetchNoteArticles("choccomintice")
            .then(({ contents }) => setArticles(contents))
            .catch(() => setError(true))
            .finally(() => {
                setLoading(false);
            });
    }, []);

    if (loading) return <p className="blog-status">よみこみ中だよ〜ちょっと待っててね…(´｡• ᵕ •｡`)</p>;
    if (error) return <p className="blog-status">記事のよみこみに失敗しちゃった…ごめんね(´;ω;`)</p>;

    return (
        <div className="blog-articles">
            {articles.map((article) => (
                <ArticleCard
                    key={article.key}
                    href={article.noteUrl}
                    title={article.name}
                    dateLabel={new Date(article.publishAt).toLocaleDateString("ja-JP")}
                    thumbnail={article.eyecatch}
                    likeCount={article.likeCount}
                />
            ))}
        </div>
    );
}
