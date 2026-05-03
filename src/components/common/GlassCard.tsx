import React from 'react';
import { cn } from '../../lib/utils';
import { motion } from 'motion/react';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  noPadding?: boolean;
}

export const GlassCard: React.FC<GlassCardProps> = ({ children, className, noPadding }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "glass-effect rounded-2xl transition-all duration-300",
        !noPadding && "p-6",
        className
      )}
    >
      {children}
    </motion.div>
  );
};

interface StatusBadgeProps {
  status: string;
  type?: 'success' | 'warning' | 'error' | 'info' | 'neutral';
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, type = 'neutral' }) => {
  const types = {
    success: "bg-emerald-100 text-emerald-700 border-emerald-200",
    warning: "bg-amber-100 text-amber-700 border-amber-200",
    error: "bg-rose-100 text-rose-700 border-rose-200",
    info: "bg-blue-100 text-blue-700 border-blue-200",
    neutral: "bg-slate-100 text-slate-700 border-slate-200",
  };

  return (
    <span className={cn("px-3 py-1 rounded-full text-xs font-medium border", types[type])}>
      {status}
    </span>
  );
};
