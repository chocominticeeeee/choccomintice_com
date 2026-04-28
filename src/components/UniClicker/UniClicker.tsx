import { useState, useEffect, useRef, useCallback } from "react";
import uniSfx from "../../assets/uni.wav";
import { STORE_ITEMS } from "./store_items";
import type { OwnedItems, SaveData, StoreItem } from "./uni_types";
import { calcCost, calcCps, loadSave, SAVE_KEY } from "./uni_utils";
import "./UniClicker.scss";

export default function UniClicker() {
    const save = loadSave();
    const [crabs, setCrabs] = useState(save.crabs);
    const [totalCrabs, setTotalCrabs] = useState(save.totalCrabs);
    const [owned, setOwned] = useState<OwnedItems>(save.owned);
    const [floats, setFloats] = useState<{ id: number; x: number; y: number }[]>([]);
    const [clicking, setClicking] = useState(false);
    const floatId = useRef(0);
    const crabsRef = useRef(crabs);
    const totalCrabsRef = useRef(totalCrabs);
    const ownedRef = useRef(owned);
    crabsRef.current = crabs;
    totalCrabsRef.current = totalCrabs;
    ownedRef.current = owned;

    const cps = calcCps(owned);

    // オートセーブ
    useEffect(() => {
        const doSave = () =>
            localStorage.setItem(
                SAVE_KEY,
                JSON.stringify({ crabs: crabsRef.current, totalCrabs: totalCrabsRef.current, owned: ownedRef.current }),
            );
        const id = setInterval(doSave, 5000);
        window.addEventListener("beforeunload", doSave);
        return () => {
            clearInterval(id);
            window.removeEventListener("beforeunload", doSave);
            doSave();
        };
    }, []); // refs で最新値を読むので deps 不要

    // アイテムによる自動生産
    useEffect(() => {
        if (cps === 0) return;
        const id = setInterval(() => {
            setCrabs((p) => p + cps / 10);
            setTotalCrabs((p) => p + cps / 10);
        }, 100);
        return () => clearInterval(id);
    }, [cps]);

    const handleClick = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
        new Audio(uniSfx).play();
        setCrabs((p) => p + 1);
        setTotalCrabs((p) => p + 1);
        const rect = e.currentTarget.getBoundingClientRect();
        const id = floatId.current++;
        setFloats((p) => [...p, { id, x: e.clientX - rect.left, y: e.clientY - rect.top }]);
        setTimeout(() => setFloats((p) => p.filter((f) => f.id !== id)), 900);
        setClicking(true);
        setTimeout(() => setClicking(false), 100);
    }, []);

    const handleBuy = useCallback((item: StoreItem) => {
        const n = ownedRef.current[item.id] ?? 0;
        const cost = calcCost(item, n);
        if (crabsRef.current < cost) return;
        setCrabs((p) => p - cost);
        setOwned((p) => ({ ...p, [item.id]: (p[item.id] ?? 0) + 1 }));
    }, []);

    const handleReset = useCallback(() => {
        if (!confirm("本当に🦀を海に放ちますか？※リセット")) return;
        localStorage.removeItem(SAVE_KEY);
        setCrabs(0);
        setTotalCrabs(0);
        setOwned({});
    }, []);

    return (
        <div className="uni-clicker">
            {/* ===== LEFT: clicker ===== */}
            <div className="uni-clicker__left">
                <div>
                    {/* counter */}
                    <div className="uni-clicker__counter">
                        <div className="uni-clicker__counter-main">🦀 {Math.floor(crabs).toLocaleString()}</div>
                        <div className="uni-clicker__counter-sub">per second: {cps.toFixed(1)}</div>
                    </div>

                    {/* big crab */}
                    <div className="uni-clicker__crab-wrap">
                        <button
                            onClick={handleClick}
                            className={`uni-clicker__crab-btn${clicking ? " uni-clicker__crab-btn--clicking" : ""}`}
                            aria-label="🦀をクリック"
                        >
                            🦀
                            {floats.map((f) => (
                                <span key={f.id} className="uni-clicker__float" style={{ left: f.x, top: f.y }}>
                                    +1
                                </span>
                            ))}
                        </button>
                    </div>
                </div>

                {/* リセットボタン */}
                <button onClick={handleReset} className="uni-clicker__reset-btn">
                    全ての🦀を海に放つ
                </button>
            </div>

            {/* ===== RIGHT: store ===== */}
            <div className="uni-clicker__right">
                <div className="uni-clicker__store-head">
                    <span className="uni-clicker__store-head-text">🏪 ショップ</span>
                </div>

                <div className="uni-clicker__item-list">
                    {(() => {
                        const lastUnlocked = STORE_ITEMS.reduce((max, item, i) => {
                            return totalCrabs >= item.baseCost ? i : max;
                        }, 0);
                        const teaserIdx = lastUnlocked + 1;

                        return STORE_ITEMS.map((item, i) => {
                            if (i > teaserIdx) return null;

                            // teaser row
                            if (i === teaserIdx) {
                                return (
                                    <div key={item.id} className="uni-clicker__item-row uni-clicker__item-row--teaser">
                                        <div className="uni-clicker__item-icon uni-clicker__item-icon--grayscale">
                                            🔒
                                        </div>
                                        <div className="uni-clicker__item-body">
                                            <div className="uni-clicker__item-name">？？？</div>
                                            <div className="uni-clicker__item-desc">まだ解放されていません</div>
                                            <div className="uni-clicker__item-cps">
                                                🦀 {calcCost(item, 0).toLocaleString()} から
                                            </div>
                                        </div>
                                    </div>
                                );
                            }

                            // normal row
                            const n = owned[item.id] ?? 0;
                            const cost1 = calcCost(item, n);
                            const can1 = crabs >= cost1;
                            return (
                                <div
                                    key={item.id}
                                    className={`uni-clicker__item-row${!can1 ? " uni-clicker__item-row--disabled" : ""}`}
                                >
                                    <div className="uni-clicker__item-icon">{item.emoji}</div>
                                    <div className="uni-clicker__item-body">
                                        <div className="uni-clicker__item-name">
                                            {item.name}
                                            <span className="uni-clicker__item-desc">{item.description}</span>
                                        </div>
                                        <div className="uni-clicker__item-cps">+{item.cps} 🦀/s each</div>
                                    </div>
                                    <div className="uni-clicker__buy-col">
                                        <button
                                            onClick={() => handleBuy(item)}
                                            disabled={!can1}
                                            className={`uni-clicker__buy-btn${can1 ? " uni-clicker__buy-btn--active" : ""}`}
                                        >
                                            <span className="uni-clicker__buy-cost">🦀{cost1.toLocaleString()}</span>
                                        </button>
                                    </div>
                                    <div className="count-badge-area">
                                        <div className="uni-clicker__count-badge">{n}</div>
                                    </div>
                                </div>
                            );
                        });
                    })()}
                </div>
            </div>
        </div>
    );
}
