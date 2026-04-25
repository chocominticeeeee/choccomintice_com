import { slide as Menu } from "react-burger-menu";
import { useState, cloneElement } from "react";
import type { ReactElement } from "react";
import "./HamburgerMenu.scss";

interface NavProps {
    setIsOpen?: (open: boolean) => void;
}

interface HamburgerMenuProps {
    nav: ReactElement<NavProps>;
}

export default function HamburgerMenu({ nav }: HamburgerMenuProps) {
    const [isOpen, setIsOpen] = useState(false);

    const handleStateChange = (state: { isOpen: boolean }) => {
        setIsOpen(state.isOpen);
    };

    const navWithProps = cloneElement(nav, { setIsOpen });

    return (
        <Menu isOpen={isOpen} onStateChange={handleStateChange} width={230} right>
            <div className="hamburger-menu">{navWithProps}</div>
        </Menu>
    );
}
