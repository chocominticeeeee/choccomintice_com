import { getAllPosts } from "../blog";
import ArticleCard from "./ArticleCard";

export default function BlogSection() {
    const posts = getAllPosts();

    if (posts.length === 0) {
        return <p className="blog-status">まだ記事がないよ〜。もうちょっと待っててね(*..)”</p>;
    }

    return (
        <div className="blog-articles">
            {posts.map((post) => (
                <ArticleCard
                    key={post.slug}
                    to={`/blog/${post.slug}`}
                    title={post.title}
                    dateLabel={post.dateLabel}
                    thumbnail={post.thumbnail}
                />
            ))}
        </div>
    );
}
