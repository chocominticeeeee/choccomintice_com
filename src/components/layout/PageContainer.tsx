import { useEffect } from "react";
import type { ReactNode } from "react";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Header from "./Header";
import Footer from "./Footer";

interface PageContainerProps {
    navigations: [string, string][];
    id: string;
    content: ReactNode;
    isArticle?: boolean;
}

export default function PageContainer({ navigations, id, content, isArticle }: PageContainerProps) {
    const location = useLocation();
    const isHome = location.pathname === "/";

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location.pathname]);

    return (
        <div id={id} className="PageContainer">
            <Header navigations={navigations} isHome={isHome} />

            <div className="mainWrapper" style={{ paddingTop: isHome ? "0" : "100px" }}>
                <AnimatePresence mode="wait">
                    <motion.div
                        key={location.pathname}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                        style={{ width: "100%", display: "flex", justifyContent: "center" }}
                    >
                        <main className={isArticle ? "isArticle" : ""}>{content}</main>
                    </motion.div>
                </AnimatePresence>
            </div>
            <Footer />
        </div>
    );
}
