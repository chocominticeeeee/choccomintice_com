import Wave from "react-wavify";
import "./Footer.scss";
import { FaTwitter, FaEnvelope } from "react-icons/fa";

export default function Footer() {
    return (
        <footer>
            <div className="waves">
                <div className="wave wave1">
                    <Wave
                        fill="rgba(220, 207, 250, 0.45)"
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
                        fill="rgba(255, 200, 222, 0.35)"
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
