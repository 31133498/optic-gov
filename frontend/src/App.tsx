import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { HeroSection } from '@/components/sections/HeroSection';
import { StatsSection } from '@/components/sections/StatsSection';
import { FeaturesSection } from '@/components/sections/FeaturesSection';
import { HowItWorksSection } from '@/components/sections/HowItWorksSection';
import { RegisterPage } from '@/components/pages/RegisterPage';
import { LoginPage } from '@/components/pages/LoginPage';
import { DashboardPage } from '@/components/pages/DashboardPage';
import { OpticGovDemo } from './components/pages/OpticGovDemo';
import { TransparencyMapPage } from './components/pages/TransparencyMapPage';
import { ProjectDetailsPage } from './components/pages/ProjectDetailsPage';
import { GovernorDashboardPage } from './components/pages/GovernorDashboardPage';
import { ContractorPortalPage } from './components/pages/ContractorPortalPage';
import { CreateProjectPage } from './components/pages/CreateProjectPage';

const HomePage = () => (
  <div className="relative flex h-auto min-h-screen w-full flex-col">
    <Header />
    <main className="flex-1 flex flex-col items-center w-full">
      <HeroSection />
      <StatsSection />
      <FeaturesSection />
      <HowItWorksSection />
    </main>
    <Footer />
  </div>
);

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/demo" element={<OpticGovDemo />} />
        <Route path="/transparency-map" element={<TransparencyMapPage />} />
        <Route path="/project/:id" element={<ProjectDetailsPage />} />
        <Route path="/governor" element={<GovernorDashboardPage />} />
        <Route path="/contractor" element={<ContractorPortalPage />} />
        <Route path="/create-project" element={<CreateProjectPage />} />
      </Routes>
    </Router>
  );
}

export default App;