import { useState, useEffect, useRef } from "react";
import MyTwitterCard from "../components/MyTwitterCard";
import ArtworksCarousel from "../components/ArtworksCarousel";
import Lightbox from "../components/Lightbox";
import "./P_Home.scss";
import KeyVisual from "../components/layout/KeyVisual";
import Uni from "../components/Uni";

interface ImageModule {
    default: string;
}

interface SelectedImage {
    src: string;
    alt: string;
}

const VRChatGlob = import.meta.glob<ImageModule>("../assets/images/VRChat/*");

export default function P_Home() {
    const [selectedImage, setSelectedImage] = useState<SelectedImage | null>(null);
    const [vrChatUrls, setVrChatUrls] = useState<string[]>([]);
    const mainRef = useRef<HTMLElement>(null);

    useEffect(() => {
        Promise.all(
            Object.entries(VRChatGlob)
                .reverse()
                .map(async ([, loader]) => (await loader()).default),
        ).then(setVrChatUrls);
    }, []);

    useEffect(() => {
        const sections = mainRef.current?.querySelectorAll("section");
        if (!sections) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("visible");
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.05 },
        );

        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                sections[0]?.classList.add("visible");
            });
        });
        sections.forEach((section, i) => {
            if (i !== 0) observer.observe(section);
        });
        return () => observer.disconnect();
    }, []);

    return (
        <>
            <KeyVisual />
            <main ref={mainRef}>
                <section>
                    <h2>💬 自己紹介</h2>
                    <MyTwitterCard />
                    <h3>🧐 名前の由来</h3>
                    チョコミントアイスが好き、バブみがある(？)、 <br />
                    あと宮ってかわいい苗字だなって思ったからこの名前になりました🍼🌱 <br />
                    「ちょこみん」ってよく呼ばれてます！ <br />
                    <h3>📰 すぺっく</h3>
                    永遠の18歳です🌟 <br />
                    一般通過社会人、会社員で夜勤してます🌙 <br />
                    なのでお仕事の日は朝方に暇してることが多いです！ <br />
                    基本休みの日は家に引きこもってパソコンの前にいます...。 <br /> <br />
                    人生の半分以上はパソコンとにらめっこしてて、自作パソコンだったり、プログラミングだったり、 <br />
                    パソコンゲーム、ゲーミングデバイスとかとにかくパソコン関係に強いです💻 <br />
                    <h3>🎮 趣味</h3>
                    <ul>
                        <li>
                            <h4>① VRChat</h4>
                            <p>
                                VRChatは生活の一部っていうくらいでここには書ききれないので、詳しくは
                                <a href="#vrchat">こっち</a>をみてね！
                            </p>
                        </li>

                        <li>
                            <h4>② 音楽鑑賞 </h4>
                            <div>
                                好きなアーティストの音楽をよく聴いてます。 <br />
                                ・藍月なくる🪼(@NakuruAitsuki) <br />
                                ・棗いつき⚜(@itsukinatsume) <br />
                                ・nayuta (@7utauta) <br />
                                ・月乃 (@tsuki_nxo) <br />
                                ・Imy (@Imy_official) <br />
                            </div>
                            <br />
                        </li>

                        <li>
                            <h4>③ イラスト</h4>
                            <div>
                                <p>
                                    趣味絵描きです！ <br />
                                    いつかイラストレーターになれたらいいな～。
                                </p>
                                <p>
                                    本当に気まぐれで描きたい！っていう衝動にかられたときにペンを握ります...✒
                                    <br />
                                    そのくせずっとクリスタ契約し続けているし、無駄にでかい液タブで描いてます✍
                                </p>
                            </div>
                            <br />
                        </li>
                        <li>
                            <h4>④ ゲーム</h4>
                            <div>
                                <p>最近よく遊んでるゲームはAPEX、モンハンワールド、CS2、OWです！</p>
                                <p>
                                    ハマったゲームは <br /> AVA / CS2 / タルコフ/ Valorant / SF2 / PUBG / APEX <br />
                                    The cycle:frontier / osu! / モンハン / PSO2 などなど...
                                </p>
                            </div>
                            <br />
                        </li>
                    </ul>
                    <h3>🖥 おしごと</h3>
                    <p>
                        会社員とたまに副業でウェブ制作をしています。 <br />
                        会社員のほうの仕事内容はかなり特殊で詳しくは話せませんが、
                        某有名サービスのお問い合わせの受付などを行っています。 <br />
                        <br />
                    </p>
                    <p>
                        社内SEとしても仕事をしていて、自社用のWebマニュアルの作成やシステム開発、 <br />
                        データベースを使用してログを管理するウェブアプリの開発などやってたりします⌨ <br />
                        <br />
                    </p>
                    <p>
                        副業は自分からは営業はしていませんが、 知り合いから頼まれたときにお仕事させていただいています！
                        <br />
                        小規模であれば依頼は受け付けているので気軽にご相談してみてくれると嬉しいです。 <br />
                    </p>
                </section>

                <section className="artworks-section">
                    <h2>🎨 Artworks</h2>
                    <p className="artworks-section__desc">たまにお絵描きしてます🖊</p>
                    <ArtworksCarousel startIndex={1} />
                </section>

                <section id="vrchat" className="vrchat-section">
                    <h2>🥽 VRChat</h2>
                    <div className="vrchat-section__intro">
                        <p>25/03/18～ PCVR + Pico4 + フルトラであそんでます！</p>
                        <p>
                            リアルフレンドがほぼいないくて、ネッ友もあまりいないので友達がたくさんほしいなって思ってはじめました！
                            <br />
                            大体JPTかプラべにいることが多いです。
                        </p>
                        <p>なでなでとV睡が好きで、普段はJPTかプラべにいることが多いです。</p>
                    </div>

                    <h2 className="vrchat-section__memories-title">📸 Memories</h2>
                    <div className="vrchat-section__gallery-scroll">
                        <div className="vrchat-section__gallery">
                            {vrChatUrls.map((url, index) => (
                                <div
                                    className="photo-card"
                                    key={index}
                                    onClick={() => window.innerWidth > 950 && setSelectedImage({ src: url, alt: "VRChat Photo" })}
                                >
                                    <img src={url} alt="VRChat Photo" loading="lazy" />
                                </div>
                            ))}
                            {Object.keys(VRChatGlob).length === 0 && <p className="no-images">No images found.</p>}
                        </div>
                    </div>
                </section>
                {selectedImage && (
                    <Lightbox src={selectedImage.src} alt={selectedImage.alt} onClose={() => setSelectedImage(null)} />
                )}

                <section>
                    <h2>👋 最後に！</h2>
                    <p>
                        ここまで読んでくれてありがとうございました！ <br />
                        基本的にフォロバ100％なので気軽にフォローしてからんでいただけると嬉しいです✨
                    </p>
                    <p>
                        全部読むくらい興味があるんだね...？ 鍵垢フォローしてみてね。
                        <a href="https://x.com/Choccomintice_" target="_blank" rel="noopener noreferrer">
                            @Choccomintice_ 🗝
                        </a>
                    </p>
                    <p>
                        <Uni />
                    </p>
                </section>
            </main>
        </>
    );
}
