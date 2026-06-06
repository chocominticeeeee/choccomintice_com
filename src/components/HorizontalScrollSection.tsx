import {
    Children,
    memo,
    useMemo,
    useRef,
    useState,
    useEffect,
    type ReactNode,
} from "react";
import {
    motion,
    useScroll,
    useTransform,
    useSpring,
    useMotionValueEvent,
    type MotionValue,
} from "framer-motion";
import "./HorizontalScrollSection.scss";

/** 非フォーカスのパネルを傾ける最大角度(度) */
const ROTATE_DEG = 5;

/**
 * 1枚のパネル。スクロール進捗に応じて、中央に来たカードを
 * くっきり (opacity:1 / scale:1) に、両隣を少し縮めて薄く見せる
 * 「センターフォーカス」演出を加える。
 */
const FocusPanel = memo(function FocusPanel({
    index,
    count,
    progress,
    children,
    panelWidthVw,
}: {
    index: number;
    count: number;
    progress: MotionValue<number>;
    children: ReactNode;
    panelWidthVw: number;
}) {
    // このパネルが画面中央に来るときのスクロール進捗
    const center = count > 1 ? index / (count - 1) : 0;
    const step = count > 1 ? 1 / (count - 1) : 1;
    // 中央を少しでも外れるとすぐ薄くなるのを防ぐため、中央付近に
    // フォーカスを保つ「平坦域」を設ける。hold の範囲内ではフル
    // フォーカス (opacity:1 / scale:1) を維持し、その外側で減衰させる。
    const hold = step * 0.3;
    const range = [
        center - step,
        center - hold,
        center,
        center + hold,
        center + step,
    ];

    const opacity = useTransform(progress, range, [0.1, 1, 1, 1, 0.1]);
    const scale = useTransform(progress, range, [0.95, 1, 1, 1, 0.95]);
    const y = useTransform(progress, range, [40, 0, 0, 0, 40]);
    // 中央の右側(center未満)は右に傾き、フォーカス中(hold域)は0度、左側は左に傾く
    const rotate = useTransform(progress, range, [ROTATE_DEG, 0, 0, 0, -ROTATE_DEG]);

    return (
        <motion.div
            className="hscroll__panel"
            style={{
                flexBasis: `${panelWidthVw}vw`,
                width: `${panelWidthVw}vw`,
                opacity,
                scale,
                y,
                // rotate,
                transformOrigin: "bottom center",
            }}
        >
            {children}
        </motion.div>
    );
});

interface Props {
    children: ReactNode;
    /** モバイル判定のブレークポイント (px) */
    mobileBreakpoint?: number;
    /** 1パネルの横幅 (vw)。100未満にすると両隣をチラ見せするカード型カルーセルになる */
    panelWidthVw?: number;
}

/**
 * 縦スクロールを横スクロールに変換するコンテナ。
 * - 外コンテナの高さ = パネル数 × 100vh（スクロール空間）
 * - 内コンテナは sticky で画面に固定
 * - トラックを scrollYProgress に応じて横方向に動かす
 * - モバイルでは sticky を無効化し、ネイティブの横スワイプ (scroll-snap) に切替
 */
