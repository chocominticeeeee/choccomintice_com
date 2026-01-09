import { BrowserRouter, Routes, Route } from "react-router-dom";
import PageContainer from "./components/layout/PageContainer";

import P_Home from "./pages/P_Home";
import P_Vrchat from "./pages/P_Vrchat";
import P_ContactForm from "./pages/P_ContactForm";
import P_Notfound from "./pages/P_Notfound";
import P_Note from "./pages/P_Note";

// images
import noteIcon from "./assets/images/noteIcon.png";
import P_Artworks from "./pages/P_Artworks";

const pages = [
    // ["パス","ページID",コンテンツ,"isArticle"(記事なら)],
    ["/", "P_Home", <P_Home />],
    ["/Note", "P_Note", <P_Note />],
    ["/Artworks", "P_Artworks", <P_Artworks />],
    ["/Vrchat", "P_Vrchat", <P_Vrchat />],
    ["/ContactForm", "P_ContactForm", <P_ContactForm />],
    // NOT FOUND
    ["*", "P_Notfound", <P_Notfound />],
];

const navigations = [
    ["/", "Home"],
    ["/Note", "note"],
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
