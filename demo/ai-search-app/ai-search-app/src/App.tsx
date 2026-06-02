import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import NebulaPage from "./pages/NebulaPage";
import SearchHomePage from "./pages/SearchHomePage";
import WikiHomePage from "./pages/WikiHomePage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<WikiHomePage />} />
        <Route path="/search" element={<SearchHomePage />} />
        <Route path="/nebula" element={<NebulaPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
