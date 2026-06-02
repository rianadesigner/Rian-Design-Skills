import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import NebulaPage from "./pages/NebulaPage";
import SearchHomePage from "./pages/SearchHomePage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SearchHomePage />} />
        <Route path="/nebula" element={<NebulaPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
