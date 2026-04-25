import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface MarkdownParserProps {
    md: string;
}

export default function MarkdownParser({ md }: MarkdownParserProps) {
    return (
        <div className="notionStyle">
            <Markdown remarkPlugins={[remarkGfm]}>{md}</Markdown>
        </div>
    );
}
