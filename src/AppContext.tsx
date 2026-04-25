import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

interface HeaderProps {
    title: string;
}

interface AppContextValue {
    headerProps: HeaderProps;
    setHeaderProps: React.Dispatch<React.SetStateAction<HeaderProps>>;
}

const AppContext = createContext<AppContextValue | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
    const [headerProps, setHeaderProps] = useState<HeaderProps>({ title: "初期タイトル" });

    return <AppContext.Provider value={{ headerProps, setHeaderProps }}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
    const ctx = useContext(AppContext);
    if (!ctx) throw new Error("useAppContext must be used within AppProvider");
    return ctx;
};
