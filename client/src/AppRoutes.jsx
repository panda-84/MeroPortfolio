import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/public/LandingPage";
import BuilderPage from "./pages/public/BuilderPage";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/build" element={<BuilderPage />} />
      <Route path="*" element={<LandingPage />} />
    </Routes>
  );
}