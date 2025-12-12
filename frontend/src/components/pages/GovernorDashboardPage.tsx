import { useState } from 'react';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { ProgressBar } from '../ui/ProgressBar';
import { MapPin } from '../ui/MapPin';
import { Project } from '../../types/project';

// Mock data
const mockProjects: Project[] = [
  {
    id: 'central-highway',
    name: 'Central Highway Repair',
    description: 'Major highway infrastructure repair',
    location: 'Sector 7',
    contractAddress: '0x8821',
    totalBudget: 2500000,
    ethLocked: 100,
    ethReleased: 75,
    status: 'verified',
    progress: 75,
    aiConfidence: 98.2,
    contractor: {
      name: 'Highway Solutions Inc.',
      address: '0x123...456',
      trustScore: 95,
      completedProjects: 12,
    },
    milestones: [],
    evidence: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'district-9-water',
    name: 'District 9 Water Supply',
    description: 'Water infrastructure upgrade',
    location: 'North Zone',
    contractAddress: '0x9923',
    totalBudget: 1800000,
    ethLocked: 80,
    ethReleased: 32,
    status: 'alert',
    progress: 40,
    contractor: {
      name: 'AquaTech Systems',
      address: '0x789...012',
      trustScore: 88,
      completedProjects: 8,
    },
    milestones: [],
    evidence: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'city-bridge-alpha',
    name: 'City Bridge Alpha',
    description: 'Bridge construction project',
    location: 'Downtown',
    contractAddress: '0x1029',
    totalBudget: 3200000,
    ethLocked: 150,
    ethReleased: 22.5,
    status: 'pending',
    progress: 15,
    contractor: {
      name: 'Bridge Masters LLC',
      address: '0x345...678',
      trustScore: 92,
      completedProjects: 6,
    },
    milestones: [],
    evidence: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

const mapPins = [
  { id: '1', projectId: 'central-highway', position: { top: '40%', left: '45%' }, status: 'verified' as const },
  { id: '2', projectId: 'district-9-water', position: { top: '30%', left: '60%' }, status: 'alert' as const },
  { id: '3', projectId: 'city-bridge-alpha', position: { top: '65%', left: '35%' }, status: 'pending' as const },
];

export const GovernorDashboardPage = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const handlePinClick = (pinId: string) => {
    const pin = mapPins.find(p => p.id === pinId);
    if (pin) {
      const project = mockProjects.find(p => p.id === pin.projectId);
      if (project) {
        setSelectedProject(project);
      }
    }
  };

  const filteredProjects = mockProjects.filter(project =>
    project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.contractAddress.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background-dark text-white flex flex-col overflow-hidden">
      {/* Header */}
      <header className="flex items-center justify-between border-b border-border-dark bg-background-dark px-6 py-3 shrink-0 z-20 shadow-md">
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 text-primary flex items-center justify-center bg-primary/10 rounded-lg">
            <span>🏛️</span>
          </div>
          <h1 className="text-white text-xl font-bold tracking-tight">
            Optic-Gov <span className="text-xs font-normal text-text-secondary ml-2 border border-border-dark px-2 py-0.5 rounded-full">Governor View</span>
          </h1>
        </div>
        <div className="flex items-center gap-4">
          {/* Blockchain Status */}
          <div className="hidden md:flex items-center gap-2 text-xs font-mono text-text-secondary bg-card-dark px-3 py-1.5 rounded-full border border-border-dark">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            Ethereum Mainnet: Block #19244291
          </div>
          {/* Actions */}
          <div className="flex gap-3">
            <Button variant="secondary" size="sm" className="flex items-center gap-2">
              <span>💰</span>
              <span>0x71C...9A2</span>
            </Button>
            <Button variant="ghost" size="sm" className="w-9 h-9 rounded-lg relative">
              🔔
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-background-dark" />
            </Button>
            <Button variant="ghost" size="sm" className="w-9 h-9 rounded-lg">
              ⚙️
            </Button>
            <div className="w-9 h-9 rounded-full bg-cover bg-center border border-border-dark cursor-pointer ml-2"
                 style={{ backgroundImage: "url('https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=36&h=36&fit=crop&crop=face')" }} />
          </div>
        </div>
      </header>

      {/* Main Dashboard */}
      <div className="flex flex-1 overflow-hidden relative">
        {/* Map Panel */}
        <main className="flex-1 relative bg-background-dark">
          {/* Map Background */}
          <div className="absolute inset-0 w-full h-full opacity-80"
               style={{
                 backgroundImage: "url('https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=1920&h=1080&fit=crop')",
                 filter: 'grayscale(100%) contrast(120%) brightness(50%)'
               }} />
          
          {/* Map Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-background-dark/80 via-transparent to-background-dark/40 pointer-events-none" />

          {/* Map Controls */}
          <div className="absolute top-6 left-6 flex flex-col gap-2">
            <div className="bg-card-dark/90 backdrop-blur border border-border-dark p-1 rounded-lg flex flex-col shadow-xl">
              <Button variant="ghost" size="sm" className="w-8 h-8 rounded">+</Button>
              <Button variant="ghost" size="sm" className="w-8 h-8 rounded">-</Button>
            </div>
            <div className="bg-card-dark/90 backdrop-blur border border-border-dark p-2 rounded-lg shadow-xl">
              <Button variant="ghost" size="sm" className="w-8 h-8 rounded text-primary">📍</Button>
            </div>
          </div>

          {/* Map Legend */}
          <div className="absolute bottom-6 left-6 bg-card-dark/90 backdrop-blur border border-border-dark p-3 rounded-lg shadow-xl text-xs text-white">
            <div className="font-bold mb-2 text-text-secondary uppercase tracking-wider">Project Status</div>
            <div className="flex items-center gap-2 mb-1">
              <div className="w-2 h-2 rounded-full bg-primary shadow-[0_0_8px_rgba(16,185,129,0.6)]" />
              Verified & Active
            </div>
            <div className="flex items-center gap-2 mb-1">
              <div className="w-2 h-2 rounded-full bg-yellow-400" />
              Pending Verification
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-red-500" />
              Alert / Stalled
            </div>
          </div>

          {/* Map Pins */}
          {mapPins.map((pin) => {
            const project = mockProjects.find(p => p.id === pin.projectId);
            return (
              <MapPin
                key={pin.id}
                status={pin.status}
                position={{ top: pin.position.top, left: pin.position.left }}
                onClick={() => handlePinClick(pin.id)}
                tooltip={
                  project && (
                    <div>
                      <div className="text-white font-bold text-sm">{project.name}</div>
                      <div className={`text-xs mt-1 flex items-center gap-1 ${
                        project.status === 'verified' ? 'text-primary' :
                        project.status === 'alert' ? 'text-red-400' :
                        'text-yellow-400'
                      }`}>
                        <span>{project.status === 'verified' ? '✓' : project.status === 'alert' ? '⚠️' : '⏳'}</span>
                        {project.status === 'verified' ? 'On Track' :
                         project.status === 'alert' ? 'Budget Mismatch' :
                         'Pending'}
                      </div>
                    </div>
                  )
                }
              />
            );
          })}
        </main>

        {/* Right Sidebar */}
        <aside className="w-[400px] flex flex-col bg-background-dark border-l border-border-dark z-10 shadow-2xl">
          {/* Header Section */}
          <div className="p-6 border-b border-border-dark bg-background-dark">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-white text-lg font-bold">Dashboard Control</h2>
              <span className="text-xs text-text-secondary">Updated 2m ago</span>
            </div>

            {/* Primary Action */}
            <Button 
              className="w-full h-12 shadow-primary mb-6"
              onClick={() => window.location.href = '/create-project'}
            >
              <span>➕</span>
              Create New Project
            </Button>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-card-dark p-3 rounded-lg border border-border-dark">
                <p className="text-text-secondary text-xs font-medium uppercase mb-1">Total Projects</p>
                <p className="text-white text-xl font-bold">12</p>
              </div>
              <div className="bg-card-dark p-3 rounded-lg border border-border-dark">
                <p className="text-text-secondary text-xs font-medium uppercase mb-1">Deployed</p>
                <p className="text-white text-xl font-bold">$4.5M</p>
              </div>
              <div className="bg-card-dark p-3 rounded-lg border border-border-dark">
                <p className="text-text-secondary text-xs font-medium uppercase mb-1">Verify Pending</p>
                <p className="text-yellow-400 text-xl font-bold">3</p>
              </div>
              <div className="bg-card-dark p-3 rounded-lg border border-border-dark">
                <p className="text-text-secondary text-xs font-medium uppercase mb-1">Active Alerts</p>
                <p className="text-red-400 text-xl font-bold">2</p>
              </div>
            </div>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto p-6">
            {/* Search */}
            <div className="relative mb-6">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-text-secondary">🔍</span>
              <input
                className="w-full bg-card-dark border border-border-dark text-white text-sm rounded-lg focus:ring-1 focus:ring-primary focus:border-primary block pl-10 p-3 placeholder-text-secondary"
                placeholder="Search projects by ID or Name..."
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Project List */}
            <div className="space-y-4">
              <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-2">Monitored Projects</h3>
              
              {filteredProjects.map((project) => (
                <div
                  key={project.id}
                  className={`bg-card-dark border border-border-dark rounded-lg p-4 transition-colors cursor-pointer group ${
                    project.status === 'verified' ? 'hover:border-primary/50' :
                    project.status === 'alert' ? 'hover:border-red-500/50' :
                    'hover:border-yellow-400/50'
                  } ${selectedProject?.id === project.id ? 'border-primary/50' : ''}`}
                  onClick={() => setSelectedProject(project)}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className={`font-bold text-sm transition-colors ${
                        project.status === 'verified' ? 'text-white group-hover:text-primary' :
                        project.status === 'alert' ? 'text-white group-hover:text-red-400' :
                        'text-white group-hover:text-yellow-400'
                      }`}>
                        {project.name}
                      </h4>
                      <p className="text-text-secondary text-xs">{project.location} • ID: #{project.contractAddress}</p>
                    </div>
                    <Badge variant={project.status}>
                      {project.status === 'verified' ? '✓ Verified' :
                       project.status === 'alert' ? '⚠️ Alert' :
                       '⏳ Pending'}
                    </Badge>
                  </div>

                  <ProgressBar 
                    value={project.progress} 
                    variant={project.status === 'alert' ? 'error' : 'primary'}
                    className="mb-3"
                  />

                  <div className="flex items-center justify-between">
                    <span className="text-xs text-white">{project.progress}% Complete</span>
                    {project.status === 'verified' && project.aiConfidence && (
                      <div className="flex items-center gap-1 text-xs text-blue-300 bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20">
                        <span>🤖</span> Gemini AI Verified
                      </div>
                    )}
                    {project.status === 'alert' && (
                      <span className="text-xs text-red-400">Material Shortage</span>
                    )}
                    {project.status === 'pending' && (
                      <span className="text-xs text-text-secondary">Waiting for visual proof</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Help */}
          <div className="p-4 border-t border-border-dark bg-background-dark/50">
            <Button variant="ghost" className="flex items-center justify-between w-full text-left text-text-secondary hover:text-white text-xs group">
              <span className="flex items-center gap-2">
                <span>❓</span>
                Need help with smart contracts?
              </span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </Button>
          </div>
        </aside>
      </div>
    </div>
  );
};