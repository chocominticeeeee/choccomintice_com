import { useState, useEffect, useRef } from "react";
import MyTwitterCard from "../components/MyTwitterCard";
import ArtworksScroll from "../components/ArtworksScroll";
import Lightbox from "../components/Lightbox";
import "./P_Home.scss";
import KeyVisual from "../components/layout/KeyVisual";
import Uni from "../components/Uni";
import NoteSection from "../components/NoteSection";
import UniClicker from "../components/UniClicker/UniClicker";
import VRChatGallery from "../components/VRChatGallery";

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
                            <h4>🔸音楽鑑賞 </h4>
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
                            <h4>🔸ゲーム</h4>
                            <div>
                                <p>最近よく遊んでるゲームは DeltaForce、APEX、モンハンワールド、CS2です！</p>
                                <p>
                                    ハマったゲームは <br /> AVA / OW / タルコフ/ Valorant / SF2 / PUBG <br />
                                    The cycle:frontier / osu! / モンハン / PSO2 などなど...
                                </p>
                            </div>
                            <br />
                        </li>
                    </ul>
                    <h3>🖥 おしごと</h3>
                    <p>
                        会社員とたまに副業をしています。 <br />
                        会社員としてはマネージャーとして、某有名サービスのお問い合わせの受付などを行っています。 <br />
                        社内SEでもありWEBマニュアル、社内システム、 MongoDB、web-apiなどフルスタックに開発しています⌨
                    </p>
                    <p>
                        副業ではウェブ制作をしており、知り合いから頼まれたときにお仕事させていただいています！
                        <br />
                        小規模であれば依頼は受け付けているので、気軽にご相談してみてくれると嬉しいです。 <br />
                    </p>
                </section>

                <section className="artworks-section full-bleed">
                    <div className="artworks-section__head">
                        <h2>🎨 Artworks</h2>
                        <p className="artworks-section__desc">たまにお絵描きしてます🖊 横にスクロール →</p>
                    </div>
                    <ArtworksScroll onSelect={setSelectedImage} />
                </section>

                <section id="vrchat" className="vrchat-section">
                    <h2>🥽 VRChat</h2>
                    <div className="vrchat-section__intro">
                        <p>25/03/18～ PCVR + Pico4 + フルトラであそんでます！</p>
                        <p>
                            始めたきっかけはリアルの友達いないくて、ネッ友も少ないので友達がたくさんほしいなって思ったからです；；
                        </p>
                        <p>なでなでとV睡が好きで、普段はJPTかプラべにいることが多いです。</p>
                        <p>
                            大人数のインスタンスは自分の存在感が薄くなっていくのを感じるのが苦手でほとんど行くことがないです。
                            <br />
                            基本的に1対1でコミュニケーションすることがほとんどです。（フレ+に入れない...）
                        </p>
                        <p>愛莉ちゃん、しなのちゃんをメインで使っています🐈</p>
                    </div>
                    <h2 className="vrchat-section__memories-title">🧩 VRChat非公式Web拡張</h2>
                    <p>
                        VRChatの公式サイトを見やすく、使いやすくする拡張機能をchromeストアで公開してます！
                        良かったら使ってみてね！👇
                        <br />
                        <a
                            href="https://chocominticeeeee.github.io/VRChat_Unofficial_Web_Extension_Web/#/"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            VRChat非公式Web拡張 公式サイト
                        </a>
                    </p>

                    <h2 className="vrchat-section__memories-title">📸 Memories</h2>
                    <p>たくさんの思い出たち。</p>
                    <VRChatGallery
                        urls={vrChatUrls}
                        totalCount={Object.keys(VRChatGlob).length}
                        onSelect={setSelectedImage}
                    />
                </section>

                <section>
                    <h2>📒 note</h2>
                    <p>VRChatでの出来事や個人的なニュースを記事に書いています🦀</p>
                    <NoteSection />
                </section>

                <section>
                    <h2>👋 最後に！</h2>
                    <p>
                        ここまで読んでくれてありがとう！(*..)” <br />
                        Twitterフォロバ100％なので気軽にフォローして絡んでくれたら嬉しいです✨
                    </p>
                    <p>
                        普段夜勤なので時間合うタイミングが少ないんですけど、ぶいちゃのフレンド、ゲームしてくれる人も募集してます。
                        <br />
                        もし遊びたいよ～！って人いたらDMで声かけてくれたらDiscordサーバー招待しますので一緒にあそぼー！🎮
                    </p>
                    <p>
                        全部読むくらい興味があるんだね...？ 鍵垢フォローしてみてね👉
                        <a href="https://x.com/Choccomintice_" target="_blank" rel="noopener noreferrer">
                            @Choccomintice_ 🗝
                        </a>
                    </p>
                    <Uni />
                </section>

                <section>
                    <h2>🦀 ウニクリッカー</h2>
                    <p>🦀をクリックしてウニを集めよう！</p>
                    <UniClicker />
                </section>

                {selectedImage && (
                    <Lightbox src={selectedImage.src} alt={selectedImage.alt} onClose={() => setSelectedImage(null)} />
                )}
            </main>
        </>
    );
}
