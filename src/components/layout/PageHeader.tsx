import { motion } from "framer-motion";
import "./PageHeader.scss";

interface PageHeaderProps {
    /** 上部に出す小さな英語ラベル */
    label?: string;
    /** 見出し */
    title: string;
    /** 説明文（任意） */
    description?: string;
    /** タイトル横に出す絵文字（任意） */
    emoji?: string;
}

export default function PageHeader({ label, title, description, emoji }: PageHeaderProps) {
    return (
        <motion.header
            className="page-header"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
            {label && <span className="page-header__label">{label}</span>}

            <h1 className="page-header__title">
                {emoji && <span className="page-header__emoji">{emoji}</span>} {title}
            </h1>

            <span className="page-header__rule" aria-hidden="true" />

            {description && <p className="page-header__desc">{description}</p>}
        </motion.header>
    );
}
