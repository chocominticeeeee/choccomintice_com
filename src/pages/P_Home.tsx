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
import deskImg from "../assets/images/ちょこみんのデスク.png";

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
    const deskImgRef = useRef<HTMLImageElement>(null);

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

    useEffect(() => {
        const img = deskImgRef.current;
        if (!img) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("visible");
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.1 },
        );

        observer.observe(img);
        return () => observer.disconnect();
    }, []);

    return (
        <>
            <KeyVisual />
            <main ref={mainRef}>
                <section id="about" className="section--editorial">
                    <div className="section__index">
                        <span className="section__num">01</span>
                        <span className="section__label">About</span>
                    </div>
                    <h2>自己紹介</h2>
                    <MyTwitterCard />
                    <h3>🧐 名前の由来</h3>
                    チョコミントアイスが大好きで、ちょっぴりバブみがあって(？)、 <br />
                    あと「宮」ってかわいい苗字だなぁって思ったからこの名前にしました(*´꒳`*) <br />
                    みんなには「ちょこみん」って呼ばれてます！ <br />
                    <h3>📰 すぺっく</h3>
                    永遠の18歳🌟 <br />
                    社会人で、会社員さんとして夜勤してます🌙 <br />
                    お休みの日はだいたいおうちに引きこもってパソコンの前にいます…。 <br /> <br />
                    人生の半分以上ずっとパソコンとにらめっこしてて、自作パソコンとか、プログラミングとか、 <br />
                    パソコンゲーム、ゲーミングデバイスとか、とにかくパソコン関係は自信あり(๑•̀ㅂ•́)و✧ <br />
                    <h3>🎮 趣味</h3>
                    <h4>🔸音楽鑑賞 </h4>
                    <div>
                        大好きなアーティストさんの音楽をよく聴いてます🎧 <br />
                        ・藍月なくる🪼(@NakuruAitsuki) <br />
                        ・棗いつき⚜(@itsukinatsume) <br />
                        ・nayuta (@7utauta) <br />
                        ・月乃 (@tsuki_nxo) <br />
                        ・Imy (@Imy_official) <br />
                        ・Vivid Lila (@7suzuyami7)
                    </div>
                    <br />
                    <h4>🔸ゲーム</h4>
                    <div>
                        <p>最近よく遊んでるゲームは DeltaForce、APEX、モンハンワールド、CS2だよ〜🎮</p>
                        <p>
                            ハマったゲームは <br /> AVA / OW / タルコフ/ Valorant / SF2 / PUBG <br />
                            The cycle:frontier / osu! / モンハン / PSO2 などなど...
                        </p>
                    </div>
                    <h3>🖥 おしごと</h3>
                    <p>
                        会社員さんをしながら、たまーに副業もしてます！
                        <br />
                        会社ではマネージャーとして、某有名サービスのお問い合わせ受付とかをしてるよ。 <br />
                        社内SEでもあって、WEBマニュアルや社内システム、MongoDB、web-apiまでフルスタックに開発してます⌨
                    </p>
                    <p>
                        副業ではウェブ制作をしており、知り合いから頼まれたときにお仕事させていただいています！
                        <br />
                    </p>
                    <h3>💻 デスク紹介</h3>
                    <p>
                        <ul style={{ paddingLeft: 0 }}>
                            <li>パソコン：Ryzen 7 9800X3D / RTX 4070Ti Super / RAM 64GB</li>
                            <li>マウス：Pulsar X2</li>
                            <li>マウスパッド：Pulsar Superglide-XL </li>
                            <li>キーボード：Razer DeathStalker V2 Pro White</li>
                            <li>オーディオインターフェース：Roland BRIDGE CAST</li>
                            <li>液タブ：XPPEN Artist 22 Plus</li>
                        </ul>
                    </p>
                    <img ref={deskImgRef} className="desk-img" src={deskImg} alt="ちょこみんのデスク" />
                </section>

                <section id="artworks" className="artworks-section full-bleed section--editorial">
                    <div className="artworks-section__head">
                        <div className="section__index">
                            <span className="section__num">02</span>
                            <span className="section__label">Artworks</span>
                        </div>
                        <h2>イラスト</h2>
                        <p className="artworks-section__desc">
                            たまーにお絵描きしてるよ〜🖊
                            <br />
                        </p>
                    </div>
                    {/* <ArtworksCoverflow onSelect={setSelectedImage} /> */}
                    <ArtworksScroll onSelect={setSelectedImage} />
                </section>

                <section id="vrchat" className="vrchat-section section--editorial">
                    <div className="section__index">
                        <span className="section__num">03</span>
                        <span className="section__label">VRChat</span>
                    </div>
                    <h2>VRChat</h2>
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

                <section id="note" className="section--editorial">
                    <div className="section__index">
                        <span className="section__num">04</span>
                        <span className="section__label">Note</span>
                    </div>
                    <h2>note</h2>
                    <p>VRChatでの出来事とか、ちょこっと個人的なニュースを記事に書いてるよ〜🦀(*´꒳`*)</p>
                    <NoteSection />
                </section>

                <section className="section--editorial">
                    <div className="section__index">
                        <span className="section__num">05</span>
                        <span className="section__label">Outro</span>
                    </div>
                    <h2>最後に！</h2>
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
                </section>

                {/* <section className="section--editorial">
                    <div className="section__index">
                        <span className="section__num">06</span>
                        <span className="section__label">Uni Clicker</span>
                    </div>
                    <h2>ウニクリッカー</h2>
                    <p>🦀をクリックしてウニをいっぱい集めちゃおっ</p>
                    <UniClicker />
                </section> */}

                {selectedImage && (
                    <Lightbox src={selectedImage.src} alt={selectedImage.alt} onClose={() => setSelectedImage(null)} />
                )}
            </main>
        </>
    );
}
