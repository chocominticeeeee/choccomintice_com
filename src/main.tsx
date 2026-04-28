import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/style.scss";
import App from "./App";

console.log("========================================");
console.log("%cどうしてここをみているの🦀❓", "font-size: 20px; font-weight: bold;");
console.log("ここは開発用のログが流れる場所だよ。");
console.log("普段遊ぶときには特に見る必要はないところなの。");
console.log("");
console.log("悪いことしちゃいけないよ、F12で閉じてね...🙂");
console.log("いい子ならちゃんと戻れるよね？");
console.log("========================================");

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <App />
    </StrictMode>,
);
