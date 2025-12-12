import { motion } from 'framer-motion';

interface UserTypeSelectorProps {
  userType: 'governor' | 'contractor';
  onChange: (type: 'governor' | 'contractor') => void;
  className?: string;
}

export const UserTypeSelector = ({ userType, onChange, className = '' }: UserTypeSelectorProps) => {
  return (
    <div className={`flex gap-2 ${className}`}>
      <motion.button
        type="button"
        onClick={() => onChange('governor')}
        className={`px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${
          userType === 'governor'
            ? 'bg-primary text-background-dark'
            : 'bg-transparent border border-border-dark text-text-secondary hover:text-white hover:bg-border-dark'
        }`}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        🏛️ Governor
      </motion.button>
      <motion.button
        type="button"
        onClick={() => onChange('contractor')}
        className={`px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${
          userType === 'contractor'
            ? 'bg-primary text-background-dark'
            : 'bg-transparent border border-border-dark text-text-secondary hover:text-white hover:bg-border-dark'
        }`}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        👷 Contractor
      </motion.button>
    </div>
  );
};