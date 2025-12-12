import { useState } from 'react';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { ProgressBar } from '../ui/ProgressBar';
import { Project, Milestone } from '../../types/project';

// Mock data
const mockProject: Project = {
  id: 'metro-line-4-b',
  name: 'Metro Line 4 Expansion - Sector B',
  description: 'Major subway infrastructure expansion project',
  location: 'Downtown Metro District',
  contractAddress: '0x71C...9A2',
  totalBudget: 12500000,
  ethLocked: 450,
  ethReleased: 120,
  status: 'verified',
  progress: 65,
  aiConfidence: 98.5,
  contractor: {
    name: 'Apex Infrastructure Ltd.',
    address: '0x83...12F4',
    trustScore: 98,
    completedProjects: 14,
  },
  milestones: [
    {
      id: '1',
      projectId: 'metro-line-4-b',
      title: 'Foundation Pouring & Setting',
      description: 'Complete foundation work with concrete pouring',
      requirements: 'High-angle photo of freshly poured concrete foundation with visible rebar reinforcement grid.',
      status: 'completed',
      ethAmount: 50,
      dueDate: new Date('2023-10-12'),
      completedAt: new Date('2023-10-12'),
    },
    {
      id: '2', 
      projectId: 'metro-line-4-b',
      title: 'Structural Pillars - Level 1',
      description: 'Install primary structural support pillars',
      requirements: 'Steel reinforcement count verification and material density scan',
      status: 'completed',
      ethAmount: 70,
      dueDate: new Date('2023-10-28'),
      completedAt: new Date('2023-10-28'),
    },
    {
      id: '3',
      projectId: 'metro-line-4-b', 
      title: 'Subway Tunnel Reinforcement',
      description: 'Reinforce tunnel structure and safety systems',
      requirements: 'Verification of tunnel integrity and safety compliance',
      status: 'in-progress',
      ethAmount: 100,
      dueDate: new Date('2023-11-24'),
    },
    {
      id: '4',
      projectId: 'metro-line-4-b',
      title: 'Electrical Systems Installation', 
      description: 'Install electrical and communication systems',
      requirements: 'Complete electrical system testing and certification',
      status: 'locked',
      ethAmount: 80,
      dueDate: new Date('2023-12-15'),
    },
  ],
  evidence: [],
  createdAt: new Date('2023-09-01'),
  updatedAt: new Date(),
};

const milestoneIcons = {
  completed: '✓',
  'in-progress': '🔄',
  locked: '🔒',
  pending: '⏳',
  verified: '✓',
};

const milestoneColors = {
  completed: 'text-primary',
  'in-progress': 'text-yellow-400', 
  locked: 'text-text-secondary',
  pending: 'text-yellow-400',
  verified: 'text-primary',
};

