import { motion } from "framer-motion";

const AVATAR_URL = "https://pbs.twimg.com/profile_images/2043548465326940160/XQ7zRbjc_400x400.jpg";


export default function KeyVisual() {
  return (
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
                    padding: "0 32px",
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
  )
}
