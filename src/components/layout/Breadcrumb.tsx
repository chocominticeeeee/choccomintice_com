import { Fragment } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import "./Breadcrumb.scss";

export interface Crumb {
    /** 表示ラベル */
    label: string;
    /** リンク先。省略すると現在地（リンクなし）として表示 */
    to?: string;
}

interface BreadcrumbProps {
    /** Home以降のパンくず。先頭の Home は自動で付与される */
    items: Crumb[];
}

const HOME: Crumb = { label: "Home", to: "/" };

export default function Breadcrumb({ items }: BreadcrumbProps) {
    const crumbs = [HOME, ...items];

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
                    return (
                        <Fragment key={`${crumb.label}-${i}`}>
                            <li className="breadcrumb__item">
                                {crumb.to && !isLast ? (
                                    <Link className="breadcrumb__link" to={crumb.to}>
                                        {crumb.label}
                                    </Link>
                                ) : (
                                    <span className="breadcrumb__current" aria-current="page">
                                        {crumb.label}
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
