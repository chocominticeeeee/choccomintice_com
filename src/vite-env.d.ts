/// <reference types="vite/client" />

declare module "*.jpg" {
    const src: string;
    export default src;
}
declare module "*.png" {
    const src: string;
    export default src;
}
declare module "*.svg" {
    const src: string;
    export default src;
}

declare module "react-burger-menu" {
    import { ComponentType, ReactNode } from "react";
    interface MenuProps {
        isOpen?: boolean;
        onStateChange?: (state: { isOpen: boolean }) => void;
        width?: number | string;
        right?: boolean;
        children?: ReactNode;
        [key: string]: unknown;
    }
    export const slide: ComponentType<MenuProps>;
    export const bubble: ComponentType<MenuProps>;
    export const elastic: ComponentType<MenuProps>;
    export const push: ComponentType<MenuProps>;
    export const pushRotate: ComponentType<MenuProps>;
    export const scaleDown: ComponentType<MenuProps>;
    export const scaleRotate: ComponentType<MenuProps>;
    export const fallDown: ComponentType<MenuProps>;
    export const reveal: ComponentType<MenuProps>;
    export const stack: ComponentType<MenuProps>;
}
