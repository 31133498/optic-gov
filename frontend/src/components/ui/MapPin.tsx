import { ReactNode } from 'react';
import { cn } from '../../utils/cn';

interface MapPinProps {
  status: 'verified' | 'pending' | 'alert' | 'in-progress';
  size?: 'sm' | 'md' | 'lg';
  position: { top: string; left: string };
  tooltip?: ReactNode;
  onClick?: () => void;
  className?: string;
}

const statusStyles = {
  verified: 'bg-primary shadow-[0_0_15px_rgba(16,185,129,0.6)] animate-pulse-glow',
  pending: 'bg-yellow-400 shadow-[0_0_15px_rgba(251,191,36,0.6)]',
  alert: 'bg-red-500 shadow-[0_0_15px_rgba(239,68,68,0.6)]',
  'in-progress': 'bg-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.6)]',
};

const sizes = {
  sm: 'w-3 h-3',
  md: 'w-4 h-4',
  lg: 'w-6 h-6',
};

export const MapPin = ({ 
  status, 
  size = 'md', 
  position, 
  tooltip, 
  onClick, 
  className 
}: MapPinProps) => {
  return (
    <div 
      className={cn('absolute group cursor-pointer', className)}
      style={{ top: position.top, left: position.left }}
      onClick={onClick}
    >
      <div className="relative flex items-center justify-center">
        <div 
          className={cn(
            'rounded-full border-2 border-white z-10',
            statusStyles[status],
            sizes[size]
          )}
        />
        {status === 'verified' && (
          <div className="absolute w-10 h-10 bg-primary/30 rounded-full animate-ping" />
        )}
      </div>
      
      {tooltip && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 mb-2 w-48 bg-card-dark border border-border-dark p-3 rounded-lg shadow-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-20">
          {tooltip}
        </div>
      )}
    </div>
  );
};