import { Routes, Route, Navigate } from "react-router-dom";
import Admin from "./pages/Admin";
import Home from "./pages/Home";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    );
}

export default App;
