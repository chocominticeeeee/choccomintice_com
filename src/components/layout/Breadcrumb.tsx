import { Fragment } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Home } from "lucide-react";
import { PAGES, type PageKey } from "../../CONFIG";
import "./Breadcrumb.scss";

export interface Crumb {
    /** 表示ラベル */
    label: string;
    /** リンク先。省略すると現在地（リンクなし）として表示 */
    to?: string;
}

/**
 * パンくず1項目の指定方法。
 * - PageKey: {@link PAGES} の定義（ラベル・パス）を型安全に参照する
 * - Crumb: 記事タイトルなど動的なラベルを直接指定する
 */
export type CrumbInput = PageKey | Crumb;

interface BreadcrumbProps {
    /** Home以降のパンくず。先頭の Home は自動で付与される */
    items: CrumbInput[];
}

const HOME: Crumb = { label: PAGES.home.label, to: PAGES.home.path };

function resolveCrumb(input: CrumbInput): Crumb {
    if (typeof input === "string") {
        const page = PAGES[input];
        return { label: page.label, to: page.path };
    }
    return input;
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
    const crumbs = [HOME, ...items.map(resolveCrumb)];

    return (
        <motion.nav
            className="breadcrumb"
            aria-label="パンくずリスト"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
            <ol className="breadcrumb__list">
                {crumbs.map((crumb, i) => {
                    const isLast = i === crumbs.length - 1;
                    const isHome = i === 0;
                    const content = isHome ? (
                        <Home className="breadcrumb__home-icon" size={16} aria-label={crumb.label} />
                    ) : (
                        crumb.label
                    );
                    return (
                        <Fragment key={`${crumb.label}-${i}`}>
                            <li className="breadcrumb__item">
                                {crumb.to && !isLast ? (
                                    <Link className="breadcrumb__link" to={crumb.to}>
                                        {content}
                                    </Link>
                                ) : (
                                    <span className="breadcrumb__current" aria-current="page">
                                        {content}
                                    </span>
                                )}
                            </li>
                            {!isLast && (
                                <li className="breadcrumb__sep" aria-hidden="true">
                                    ›
                                </li>
                            )}
                        </Fragment>
                    );
                })}
            </ol>
        </motion.nav>
    );
}
