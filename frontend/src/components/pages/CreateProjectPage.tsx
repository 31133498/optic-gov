import { useState } from 'react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { cn } from '../../utils/cn';

export const CreateProjectPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    location: '',
    contractorAddress: '',
    totalBudget: '',
    milestoneDescription: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      // Redirect to governor dashboard
      window.location.href = '/governor';
    }, 2000);
  };

  const updateField = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-background-dark text-white">
      {/* Header */}
      <header className="border-b border-border-dark bg-background-dark px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => window.history.back()}
              className="text-text-secondary hover:text-white transition-colors"
            >
              ← Back
            </button>
            <h1 className="text-xl font-bold">Create New Project</h1>
          </div>
          <div className="text-sm text-text-secondary">Governor Portal</div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto p-6">
        <div className="bg-card-dark rounded-xl border border-border-dark p-8">
          <div className="mb-8">
            <h2 className="text-3xl font-bold mb-2">Initiate New Public Work</h2>
            <p className="text-text-secondary">Define project parameters, set AI verification milestones, and escrow funds via Smart Contract.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Info */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                📋 Project Details
              </h3>
              
              <Input
                id="name"
                label="Project Name"
                placeholder="e.g. Lagos Main Bridge Repair"
                value={formData.name}
                onChange={(e) => updateField('name', e.target.value)}
                className="bg-background-dark border-border-dark"
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  id="location"
                  label="Location"
                  placeholder="e.g. Downtown District"
                  value={formData.location}
                  onChange={(e) => updateField('location', e.target.value)}
                  className="bg-background-dark border-border-dark"
                />
                
                <Input
                  id="totalBudget"
                  label="Total Budget (ETH)"
                  type="number"
                  placeholder="5.0"
                  value={formData.totalBudget}
                  onChange={(e) => updateField('totalBudget', e.target.value)}
                  className="bg-background-dark border-border-dark"
                />
              </div>

              <Input
                id="contractorAddress"
                label="Contractor Wallet Address"
                placeholder="0x..."
                value={formData.contractorAddress}
                onChange={(e) => updateField('contractorAddress', e.target.value)}
                className="bg-background-dark border-border-dark"
              />
            </div>

            {/* AI Milestone */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                🤖 Milestone 1 Criteria (AI Oracle)
              </h3>
              
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  AI Verification Requirements
                </label>
                <textarea
                  className="w-full bg-background-dark border border-border-dark rounded-xl p-4 text-white placeholder-text-secondary focus:ring-1 focus:ring-primary focus:border-primary transition-all resize-none"
                  placeholder="e.g. High-angle photo of freshly poured concrete foundation with visible rebar reinforcement grid. Must show at least 4 corner pilings."
                  rows={4}
                  value={formData.milestoneDescription}
                  onChange={(e) => updateField('milestoneDescription', e.target.value)}
                />
                <p className="text-xs text-text-secondary mt-2">
                  Describe the visual evidence required for funds release. The AI will verify uploaded photos against this prompt.
                </p>
              </div>
            </div>

            {/* Summary */}
            <div className="bg-background-dark rounded-xl p-6 border border-border-dark">
              <h4 className="font-bold text-white mb-4">Contract Summary</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-text-secondary">Network Status</span>
                  <span className="text-primary flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-primary" />
                    Active
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">Est. Gas Fee</span>
                  <span className="text-white font-mono">0.0042 ETH</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">Oracle Fee</span>
                  <span className="text-white font-mono">0.0100 ETH</span>
                </div>
                <div className="border-t border-border-dark pt-2 mt-2">
                  <div className="flex justify-between items-end">
                    <span className="text-text-secondary font-medium">Total Value Locked</span>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-white">
                        {formData.totalBudget ? (parseFloat(formData.totalBudget) + 0.0142).toFixed(4) : '0.0142'}
                      </div>
                      <div className="text-xs text-text-secondary">ETH</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4 pt-4">
              <Button 
                type="button" 
                variant="secondary" 
                onClick={() => window.history.back()}
                className="flex-1"
              >
                Save Draft
              </Button>
              <Button 
                type="submit" 
                loading={isSubmitting}
                className="flex-1 shadow-primary"
              >
                {isSubmitting ? 'Deploying Contract...' : 'Deploy & Fund'}
              </Button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};