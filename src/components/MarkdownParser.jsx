import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function MarkdownParser({ md }) {
    return (
        <div className="notionStyle">
            <Markdown remarkPlugins={[remarkGfm]}>{md}</Markdown>
        </div>
    );
}
