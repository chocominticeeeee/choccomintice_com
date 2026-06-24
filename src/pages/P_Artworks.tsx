import { useState, useEffect } from "react";
import KeyVisual from "../components/layout/KeyVisual";
import PageHeader from "../components/layout/PageHeader";
import Breadcrumb from "../components/layout/Breadcrumb";
import "./P_Artworks.scss";

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

export default function P_Artworks() {
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

    return (
        <>
            <KeyVisual compact />
            <main className="artworks-page">
                <Breadcrumb items={["artworks"]} />
                <PageHeader
                    title="イラスト"
                    emoji="🎨"
                    description="ちょこみんのイラストをまとめたよ〜！すきな子を見つけてね(´｡• ᵕ •｡`)"
                />

                <div className="artworks-page__list">
                    {works.map((work, i) => (
                        <figure className="artwork-item" key={i}>
                            <img src={work.src} alt={work.title} loading="lazy" />
                            {work.title && (
                                <figcaption className="artwork-item__caption">
                                    {work.title}
                                </figcaption>
                            )}
                        </figure>
                    ))}
                </div>
            </main>
        </>
    );
}
