export const HEADER_URL = "https://pbs.twimg.com/profile_banners/3101853354/1775771418/1500x500";
export const AVATAR_URL = "https://pbs.twimg.com/profile_images/2043548465326940160/XQ7zRbjc_400x400.jpg";

export const whyWatchConsole = () => {
    console.log("========================================");
    console.log("%cどうしてここをみているの🦀❓", "font-size: 20px; font-weight: bold;");
    console.log("ここは開発用のログが流れる場所だよ。");
    console.log("普段遊ぶときには特に見る必要はないところなの。");
    console.log("");
    console.log("悪いことしちゃいけないよ、F12で閉じてね...🙂");
    console.log("いい子ならちゃんと戻れるよね？");
    console.log("========================================");
};

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
