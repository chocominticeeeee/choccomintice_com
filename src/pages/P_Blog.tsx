import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { getAllPosts } from "../blog";
import KeyVisual from "../components/layout/KeyVisual";
import PageHeader from "../components/layout/PageHeader";
import Breadcrumb from "../components/layout/Breadcrumb";
import "./P_Blog.scss";

export default function P_Blog() {
    const posts = getAllPosts();

    return (
        <>
            <KeyVisual compact />
            <main className="blog-page">
                <Breadcrumb items={["blog"]} />
                <PageHeader
                    title="個人ブログ"
                    emoji="📝"
                    description="個人的ニュースをここに書いていくよ！"
                />

                {posts.length === 0 ? (
                    <p className="blog-status">まだ記事がないよ〜。もうちょっと待っててね(*..)”</p>
                ) : (
                    <div className="blog-page__list">
                        {posts.map((post, i) => (
                            <motion.div
                                key={post.slug}
                                className="blog-post-wrap"
                                initial={{ opacity: 0, y: 24 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-60px" }}
                                transition={{
                                    duration: 0.6,
                                    delay: i * 0.05,
                                    ease: [0.16, 1, 0.3, 1],
                                }}
                            >
                                <Link to={`/blog/${post.slug}`} className="blog-post">
                                    {post.thumbnail && (
                                        <div className="blog-post__thumb">
                                            <img src={post.thumbnail} alt={post.title} loading="lazy" />
                                        </div>
                                    )}
                                    <div className="blog-post__body">
                                        <div className="blog-post__meta">
                                            <time className="blog-post__date" dateTime={post.slug}>
                                                {post.dateLabel}
                                            </time>
                                        </div>
                                        <h2 className="blog-post__title">{post.title}</h2>
                                        {post.excerpt && (
                                            <p className="blog-post__excerpt">{post.excerpt}</p>
                                        )}
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                )}
            </main>
        </>
    );
}
