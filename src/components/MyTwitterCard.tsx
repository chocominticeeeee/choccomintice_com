import { motion } from "framer-motion";
import { AVATAR_URL, HEADER_URL } from "../CONFIG";
import "./MyTwitterCard.scss";
import { Cake, Link as LinkIcon, CalendarDays } from "lucide-react";
import bannerImg from "../assets/images/header.jpg";
import twitterIcon from "../assets/images/MyTwitterCard/twitter.png";
import youtubeIcon from "../assets/images/MyTwitterCard/youtube.png";
import marshmallowIcon from "../assets/images/MyTwitterCard/ましゅまろ.png";
import noteIcon from "../assets/images/MyTwitterCard/note.png";
import pixivIcon from "../assets/images/MyTwitterCard/pixiv.png";
import boothIcon from "../assets/images/MyTwitterCard/booth.png";

const socials = [
    { name: "Twitter", icon: twitterIcon, href: "https://x.com/Choccomintice_" },
    { name: "Youtube", icon: youtubeIcon, href: "https://www.youtube.com/@choccomintice/featured" },
    { name: "ましゅまろ", icon: marshmallowIcon, href: "https://marshmallow-qa.com/3hklej66hlyeldi?t=vroIjo" },
    { name: "note", icon: noteIcon, href: "https://note.com/choccomintice" },
    { name: "Pixiv", icon: pixivIcon, href: "https://www.pixiv.net/users/93100272" },
    { name: "BOOTH", icon: boothIcon, href: "https://choccomintice.booth.pm/" },
];

const card = {
    hidden: { opacity: 0, y: 40 },
    show: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], staggerChildren: 0.06, delayChildren: 0.15 },
    },
};

const item = {
    hidden: { opacity: 0, y: 14 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

export default function MyTwitterCard() {
    return (
        <motion.div
            id="MyTwitterCard"
            variants={card}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
        >
            {/* バナー – ふんわりした帯にグラデの光沢が流れる */}
            <div className="mtc-banner">
                <img src={bannerImg ?? HEADER_URL} alt="" className="mtc-banner__img" />
                <div className="mtc-banner__sheen" />
            </div>

            <div className="mtc-body">
                {/* バナーに重なるアバター */}
                <motion.a
                    href="https://x.com/Choccomintice"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mtc-avatar"
                    variants={item}
                    whileHover={{ scale: 1.06, rotate: 3 }}
                    transition={{ type: "spring", stiffness: 300, damping: 18 }}
                >
                    <img src={AVATAR_URL} alt="ばぶ宮ちょこみん" />
                </motion.a>

                <motion.div className="mtc-head" variants={item}>
                    <div className="mtc-head__name-row">
                        <h3 className="mtc-name">ばぶ宮ちょこみん🍼🌱</h3>
                        <span className="mtc-badge">超健康VRChatter</span>
                    </div>
                    <p className="mtc-handle">@Choccomintice</p>
                </motion.div>

                <motion.div className="mtc-meta" variants={item}>
                    <span className="mtc-meta__item mtc-meta__item--link">
                        <LinkIcon />
                        <a href="http://lit.link/Choccomintice" target="_blank" rel="noopener noreferrer">
                            lit.link/Choccomintice
                        </a>
                    </span>
                    <span className="mtc-meta__item">
                        <Cake />
                        1998年6月14日
                    </span>
                    <span className="mtc-meta__item">
                        <CalendarDays />
                        2015年3月からX利用
                    </span>
                </motion.div>

                <motion.div className="mtc-socials" variants={item}>
                    {socials.map((s) => (
                        <motion.a
                            key={s.name}
                            href={s.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mtc-social"
                            variants={item}
                            whileHover={{ y: -4, scale: 1.04 }}
                            whileTap={{ scale: 0.96 }}
                            transition={{ type: "spring", stiffness: 350, damping: 20 }}
                        >
                            <img src={s.icon} alt="" className="mtc-social__icon" />
                            {s.name}
                        </motion.a>
                    ))}
                </motion.div>
            </div>
        </motion.div>
    );
}
