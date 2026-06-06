import { useEffect, useState } from "react";
import HorizontalScrollSection from "./HorizontalScrollSection";
import "./ArtworksScroll.scss";

interface ImageModule {
    default: string;
}

interface Artwork {
    src: string;
    title: string;
}

const ArtworksGlob = import.meta.glob<ImageModule>("../assets/images/Artworks/*");

/** ファイル名から作品タイトルを抽出（先頭の "!"・番号・拡張子を除去） */
function parseTitle(path: string): string {
    const file = path.split("/").pop() ?? "";
    const noExt = file.replace(/\.[^.]+$/, "");
    return noExt.replace(/^!?\d+_?/, "").trim();
}

interface Props {
    onSelect?: (image: { src: string; alt: string }) => void;
}

export default function ArtworksScroll({ onSelect }: Props) {
    const [works, setWorks] = useState<Artwork[]>([]);

    useEffect(() => {
        Promise.all(
            Object.entries(ArtworksGlob)
                .sort(([a], [b]) => a.localeCompare(b))
                .map(async ([key, loader]) => ({
                    src: (await loader()).default,
                    title: parseTitle(key),
                })),
        ).then(setWorks);
    }, []);

    if (works.length === 0) return null;

    return (
        <HorizontalScrollSection panelWidthVw={40}>
            {works.map((work, i) => (
                <div
                    className="artwork-panel"
                    key={i}
                    onClick={() =>
                        window.innerWidth > 950 &&
                        onSelect?.({ src: work.src, alt: work.title })
                    }
                >
                    <div className="artwork-panel__bg" style={{ backgroundImage: `url(${work.src})` }} />
                    <div className="artwork-panel__frame">
                        <img src={work.src} alt={work.title} loading="lazy" />
                    </div>
                    <div className="artwork-panel__caption">
                        <span className="artwork-panel__index">
                            {String(i + 1).padStart(2, "0")} / {String(works.length).padStart(2, "0")}
                        </span>
                        {work.title && <span className="artwork-panel__title">{work.title}</span>}
                    </div>
                </div>
            ))}
        </HorizontalScrollSection>
    );
}
