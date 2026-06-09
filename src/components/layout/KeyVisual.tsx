import { motion, useScroll, useTransform, useAnimation } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import "./KeyVisual.scss";
import avatarImage from "../../assets/images/アバター透過.png";
import logoImage from "../../assets/images/ロゴ.png";
import HeaderImg from "../../assets/images/header.jpg";
import { HEADER_URL } from "../../CONFIG";

// ロゴ左側に縦並びで出すナビゲーション項目
const NAV_ITEMS = [
    { label: "自己紹介", target: "about" },
    { label: "イラスト", target: "artworks" },
    { label: "note", target: "note" },
];

interface KeyVisualProps {
    /** Home以外のページ用。高さを低くし、アバター・ナビ・スクロール表示を省く */
    compact?: boolean;
}

export default function KeyVisual({ compact = false }: KeyVisualProps) {
    const ref = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
    // ぼかし済みフルスクリーン背景をスクロールで動かすと毎フレーム再ラスタライズが
    // 走って重いため、背景のパララックスは廃止。前景(ロゴ等)だけ控えめに動かす。
    const heroY = useTransform(scrollYProgress, [0, 0.6], [0, -50]);
    const logoControls = useAnimation();
    // アバターのアニメーションが終わったらナビゲーションを出現させる
    const [navVisible, setNavVisible] = useState(false);

    const handleNavClick = (target: string) => {
        document.getElementById(target)?.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    useEffect(() => {
        // ロゴのエントリーアニメーション
        logoControls.start({
            x: 0,
            opacity: 1,
            rotate: 0,
            transition: { delay: 0.5, duration: 0.8, type: "spring", stiffness: 80, damping: 18 },
        });

        // compact (Home以外) ではアバターもナビも出さないので、ロゴは中央のまま。
        // フレームを表示させるためのフラグだけ立てる。
        if (compact) {
            setNavVisible(true);
            return;
        }

        // アバターが登場してから少し後にロゴを左へシフト
        // spring だと収束の尾を引き、直後に出るナビと動きが重なって二段階に
        // 見えるため、終わりが明確な tween にする。
        const t = setTimeout(() => {
            logoControls.start({
                x: -40,
                transition: { duration: 1, ease: [0.16, 1, 0.3, 1] },
            });
        }, 2000);

        return () => clearTimeout(t);
    }, [logoControls, compact]);

    return (
        <header
            ref={ref}
            className={`hero-section${compact ? " hero-section--compact" : ""}`}
            style={{
                position: "relative",
                height: compact ? "clamp(260px, 42dvh, 420px)" : "100dvh",
                overflow: "hidden",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            {/* パララックス背景 */}
            <motion.div
                className="hero-bg"
                style={{ position: "absolute", inset: 0, zIndex: 0, backgroundColor: "#ffffff" }}
                initial={{ scale: 1.15 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1.8, ease: "easeOut" }}
            >
                <div
                    style={{
                        position: "absolute",
                        inset: 0,
                        background:
                            "linear-gradient(to bottom, rgba(255,240,252,0.12) 0%, rgba(218,198,255,0.82) 100%)",
                        zIndex: 1,
                    }}
                />
                {/* 画像を真っ白からフェードイン – opacity だと裏の図形が透けるため、
                    白いオーバーレイを上から消すことで「白→画像」のフェードにする */}
                <motion.div
                    style={{
                        position: "absolute",
                        inset: 0,
                        backgroundColor: "#ffffff",
                        zIndex: 2,
                        pointerEvents: "none",
                    }}
                    initial={{ opacity: 1 }}
                    animate={{ opacity: 0 }}
                    transition={{ duration: 1.8, ease: "easeOut" }}
                />
                <img
                    src={HeaderImg ?? HEADER_URL}
                    alt="Key Visual"
                    style={{
                        width: "100%",
                        height: "120%",
                        objectFit: "cover",
                        objectPosition: "center",
                        filter: "blur(6px)",
                    }}
                />
            </motion.div>

            {/* エディトリアルな枠 – 四隅のかぎ括弧と小さなラベルで密度を出す */}
            <motion.div
                className="hero-frame"
                aria-hidden="true"
                initial={false}
                animate={{ opacity: navVisible ? 1 : 0 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
            >
                <span className="hero-frame__corner hero-frame__corner--tl" />
                <span className="hero-frame__corner hero-frame__corner--tr" />
                <span className="hero-frame__corner hero-frame__corner--bl" />
                <span className="hero-frame__corner hero-frame__corner--br" />
                <span className="hero-frame__label hero-frame__label--tl">BABUMIYA CHOCOMIN</span>
                <span className="hero-frame__label hero-frame__label--tr">★ VRCHATTER</span>
                <span className="hero-frame__label hero-frame__label--bl">EST. 2015</span>
                <span className="hero-frame__label hero-frame__label--br">WELCOME ♡</span>
            </motion.div>

            {/* ヒーローコンテンツ – ロゴを中央に配置 */}
            <motion.div
                className="hero-layout"
                style={{
                    position: "relative",
                    zIndex: 2,
                    // compact (Home以外) ではパララックスをOFF
                    y: compact ? 0 : heroY,
                }}
            >
                {/* ロゴ＋サブタイトル＋アバター */}
                <motion.div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: "14px",
                        position: "relative",
                    }}
                    initial={{ x: -60, opacity: 0, rotate: -4 }}
                    animate={logoControls}
                >
                    {/* ナビゲーション – アバター登場後にロゴ左側へ出現 (PCのみ・Homeのみ) */}
                    {!compact && (
                    <motion.nav
                        className="hero-nav"
                        aria-label="メインナビゲーション"
                        initial={false}
                        animate={navVisible ? "visible" : "hidden"}
                        variants={{
                            // ボーダーも透明から始めてふわっと出す
                            hidden: { borderLeftColor: "rgba(255, 255, 255, 0)" },
                            // 親(ロゴ列)の左シフトが完全に終わってから動かし始める
                            visible: {
                                borderLeftColor: "rgba(255, 255, 255, 0.74)",
                                transition: {
                                    staggerChildren: 0.1,
                                    delayChildren: 0.2,
                                    borderLeftColor: { duration: 0.8, ease: "easeOut" },
                                },
                            },
                        }}
                    >
                        {NAV_ITEMS.map((item) => (
                            <motion.button
                                key={item.target}
                                type="button"
                                className="hero-nav__item"
                                onClick={() => handleNavClick(item.target)}
                                variants={{
                                    hidden: { opacity: 0 },
                                    visible: {
                                        opacity: 1,
                                        transition: { duration: 0.6, ease: "easeOut" },
                                    },
                                }}
                            >
                                <span className="hero-nav__dot" />
                                {item.label}
                            </motion.button>
                        ))}
                    </motion.nav>
                    )}

                    {/* ロゴ画像 */}
                    <motion.img
                        src={logoImage}
                        alt="ばぶ宮ちょこみん"
                        className="hero-logo"
                        initial={{ scale: 0.7, opacity: 0, filter: "blur(12px)" }}
                        animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
                        transition={{ delay: 0.85, duration: 0.7, type: "spring", bounce: 0.3 }}
                        style={{
                            filter: "drop-shadow(0 4px 20px rgba(155,127,224,0.4))",
                        }}
                    />

                    {/* 全身アバター – ロゴ基準で絶対配置。compactでは小さめに表示 */}
                    <motion.div
                        className={`hero-avatar-wrapper${compact ? " hero-avatar-wrapper--compact" : ""}`}
                        initial={{ x: 150, y: 20, rotateZ: 20, opacity: 0 }}
                        animate={{ x: 0, y: 0, rotateZ: 5, opacity: 1 }}
                        transition={{
                            delay: compact ? 0.4 : 2,
                            duration: 1,
                            type: "tween",
                            ease: [0.16, 1, 0.3, 1],
                        }}
                        style={{ transformOrigin: "bottom" }}
                        onAnimationComplete={() => setNavVisible(true)}
                    >
                        <div className="hero-avatar-full">
                            <img src={avatarImage} alt="ばぶ宮ちょこみん" />
                        </div>
                    </motion.div>
                </motion.div>
            </motion.div>

            {/* スクロールインジケーター (Homeのみ) */}
            {!compact && (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.5, duration: 1 }}
                style={{
                    position: "absolute",
                    bottom: "84px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    zIndex: 4,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "10px",
                    pointerEvents: "none",
                }}
            >
                <span
                    style={{
                        fontSize: "0.8rem",
                        letterSpacing: "4px",
                        color: "#ffffff",
                        fontFamily: "'Outfit', sans-serif",
                        fontWeight: 700,
                        textShadow: "0 0 12px rgba(244,125,181,0.9), 0 2px 6px rgba(155,127,224,0.7)",
                    }}
                >
                    SCROLL
                </span>
                <div
                    style={{
                        width: "26px",
                        height: "42px",
                        borderRadius: "13px",
                        border: "2.5px solid rgba(255,255,255,0.9)",
                        background: "rgba(155,127,224,0.18)",
                        boxShadow:
                            "0 0 18px rgba(244,125,181,0.7), inset 0 0 10px rgba(255,255,255,0.3)",
                        display: "flex",
                        justifyContent: "center",
                        paddingTop: "8px",
                    }}
                >
                    <motion.div
                        animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
                        transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
                        style={{
                            width: "5px",
                            height: "10px",
                            borderRadius: "3px",
                            background: "linear-gradient(to bottom, #ffffff, #f47db5)",
                            boxShadow: "0 0 8px rgba(244,125,181,0.9)",
                        }}
                    />
                </div>
            </motion.div>
            )}
        </header>
    );
}
