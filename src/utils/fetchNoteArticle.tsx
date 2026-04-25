import { useEffect } from "react";
import MarkdownParser from "../components/MarkdownParser";

export default function FetchNoteArticle() {
    useEffect(() => {
        fetch(`./VRChat ちょこみん流 アバター改変備忘録📖 24958ec11326802cbd1ffd66f9a7d106.md`)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
            })
            .catch((error) => {
                console.error("Error fetching article:", error);
            });
    }, []);

    return <div>fetchNoteArticle</div>;
}