export const ProjectDetailsPage = () => {
  const [activeTab, setActiveTab] = useState('milestones');

  return (
    <div className="min-h-screen bg-background-dark text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background-dark border-b border-border-dark">
        <div className="px-4 md:px-10 py-3 flex items-center justify-between max-w-7xl mx-auto w-full">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-4 text-white">
              <div className="w-8 h-8 text-primary">
                <span className="text-3xl">🏛️</span>
              </div>
              <h2 className="text-white text-lg font-bold leading-tight tracking-tight">Optic-Gov</h2>
            </div>
            <nav className="hidden md:flex items-center gap-9">
              <a className="text-white hover:text-primary transition-colors text-sm font-medium" href="#">Map</a>
              <a className="text-primary text-sm font-medium" href="#">Transparency Reports</a>
              <a className="text-white hover:text-primary transition-colors text-sm font-medium" href="#">About Us</a>
            </nav>
          </div>
          <div className="flex gap-4">
            <div className="hidden md:flex min-w-40 h-10 max-w-64">
              <div className="flex w-full items-stretch rounded-lg h-full bg-border-dark focus-within:ring-1 focus-within:ring-primary">
                <div className="text-text-secondary flex items-center justify-center pl-4 pr-2">
                  <span>🔍</span>
                </div>
                <input 
                  className="flex w-full min-w-0 resize-none overflow-hidden rounded-lg rounded-l-none bg-transparent text-white focus:outline-0 placeholder:text-text-secondary text-sm"
                  placeholder="Search Projects"
                />
              </div>
            </div>
            <Button className="shadow-primary">Connect Wallet</Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow w-full max-w-7xl mx-auto px-4 md:px-10 py-8 space-y-8">
        {/* Breadcrumbs */}
        <div className="flex flex-wrap gap-2 px-4 -ml-4">
          <a className="text-text-secondary hover:text-white transition-colors text-sm font-medium flex items-center gap-1" href="#">
            <span>🌍</span> Public Map
          </a>
          <span className="text-text-secondary text-sm font-medium">/</span>
          <span className="text-white text-sm font-medium">{mockProject.name}</span>
        </div>

        {/* Page Heading */}
        <div className="flex flex-wrap justify-between items-start gap-6 border-b border-border-dark pb-8">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <h1 className="text-white text-3xl md:text-4xl font-black leading-tight tracking-tight">
                {mockProject.name}
              </h1>
              <Badge variant="verified" className="hidden md:flex">
                <span>🛡️</span> Verified
              </Badge>
            </div>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-text-secondary text-sm md:text-base">
              <span className="flex items-center gap-1">
                <span>🆔</span> Project ID: {mockProject.contractAddress}
              </span>
              <span className="hidden md:inline">•</span>
              <span className="flex items-center gap-1">
                <span>🏗️</span> {mockProject.contractor.name}
              </span>
              <span className="hidden md:inline">•</span>
              <span className="flex items-center gap-1 text-primary">
                <span>✨</span> Verified by Optic-Gov AI
              </span>
            </div>
          </div>
          <Button variant="secondary">
            <span>📄</span>
            View Smart Contract
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="flex flex-col gap-2 rounded-xl p-6 bg-card-dark border border-border-dark">
            <div className="flex items-center justify-between">
              <p className="text-text-secondary text-sm font-medium uppercase tracking-wider">Total Budget</p>
              <span>💰</span>
            </div>
            <p className="text-white text-2xl font-bold leading-tight">${mockProject.totalBudget.toLocaleString()}</p>
          </div>
          <div className="flex flex-col gap-2 rounded-xl p-6 bg-card-dark border border-border-dark">
            <div className="flex items-center justify-between">
              <p className="text-text-secondary text-sm font-medium uppercase tracking-wider">ETH Locked</p>
              <span>🔒</span>
            </div>
            <p className="text-white text-2xl font-bold leading-tight">{mockProject.ethLocked} ETH</p>
          </div>
          <div className="flex flex-col gap-2 rounded-xl p-6 bg-card-dark border border-border-dark">
            <div className="flex items-center justify-between">
              <p className="text-text-secondary text-sm font-medium uppercase tracking-wider">ETH Released</p>
              <span className="text-primary">🔓</span>
            </div>
            <p className="text-primary text-2xl font-bold leading-tight">{mockProject.ethReleased} ETH</p>
          </div>
          <div className="flex flex-col gap-2 rounded-xl p-6 bg-card-dark border border-border-dark">
            <div className="flex items-center justify-between">
              <p className="text-text-secondary text-sm font-medium uppercase tracking-wider">Next Release</p>
              <span>📅</span>
            </div>
            <p className="text-white text-2xl font-bold leading-tight">Nov 24, 2023</p>
          </div>
        </div>

        {/* Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Timeline */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-white">Project Milestones</h3>
              <div className="text-xs text-text-secondary bg-card-dark px-3 py-1 rounded-full border border-border-dark flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                Live Updates
              </div>
            </div>

            <div className="relative pl-4">
              {/* Vertical Line */}
              <div className="absolute left-7 top-4 bottom-10 w-0.5 bg-border-dark" />

              {mockProject.milestones.map((milestone, index) => (
                <div key={milestone.id} className="relative flex gap-6 pb-12 group">
                  <div className="flex flex-col items-center">
                    <div className={`z-10 flex items-center justify-center w-6 h-6 rounded-full ring-4 ring-background-dark ${
                      milestone.status === 'completed' ? 'bg-primary' : 
                      milestone.status === 'in-progress' ? 'bg-yellow-500' :
                      'bg-border-dark border border-text-secondary'
                    }`}>
                      <span className={`text-sm font-bold ${
                        milestone.status === 'completed' ? 'text-background-dark' :
                        milestone.status === 'in-progress' ? 'text-black' :
                        'text-text-secondary'
                      }`}>
                        {milestoneIcons[milestone.status]}
                      </span>
                    </div>
                  </div>

                  <div className={`flex-1 bg-card-dark border border-border-dark rounded-xl p-5 transition-colors ${
                    milestone.status === 'in-progress' ? 'border-yellow-500/30' : 'hover:border-primary/30'
                  } ${milestone.status === 'in-progress' ? 'relative overflow-hidden' : ''}`}>
                    {milestone.status === 'in-progress' && (
                      <div className="absolute top-0 right-0 p-3 opacity-10 pointer-events-none">
                        <span className="text-9xl text-yellow-500 -rotate-12">🚧</span>
                      </div>
                    )}

                    <div className="flex justify-between items-start mb-2 relative z-10">
                      <div>
                        <h4 className="text-white font-bold text-lg">{milestone.title}</h4>
                        <p className={`text-sm ${
                          milestone.status === 'completed' ? 'text-text-secondary' :
                          milestone.status === 'in-progress' ? 'text-yellow-500 font-medium' :
                          'text-text-secondary'
                        }`}>
                          {milestone.status === 'completed' ? `Completed on ${milestone.completedAt?.toLocaleDateString()}` :
                           milestone.status === 'in-progress' ? `Verification In Progress • Due ${milestone.dueDate.toLocaleDateString()}` :
                           `Estimated ${milestone.dueDate.toLocaleDateString()}`}
                        </p>
                      </div>
                      <Badge 
                        variant={
                          milestone.status === 'completed' ? 'verified' :
                          milestone.status === 'in-progress' ? 'pending' :
                          'locked'
                        }
                      >
                        {milestone.status === 'completed' ? 'RELEASED' :
                         milestone.status === 'in-progress' ? 'PENDING' :
                         'LOCKED'}
                      </Badge>
                    </div>

                    {(milestone.status === 'completed' || milestone.status === 'in-progress') && (
                      <div className="mt-4 bg-background-dark/50 rounded-lg p-3 border border-border-dark flex gap-4 relative z-10">
                        {milestone.status === 'completed' ? (
                          <>
                            <div className="relative w-32 h-20 rounded-md overflow-hidden flex-shrink-0 group/video cursor-pointer">
                              <div 
                                className="w-full h-full bg-cover bg-center opacity-80 group-hover/video:opacity-100 transition-opacity"
                                style={{
                                  backgroundImage: "url('https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=200&h=120&fit=crop')"
                                }}
                              />
                              <div className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover/video:bg-black/20 transition-all">
                                <span className="text-white bg-primary/80 rounded-full p-1">▶</span>
                              </div>
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-1 text-primary text-xs font-bold mb-1 uppercase tracking-wide">
                                <span>🤖</span> Gemini 2.5 Analysis
                              </div>
                              <p className="text-gray-300 text-sm leading-relaxed">
                                Visual analysis confirms <span className="text-white font-medium">450m³ concrete volume</span> matches structural plans. 
                                No cracks detected. Geolocation matches Sector B coordinates.
                              </p>
                            </div>
                          </>
                        ) : (
                          <div className="flex flex-col gap-2 w-full">
                            <div className="flex items-center gap-2">
                              <div className="w-4 h-4 rounded-full border-2 border-t-primary border-r-primary border-b-transparent border-l-transparent animate-spin" />
                              <p className="text-text-secondary text-sm italic">Waiting for final drone scan upload by Contractor...</p>
                            </div>
                            <ProgressBar value={67} showLabel={false} className="mt-1" />
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-1 space-y-6">
            {/* Financial Progress */}
            <div className="bg-card-dark rounded-xl p-6 border border-border-dark">
              <h3 className="text-white font-bold text-lg mb-4">Funds Released</h3>
              <div className="flex flex-col gap-3">
                <div className="flex gap-6 justify-between items-end">
                  <p className="text-text-secondary text-sm font-medium">Smart Contract Auto-Release</p>
                  <p className="text-white text-xl font-bold">26%</p>
                </div>
                <ProgressBar value={26} showLabel={false} />
                <p className="text-text-secondary text-xs font-normal mt-1">
                  Funds are cryptographically locked until milestones are verified by Optic-Gov AI oracle.
                </p>
              </div>
            </div>

            {/* Evidence Vault */}
            <div className="bg-card-dark rounded-xl p-6 border border-border-dark">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-white font-bold text-lg">Evidence Vault</h3>
                <a className="text-primary text-sm font-bold hover:underline" href="#">View All</a>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { date: 'Oct 12', title: 'Foundation Pour', image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=150&h=150&fit=crop' },
                  { date: 'Oct 28', title: 'Steel Reinforce...', image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=150&h=150&fit=crop' },
                  { date: 'Sep 15', title: 'Site Survey', image: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=150&h=150&fit=crop' },
                ].map((item, index) => (
                  <div key={index} className="aspect-square rounded-lg overflow-hidden relative group cursor-pointer border border-border-dark">
                    <div 
                      className="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                      style={{ backgroundImage: `url('${item.image}')` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-2">
                      <span className="text-xs text-white font-medium bg-black/50 backdrop-blur w-fit px-1.5 rounded mb-1">
                        {item.date}
                      </span>
                      <span className="text-xs text-white font-bold truncate">{item.title}</span>
                    </div>
                  </div>
                ))}
                <div className="aspect-square rounded-lg overflow-hidden relative group cursor-pointer border border-border-dark bg-background-dark/50 flex items-center justify-center">
                  <div className="flex flex-col items-center gap-1 text-text-secondary group-hover:text-primary transition-colors">
                    <span className="text-3xl">📁</span>
                    <span className="text-xs font-bold">More</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Contractor Info */}
            <div className="bg-card-dark rounded-xl p-6 border border-border-dark">
              <h3 className="text-white font-bold text-lg mb-4">Contractor Profile</h3>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-white border border-white/10">
                  <span className="font-bold text-lg">AI</span>
                </div>
                <div>
                  <p className="text-white font-bold">{mockProject.contractor.name}</p>
                  <div className="flex items-center gap-1 text-xs text-primary">
                    <span>✓</span>
                    <span>Level 5 Vetted</span>
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-text-secondary">Projects Completed</span>
                  <span className="text-white font-medium">{mockProject.contractor.completedProjects}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-text-secondary">Trust Score</span>
                  <span className="text-primary font-bold">{mockProject.contractor.trustScore}/100</span>
                </div>
              </div>
              <Button variant="secondary" className="w-full mt-6">
                View Full History
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};