import "./FloatingBackground.scss";

/**
 * サイト全体の背後でふわふわ漂うアンビエント背景。
 * パステルのブロブ（にじみ）と、ゆっくり昇っていくきらきら粒子で
 * 「静止していない、生きているページ」の空気感を作る。
 * 描画は transform / opacity のみに寄せて GPU で完結させている。
 */
const BLOBS = [
    { className: "blob blob--lavender", style: { top: "8%", left: "-6%" } },
    { className: "blob blob--pink", style: { top: "32%", right: "-8%" } },
    { className: "blob blob--mint", style: { top: "58%", left: "-4%" } },
    { className: "blob blob--peach", style: { top: "78%", right: "-6%" } },
    { className: "blob blob--sky", style: { top: "120%", left: "30%" } },
];

const SPARKLES = ["✨", "🫧", "🩵", "✨", "🫧", "💜", "✨", "🩷", "🫧", "✨"];

export default function FloatingBackground() {
    return (
        <div className="floating-bg" aria-hidden="true">
            {/* うっすら敷いた方眼の罫線。中央が濃く、端はふわっと消える */}
            <div className="floating-bg__grid" />
            {BLOBS.map((blob, i) => (
                <span key={i} className={blob.className} style={blob.style} />
            ))}
            <div className="floating-bg__sparkles">
                {SPARKLES.map((s, i) => (
                    <span
                        key={i}
                        className="sparkle"
                        style={{
                            left: `${(i * 100) / SPARKLES.length + 4}%`,
                            animationDelay: `${i * 1.7}s`,
                            animationDuration: `${14 + (i % 5) * 3}s`,
                            fontSize: `${0.8 + (i % 3) * 0.35}rem`,
                        }}
                    >
                        {s}
                    </span>
                ))}
            </div>
        </div>
    );
}
