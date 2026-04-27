import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { AVATAR_URL, HEADER_URL } from "../../CONFIG";
import "./Header.scss";

export default function KeyVisual() {
    const ref = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
    const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
    const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
    const heroY = useTransform(scrollYProgress, [0, 0.6], [0, -50]);

    return (
        <header
            ref={ref}
            className="hero-section"
            style={{
                position: "relative",
                height: "100vh",
                overflow: "hidden",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            {/* Parallax background */}
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
                    style={{ width: "100%", height: "120%", objectFit: "cover", objectPosition: "center" }}
                />
            </motion.div>

            {/* Hero content – scroll fade/rise wrapper */}
            <motion.div
                style={{
                    position: "relative",
                    zIndex: 2,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "100%",
                    padding: "0 24px",
                    opacity: heroOpacity,
                    y: heroY,
                }}
            >
                {/* Glass card */}
                <motion.div
                    className="hero-content"
                    style={{
                        position: "relative",
                        textAlign: "center",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: "18px",
                        padding: "40px 48px",
                        maxWidth: "560px",
                        width: "100%",
                        backgroundColor: "rgba(255, 255, 255, 0.52)",
                        backdropFilter: "blur(22px)",
                        WebkitBackdropFilter: "blur(22px)",
                        borderRadius: "2rem",
                        border: "1.5px solid rgba(220, 190, 240, 0.5)",
                        boxShadow: "0 12px 60px rgba(155, 127, 224, 0.18), 0 2px 16px rgba(244, 125, 181, 0.12)",
                    }}
                    initial={{ y: 60, opacity: 0, scale: 0.94 }}
                    animate={{ y: 0, opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4, duration: 1.0, type: "spring", bounce: 0.2 }}
                >
                    {/* Avatar – entrance then float */}
                    <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.65, duration: 0.9, type: "spring", bounce: 0.4 }}
                    >
                        <motion.div
                            className="hero-avatar-ring"
                            animate={{ y: [0, -7, 0] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1.6 }}
                        >
                            <img src={AVATAR_URL} alt="ばぶ宮ちょこみん" />
                        </motion.div>
                    </motion.div>

                    {/* Title */}
                    <motion.div
                        className="hero-title-wrap"
                        initial={{ y: 30, opacity: 0, filter: "blur(10px)" }}
                        animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                        transition={{ delay: 0.8, duration: 0.9 }}
                    >
                        <h1
                            style={{
                                fontSize: "clamp(2rem, 6.5vw, 4rem)",
                                fontWeight: 900,
                                fontFamily: "'Outfit', sans-serif",
                                background: "linear-gradient(135deg, #9b7fe0 0%, #f47db5 55%, #4ecdc4 100%)",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                                backgroundClip: "text",
                                margin: 0,
                                letterSpacing: "-2px",
                                filter: "drop-shadow(0 2px 16px rgba(155,127,224,0.32))",
                                lineHeight: 1,
                            }}
                        >
                            CHOCCOMINTICE
                        </h1>
                        <motion.p
                            style={{
                                fontSize: "0.88rem",
                                fontFamily: "'M PLUS Rounded 1c', sans-serif",
                                color: "rgba(61,44,74,0.6)",
                                margin: "8px 0 0",
                                letterSpacing: "0.12em",
                            }}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1.05, duration: 0.8 }}
                        >
                            ばぶ宮ちょこみん🍼🌱
                        </motion.p>
                    </motion.div>

                </motion.div>
            </motion.div>

            {/* Scroll indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.3, duration: 1 }}
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
