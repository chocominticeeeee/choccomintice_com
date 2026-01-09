import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import "./Lightbox.scss";

export default function Lightbox({ src, alt, onClose }) {
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "Escape") {
                onClose();
            }
        };
        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [onClose]);

    return createPortal(
        <div className="lightbox-overlay" onClick={onClose} aria-modal="true" role="dialog">
            <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
                <img src={src} alt={alt} />
            </div>
        </div>,
        document.body
    );
}
