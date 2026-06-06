import { motion, useScroll, useSpring } from "framer-motion";
import "./ScrollProgress.scss";

/**
 * ページ最上部に貼り付くスクロール進捗バー。
 * スクロール量に応じて左から伸び、ばね補間でぬるっと追従する。
 */
export default function ScrollProgress() {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 120,
        damping: 24,
        restDelta: 0.001,
    });

    return <motion.div className="scroll-progress" style={{ scaleX }} aria-hidden="true" />;
}
