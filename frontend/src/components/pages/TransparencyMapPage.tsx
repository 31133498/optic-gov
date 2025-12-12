import { useState } from 'react';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { Modal } from '../ui/Modal';
import { MapPin } from '../ui/MapPin';
import { ProgressBar } from '../ui/ProgressBar';
import { Project } from '../../types/project';

// Mock data
const mockProjects: Project[] = [
  {
    id: 'ny-2024-882',
    name: 'Downtown Bridge Repair',
    description: 'Major infrastructure repair project',
    location: 'Manhattan, NY',
    contractAddress: '0x71C...9A23',
    totalBudget: 500,
    ethLocked: 500,
    ethReleased: 200,
    status: 'verified',
    progress: 98.5,
    aiConfidence: 98.5,
    contractor: {
      name: 'Apex Infrastructure Ltd.',
      address: '0x83...12F4',
      trustScore: 98,
      completedProjects: 14,
    },
    milestones: [],
    evidence: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'ny-2024-421',
    name: 'East Side Highway',
    description: 'Highway expansion project',
    location: 'Queens, NY',
    contractAddress: '0x42A...8B1',
    totalBudget: 1200,
    ethLocked: 1200,
    ethReleased: 540,
    status: 'in-progress',
    progress: 45,
    contractor: {
      name: 'Metro Construction Co.',
      address: '0x91B...3C2',
      trustScore: 92,
      completedProjects: 8,
    },
    milestones: [],
    evidence: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

const mapPins = [
  { id: '1', projectId: 'ny-2024-882', position: { top: '45%', left: '52%' }, status: 'verified' as const },
  { id: '2', projectId: 'ny-2024-421', position: { top: '30%', left: '35%' }, status: 'alert' as const },
  { id: '3', projectId: 'ny-2024-990', position: { top: '60%', left: '65%' }, status: 'in-progress' as const },
];

export const TransparencyMapPage = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>('all');

  const handlePinClick = (pinId: string) => {
    const pin = mapPins.find(p => p.id === pinId);
    if (pin) {
      const project = mockProjects.find(p => p.id === pin.projectId);
      if (project) {
        setSelectedProject(project);
      }
    }
  };

  return (
    <div className="min-h-screen bg-background-dark text-white overflow-hidden relative">
      {/* Map Background */}
      <div className="absolute inset-0 z-0">
        <div className="w-full h-full relative">
          <div 
            className="w-full h-full bg-cover bg-center opacity-30 grayscale contrast-125"
            style={{
              backgroundImage: "url('https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=1920&h=1080&fit=crop')"
            }}
          />
          <div className="absolute inset-0 bg-background-dark/60" />
          <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-transparent to-transparent" />
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
                    <div className="text-primary text-xs mt-1 flex items-center gap-1">
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                      </svg>
                      {project.status === 'verified' ? 'Verified' : 'In Progress'}
                    </div>
                  </div>
                )
              }
            />
          );
        })}
      </div>

      {/* UI Overlay */}
      <div className="relative z-10 flex flex-col h-full w-full pointer-events-none">
        {/* Header */}
        <header className="w-full flex flex-col xl:flex-row items-center justify-between p-4 md:px-8 pt-6 gap-4 pointer-events-auto">
          {/* Logo */}
          <div className="flex items-center gap-3 bg-card-dark/80 backdrop-blur-md pl-2 pr-6 py-2 rounded-full border border-border-dark shadow-xl">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary-dark rounded-full flex items-center justify-center text-background-dark">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
              </svg>
            </div>
            <div>
              <h1 className="text-white text-lg font-bold leading-none tracking-tight">Optic-Gov</h1>
              <span className="text-primary text-xs uppercase tracking-widest font-semibold opacity-80">
                Transparency Layer
              </span>
            </div>
          </div>

          {/* Stats HUD */}
          <div className="hidden md:flex flex-1 max-w-3xl justify-center">
            <div className="flex items-center gap-1 bg-card-dark/80 backdrop-blur-md p-1.5 rounded-full border border-border-dark shadow-xl">
              <div className="flex flex-col md:flex-row items-center gap-6 px-6 py-2">
                <div className="flex flex-col items-center md:items-start">
                  <span className="text-xs text-text-secondary uppercase font-bold tracking-wider">ETH Locked</span>
                  <span className="text-white font-mono font-bold text-lg leading-none">
                    12,450 <span className="text-xs text-text-secondary">ETH</span>
                  </span>
                </div>
                <div className="w-px h-8 bg-border-dark hidden md:block" />
                <div className="flex flex-col items-center md:items-start">
                  <span className="text-xs text-text-secondary uppercase font-bold tracking-wider">ETH Released</span>
                  <span className="text-white font-mono font-bold text-lg leading-none">
                    4,200 <span className="text-xs text-text-secondary">ETH</span>
                  </span>
                </div>
                <div className="w-px h-8 bg-border-dark hidden md:block" />
                <div className="flex flex-col items-center md:items-start">
                  <span className="text-xs text-primary uppercase font-bold tracking-wider">Corruption Prevented</span>
                  <span className="text-primary font-mono font-bold text-lg leading-none">$12,040,000</span>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <Button variant="ghost" size="sm" className="w-11 h-11 rounded-full relative">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"/>
              </svg>
              <span className="absolute top-2 right-2.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-card-dark" />
            </Button>
            <Button className="shadow-primary">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z"/>
              </svg>
              Connect Wallet
            </Button>
          </div>
        </header>

        {/* Main Content */}
        <div className="flex-1 flex overflow-hidden p-4 md:px-8 pb-8 gap-6">
          {/* Sidebar */}
          <aside className="pointer-events-auto w-full max-w-[400px] h-full flex flex-col bg-card-dark/90 backdrop-blur-xl rounded-2xl border border-border-dark shadow-2xl overflow-hidden shrink-0">
            {/* Search Header */}
            <div className="p-5 border-b border-border-dark bg-card-dark/50">
              <div className="relative group">
                <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
                </svg>
                <input
                  className="w-full bg-background-dark border border-border-dark rounded-xl py-3 pl-10 pr-4 text-sm text-white placeholder-text-secondary focus:ring-1 focus:ring-primary focus:border-primary transition-all outline-none"
                  placeholder="Search projects by ID or location..."
                  type="text"
                />
              </div>

              {/* Filters */}
              <div className="flex gap-2 mt-4 overflow-x-auto pb-1">
                {[
                  { key: 'all', label: 'All Projects' },
                  { key: 'pending', label: 'Pending', color: 'bg-red-500' },
                  { key: 'in-progress', label: 'In-Progress', color: 'bg-yellow-400' },
                  { key: 'verified', label: 'Completed', color: 'bg-primary' },
                ].map((filter) => (
                  <button
                    key={filter.key}
                    onClick={() => setActiveFilter(filter.key)}
                    className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all whitespace-nowrap flex items-center gap-1 ${
                      activeFilter === filter.key
                        ? 'bg-border-dark text-white border border-transparent'
                        : 'bg-transparent border border-border-dark text-text-secondary hover:text-white hover:bg-border-dark'
                    }`}
                  >
                    {filter.color && <span className={`w-1.5 h-1.5 rounded-full ${filter.color}`} />}
                    {filter.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Project List */}
            <div className="flex-1 overflow-y-auto">
              {mockProjects.map((project) => (
                <div
                  key={project.id}
                  className={`p-4 border-b border-border-dark/50 hover:bg-border-dark/30 cursor-pointer transition-colors ${
                    selectedProject?.id === project.id ? 'bg-border-dark/20 border-l-4 border-l-primary' : 'border-l-4 border-l-transparent'
                  }`}
                  onClick={() => setSelectedProject(project)}
                >
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-bold text-white text-base">{project.name}</h3>
                    <Badge variant={project.status === 'verified' ? 'verified' : 'pending'}>
                      {project.status === 'verified' ? '✓ VERIFIED' : '⏳ IN-PROGRESS'}
                    </Badge>
                  </div>
                  <p className="text-xs text-text-secondary mb-3">
                    Project ID: #{project.id} • {project.location}
                  </p>
                  <div className="flex justify-between items-center text-xs">
                    <div className="flex flex-col">
                      <span className="text-text-secondary uppercase text-xs font-bold">Budget</span>
                      <span className="text-white font-mono">{project.totalBudget} ETH</span>
                    </div>
                    <div className="text-right flex flex-col items-end">
                      <span className="text-text-secondary uppercase text-xs font-bold">
                        {project.status === 'verified' ? 'AI Confidence' : 'Progress'}
                      </span>
                      <span className="text-primary font-bold">
                        {project.status === 'verified' ? `${project.aiConfidence}%` : `${project.progress}%`}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </div>

      {/* Evidence Vault Modal */}
      <Modal
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
        size="lg"
        className="animate-in fade-in-0 zoom-in-95 duration-500"
      >
        {selectedProject && (
          <div className="flex flex-col gap-6">
            {/* Header */}
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center text-primary border border-primary/20">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/>
                </svg>
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">Evidence Vault</h2>
                <p className="text-sm text-primary flex items-center gap-1">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/>
                  </svg>
                  {selectedProject.name}
                </p>
              </div>
            </div>

            {/* Video Feed */}
            <div className="rounded-xl overflow-hidden bg-black border border-border-dark relative group">
              <div className="aspect-video w-full bg-border-dark/50 relative">
                <div 
                  className="w-full h-full bg-cover bg-center opacity-60"
                  style={{
                    backgroundImage: "url('https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&h=450&fit=crop')"
                  }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <button className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-primary hover:text-background-dark hover:border-primary transition-all group-hover:scale-110">
                    <span className="text-4xl ml-1">▶</span>
                  </button>
                </div>

                {/* AI Overlay */}
                <div className="absolute top-4 left-4 flex gap-2">
                  <span className="bg-black/70 text-white text-xs font-mono px-2 py-1 rounded border border-white/20 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
                    LIVE FEED
                  </span>
                </div>
                <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                  <div className="bg-black/70 backdrop-blur-md p-3 rounded-lg border border-white/10 max-w-sm">
                    <p className="text-xs text-primary uppercase font-bold mb-1 flex items-center gap-1">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.5 6c-2.61.7-5.67 1-8.5 1s-5.89-.3-8.5-1L3 8c2.61.7 5.67 1 8.5 1s5.89-.3 8.5-1l.5-2zM12 10c-2.21 0-4.43-.18-6.49-.49L5.5 12c2.61.7 5.67 1 8.5 1s5.89-.3 8.5-1l-.01-2.49C20.43 9.82 18.21 10 12 10z"/>
                      </svg> Gemini 2.5 Flash Analysis
                    </p>
                    <p className="text-xs text-white leading-relaxed">
                      Visual confirmation of structural integrity. Rebar density matches schematic V.2. 
                      Concrete pouring volume verified at 98% accuracy.
                    </p>
                  </div>
                  <div className="bg-primary/90 text-background-dark font-bold px-3 py-1.5 rounded-lg text-xs shadow-lg shadow-primary/20">
                    {selectedProject.aiConfidence}% Confidence
                  </div>
                </div>
              </div>
            </div>

            {/* Transaction Data */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-background-dark rounded-xl p-4 border border-border-dark">
                <p className="text-xs text-text-secondary uppercase font-bold mb-1">Last Transaction Hash</p>
                <div className="flex items-center gap-2 text-white font-mono text-sm">
                  <span className="truncate">{selectedProject.contractAddress}</span>
                  <button className="text-text-secondary hover:text-white">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/>
                    </svg>
                  </button>
                </div>
              </div>
              <div className="bg-background-dark rounded-xl p-4 border border-border-dark">
                <p className="text-xs text-text-secondary uppercase font-bold mb-1">Funds Released</p>
                <div className="flex items-center gap-2 text-white font-mono text-sm">
                  <span>{selectedProject.ethReleased}.00 ETH</span>
                  <span className="text-xs text-text-secondary">(Milestone 3)</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-3 pt-2 border-t border-border-dark">
              <Button variant="secondary">View Smart Contract</Button>
              <Button className="shadow-primary">Release Next Batch</Button>
            </div>
          </div>
        )}
      </Modal>

      {/* Map Controls */}
      <div className="absolute bottom-8 right-8 z-20 flex flex-col gap-2 pointer-events-auto">
        <Button variant="secondary" size="sm" className="w-10 h-10 rounded-full">+</Button>
        <Button variant="secondary" size="sm" className="w-10 h-10 rounded-full">-</Button>
        <Button className="w-10 h-10 rounded-full mt-2 shadow-primary">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
          </svg>
        </Button>
      </div>
    </div>
  );
};