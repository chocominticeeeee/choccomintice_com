import React from "react";
import Wave from "react-wavify";
import "./Footer.scss";
import { FaTwitter, FaGithub, FaEnvelope } from "react-icons/fa";

export default function Footer() {
    return (
        <footer>
            <div className="waves">
                <div className="wave wave1">
                    <Wave
                        fill="rgba(0, 242, 230, 0.1)" // Neon Mint Glass
                        paused={false}
                        style={{ display: "flex" }}
                        options={{
                            height: 20,
                            amplitude: 30,
                            speed: 0.15,
                            points: 3,
                        }}
                    />
                </div>
                <div className="wave wave2" style={{ position: "absolute", top: 0, width: "100%" }}>
                    <Wave
                        fill="#1a0a0a" // Dark Chocolate
                        paused={false}
                        style={{ display: "flex" }}
                        options={{
                            height: 30,
                            amplitude: 20,
                            speed: 0.2,
                            points: 4,
                        }}
                    />
                </div>
            </div>

            <div className="footerContent">
                <div className="social-links">
                    <a
                        href="https://x.com/Choccomintice"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Twitter"
                    >
                        <FaTwitter />
                    </a>
                    <a href="/ContactForm" aria-label="Contact">
                        <FaEnvelope />
                    </a>
                </div>

                <div className="links">
                    <a href="/">Home</a> |<a href="/Introduction"> Introduction</a> |
                    <a href="/PrivacyPolicy"> Privacy Policy</a>
                </div>

                <div className="copyright">&copy; {new Date().getFullYear()} ChoccomintIce. All rights reserved.</div>
            </div>
        </footer>
    );
}
