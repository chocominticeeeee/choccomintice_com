import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { PAGES, type PageKey } from "../../CONFIG";
import "./MobileNav.scss";

// モバイル用ハンバーガーメニューに並べるページ（CONFIG の PAGES を参照）
const NAV_KEYS: PageKey[] = ["home", "note", "blog", "kentei"];
const NAV_ITEMS = NAV_KEYS.map((key) => PAGES[key]);

export default function MobileNav() {
    const location = useLocation();
    const navigate = useNavigate();
    const isHome = location.pathname === "/";

    const [open, setOpen] = useState(false);
    // Homeではヒーローアニメ完了まで非表示、それ以外は即表示
    const [buttonVisible, setButtonVisible] = useState(!isHome);

    // Homeのときだけ、ヒーローアニメ完了イベントを待ってボタンを出す
    useEffect(() => {
        if (!isHome) {
            setButtonVisible(true);
            return;
        }
        setButtonVisible(false);
        const onReady = () => setButtonVisible(true);
        window.addEventListener("hero:ready", onReady);
        return () => window.removeEventListener("hero:ready", onReady);
    }, [isHome]);

    // ルート遷移時はメニューを閉じる
    useEffect(() => {
        setOpen(false);
    }, [location.pathname]);

    // メニュー展開中は背面のスクロールを止める
    useEffect(() => {
        if (!open) return;
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "";
        };
    }, [open]);

    const handleNavClick = (path: string) => {
        setOpen(false);
        navigate(path);
    };

    return (
        <div className="mobile-nav">
            <button
                type="button"
                className={`mobile-nav__toggle${buttonVisible ? " is-visible" : ""}${
                    open ? " is-open" : ""
                }`}
                aria-label={open ? "メニューを閉じる" : "メニューを開く"}
                aria-expanded={open}
                onClick={() => setOpen((v) => !v)}
            >
                <span className="mobile-nav__bar" />
                <span className="mobile-nav__bar" />
                <span className="mobile-nav__bar" />
            </button>

            <div
                className={`mobile-nav__overlay${open ? " is-open" : ""}`}
                onClick={() => setOpen(false)}
                aria-hidden="true"
            />

            <nav
                className={`mobile-nav__panel${open ? " is-open" : ""}`}
                aria-label="モバイルナビゲーション"
            >
                <ul className="mobile-nav__list">
                    {NAV_ITEMS.map((item) => (
                        <li key={item.path}>
                            <button
                                type="button"
                                className="mobile-nav__link"
                                onClick={() => handleNavClick(item.path)}
                            >
                                <span className="mobile-nav__dot" />
                                {item.label}
                            </button>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    );
}
