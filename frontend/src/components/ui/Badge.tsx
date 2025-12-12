import { ReactNode } from 'react';
import { cn } from '../../utils/cn';

interface BadgeProps {
  variant?: 'verified' | 'pending' | 'alert' | 'in-progress' | 'locked';
  size?: 'sm' | 'md' | 'lg';
  children: ReactNode;
  className?: string;
}

const variants = {
  verified: 'bg-primary/20 text-primary border-primary/20',
  pending: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/20',
  alert: 'bg-red-500/20 text-red-400 border-red-500/20',
  'in-progress': 'bg-blue-500/20 text-blue-400 border-blue-500/20',
  locked: 'bg-border-dark text-text-secondary border-border-dark',
};

const sizes = {
  sm: 'text-xs px-2 py-0.5',
  md: 'text-sm px-3 py-1',
  lg: 'text-base px-4 py-1.5',
};

export const Badge = ({ variant = 'verified', size = 'sm', children, className }: BadgeProps) => {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 font-bold uppercase tracking-wider rounded-full border',
        variants[variant],
        sizes[size],
        className,
      )}
    >
      {children}
    </span>
  );
};