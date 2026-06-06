import { useEffect, useRef, useState } from "react";
import { useMotionValue, useSpring, useMotionValueEvent } from "framer-motion";
// Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperClass } from "swiper";
// Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
// required modules
import { EffectCoverflow, Pagination } from "swiper/modules";

import "./ArtworksCoverflow.scss";

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
    /** モバイル判定のブレークポイント (px) */
    mobileBreakpoint?: number;
}

/**
 * Swiper の coverflow エフェクトを使った作品カルーセル。
 * ArtworksScroll と同様、デスクトップではセクションを画面に固定し、
 * ページの縦スクロール進捗を Swiper の進捗(setProgress)に変換して
 * カードを自動的に横へ進める。モバイルではネイティブのスワイプに切替。
 */
export default function ArtworksCoverflow({ onSelect, mobileBreakpoint = 768 }: Props) {
    const [works, setWorks] = useState<Artwork[]>([]);
    const [isMobile, setIsMobile] = useState(false);
    const targetRef = useRef<HTMLDivElement>(null);
    const swiperRef = useRef<SwiperClass | null>(null);

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

    useEffect(() => {
        const mq = window.matchMedia(`(max-width: ${mobileBreakpoint}px)`);
        const update = () => setIsMobile(mq.matches);
        update();
        mq.addEventListener("change", update);
        return () => mq.removeEventListener("change", update);
    }, [mobileBreakpoint]);

    // 進捗は wrap の位置から自前で計算する（framer の useScroll offset は
    // sticky 固定区間に正確にクランプできず、固定前後でも動いてしまうため）。
    const rawProgress = useMotionValue(0);
    // 離散的なホイール入力でカクつかないよう進捗をスプリングで滑らかにする
    const smoothProgress = useSpring(rawProgress, {
        stiffness: 80,
        damping: 20,
        mass: 0.4,
    });

    // wrap の上端が画面上端に来た瞬間=0、wrap 下端が画面下端に来た瞬間=1。
    // これが sticky が固定されている区間そのものなので、固定前後は 0/1 にクランプされ動かない。
    useEffect(() => {
        if (isMobile) return;
        const el = targetRef.current;
        if (!el) return;
        let raf = 0;
        const onScroll = () => {
            if (raf) return;
            raf = requestAnimationFrame(() => {
                raf = 0;
                const rect = el.getBoundingClientRect();
                const total = rect.height - window.innerHeight; // 固定が続く距離
                const scrolled = -rect.top; // wrap 上端が画面上端より上に出た量
                const p = total > 0 ? Math.min(Math.max(scrolled / total, 0), 1) : 0;
                rawProgress.set(p);
            });
        };
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", onScroll);
        return () => {
            window.removeEventListener("scroll", onScroll);
            window.removeEventListener("resize", onScroll);
            if (raf) cancelAnimationFrame(raf);
        };
    }, [isMobile, rawProgress, works.length]);

    // 進捗(0→1)を Swiper 全体の進捗に渡す。
    // setProgress(0)=先頭スライドが中央、setProgress(1)=末尾スライドが中央。
    useMotionValueEvent(smoothProgress, "change", (p) => {
        if (!isMobile) swiperRef.current?.setProgress(p, 0);
    });

    if (works.length === 0) return null;

    const swiper = (
        <Swiper
            onSwiper={(s) => {
                swiperRef.current = s;
            }}
            effect={"coverflow"}
            grabCursor={isMobile}
            // デスクトップは縦スクロール連動で動かすため、ドラッグ操作は無効化
            allowTouchMove={isMobile}
            centeredSlides={true}
            slidesPerView={"auto"}
            coverflowEffect={{
                rotate: 50,
                stretch: 0,
                depth: 100,
                modifier: 1,
                slideShadows: true,
            }}
            pagination={true}
            modules={[EffectCoverflow, Pagination]}
            className="artworks-coverflow"
        >
            {works.map((work, i) => (
                <SwiperSlide key={i} className="artworks-coverflow__slide">
                    <img
                        src={work.src}
                        alt={work.title}
                        loading="lazy"
                        onClick={() =>
                            window.innerWidth > 950 &&
                            onSelect?.({ src: work.src, alt: work.title })
                        }
                    />
                    {work.title && (
                        <span className="artworks-coverflow__title">{work.title}</span>
                    )}
                </SwiperSlide>
            ))}
        </Swiper>
    );

    if (isMobile) {
        return <div className="artworks-coverflow-wrap artworks-coverflow-wrap--mobile">{swiper}</div>;
    }

    return (
        <div
            className="artworks-coverflow-wrap"
            ref={targetRef}
            // スライド枚数ぶんのスクロール空間を確保（縦スクロール量 → 横移動量）
            style={{ height: `${works.length * 100}vh` }}
        >
            <div className="artworks-coverflow-wrap__sticky">{swiper}</div>
        </div>
    );
}
