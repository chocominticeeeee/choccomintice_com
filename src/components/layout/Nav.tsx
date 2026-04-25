import { useState } from "react";
import "./Nav.scss";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

interface NavProps {
    navigations: [string, string][];
    setIsOpen?: (open: boolean) => void;
}

export default function Nav({ navigations, setIsOpen }: NavProps) {
    const [hoveredPath, setHoveredPath] = useState<string | null>(null);
    const location = useLocation();

    return (
        <nav className="navigationBar">
            <ul onMouseLeave={() => setHoveredPath(null)}>
                {navigations.map(([path, name]) => {
                    const isActive = location.pathname === path;

                    return (
                        <li
                            key={path}
                            onClick={() => {
                                if (setIsOpen) setIsOpen(false);
                            }}
                            onMouseEnter={() => setHoveredPath(path)}
                            className={isActive ? "active" : ""}
                        >
                            <Link to={path} className="nav-link">
                                {name}
                                {hoveredPath === path && (
                                    <motion.div
                                        layoutId="nav-hover"
                                        className="nav-hover-bg"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                    />
                                )}
                                {isActive && !hoveredPath && (
                                    <motion.div
                                        layoutId="nav-active"
                                        className="nav-active-indicator"
                                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                    />
                                )}
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
}
