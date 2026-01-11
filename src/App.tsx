import { BrowserRouter, Route, Routes } from "react-router-dom";
import DashboardPage from "./pages/DashboardPage";
import ComingSoonPage from "./pages/ComingSoonPage";
import SettingsPage from "./pages/SettingsPage";
import ViewProfilePage from "./pages/ViewProfilePage";
import LLMTxtGeneratorPage from "./tools/llm-txt-generator/LLMTxtGeneratorPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Dashboard */}
        <Route path="/" element={<DashboardPage />} />

        {/* User Profile */}
        <Route path="/view-profile" element={<ViewProfilePage />} />

        {/* GEO Tools */}
        <Route path="/tools/llm-txt-generator" element={<LLMTxtGeneratorPage />} />

        {/* On-Page SEO */}
        <Route path="/tools/on-page/*" element={<ComingSoonPage />} />

        {/* Off-Page SEO */}
        <Route path="/tools/off-page/*" element={<ComingSoonPage />} />

        {/* Local SEO */}
        <Route path="/tools/local-seo/*" element={<ComingSoonPage />} />

        {/* Technical SEO */}
        <Route path="/tools/technical/*" element={<ComingSoonPage />} />

        {/* Settings */}
        <Route path="/settings" element={<SettingsPage />} />

        {/* Catch all - redirect to dashboard */}
        <Route path="*" element={<DashboardPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
