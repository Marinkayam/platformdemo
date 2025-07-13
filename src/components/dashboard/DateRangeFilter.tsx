import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Calendar } from 'lucide-react';

export type DateRange = 'last-day' | 'last-week' | 'last-month' | 'last-year';

interface DateRangeFilterProps {
  value: DateRange;
  onChange: (range: DateRange) => void;
  className?: string;
}

const dateRangeOptions = [
  { value: 'last-day' as const, label: 'Last Day' },
  { value: 'last-week' as const, label: 'Last Week' },
  { value: 'last-month' as const, label: 'Last Month' },
  { value: 'last-year' as const, label: 'Last Year' },
];

export function DateRangeFilter({ value, onChange, className = '' }: DateRangeFilterProps) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="flex items-center gap-2 text-sm text-[#586079]">
        <Calendar className="h-4 w-4" style={{ width: 16, height: 16 }} />
        <span>Period:</span>
      </div>
      <div className="flex gap-1 p-1 bg-[#F8F9FA] rounded-lg border border-[#E6E7EB]">
        {dateRangeOptions.map((option) => (
          <Button
            key={option.value}
            variant="ghost"
            size="sm"
            onClick={() => onChange(option.value)}
            className={`h-7 px-3 text-xs font-medium transition-all ${
              value === option.value
                ? 'bg-white text-[#7B59FF] shadow-sm border border-[#7B59FF]/20'
                : 'text-[#586079] hover:text-[#061237] hover:bg-white/50'
            }`}
          >
            {option.label}
          </Button>
        ))}
      </div>
    </div>
  );
}