import { slide as Menu } from "react-burger-menu";
import React, { useState } from "react";
import "./HamburgerMenu.scss";

export default function HamburgerMenu({ nav }) {
    const [isOpen, setIsOpen] = useState(false);

    // メニューの開閉状態を検知してstateを更新
    const handleStateChange = (state) => {
        setIsOpen(state.isOpen);
    };

    // navにsetIsOpenを渡す（navがコンポーネントの場合）
    const navWithProps = React.cloneElement(nav, { setIsOpen });

    return (
        <Menu isOpen={isOpen} onStateChange={handleStateChange} width={230} right>
            <div className="hamburger-menu">{navWithProps}</div>
        </Menu>
    );
}
