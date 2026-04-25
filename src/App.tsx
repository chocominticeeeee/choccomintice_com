import { BrowserRouter, Routes, Route } from "react-router-dom";
import PageContainer from "./components/layout/PageContainer";

import P_Home from "./pages/P_Home";
import P_Vrchat from "./pages/P_Vrchat";
import P_ContactForm from "./pages/P_ContactForm";
import P_Notfound from "./pages/P_Notfound";
import P_Artworks from "./pages/P_Artworks";

type Navigation = [string, string];
type PageEntry = [string, string, React.ReactElement, boolean?];

const pages: PageEntry[] = [
    ["/", "P_Home", <P_Home />],
    ["/Artworks", "P_Artworks", <P_Artworks />],
    ["/Vrchat", "P_Vrchat", <P_Vrchat />],
    ["/ContactForm", "P_ContactForm", <P_ContactForm />],
    ["*", "P_Notfound", <P_Notfound />],
];

const navigations: Navigation[] = [
    ["/", "Home"],
    ["/Artworks", "Artworks"],
    ["/Vrchat", "VRChat"],
    ["/ContactForm", "Contact"],
];

function App() {
    return (
        <BrowserRouter basename="/">
            <Routes>
                {pages.map(([path, pageId, content, isArticle]) => (
                    <Route
                        key={path}
                        path={path}
                        element={
                            <PageContainer
                                navigations={navigations}
                                id={pageId}
                                content={content}
                                isArticle={isArticle}
                            />
                        }
                    />
                ))}
            </Routes>
        </BrowserRouter>
    );
}

export default App;
