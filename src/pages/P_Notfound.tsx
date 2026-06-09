import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import KeyVisual from "../components/layout/KeyVisual";
import Breadcrumb from "../components/layout/Breadcrumb";
import notFoundImage from "../assets/images/NotFound.jpg";
import "./P_Notfound.scss";

export default function P_Notfound() {
    return (
        <>
            <KeyVisual compact />
            <main className="notfound-page">
                <Breadcrumb items={[{ label: "404" }]} />

                <motion.div
                    className="notfound"
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                >
                    <div className="notfound__avatar">
                        <img src={notFoundImage} alt="ばぶ宮ちょこみん" />
                    </div>

                    <p className="notfound__code">404</p>
                    <h1 className="notfound__title">ページが見つからないよ〜(´；ω；`)</h1>
                    <p className="notfound__desc">
                        URLが間違っているか、ページが消えちゃったみたい…
                    </p>

                    <div className="notfound__links">
                        <Link to="/" className="notfound__home">
                            トップに戻る
                        </Link>
                    </div>
                </motion.div>
            </main>
        </>
    );
}
