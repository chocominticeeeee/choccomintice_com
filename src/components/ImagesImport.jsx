export default function ImagesImport({ images, onImageClick }) {
    return (
        <div className="ImagesImport">
            {Object.entries(images)
                .reverse()
                .map(([path, module], index) => {
                    const url = module.default;
                    const fileName =
                        decodeURIComponent(url.split("/").pop()).split("_")[1]?.replace(".jpg", "") || "Artwork";
                    return (
                        <div
                            className="artwork"
                            key={index}
                            onClick={() => onImageClick({ src: url, alt: fileName })}
                        >
                            <img src={url} alt={fileName} loading="lazy" />
                        </div>
                    );
                })}
        </div>
    );
}
