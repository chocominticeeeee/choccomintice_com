import { useState } from "react";
import MyTwitterCard from "../components/MyTwitterCard";
import ArtworksCarousel from "../components/ArtworksCarousel";
import Lightbox from "../components/Lightbox";
import "./P_Home.scss";
import "../components/layout/Header.scss";

import KeyVisual from "../components/layout/KeyVisual";

interface ImageModule {
    default: string;
}

interface SelectedImage {
    src: string;
    alt: string;
}

const VRChatImages = import.meta.glob<ImageModule>("../assets/images/VRChat/Resize/Resize/*", { eager: true });

export default function P_Home() {
    const [selectedImage, setSelectedImage] = useState<SelectedImage | null>(null);

    return (
        <>
            <KeyVisual />

            <div className="home-content-wrapper">
                <main>
                    <MyTwitterCard />
                    <section>
                        <h2>🧐 名前の由来</h2>
                        ばぶ宮ちょこみんの由来はチョコミントアイスが好き、バブみがある(？)、 <br />
                        〇宮ってかわいい苗字だなって思ったからこの名前になりました🍼🌱 <br />
                        「ちょこみん」ってよく呼ばれてます！ <br />
                    </section>

                    <section>
                        <h2>📰 すぺっく</h2>
                        永遠の18歳です🌟 <br />
                        一般通過社会人、会社員で夜勤してます🌙 <br />
                        なのでお仕事の日は朝方に暇してることが多いです！ <br />
                        基本休みの日は家に引きこもってパソコンの前にいます...。 <br /> <br />
                        人生の半分以上はパソコンとにらめっこしてて、自作パソコンだったり、プログラミングだったり、{" "}
                        <br />
                        パソコンゲーム、ゲーミングデバイスとかとにかくパソコン関係に強いです💻 <br />
                        ※実はこのサイトもReactで作りました
                    </section>

                    <section>
                        <h2>🎮 趣味</h2>
                        <ul>
                            <li>
                                <p>① VRChat</p>
                                <div>
                                    25/03/18から始めました！ PCVR + Pico4 + フルトラでやってます。 <br />
                                    リアルフレンドがほぼいないくて、ネッ友もあまりいないので友達がたくさんほしいなって思ってはじめました！{" "}
                                    <br />
                                    大体JPTかプラべにいることが多いです。 <br />
                                    <br />
                                    ② 音楽鑑賞 <br />
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
                                <p>③ イラスト</p>
                                <div>
                                    趣味絵描きです！ <br />
                                    いつかイラストレーターになれたらいいな～。 <br />
                                </div>
                                <br />
                            </li>
                            <li>
                                <p>④ ゲーム</p>
                                <div>
                                    最近はあまりしてません。。。ハマったゲームは <br />
                                    AVA / CS2 / タルコフ/ Valorant / SF2 / PUBG / APEX <br />
                                    The cycle:frontier / osu! / モンハン / PSO2 などなど... <br />
                                </div>
                                <br />
                            </li>
                        </ul>
                    </section>

                    <section>
                        <h2>🖥 おしごと</h2>
                        <p>
                            今は会社員とたまに副業でウェブ制作をしています。 <br />
                            会社員のほうの仕事内容はかなり特殊で詳しくは話せませんが、 <br />
                            某有名サービスのお問い合わせの受付などを行っています。 <br />
                            <br />
                        </p>
                        <p>
                            社内SEとしても仕事をしていて、自社用のWebマニュアルの作成やシステム開発、 <br />
                            データベースを使用してログを管理するウェブアプリの開発などやってたりします⌨ <br />
                            <br />
                        </p>
                        <p>
                            副業は自分からは営業はしていませんが、 <br />
                            知り合いから頼まれたときにお仕事させていただいています！ <br />
                            小規模であれば依頼は受け付けているので気軽にご相談してみてくれると嬉しいです。 <br />
                        </p>
                    </section>

                    <section className="artworks-section">
                        <h2>🎨 Artworks</h2>
                        <p className="artworks-section__desc">たまにお絵描きしてます🖊</p>
                        <ArtworksCarousel />
                    </section>

                    <section className="vrchat-section">
                        <h2>🥽 VRChat</h2>
                        <div className="vrchat-section__intro">
                            <p>
                                25/03/18から始めました！ PCVR + Pico4 + フルトラでやってます。
                                <br />
                                リアルフレンドがほぼいないくて、ネッ友もあまりいないので友達がたくさんほしいなって思ってはじめました！
                                <br />
                                大体JPTかプラべにいることが多いです。
                            </p>
                            <p>
                                かわいいアバターやワールドを巡るのが好きです。
                                <br />
                                写真を撮るのも好きなので、もっと腕を磨いていきたいですね📸
                            </p>
                        </div>

                        <h2 className="vrchat-section__memories-title">📸 Memories</h2>
                        <div className="vrchat-section__gallery-scroll">
                            <div className="vrchat-section__gallery">
                                {Object.entries(VRChatImages)
                                    .reverse()
                                    .map(([, module], index) => {
                                        const url = module.default;
                                        return (
                                            <div
                                                className="photo-card"
                                                key={index}
                                                onClick={() => setSelectedImage({ src: url, alt: "VRChat Photo" })}
                                            >
                                                <img src={url} alt="VRChat Photo" loading="lazy" />
                                            </div>
                                        );
                                    })}
                                {Object.keys(VRChatImages).length === 0 && (
                                    <p className="no-images">No images found.</p>
                                )}
                            </div>
                        </div>
                    </section>
                    {selectedImage && (
                        <Lightbox
                            src={selectedImage.src}
                            alt={selectedImage.alt}
                            onClose={() => setSelectedImage(null)}
                        />
                    )}

                    <section>
                        <h2>👋 最後に！</h2>
                        ここまで読んでくれてありがとうございました！ <br />
                        基本的にフォロバ100％なので気軽にフォローしてからんでいただけると嬉しいです✨ <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        全部読むくらい興味があるんだね...？
                        <br />
                        鍵垢フォローしてみてね。
                        <a href="https://x.com/Choccomintice_" target="_blank" rel="noopener noreferrer">
                            @Choccomintice_ 🗝
                        </a>
                    </section>
                </main>
            </div>
        </>
    );
}
