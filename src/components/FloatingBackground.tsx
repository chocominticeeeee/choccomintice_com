import { motion, useScroll, useTransform } from "framer-motion";
import "./FloatingBackground.scss";

/**
 * サイト全体の背後でふわふわ漂うアンビエント背景。
 * パステルのブロブ（にじみ）と、ゆっくり昇っていくきらきら粒子で
 * 「静止していない、生きているページ」の空気感を作る。
 * さらに白い幾何図形をスクロール連動のパララックスで流して情報量を足す。
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

// 白い幾何図形。type で形、depth(0=遠い〜3=手前) でパララックスの速さが変わる。
// 手前ほど速く・大きく動き、奥は控えめ。位置はビューポート基準（%）。
type Shape = {
    type: "ring" | "dot" | "disc" | "square" | "cross" | "triangle";
    top: string;
    left?: string;
    right?: string;
    size: number;
    depth: 0 | 1 | 2 | 3;
    spin: number; // ゆっくり回転する秒数（0 で回転なし）
    delay: number; // 浮遊アニメの開始ずらし
};

const SHAPES: Shape[] = [
    { type: "ring", top: "10%", left: "7%", size: 130, depth: 3, spin: 0, delay: 0 },
    { type: "cross", top: "16%", right: "12%", size: 26, depth: 2, spin: 24, delay: 1.2 },
    { type: "dot", top: "24%", left: "22%", size: 12, depth: 1, spin: 0, delay: 2.4 },
    { type: "square", top: "30%", right: "8%", size: 54, depth: 3, spin: 30, delay: 0.6 },
    { type: "triangle", top: "38%", left: "12%", size: 70, depth: 2, spin: 40, delay: 1.8 },
    { type: "ring", top: "46%", right: "18%", size: 88, depth: 1, spin: 0, delay: 3 },
    { type: "dot", top: "52%", left: "6%", size: 16, depth: 2, spin: 0, delay: 0.9 },
    { type: "disc", top: "58%", right: "10%", size: 40, depth: 0, spin: 0, delay: 2 },
    { type: "cross", top: "64%", left: "18%", size: 22, depth: 3, spin: 20, delay: 1.5 },
    { type: "ring", top: "72%", left: "9%", size: 110, depth: 2, spin: 0, delay: 0.3 },
    { type: "square", top: "78%", right: "16%", size: 38, depth: 1, spin: 26, delay: 2.7 },
    { type: "dot", top: "84%", left: "30%", size: 13, depth: 3, spin: 0, delay: 1 },
    { type: "triangle", top: "90%", right: "9%", size: 60, depth: 2, spin: 34, delay: 2.2 },
    { type: "disc", top: "94%", left: "14%", size: 30, depth: 1, spin: 0, delay: 0.5 },
    // 追加分 – 密度を上げて主張を強める
    { type: "dot", top: "14%", left: "42%", size: 10, depth: 0, spin: 0, delay: 1.4 },
    { type: "ring", top: "20%", right: "26%", size: 56, depth: 1, spin: 0, delay: 2.6 },
    { type: "cross", top: "34%", left: "34%", size: 18, depth: 0, spin: 28, delay: 0.4 },
    { type: "dot", top: "44%", right: "6%", size: 14, depth: 3, spin: 0, delay: 1.9 },
    { type: "square", top: "50%", left: "26%", size: 28, depth: 0, spin: 32, delay: 3.1 },
    { type: "disc", top: "62%", left: "40%", size: 22, depth: 2, spin: 0, delay: 0.7 },
    { type: "cross", top: "70%", right: "30%", size: 24, depth: 1, spin: 22, delay: 2.1 },
    { type: "dot", top: "80%", right: "24%", size: 11, depth: 0, spin: 0, delay: 1.1 },
    { type: "ring", top: "88%", left: "36%", size: 66, depth: 3, spin: 0, delay: 0.2 },
    { type: "triangle", top: "26%", left: "2%", size: 44, depth: 1, spin: 38, delay: 2.9 },
];

export default function FloatingBackground() {
    // ページ全体のスクロール進捗(0→1)。px 固定だと長いページの途中で
    // クランプして止まるので、進捗ベースで最後まで連続してパララックスさせる。
    // 図形は top 10〜94% に散らしてあるので、この程度の移動量なら画面外に
    // 抜けきらず常にどこかに見えている。
    const { scrollYProgress } = useScroll();
    const yFar = useTransform(scrollYProgress, [0, 1], [0, -70]); // depth 0
    const yMid = useTransform(scrollYProgress, [0, 1], [0, -180]); // depth 1
    const yNear = useTransform(scrollYProgress, [0, 1], [0, -320]); // depth 2
    const yFront = useTransform(scrollYProgress, [0, 1], [0, -480]); // depth 3
    const layers = [yFar, yMid, yNear, yFront];

    return (
        <div className="floating-bg" aria-hidden="true">
            {/* うっすら敷いた方眼の罫線。中央が濃く、端はふわっと消える */}
            <div className="floating-bg__grid" />
            {BLOBS.map((blob, i) => (
                <span key={i} className={blob.className} style={blob.style} />
            ))}

            {/* 白い幾何図形のパララックスレイヤー */}
            <div className="floating-bg__shapes">
                {SHAPES.map((shape, i) => (
                    <motion.span
                        key={i}
                        className="geo-wrap"
                        style={{
                            top: shape.top,
                            left: shape.left,
                            right: shape.right,
                            y: layers[shape.depth],
                        }}
                    >
                        <span
                            className={`geo geo--${shape.type}`}
                            style={{
                                width: shape.size,
                                height: shape.size,
                                animationDelay: `${shape.delay}s`,
                                ...(shape.spin
                                    ? { ["--spin" as string]: `${shape.spin}s` }
                                    : {}),
                            }}
                            data-spin={shape.spin ? "1" : undefined}
                        />
                    </motion.span>
                ))}
            </div>

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
