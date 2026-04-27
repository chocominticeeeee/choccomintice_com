import { motion } from "framer-motion";
import { AVATAR_URL, HEADER_URL } from "../../CONFIG";

export default function KeyVisual() {
    return (
        <header
            className="hero-section"
            style={{
                position: "relative",
                height: "80vh",
                overflow: "hidden",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            {/* Background Image */}
            <motion.div
                className="hero-bg"
                initial={{ scale: 1.1, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                style={{ position: "absolute", inset: 0, zIndex: 0 }}
            >
                <div
                    style={{
                        position: "absolute",
                        inset: 0,
                        background:
                            "linear-gradient(to bottom, rgba(255,240,252,0.28) 0%, rgba(218,198,255,0.60) 100%)",
                        zIndex: 1,
                    }}
                />
                <img
                    src={HEADER_URL}
                    alt="Key Visual"
                    style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }}
                />
            </motion.div>

            {/* Hero Content */}
            <motion.div
                className="hero-content"
                style={{
                    position: "relative",
                    zIndex: 2,
                    textAlign: "center",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "16px",
                    padding: "15px 32px",
                    width: "100%",
                    backgroundColor: "rgba(255, 255, 255, 0.74)",
                    backdropFilter: "blur(3px)",
                }}
            >
                {/* Avatar — SCSS handles rotating ring + glow via ::before / ::after */}
                <motion.div
                    className="hero-avatar-ring"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.9, type: "spring", bounce: 0.4 }}
                >
                    <img src={AVATAR_URL} alt="ばぶ宮ちょこみん" />
                </motion.div>

                {/* Title — SCSS adds gradient underline via ::after */}
                <motion.div
                    className="hero-title-wrap"
                    initial={{ y: 40, opacity: 0, filter: "blur(10px)" }}
                    animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                    transition={{ delay: 0.5, duration: 0.9 }}
                >
                    <h1
                        style={{
                            fontSize: "clamp(2.2rem, 7vw, 4.5rem)",
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
                </motion.div>
            </motion.div>

            {/* Scroll Indicator – mouse icon with animated wheel */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.7, duration: 1 }}
                style={{
                    position: "absolute",
                    bottom: "36px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    zIndex: 2,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "8px",
                    pointerEvents: "none",
                }}
            >
                <span
                    style={{
                        fontSize: "0.68rem",
                        letterSpacing: "3px",
                        color: "#9b7fe0",
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
                        border: "2px solid rgba(155,127,224,0.65)",
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
