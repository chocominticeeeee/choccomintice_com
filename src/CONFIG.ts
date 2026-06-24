export const HEADER_URL = "https://pbs.twimg.com/profile_banners/3101853354/1775771418/1500x500";
export const AVATAR_URL = "https://pbs.twimg.com/profile_images/2043548465326940160/XQ7zRbjc_400x400.jpg";

/**
 * サイト内ページの定義（ラベル＋パス）の一元管理。
 * パンくずや PageHeader はここを参照することで、
 * ページごとに表記がブレないようにする。
 */
export interface PageDef {
    /** 表示ラベル */
    label: string;
    /** ルートパス */
    path: string;
}

export const PAGES = {
    home: { label: "トップページ", path: "/" },
    note: { label: "note", path: "/note" },
    artworks: { label: "イラスト", path: "/artworks" },
    kentei: { label: "ちょこみん検定", path: "/kentei" },
    blog: { label: "個人ブログ", path: "/blog" },
    notfound: { label: "404", path: "*" },
} as const satisfies Record<string, PageDef>;

export type PageKey = keyof typeof PAGES;
