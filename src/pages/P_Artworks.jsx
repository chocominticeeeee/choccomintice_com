import React, { useState } from "react";
import "./P_Artworks.scss";
import PageTitle from "../components/PageTitle";
import Lightbox from "../components/Lightbox";
import ImagesImport from "../components/ImagesImport";

const ArtworksImages = import.meta.glob("../assets/images/Artworks/Resize/*", { eager: true });
const FavoritesImages = import.meta.glob("../assets/images/Artworks/Favorites/*", { eager: true });

export default function P_Artworks() {
    const [selectedImage, setSelectedImage] = useState(null);

    return (
        <div id="P_Artworks">
            <PageTitle title="Artworks" description={"たまにお絵描きしてます🖊お気に入りのイラストたちです。"} />
            <div className="artworks">
                <ImagesImport images={FavoritesImages} onImageClick={setSelectedImage} />
            </div>

            <br />
            <hr />
            <br />

            <div className="artworks">
                <ImagesImport images={ArtworksImages} onImageClick={setSelectedImage} />
            </div>
            {selectedImage && (
                <Lightbox src={selectedImage.src} alt={selectedImage.alt} onClose={() => setSelectedImage(null)} />
            )}
        </div>
    );
}
