# Optic-Gov Frontend Components

This document outlines the new Optic-Gov interface components that have been integrated into the existing frontend codebase.

## 🏗️ Architecture

The components follow the existing project patterns:
- **TypeScript + React** with functional components and hooks
- **Tailwind CSS** for styling with existing color tokens
- **Component-driven architecture** with reusable UI primitives
- **Responsive design** for mobile, tablet, and desktop

## 🎨 UI Components (`src/components/ui/`)

### Badge
Displays status indicators with consistent styling.
```tsx
<Badge variant="verified" size="sm">
  <span>✓</span> VERIFIED
</Badge>
```

### MapPin
Interactive map markers for the transparency map.
```tsx
<MapPin 
  status="verified" 
  position={{ top: '45%', left: '52%' }}
  tooltip={<div>Project details...</div>}
  onClick={handleClick}
/>
```

### Modal
Accessible modal dialogs with backdrop blur and keyboard navigation.
```tsx
<Modal isOpen={isOpen} onClose={onClose} title="Evidence Vault">
  <div>Modal content...</div>
</Modal>
```

### ProgressBar
Visual progress indicators for milestones and completion tracking.
```tsx
<ProgressBar value={75} variant="primary" showLabel />
```

## 📱 Pages (`src/components/pages/`)

### TransparencyMapPage
Public-facing transparency map with interactive project pins, sidebar filtering, and evidence vault modal.

**Features:**
- Interactive map with project status pins
- Real-time stats HUD (ETH locked/released, corruption prevented)
- Filterable project sidebar
- Evidence vault modal with AI analysis display
- Responsive design with mobile-first approach

### ProjectDetailsPage
Detailed project view with milestone timeline and contractor information.

**Features:**
- Project metadata and stats grid
- Interactive milestone timeline with AI verification status
- Evidence vault gallery
- Contractor profile and trust score
- Financial progress tracking

### GovernorDashboardPage
Administrative dashboard for government officials to monitor all projects.

**Features:**
- Interactive map overview with project pins
- Real-time project monitoring sidebar
- Search and filter functionality
- Project status tracking with AI confidence scores
- Blockchain sync status indicator

### ContractorPortalPage
Mobile-first interface for contractors to submit milestone verification.

**Features:**
- Active contract status display
- Milestone verification flow with AI processing
- Timeline tracking with completion status
- Video upload for AI verification
- Processing states with real-time feedback

### OpticGovDemo
Navigation component to switch between all interfaces for demonstration purposes.

## 🔧 Types (`src/types/project.ts`)

Extended type definitions for the Optic-Gov ecosystem:

```typescript
interface Project {
  id: string;
  name: string;
  status: 'pending' | 'in-progress' | 'verified' | 'completed' | 'alert';
  contractor: ContractorProfile;
  milestones: Milestone[];
  evidence: Evidence[];
  aiConfidence?: number;
  // ... more fields
}

interface Milestone {
  id: string;
  status: 'locked' | 'pending' | 'in-progress' | 'verified' | 'completed';
  aiAnalysis?: AIAnalysis;
  // ... more fields
}
```

## 🎯 Key Features

### AI Integration
- **Gemini 2.5 Flash** analysis display
- Real-time confidence scoring
- Visual evidence verification
- Processing state indicators

### Blockchain Integration
- Smart contract interaction displays
- ETH locking/release tracking
- Transaction hash display
- Wallet connection status

### Accessibility
- Keyboard navigation support
- ARIA attributes for screen readers
- Focus management in modals
- Semantic HTML structure

### Responsive Design
- Mobile-first approach
- Tablet and desktop optimizations
- Touch-friendly interactions
- Adaptive layouts

## 🚀 Usage

### Adding to Existing Routes
```tsx
import { TransparencyMapPage } from './components/pages/TransparencyMapPage';

// In your router
<Route path="/transparency-map" element={<TransparencyMapPage />} />
```

### Using UI Components
```tsx
import { Badge, ProgressBar, Modal } from './components/ui';

// In your component
<Badge variant="verified">Verified</Badge>
<ProgressBar value={75} showLabel />
```

### Customizing Styles
The components use the existing Tailwind configuration and color tokens:
- `primary` - Main brand color (#10b981)
- `card-dark` - Dark surface color (#15181e)
- `border-dark` - Border color (#252a33)
- `text-secondary` - Muted text (#9ca3af)

## 🔄 Integration Notes

1. **Existing Patterns**: All components follow the established codebase patterns
2. **Type Safety**: Full TypeScript support with proper interfaces
3. **Performance**: Optimized with React best practices and lazy loading
4. **Maintainability**: Modular architecture with clear separation of concerns
5. **Extensibility**: Easy to extend with additional features and customizations

## 🧪 Testing Considerations

- Unit tests for individual components
- Integration tests for page interactions
- Accessibility testing with screen readers
- Cross-browser compatibility testing
- Mobile device testing for touch interactions

The components are production-ready and integrate seamlessly with the existing codebase architecture.