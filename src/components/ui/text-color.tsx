'use client';

import { cn } from '@/lib/utils';
import { Plus } from 'lucide-react';

interface TextColorProps {
  children: string;
  className?: string;
}

export function TextColor({ children, className }: TextColorProps) {
  return (
    <div className={cn("relative", className)}>
      <div className="flex items-center space-x-2">
        <div className="flex items-center space-x-1">
          <Plus className="w-4 h-4 text-monto-primary animate-pulse" />
          <Plus className="w-4 h-4 text-monto-primary/60 animate-pulse" style={{ animationDelay: '0.5s' }} />
        </div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-monto-primary via-monto-secondary to-monto-primary bg-clip-text text-transparent animate-gradient-x">
          {children}
        </h1>
        <div className="flex items-center space-x-1">
          <Plus className="w-4 h-4 text-monto-primary/60 animate-pulse" style={{ animationDelay: '1s' }} />
          <Plus className="w-4 h-4 text-monto-primary animate-pulse" style={{ animationDelay: '1.5s' }} />
        </div>
      </div>
    </div>
  );
}