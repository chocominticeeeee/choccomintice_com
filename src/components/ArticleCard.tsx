import { Link } from "react-router-dom";
import "./ArticleCard.scss";

interface ArticleCardProps {
    title: string;
    dateLabel: string;
    thumbnail?: string | null;
    /** いいね数（noteなど外部記事のみ表示） */
    likeCount?: number;
    /** 内部リンク（react-router のパス） */
    to?: string;
    /** 外部リンク（指定すると別タブで開く） */
    href?: string;
}

export default function ArticleCard({ title, dateLabel, thumbnail, likeCount, to, href }: ArticleCardProps) {
    const inner = (
        <>
            {thumbnail && <img src={thumbnail} alt={title} loading="lazy" />}
            <div className="blog-article-card__body">
                <p className="blog-article-card__title">{title}</p>
                <div className="blog-article-card__meta">
                    <p className="blog-article-card__date">{dateLabel}</p>
                    {likeCount !== undefined && (
                        <p className="blog-article-card__likes">♡ {likeCount}</p>
                    )}
                </div>
            </div>
        </>
    );

    if (to) {
        return (
            <Link to={to} className="blog-article-card">
                {inner}
            </Link>
        );
    }

    return (
        <a href={href} target="_blank" rel="noopener noreferrer" className="blog-article-card">
            {inner}
        </a>
    );
}
