import { cn } from '../../utils/cn';

interface ProgressBarProps {
  value: number;
  max?: number;
  variant?: 'primary' | 'warning' | 'error';
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  className?: string;
}

const variants = {
  primary: 'bg-primary shadow-[0_0_10px_rgba(16,185,129,0.5)]',
  warning: 'bg-yellow-400',
  error: 'bg-red-500',
};

const sizes = {
  sm: 'h-1.5',
  md: 'h-2',
  lg: 'h-3',
};

export const ProgressBar = ({ 
  value, 
  max = 100, 
  variant = 'primary', 
  size = 'md', 
  showLabel = false,
  className 
}: ProgressBarProps) => {
  const percentage = Math.min((value / max) * 100, 100);

  return (
    <div className={cn('w-full', className)}>
      {showLabel && (
        <div className="flex justify-between text-xs mb-1">
          <span className="text-white">Progress</span>
          <span className="text-primary">{Math.round(percentage)}%</span>
        </div>
      )}
      <div className={cn('w-full bg-background-dark rounded-full overflow-hidden', sizes[size])}>
        <div 
          className={cn('h-full rounded-full transition-all duration-300', variants[variant])}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};