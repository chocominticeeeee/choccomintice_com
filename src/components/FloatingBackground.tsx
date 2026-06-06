import { motion, useScroll, useTransform } from "framer-motion";
import "./FloatingBackground.scss";

/**
 * サイト全体の背後でふわふわ漂うアンビエント背景。
 * パステルのブロブ（にじみ）と、ゆっくり昇っていくきらきら粒子で
 * 「静止していない、生きているページ」の空気感を作る。
 * さらに白い幾何図形をスクロール連動のパララックスで流して情報量を足す。
 * 描画は transform / opacity のみに寄せて GPU で完結させている。
 */
// blur(60px) の巨大 blob は GPU の塗りつぶし負荷が高く、枚数がそのまま重さに
// 直結するため 5→3 に削減（縦に散らして全体をカバー）。drift アニメも廃止し静止。
const BLOBS = [
    { className: "blob blob--lavender", style: { top: "8%", left: "-6%" } },
    { className: "blob blob--mint", style: { top: "52%", left: "-4%" } },
    { className: "blob blob--peach", style: { top: "82%", right: "-6%" } },
];

const SPARKLES = ["✨", "🫧", "💜", "🩷"];

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

// 枚数は描画コストに直結するため厳選（24→12）。縦の散らばり・形・depth の
// バランスは保ちつつ、よく動く手前(depth3)を多めにして奥行き感を強める。
const SHAPES: Shape[] = [
    { type: "ring", top: "10%", left: "7%", size: 130, depth: 3, spin: 0, delay: 0 },
    { type: "cross", top: "16%", right: "12%", size: 26, depth: 2, spin: 24, delay: 1.2 },
    { type: "square", top: "30%", right: "8%", size: 54, depth: 3, spin: 30, delay: 0.6 },
    { type: "triangle", top: "38%", left: "12%", size: 70, depth: 2, spin: 40, delay: 1.8 },
    { type: "ring", top: "46%", right: "18%", size: 88, depth: 1, spin: 0, delay: 3 },
    { type: "square", top: "50%", left: "26%", size: 28, depth: 0, spin: 32, delay: 3.1 },
    { type: "disc", top: "58%", right: "10%", size: 40, depth: 0, spin: 0, delay: 2 },
    { type: "cross", top: "64%", left: "18%", size: 22, depth: 3, spin: 20, delay: 1.5 },
    { type: "ring", top: "72%", left: "9%", size: 110, depth: 2, spin: 0, delay: 0.3 },
    { type: "dot", top: "84%", left: "30%", size: 13, depth: 3, spin: 0, delay: 1 },
    { type: "ring", top: "88%", left: "36%", size: 66, depth: 3, spin: 0, delay: 0.2 },
    { type: "triangle", top: "90%", right: "9%", size: 60, depth: 2, spin: 34, delay: 2.2 },
];

export default function FloatingBackground() {
    // ページ全体のスクロール進捗(0→1)。px 固定だと長いページの途中で
    // クランプして止まるので、進捗ベースで最後まで連続してパララックスさせる。
    // 図形は top 10〜94% に散らしてあるので、この程度の移動量なら画面外に
    // 抜けきらず常にどこかに見えている。
    const { scrollYProgress } = useScroll();
    // 移動量は per-frame コストにほぼ無関係（重さは図形=合成レイヤーの「数」で決まる）。
    // なので奥行き感を出すため depth ごとの差はむしろ大きめに。手前ほどよく動く。
    const yFar = useTransform(scrollYProgress, [0, 1], [0, -40]); // depth 0
    const yMid = useTransform(scrollYProgress, [0, 1], [0, -160]); // depth 1
    const yNear = useTransform(scrollYProgress, [0, 1], [0, -340]); // depth 2
    const yFront = useTransform(scrollYProgress, [0, 1], [0, -560]); // depth 3
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
                            }}
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
