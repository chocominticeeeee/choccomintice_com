import React from "react";
import { motion } from "framer-motion";
import HeaderImg from "../../assets/images/ヘッダー.jpg";
import Nav from "./Nav";
import HamburgerMenu from "./HamburgerMenu";
import "./Nav.scss"; // Ensure we have the styles if not imported by main

export default function Header({ navigations, isHome }) {
    // If not home, just render the navigation (which is fixed)
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
            {/* Background Image with Parallax Effect */}
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
                <div
                    style={{
                        position: "absolute",
                        inset: 0,
                        background: "linear-gradient(to bottom, rgba(26,10,10,0.3) 0%, rgba(26,10,10,0.8) 100%)",
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

            {/* Navigation (Fixed) */}
            <Nav navigations={navigations} />
            <div className="HamburgerMenuContainer">
                <HamburgerMenu nav={<Nav navigations={navigations} />} />
            </div>

            {/* Hero Content */}
            <div className="hero-content" style={{ zIndex: 2, textAlign: "center", color: "white" }}>
                <motion.h1
                    initial={{ y: 50, opacity: 0, filter: "blur(10px)" }}
                    animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    style={{
                        fontSize: "clamp(3rem, 8vw, 5rem)",
                        fontWeight: 900,
                        fontFamily: "'Outfit', sans-serif",
                        background: "linear-gradient(135deg, #fff 0%, #00f2e6 100%)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        marginBottom: "1rem",
                        letterSpacing: "-2px",
                    }}
                >
                    CHOCCOMINTICE
                </motion.h1>

                <motion.p
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.8, duration: 0.8 }}
                    style={{
                        fontSize: "clamp(1rem, 2vw, 1.2rem)",
                        fontFamily: "'Inter', sans-serif",
                        color: "rgba(255,255,255,0.8)",
                        letterSpacing: "0.2em",
                        textTransform: "uppercase",
                    }}
                >
                    ばぶ宮ちょこみんをもっと知って仲良くなろう💕
                </motion.p>
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
                <span style={{ fontSize: "0.8rem", letterSpacing: "2px", opacity: 0.7 }}>SCROLL</span>
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                    style={{
                        width: "2px",
                        height: "40px",
                        background: "linear-gradient(to bottom, #00f2e6, transparent)",
                    }}
                />
            </motion.div>
        </header>
    );
}
