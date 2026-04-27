import { useEffect } from "react";
import { createPortal } from "react-dom";
import "./Lightbox.scss";

interface LightboxProps {
    src: string;
    alt: string;
    onClose: () => void;
}

export default function Lightbox({ src, alt, onClose }: LightboxProps) {
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                onClose();
            }
        };
        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [onClose]);

    return createPortal(
        <div className="lightbox-overlay" onClick={onClose} aria-modal="true" role="dialog">
            <button className="lightbox-close" onClick={onClose} aria-label="閉じる">✕</button>
            <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
                <img src={src} alt={alt} />
            </div>
        </div>,
        document.body
    );
}
