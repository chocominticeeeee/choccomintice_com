import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import type { EmblaCarouselType, EmblaEventType } from "embla-carousel";
import Lightbox from "./Lightbox";
import "./ArtworksCarousel.scss";

interface ImageModule {
    default: string;
}

const ArtworksImages = import.meta.glob<ImageModule>("../assets/images/Artworks/*", {
    eager: true,
});

const TWEEN_FACTOR_BASE = 0.2;

const numberWithinRange = (number: number, min: number, max: number): number =>
    Math.min(Math.max(number, min), max);

interface Props {
    startIndex?: number;
}

export default function ArtworksCarousel({ startIndex = 0 }: Props) {
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "center", startIndex });
    const tweenFactor = useRef(0);
    const tweenNodes = useRef<HTMLElement[]>([]);
    const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null);
    const dragDistance = useRef(0);

    const slides = Object.entries(ArtworksImages)
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([key, mod]) => ({ src: mod.default, alt: key.split("/").pop() ?? "" }));

    const setTweenNodes = useCallback((api: EmblaCarouselType) => {
        tweenNodes.current = api.slideNodes().map(
            (node) => node.querySelector(".embla__parallax__layer") as HTMLElement
        );
    }, []);

    const setTweenFactor = useCallback((api: EmblaCarouselType) => {
        tweenFactor.current = TWEEN_FACTOR_BASE * api.scrollSnapList().length;
    }, []);

    const tweenParallax = useCallback(
        (api: EmblaCarouselType, eventName?: EmblaEventType) => {
            const engine = api.internalEngine();
            const scrollProgress = api.scrollProgress();
            const slidesInView = api.slidesInView();
            const isScrollEvent = eventName === "scroll";

            api.scrollSnapList().forEach((scrollSnap, snapIndex) => {
                let diffToTarget = scrollSnap - scrollProgress;
                const slidesInSnap = engine.slideRegistry[snapIndex];

                slidesInSnap.forEach((slideIndex) => {
                    if (isScrollEvent && !slidesInView.includes(slideIndex)) return;

                    if (engine.options.loop) {
                        engine.slideLooper.loopPoints.forEach((loopItem) => {
                            const target = loopItem.target();
                            if (slideIndex === loopItem.index && target !== 0) {
                                const sign = Math.sign(target);
                                if (sign === -1) diffToTarget = scrollSnap - (1 + scrollProgress);
                                if (sign === 1) diffToTarget = scrollSnap + (1 - scrollProgress);
                            }
                        });
                    }

                    const tweenValue = 1 - diffToTarget * tweenFactor.current;
                    const translate = numberWithinRange(tweenValue, 0, 2) * 100 - 100;
                    const node = tweenNodes.current[slideIndex];
                    if (node) node.style.transform = `translateX(${translate}%)`;
                });
            });
        },
        []
    );

    useEffect(() => {
        if (!emblaApi) return;

        setTweenNodes(emblaApi);
        setTweenFactor(emblaApi);
        tweenParallax(emblaApi);

        emblaApi
            .on("reInit", setTweenNodes)
            .on("reInit", setTweenFactor)
            .on("reInit", tweenParallax)
            .on("scroll", tweenParallax)
            .on("slideFocus", tweenParallax);
    }, [emblaApi, setTweenNodes, setTweenFactor, tweenParallax]);

    const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
    const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

    return (
        <>
            <div className="embla" style={{ "--slide-count": slides.length } as CSSProperties}>
                <div className="embla__viewport" ref={emblaRef}>
                    <div className="embla__container">
                        {slides.map(({ src, alt }, index) => (
                            <div className="embla__slide" key={index}>
                                <div className="embla__parallax">
                                    <div className="embla__parallax__layer">
                                        <img
                                            className="embla__parallax__bg"
                                            src={src}
                                            alt=""
                                            aria-hidden="true"
                                        />
                                        <img
                                            className="embla__parallax__img"
                                            src={src}
                                            alt={alt}
                                            loading="lazy"
                                            style={{ cursor: "zoom-in" }}
                                            onPointerDown={() => { dragDistance.current = 0; }}
                                            onPointerMove={(e) => { dragDistance.current += Math.abs(e.movementX) + Math.abs(e.movementY); }}
                                            onClick={() => { if (dragDistance.current < 5) setLightbox({ src, alt }); }}
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="embla__controls">
                    <button className="embla__button embla__button--prev" onClick={scrollPrev} aria-label="前へ">
                        ‹
                    </button>
                    <button className="embla__button embla__button--next" onClick={scrollNext} aria-label="次へ">
                        ›
                    </button>
                </div>
            </div>
            {lightbox && <Lightbox src={lightbox.src} alt={lightbox.alt} onClose={() => setLightbox(null)} />}
        </>
    );
}
