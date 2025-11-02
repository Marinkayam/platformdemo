
import { useState, useRef, useEffect } from "react";
import { ChevronDown, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface DateRangePickerProps {
  fromDate: string;
  toDate: string;
  onDateChange: (fromDate: string, toDate: string) => void;
  label?: string;
}

export function DateRangePicker({ fromDate, toDate, onDateChange, label = "Due Date" }: DateRangePickerProps) {
  const [open, setOpen] = useState(false);
  
  const hasDateRange = fromDate || toDate;
  
  const handleClear = () => {
    onDateChange("", "");
  };

  const formatDateRange = () => {
    if (fromDate && toDate) {
      return `${fromDate} - ${toDate}`;
    } else if (fromDate) {
      return `From ${fromDate}`;
    } else if (toDate) {
      return `Until ${toDate}`;
    }
    return "";
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="h-8 font-normal">
          {label}
          {hasDateRange && (
            <>
              <Separator orientation="vertical" className="mx-2 h-4" />
              <Badge
                variant="secondary"
                className="rounded-sm px-1 font-normal flex items-center gap-1 text-xs"
                style={{ backgroundColor: '#EFEBFF' }}
              >
                {formatDateRange()}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleClear();
                  }}
                  className="ml-1 rounded-full p-0.5"
                >
                  <X className="text-current" style={{ width: '8px', height: '8px', color: '#7B59FF' }} />
                </button>
              </Badge>
            </>
          )}
          <ChevronDown strokeWidth={1.25} className="ml-2 h-5 w-5" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[280px] p-0" align="start">
        <div className="p-4">
          <div className="flex flex-col gap-3">
            <div>
              <label className="text-sm font-medium block mb-1">From</label>
              <input
                type="date"
                className="w-full border rounded-md px-2 py-1 text-sm focus:ring-1 focus:ring-primary focus:border-primary transition-shadow duration-200"
                value={fromDate}
                onChange={(e) => onDateChange(e.target.value, toDate)}
              />
            </div>
            <div>
              <label className="text-sm font-medium block mb-1">To</label>
              <input
                type="date"
                className="w-full border rounded-md px-2 py-1 text-sm focus:ring-1 focus:ring-primary focus:border-primary transition-shadow duration-200"
                value={toDate}
                onChange={(e) => onDateChange(fromDate, e.target.value)}
              />
            </div>
            <div className="flex gap-2 mt-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="w-1/2"
                onClick={() => {
                  handleClear();
                  setOpen(false);
                }}
              >
                Clear
              </Button>
              <Button 
                size="sm" 
                className="w-1/2"
                onClick={() => setOpen(false)}
              >
                Apply
              </Button>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
