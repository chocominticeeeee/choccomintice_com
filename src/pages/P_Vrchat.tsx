import { useState } from "react";
import "./P_Vrchat.scss";
import PageTitle from "../components/PageTitle";
import Lightbox from "../components/Lightbox";

interface ImageModule {
    default: string;
}

interface SelectedImage {
    src: string;
    alt: string;
}

const VRChatImages = import.meta.glob<ImageModule>("../assets/images/VRChat/Resize/Resize/*", { eager: true });

export default function P_Vrchat() {
    const [selectedImage, setSelectedImage] = useState<SelectedImage | null>(null);

    return (
        <div id="P_Vrchat">
            <PageTitle title="VRChat" />
            <div className="vrchat-content">
                <section className="intro">
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
                </section>

                <section className="gallery">
                    <h3>Memories</h3>
                    <div className="gallery-grid">
                        {Object.entries(VRChatImages)
                            .reverse()
                            .map(([, module], index) => {
                                const url = module.default;
                                const fileName = "VRChat Photo";
                                return (
                                    <div
                                        className="photo-card"
                                        key={index}
                                        onClick={() => setSelectedImage({ src: url, alt: fileName })}
                                    >
                                        <img src={url} alt={fileName} loading="lazy" />
                                    </div>
                                );
                            })}
                        {Object.keys(VRChatImages).length === 0 && (
                            <p className="no-images">No images found in assets/images/VRChat directory.</p>
                        )}
                    </div>
                </section>
            </div>

            {selectedImage && (
                <Lightbox src={selectedImage.src} alt={selectedImage.alt} onClose={() => setSelectedImage(null)} />
            )}
        </div>
    );
}
