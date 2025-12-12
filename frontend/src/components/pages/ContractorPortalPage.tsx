import { useState } from 'react';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { ProgressBar } from '../ui/ProgressBar';
import { Modal } from '../ui/Modal';

interface ActiveContract {
  id: string;
  name: string;
  location: string;
  ethLocked: number;
  ethReleased: number;
  progress: number;
  nextMilestone: string;
  dueDate: string;
  status: 'pending-verification' | 'in-progress' | 'completed';
}

const mockContract: ActiveContract = {
  id: 'bridge-phase-1',
  name: 'Bridge Phase 1',
  location: 'Austin, TX Infrastructure Zone B',
  ethLocked: 5.0,
  ethReleased: 4.0,
  progress: 80,
  nextMilestone: 'Curing Verification',
  dueDate: '2 days ago',
  status: 'pending-verification',
};

const timeline = [
  {
    id: '1',
    title: 'Foundation Poured',
    status: 'completed' as const,
    date: '2 days ago',
  },
  {
    id: '2', 
    title: 'Curing Verification',
    status: 'pending' as const,
    date: 'Pending Action',
  },
  {
    id: '3',
    title: 'Safety Inspection', 
    status: 'upcoming' as const,
    date: 'Upcoming',
  },
];

export const ContractorPortalPage = () => {
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleVerifyMilestone = () => {
    setIsProcessing(true);
    // Simulate AI processing
    setTimeout(() => {
      setIsProcessing(false);
      setShowVerificationModal(false);
      // In real app, would update contract status
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-background-dark text-white flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border-dark bg-background-dark/80 backdrop-blur-md px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 text-primary">
              <span className="text-3xl">🏛️</span>
            </div>
            <h1 className="text-xl font-bold tracking-tight">Optic-Gov</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-card-dark border border-border-dark">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-sm font-medium text-text-secondary">Mainnet Live</span>
            </div>
            <Button variant="secondary" size="sm" className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-500 to-blue-500" />
              <span className="text-sm font-medium">0x83...12F4</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex flex-col items-center justify-start pt-8 pb-12 px-4">
        <div className="w-full max-w-[480px] flex flex-col gap-6">
          {/* Context Heading */}
          <div className="flex flex-col gap-1 text-center">
            <p className="text-text-secondary text-sm uppercase tracking-wider font-semibold">Active Contract</p>
            <h2 className="text-3xl font-black tracking-tight">{mockContract.name}</h2>
            <div className="flex items-center justify-center gap-2 mt-1">
              <span className="text-text-secondary text-lg">📍</span>
              <p className="text-text-secondary">{mockContract.location}</p>
            </div>
          </div>

          {/* Primary Status Card */}
          <div className="relative overflow-hidden rounded-xl bg-card-dark border border-border-dark shadow-2xl group">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10 mix-blend-overlay" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%23ffffff\" fill-opacity=\"0.1\"%3E%3Ccircle cx=\"7\" cy=\"7\" r=\"1\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')" }} />
            
            {/* Card Content */}
            <div className="relative p-8 flex flex-col items-center gap-6">
              {/* Icon Badge */}
              <div className="w-16 h-16 rounded-full bg-background-dark border border-border-dark flex items-center justify-center shadow-inner">
                <span className="text-primary text-3xl">🔒</span>
              </div>
              
              <div className="text-center">
                <p className="text-text-secondary text-sm font-medium mb-1">Funds Locked in Smart Contract</p>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-5xl font-black tracking-tight text-white">{mockContract.ethLocked}</span>
                  <span className="text-2xl font-bold text-primary">ETH</span>
                </div>
                <p className="text-xs text-text-secondary mt-2 opacity-60">≈ $12,450.00 USD</p>
              </div>

              {/* Progress Bar */}
              <div className="w-full mt-2">
                <div className="flex justify-between text-xs text-text-secondary mb-2">
                  <span>Milestone Progress</span>
                  <span>{mockContract.progress}%</span>
                </div>
                <ProgressBar value={mockContract.progress} />
              </div>
            </div>

            {/* Bottom Meta */}
            <div className="bg-background-dark/50 px-6 py-3 border-t border-border-dark flex justify-between items-center text-xs text-text-secondary">
              <span>Contract #{mockContract.id}</span>
              <a className="hover:text-white transition-colors flex items-center gap-1" href="#">
                View on Etherscan
                <span>🔗</span>
              </a>
            </div>
          </div>

          {/* Action Area */}
          <div className="flex flex-col gap-3">
            {/* Verify Button */}
            <Button 
              className="relative group w-full overflow-hidden rounded-full h-14 shadow-primary"
              onClick={() => setShowVerificationModal(true)}
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              <div className="relative flex items-center gap-3 font-bold text-lg">
                <span>📹</span>
                <span>Verify Milestone via AI Oracle</span>
              </div>
            </Button>

            {/* Helper Text */}
            <div className="flex items-start gap-2 px-4 py-2 bg-blue-500/10 rounded-lg border border-blue-500/20">
              <span className="text-blue-400 shrink-0 text-lg mt-0.5">ℹ️</span>
              <p className="text-xs text-blue-200 leading-relaxed">
                Verification requires a 10s video scan of the site. Gemini 2.5 Flash will analyze the footage for concrete curing status.
              </p>
            </div>
          </div>

          {/* Timeline */}
          <div className="mt-4 pt-6 border-t border-border-dark">
            <h3 className="text-sm font-semibold text-white mb-4 px-2">Timeline</h3>
            <div className="relative pl-4 border-l border-border-dark space-y-6 ml-2">
              {timeline.map((step, index) => (
                <div key={step.id} className="relative pl-6">
                  <div className={`absolute -left-[21px] top-1 ${
                    step.status === 'completed' ? 'w-3 h-3 rounded-full bg-primary shadow-[0_0_8px_rgba(16,185,129,0.6)]' :
                    step.status === 'pending' ? 'w-4 h-4 rounded-full border-2 border-primary bg-background-dark animate-pulse -left-[23px] top-0' :
                    'w-3 h-3 rounded-full bg-border-dark -left-[21px] top-1'
                  }`} />
                  <div className={`flex flex-col gap-1 ${step.status === 'upcoming' ? 'opacity-50' : ''}`}>
                    <p className="text-white text-sm font-medium">{step.title}</p>
                    {step.status === 'completed' && (
                      <p className="text-xs text-text-secondary">Verified · {step.date}</p>
                    )}
                    {step.status === 'pending' && (
                      <Badge variant="pending" size="sm" className="w-fit">
                        Pending Action
                      </Badge>
                    )}
                    {step.status === 'upcoming' && (
                      <p className="text-xs text-text-secondary">{step.date}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-6 text-center text-xs text-text-secondary border-t border-border-dark bg-background-dark">
        <div className="flex items-center justify-center gap-2 mb-2">
          <span>Powered by</span>
          <span className="font-bold text-white">Ethereum</span>
          <span>&</span>
          <span className="font-bold text-white">Google Gemini</span>
        </div>
        <p>© 2024 Optic-Gov Protocol. All rights reserved.</p>
      </footer>

      {/* Verification Modal */}
      <Modal
        isOpen={showVerificationModal}
        onClose={() => setShowVerificationModal(false)}
        size="lg"
      >
        <div className="flex flex-col gap-6">
          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center text-primary mx-auto mb-4">
              <span className="text-3xl">📹</span>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">AI Milestone Verification</h3>
            <p className="text-text-secondary">
              Record a 10-second video of your construction site. Our AI will verify milestone completion.
            </p>
          </div>

          {!isProcessing ? (
            <>
              {/* Upload Options */}
              <div className="space-y-4">
                {/* Live Camera */}
                <button 
                  className="w-full border-2 border-dashed border-primary/50 hover:border-primary rounded-lg p-6 text-center transition-colors group bg-primary/5"
                  onClick={() => {
                    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
                      .then(stream => {
                        // Start live recording
                        console.log('Live recording started');
                        handleVerifyMilestone();
                      })
                      .catch(err => console.error('Camera access denied:', err));
                  }}
                >
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center border border-primary/30">
                      <svg className="w-6 h-6 text-primary" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z"/>
                      </svg>
                    </div>
                    <div>
                      <p className="text-primary font-bold">Record Live Video (10s)</p>
                      <p className="text-text-secondary text-sm mt-1">Use camera to record milestone evidence</p>
                    </div>
                  </div>
                </button>

                {/* File Upload */}
                <div className="relative">
                  <input 
                    type="file" 
                    accept="video/*" 
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        console.log('File selected:', file.name);
                        handleVerifyMilestone();
                      }
                    }}
                  />
                  <div className="border-2 border-dashed border-border-dark hover:border-primary rounded-lg p-6 text-center transition-colors group">
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-card-dark flex items-center justify-center border border-border-dark group-hover:border-primary transition-all">
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/>
                        </svg>
                      </div>
                      <div>
                        <p className="text-white font-bold">Upload Pre-recorded Video</p>
                        <p className="text-text-secondary text-sm mt-1">Select video file from device</p>
                      </div>
                      <p className="text-xs text-text-secondary">MP4, MOV up to 500MB</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <Button variant="secondary" className="flex-1" onClick={() => setShowVerificationModal(false)}>
                  Cancel
                </Button>
                <Button className="flex-1 shadow-primary" onClick={handleVerifyMilestone}>
                  <span>🚀</span>
                  Start Verification
                </Button>
              </div>
            </>
          ) : (
            /* Processing State */
            <div className="text-center py-8">
              <div className="w-20 h-20 rounded-full border-4 border-border-dark border-t-primary animate-spin mx-auto mb-6" />
              <h3 className="text-xl font-bold text-white mb-2">Analyzing Footage...</h3>
              <p className="text-text-secondary mb-4">
                Gemini AI is verifying concrete density and surface integrity.
              </p>
              <div className="bg-card-dark rounded-lg p-4 text-left max-w-md mx-auto">
                <div className="text-xs text-primary font-bold mb-2 flex items-center gap-1">
                  <span>🤖</span> AI Analysis Progress
                </div>
                <div className="space-y-2 text-xs text-text-secondary">
                  <div className="flex items-center gap-2">
                    <span className="text-primary">✓</span> Video quality check
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-primary">✓</span> GPS location verified
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 border border-primary border-t-transparent rounded-full animate-spin" />
                    Analyzing concrete curing...
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
};