export default function HorizontalScrollSection({
    children,
    mobileBreakpoint = 768,
    panelWidthVw = 100,
}: Props) {
    // 毎レンダリングで新しい配列を作らないようメモ化（FocusPanel の memo を効かせるため）
    const panels = useMemo(() => Children.toArray(children), [children]);
    const count = Math.max(panels.length, 1);

    // 両端の余白 = (画面幅 - パネル幅) / 2。これで先頭・末尾カードも常に中央に来る
    const sidePadVw = Math.max((100 - panelWidthVw) / 2, 0);

    const targetRef = useRef<HTMLDivElement>(null);
    const [isMobile, setIsMobile] = useState(false);
    const [active, setActive] = useState(0);
    // active の最新値を保持し、実際に値が変わったときだけ setActive を呼ぶ
    // （スクロール中は毎フレーム発火するため、無駄な更新を防ぐ）
    const activeRef = useRef(0);

    useEffect(() => {
        const mq = window.matchMedia(`(max-width: ${mobileBreakpoint}px)`);
        const update = () => setIsMobile(mq.matches);
        update();
        mq.addEventListener("change", update);
        return () => mq.removeEventListener("change", update);
    }, [mobileBreakpoint]);

    const { scrollYProgress } = useScroll({ target: targetRef });

    // マウスホイールの離散入力で生の進捗はカクつくため、まず進捗自体をスプリングで
    // 滑らかにする。トラックの横移動・各パネルのフォーカス演出をこの1つの値から
    // 動かすことで、すべての動きが同期して滑らかになる。
    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 80,
        damping: 20,
        mass: 0.4,
    });

    // 0 → 1 を 0vw → -(n-1)×panelWidthVw にマッピング。
    // vw 基準にすることでパネル幅や両端パディングから独立して移動量が決まる。
    const x = useTransform(
        smoothProgress,
        [0, 1],
        ["0vw", `-${(count - 1) * panelWidthVw}vw`],
    );

    const commitActive = (idx: number) => {
        const clamped = Math.min(Math.max(idx, 0), count - 1);
        if (activeRef.current !== clamped) {
            activeRef.current = clamped;
            setActive(clamped);
        }
    };

    useMotionValueEvent(scrollYProgress, "change", (p) => {
        commitActive(Math.round(p * (count - 1)));
    });

    // モバイル: ネイティブの横スワイプ (scroll-snap)。スクロール位置からアクティブを算出。
    // onScroll は1スワイプで大量発火するため rAF で1フレームに間引く
    const rafRef = useRef<number | null>(null);
    const handleMobileScroll = (e: React.UIEvent<HTMLDivElement>) => {
        const el = e.currentTarget;
        if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
        rafRef.current = requestAnimationFrame(() => {
            const max = el.scrollWidth - el.clientWidth;
            const p = max > 0 ? el.scrollLeft / max : 0;
            commitActive(Math.round(p * (count - 1)));
        });
    };

    if (isMobile) {
        return (
            <div className="hscroll hscroll--mobile">
                <div className="hscroll__swipe" onScroll={handleMobileScroll}>
                    {panels.map((panel, i) => (
                        <motion.div
                            className="hscroll__panel"
                            key={i}
                            initial={{ opacity: 0, scale: 0.92, y: 24 }}
                            whileInView={{ opacity: 1, scale: 1, y: 0 }}
                            viewport={{ amount: 0.6 }}
                            transition={{ duration: 0.5, ease: "easeOut" }}
                        >
                            {panel}
                        </motion.div>
                    ))}
                </div>

                {count > 1 && (
                    <div className="hscroll__dots hscroll__dots--mobile" aria-hidden="true">
                        {panels.map((_, i) => (
                            <span
                                key={i}
                                className={`hscroll__dot${i === active ? " is-active" : ""}`}
                            />
                        ))}
                    </div>
                )}
            </div>
        );
    }

    return (
        <div
            className="hscroll"
            ref={targetRef}
            style={{ height: `${count * 100}vh`, "--side-pad": `${sidePadVw}vw` } as React.CSSProperties}
        >
            <div className="hscroll__sticky">
                <motion.div className="hscroll__track" style={{ x }}>
                    {panels.map((panel, i) => (
                        <FocusPanel
                            key={i}
                            index={i}
                            count={count}
                            progress={smoothProgress}
                            panelWidthVw={panelWidthVw}
                        >
                            {panel}
                        </FocusPanel>
                    ))}
                </motion.div>

                {count > 1 && (
                    <div className="hscroll__dots" aria-hidden="true">
                        {panels.map((_, i) => (
                            <span
                                key={i}
                                className={`hscroll__dot${i === active ? " is-active" : ""}`}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
