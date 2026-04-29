import { useEffect, useRef } from "react";

interface SelectedImage {
    src: string;
    alt: string;
}

interface Props {
    urls: string[];
    totalCount: number;
    onSelect: (image: SelectedImage) => void;
}

export default function VRChatGallery({ urls, totalCount, onSelect }: Props) {
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const container = scrollRef.current;
        if (!container) return;

        const cards = container.querySelectorAll<HTMLElement>(".photo-card");
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("visible");
                        observer.unobserve(entry.target);
                    }
                });
            },
            { root: container, threshold: 0.1 },
        );

        cards.forEach((card) => observer.observe(card));
        return () => observer.disconnect();
    }, [urls]);

    return (
        <div className="vrchat-section__gallery-scroll" ref={scrollRef}>
            <div className="vrchat-section__gallery">
                {urls.map((url, index) => (
                    <div
                        className="photo-card"
                        key={index}
                        onClick={() =>
                            window.innerWidth > 950 && onSelect({ src: url, alt: "VRChatの写真" })
                        }
                    >
                        <img src={url} alt="VRChatの写真" loading="lazy" />
                    </div>
                ))}
                {totalCount === 0 && <p className="no-images">画像が見つかりません</p>}
            </div>
        </div>
    );
}
