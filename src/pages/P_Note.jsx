import React, { useEffect } from "react";
import "./P_Note.scss";
import PageTitle from "../components/PageTitle";

const articleIDs = [
    "nda1f6aaf5403",
    "n2f6d3aab0ee7",
    "nfd4ed31e4049",
    "n70f5554de815",
    "n50dc7b3f54e8",
    "n5caeb13f023e",
    "nc904566e4769",
    "n83d653d08250",
    "n0b3dc5b573e9",
];

export default function P_Note() {
    useEffect(() => {
        // note.comの埋め込み用スクリプトを動的に追加
        const script = document.createElement("script");
        script.src = "https://note.com/scripts/embed.js";
        script.async = true;
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);
    return (
        <div id="P_Note">
            <PageTitle title="Note" description="VRChatでの出来事や、リアルでの思い出を書いたりしています。" />
            <section className="note-grid">
                {articleIDs.map((articleID, index) => {
                    const src = `https://note.com/embed/notes/${articleID}`;
                    return (
                        <article className="note-card" key={articleID}>
                            <iframe
                                className="note-embed"
                                src={src}
                                style={{
                                    border: 0,
                                    display: "block",
                                    width: "100%",
                                    height: "100%",
                                    minHeight: "200px",
                                    padding: 0,
                                }}
                            />
                        </article>
                    );
                })}
            </section>
        </div>
    );
}
