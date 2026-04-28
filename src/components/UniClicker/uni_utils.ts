import { STORE_ITEMS } from "./store_items";
import type { OwnedItems, SaveData, StoreItem } from "./uni_types";
import uniSfx from "../../assets/uni.wav";

export const SAVE_KEY = "uniclicker_save";

export function saveData(newData: SaveData) {
     console.log("b");
    try {
        localStorage.setItem(SAVE_KEY, JSON.stringify(newData));
        console.log("セーブしました🦀", newData);
    } catch {
        /* ignore */
    }
}

export function loadData(): SaveData {
    try {
        const raw = localStorage.getItem(SAVE_KEY);
        if (raw) return JSON.parse(raw);
    } catch {
        /* ignore */
    }
    return { crabs: 0, totalCrabs: 0, owned: {} };
}

export function calcCps(owned: OwnedItems) {
    return STORE_ITEMS.reduce((s, item) => s + item.cps * (owned[item.id] ?? 0), 0);
}

export function calcCost(item: StoreItem, n: number) {
    return Math.floor(item.baseCost * Math.pow(1.15, n));
}

export function calcCostN(item: StoreItem, n: number, qty: number) {
    let t = 0;
    for (let i = 0; i < qty; i++) t += calcCost(item, n + i);
    return t;
}

export function uniSound() {
    const uni = new Audio(uniSfx);
    uni.volume = 0.5;
    uni.play();
}
