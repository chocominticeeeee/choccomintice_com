import { motion } from "framer-motion";
import HeaderImg from "../../assets/images/ヘッダー.jpg";
import Nav from "./Nav";
import HamburgerMenu from "./HamburgerMenu";
import "./Nav.scss";

interface HeaderProps {
    navigations: [string, string][];
    isHome: boolean;
}

export default function Header({ navigations, isHome }: HeaderProps) {
    if (!isHome) {
        return (
            <>
                <Nav navigations={navigations} />
                <div className="HamburgerMenuContainer">
                    <HamburgerMenu nav={<Nav navigations={navigations} />} />
                </div>
            </>
        );
    }

    return (
        <header
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
            {/* Background Image */}
            <motion.div
                className="hero-bg"
                initial={{ scale: 1.1, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    zIndex: 0,
                }}
            >
                {/* Pastel soft overlay */}
                <div
                    style={{
                        position: "absolute",
                        inset: 0,
                        background:
                            "linear-gradient(to bottom, rgba(255,240,252,0.45) 0%, rgba(230,210,255,0.70) 100%)",
                        zIndex: 1,
                    }}
                />
                <img
                    src={HeaderImg}
                    alt="Key Visual"
                    style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        objectPosition: "center",
                    }}
                />
            </motion.div>

            {/* Navigation */}
            <Nav navigations={navigations} />
            <div className="HamburgerMenuContainer">
                <HamburgerMenu nav={<Nav navigations={navigations} />} />
            </div>

            {/* Hero Content */}
            <div className="hero-content" style={{ zIndex: 2, textAlign: "center" }}>
                <motion.h1
                    initial={{ y: 50, opacity: 0, filter: "blur(10px)" }}
                    animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    style={{
                        fontSize: "clamp(3rem, 8vw, 5rem)",
                        fontWeight: 900,
                        fontFamily: "'Outfit', sans-serif",
                        background: "linear-gradient(135deg, #9b7fe0 0%, #f47db5 50%, #4ecdc4 100%)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                        marginBottom: "1rem",
                        letterSpacing: "-2px",
                        filter: "drop-shadow(0 2px 12px rgba(155,127,224,0.3))",
                    }}
                >
                    CHOCCOMINTICE
                </motion.h1>

                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.8, duration: 0.8 }}
                    style={{
                        display: "inline-block",
                        padding: "10px 28px",
                        borderRadius: "3rem",
                        background: "rgba(255,255,255,0.72)",
                        backdropFilter: "blur(12px)",
                        border: "1.5px solid rgba(220,190,240,0.5)",
                        boxShadow: "0 4px 20px rgba(160,100,200,0.15)",
                    }}
                >
                    <p
                        style={{
                            fontSize: "clamp(0.9rem, 2vw, 1.1rem)",
                            fontFamily: "'M PLUS Rounded 1c', sans-serif",
                            color: "#3d2c4a",
                            letterSpacing: "0.05em",
                            margin: 0,
                        }}
                    >
                        ばぶ宮ちょこみんをもっと知って仲良くなろう💕
                    </p>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 1 }}
                style={{
                    position: "absolute",
                    bottom: "40px",
                    left: "50%",
                    translateX: "-50%",
                    zIndex: 2,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "10px",
                }}
            >
                <span
                    style={{
                        fontSize: "0.75rem",
                        letterSpacing: "2px",
                        color: "#9b7fe0",
                        fontFamily: "'Outfit', sans-serif",
                        fontWeight: 600,
                    }}
                >
                    SCROLL
                </span>
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                    style={{
                        width: "2px",
                        height: "40px",
                        background: "linear-gradient(to bottom, #9b7fe0, #f47db5)",
                        borderRadius: "2px",
                    }}
                />
            </motion.div>
        </header>
    );
}
