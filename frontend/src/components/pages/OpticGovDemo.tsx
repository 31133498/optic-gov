import { useState } from 'react';
import { Button } from '../ui/Button';
import { TransparencyMapPage } from './TransparencyMapPage';
import { ProjectDetailsPage } from './ProjectDetailsPage';
import { GovernorDashboardPage } from './GovernorDashboardPage';
import { ContractorPortalPage } from './ContractorPortalPage';

type DemoView = 'map' | 'details' | 'governor' | 'contractor';

export const OpticGovDemo = () => {
  const [currentView, setCurrentView] = useState<DemoView>('map');

  const views = [
    { key: 'map' as const, label: 'Public Transparency Map', icon: '🗺️' },
    { key: 'details' as const, label: 'Project Details', icon: '📊' },
    { key: 'governor' as const, label: 'Governor Dashboard', icon: '🏛️' },
    { key: 'contractor' as const, label: 'Contractor Portal', icon: '👷' },
  ];

  const renderCurrentView = () => {
    switch (currentView) {
      case 'map':
        return <TransparencyMapPage />;
      case 'details':
        return <ProjectDetailsPage />;
      case 'governor':
        return <GovernorDashboardPage />;
      case 'contractor':
        return <ContractorPortalPage />;
      default:
        return <TransparencyMapPage />;
    }
  };

  return (
    <div className="min-h-screen bg-background-dark">
      {/* Demo Navigation */}
      <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-card-dark/90 backdrop-blur-md border border-border-dark rounded-full p-2 shadow-2xl">
        <div className="flex gap-2">
          {views.map((view) => (
            <Button
              key={view.key}
              variant={currentView === view.key ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => setCurrentView(view.key)}
              className="flex items-center gap-2 rounded-full"
            >
              <span>{view.icon}</span>
              <span className="hidden md:inline">{view.label}</span>
            </Button>
          ))}
        </div>
      </div>

      {/* Current View */}
      <div className="pt-20 md:pt-0">
        {renderCurrentView()}
      </div>
    </div>
  );
};