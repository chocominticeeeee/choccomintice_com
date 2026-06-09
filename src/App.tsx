import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from "./components/layout/Footer";
import FloatingBackground from "./components/FloatingBackground";
import ScrollProgress from "./components/ScrollProgress";
import ScrollToTop from "./components/ScrollToTop";
import P_Home from "./pages/P_Home";
import P_note from "./pages/P_note";
import P_Artworks from "./pages/P_Artworks";
import P_Notfound from "./pages/P_Notfound";

function App() {
    return (
        <BrowserRouter basename="/">
            <ScrollToTop />
            <FloatingBackground />
            <ScrollProgress />
            <Routes>
                <Route path="/" element={<P_Home />} />
                <Route path="/note" element={<P_note />} />
                <Route path="/artworks" element={<P_Artworks />} />
                <Route path="*" element={<P_Notfound />} />
            </Routes>
            <Footer />
        </BrowserRouter>
    );
}

export default App;
