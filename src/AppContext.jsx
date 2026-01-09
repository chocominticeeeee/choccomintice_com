// src/contexts/AppContext.jsx
import React, { createContext, useContext, useState } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
    // 共有したい値（例: user, theme, など）
    const [headerProps, setHeaderProps] = useState({ title: "初期タイトル" });

    return <AppContext.Provider value={{ headerProps, setHeaderProps }}>{children}</AppContext.Provider>;
};

export const useAppContext = () => useContext(AppContext);
