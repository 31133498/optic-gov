export interface Project {
  id: string;
  name: string;
  description: string;
  location: string;
  contractAddress: string;
  totalBudget: number;
  ethLocked: number;
  ethReleased: number;
  status: 'pending' | 'in-progress' | 'verified' | 'completed' | 'alert';
  progress: number;
  aiConfidence?: number;
  contractor: {
    name: string;
    address: string;
    trustScore: number;
    completedProjects: number;
  };
  milestones: Milestone[];
  evidence: Evidence[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Milestone {
  id: string;
  projectId: string;
  title: string;
  description: string;
  requirements: string;
  status: 'locked' | 'pending' | 'in-progress' | 'verified' | 'completed';
  ethAmount: number;
  dueDate: Date;
  completedAt?: Date;
  evidence?: Evidence[];
  aiAnalysis?: AIAnalysis;
}

export interface Evidence {
  id: string;
  type: 'image' | 'video' | 'document';
  url: string;
  filename: string;
  uploadedAt: Date;
  metadata: {
    gpsCoordinates?: { lat: number; lng: number };
    timestamp: Date;
    fileSize: number;
    mimeType: string;
  };
  aiAnalysis?: AIAnalysis;
}

export interface AIAnalysis {
  id: string;
  confidence: number;
  status: 'analyzing' | 'verified' | 'failed' | 'requires-review';
  findings: string[];
  matchPercentage: number;
  processedAt: Date;
  model: 'gemini-2.5-flash' | 'gemini-pro';
}

export interface MapPin {
  id: string;
  projectId: string;
  position: { lat: number; lng: number };
  status: Project['status'];
  title: string;
}

export interface ContractorProfile {
  address: string;
  name: string;
  description?: string;
  trustScore: number;
  completedProjects: number;
  totalValueDelivered: number;
  verificationLevel: 1 | 2 | 3 | 4 | 5;
  activeProjects: string[];
  avatar?: string;
}