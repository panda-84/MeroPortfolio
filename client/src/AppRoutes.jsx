import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/public/LandingPage";

// Future pages (uncomment when ready):
// import BuilderPage from "../pages/public/BuilderPage";
// import AdminDashboard from "../pages/private/AdminDashboard";
// import PortfolioView from "../pages/public/PortfolioView";

export default function AppRoutes() {
  return (
    <Routes>
      {/* ═══ PUBLIC ROUTES ═══ */}
      <Route path="/" element={<LandingPage />} />
      {/* <Route path="/build" element={<BuilderPage />} /> */}
      {/* <Route path="/portfolio/:id" element={<PortfolioView />} /> */}

      {/* ═══ PRIVATE ROUTES (admin only) ═══ */}
      {/* <Route path="/admin" element={<AdminDashboard />} /> */}

      {/* ═══ 404 ═══ */}
      <Route path="*" element={<LandingPage />} />
    </Routes>
  );
}
