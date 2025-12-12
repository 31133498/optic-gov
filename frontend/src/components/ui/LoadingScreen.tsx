import { Icon } from '@/components/ui/Icon';

interface LoadingScreenProps {
  message?: string;
}

export const LoadingScreen = ({ message = "Loading project details..." }: LoadingScreenProps) => {
  return (
    <div className="fixed inset-0 bg-[#122017] flex items-center justify-center z-50">
      <div className="flex flex-col items-center gap-6">
        {/* Logo */}
        <div className="flex items-center gap-3 text-white">
          <div className="size-10 text-[#38e07b]">
            <Icon name="policy" />
          </div>
          <h2 className="text-white text-xl font-bold">Optic-Gov</h2>
        </div>
        
        {/* Loading Animation */}
        <div className="relative">
          <div className="w-16 h-16 border-4 border-[#29382f] border-t-[#38e07b] rounded-full animate-spin" />
          <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-r-[#38e07b]/30 rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }} />
        </div>
        
        {/* Loading Message */}
        <div className="text-center">
          <p className="text-white font-medium mb-1">{message}</p>
          <p className="text-[#9cbaa6] text-sm">Verifying blockchain data...</p>
        </div>
        
        {/* Progress Dots */}
        <div className="flex gap-2">
          <div className="w-2 h-2 bg-[#38e07b] rounded-full animate-pulse" />
          <div className="w-2 h-2 bg-[#38e07b] rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
          <div className="w-2 h-2 bg-[#38e07b] rounded-full animate-pulse" style={{ animationDelay: '0.4s' }} />
        </div>
      </div>
    </div>
  );
};