import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from "./components/layout/Footer";
import P_Home from "./pages/P_Home";
import P_Notfound from "./pages/P_Notfound";

function App() {    
    return (
        <BrowserRouter basename="/">
            <Routes>
                <Route path="/" element={<P_Home />} />
                <Route path="*" element={<P_Notfound />} />
            </Routes>
            <Footer />
        </BrowserRouter>
    );
}

export default App;
