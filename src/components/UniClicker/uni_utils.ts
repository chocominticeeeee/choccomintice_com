import { STORE_ITEMS } from "./store_items";
import type { OwnedItems, SaveData, StoreItem } from "./uni_types";
import uniSfx from "../../assets/uni.wav";

export const SAVE_KEY = "uniclicker_save";

export function saveData(newData: SaveData) {
    try {
        localStorage.setItem(SAVE_KEY, JSON.stringify(newData));
    } catch {
        // localStorage が使えない環境では無視
    }
}

export function loadData(): SaveData {
    try {
        const raw = localStorage.getItem(SAVE_KEY);
        if (raw) return JSON.parse(raw);
    } catch {
        // 破損データは無視して初期値を返す
    }
    return { crabs: 0, totalCrabs: 0, owned: {} };
}

export function calcCps(owned: OwnedItems) {
    return STORE_ITEMS.reduce((s, item) => s + item.cps * (owned[item.id] ?? 0), 0);
}

export function calcCost(item: StoreItem, n: number) {
    return Math.floor(item.baseCost * Math.pow(1.15, n));
}

export function uniSound() {
    const uni = new Audio(uniSfx);
    uni.volume = 0.5;
    uni.play();
}
