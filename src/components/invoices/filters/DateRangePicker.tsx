
import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DateRangePickerProps {
  fromDate: string;
  toDate: string;
  onDateChange: (fromDate: string, toDate: string) => void;
}

export function DateRangePicker({ fromDate, toDate, onDateChange }: DateRangePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  let displayValue = "All";
  if (fromDate && toDate) {
    displayValue = `${fromDate} - ${toDate}`;
  } else if (fromDate) {
    displayValue = `From ${fromDate}`;
  } else if (toDate) {
    displayValue = `Until ${toDate}`;
  }

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <div 
        onClick={() => setIsOpen(!isOpen)} 
        className="flex items-center gap-2 border rounded-md px-3 h-9 bg-white cursor-pointer hover:bg-gray-50 transition-colors"
      >
        <span className="text-sm text-gray-500 whitespace-nowrap">Due Date:</span>
        <span className="text-sm font-medium truncate max-w-[100px]">{displayValue}</span>
        <ChevronDown 
          size={16} 
          className={`text-gray-400 transition-transform duration-300 ease-in-out ${isOpen ? 'rotate-180' : ''}`} 
        />
      </div>
      
      {isOpen && (
        <div className="absolute top-full left-0 mt-1 w-72 bg-white border rounded-md shadow-lg p-3 z-10 animate-fade-in">
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
                  onDateChange("", "");
                  setIsOpen(false);
                }}
              >
                Clear
              </Button>
              <Button 
                size="sm" 
                className="w-1/2"
                onClick={() => setIsOpen(false)}
              >
                Apply
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
