import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

const markdown = `
# Hi, *Pluto*!

## aa
`;

export default function MarkdownT() {
    return <Markdown remarkPlugins={[remarkGfm]}>{markdown}</Markdown>;
}
