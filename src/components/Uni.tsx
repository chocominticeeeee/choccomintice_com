import { useRef } from "react";
import uniSfx from "../assets/uni.wav";

export default function Uni() {
    const count = useRef(0);

    const playUni = () => {
        const audio = new Audio(uniSfx);
        audio.volume = 0.7;
        audio.play();
        count.current += 1;
        if (count.current === 10) {
            alert("連打するな！タコにするぞ...🐙");
        }
        if (count.current === 20) {
            alert("いじめないで・・・；；");
        }
        if (count.current === 30) {
            alert("もうよくない？飽きないね～ｗ");
        }
        if (count.current === 50) {
            alert("キュアアルカナチョコミン！参上❣");
        }
        if (count.current === 100) {
            alert("100クリックおめでとう!もう何もないよｗ");
        }
        if (count.current === 110) {
            alert("https://booth.pm/gifts/cba406e3-6944-4a65-af4d-f12fd388a9cc");
        }
    };

    return (
        <div className="social-links">
            <button
                onClick={playUni}
                aria-label="uni"
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 44,
                    height: 44,
                    borderRadius: "50%",
                    background: "rgba(255, 255, 255, 0.75)",
                    border: "1.5px solid rgba(220, 190, 240, 0.5)",
                    fontSize: "1.3rem",
                    cursor: "pointer",
                    boxShadow: "0 2px 12px rgba(160, 100, 200, 0.1)",
                    transition: "all 0.3s ease",
                }}
            >
                🦀
            </button>
        </div>
    );
}
