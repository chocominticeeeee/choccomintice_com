import { motion, useScroll, useTransform, useAnimation } from "framer-motion";
import { useRef, useEffect } from "react";
import "./KeyVisual.scss";
// import backgroundImage from "../../assets/images/header.jpg";
import avatarImage from "../../assets/images/アバター透過.png";
import logoImage from "../../assets/images/ロゴ.png";
import { HEADER_URL } from "../../CONFIG";

export default function KeyVisual() {
    const ref = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
    const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
    const heroY = useTransform(scrollYProgress, [0, 0.6], [0, -50]);
    const logoControls = useAnimation();

    useEffect(() => {
        // ロゴのエントリーアニメーション
        logoControls.start({
            x: 0,
            opacity: 1,
            rotate: 0,
            transition: { delay: 0.5, duration: 0.8, type: "spring", stiffness: 80, damping: 18 },
        });

        // アバターが登場してから少し後にロゴを左へシフト
        const t = setTimeout(() => {
            logoControls.start({
                x: -40,
                transition: { duration: 1, type: "spring", stiffness: 60, damping: 18 },
            });
        }, 2000);

        return () => clearTimeout(t);
    }, [logoControls]);

    return (
        <header
            ref={ref}
            className="hero-section"
            style={{
                position: "relative",
                height: "70dvh",
                overflow: "hidden",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            {/* パララックス背景 */}
            <motion.div
                className="hero-bg"
                style={{ position: "absolute", inset: 0, zIndex: 0, y: bgY }}
                initial={{ scale: 1.15, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
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
                <img
                    src={HEADER_URL}
                    alt="Key Visual"
                    style={{ width: "100%", height: "120%", objectFit: "cover", objectPosition: "center", filter: "blur(6px)" }}
                />
            </motion.div>

            {/* ヒーローコンテンツ – ロゴを中央に配置 */}
            <motion.div
                className="hero-layout"
                style={{
                    position: "relative",
                    zIndex: 2,
                    y: heroY,
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

                    {/* 全身アバター – ロゴ基準で絶対配置 */}
                    <motion.div
                        className="hero-avatar-wrapper"
                        initial={{ x: 150, y: 20, rotateZ: 20, opacity: 0 }}
                        animate={{ x: 0, y: 0, rotateZ: 5, opacity: 1 }}
                        transition={{ delay: 2, duration: 1, type: "tween", ease: [0.16, 1, 0.3, 1] }}
                        style={{ transformOrigin: "bottom" }}
                    >
                        <div className="hero-avatar-full">
                            <img src={avatarImage} alt="ばぶ宮ちょこみん" />
                        </div>
                    </motion.div>
                </motion.div>
            </motion.div>

            {/* スクロールインジケーター */}
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
                    gap: "8px",
                    pointerEvents: "none",
                }}
            >
                <span
                    style={{
                        fontSize: "0.65rem",
                        letterSpacing: "3px",
                        color: "rgba(155,127,224,0.75)",
                        fontFamily: "'Outfit', sans-serif",
                        fontWeight: 600,
                    }}
                >
                    SCROLL
                </span>
                <div
                    style={{
                        width: "22px",
                        height: "36px",
                        borderRadius: "11px",
                        border: "2px solid rgba(155,127,224,0.55)",
                        display: "flex",
                        justifyContent: "center",
                        paddingTop: "7px",
                    }}
                >
                    <motion.div
                        animate={{ y: [0, 12, 0], opacity: [1, 0.2, 1] }}
                        transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
                        style={{
                            width: "4px",
                            height: "8px",
                            borderRadius: "2px",
                            background: "linear-gradient(to bottom, #9b7fe0, #f47db5)",
                        }}
                    />
                </div>
            </motion.div>
        </header>
    );
}
