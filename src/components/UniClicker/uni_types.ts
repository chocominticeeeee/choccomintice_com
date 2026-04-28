export interface OwnedItems {
    [id: string]: number;
}

export interface SaveData {
    crabs: number;
    totalCrabs: number;
    owned: OwnedItems;
}

export interface StoreItem {
    id: string;
    name: string;
    emoji: string;
    description: string;
    baseCost: number;
    cps: number;
}
