
import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface DesignFilterDropdownProps {
  label: string;
  value: string | string[];
  options: string[];
  onSelect: (value: string | string[]) => void;
  multiSelect?: boolean;
  searchable?: boolean;
  className?: string;
}

export function DesignFilterDropdown({ 
  label, 
  value, 
  options, 
  onSelect, 
  multiSelect = false, 
  searchable = false,
  className = ""
}: DesignFilterDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  const values = Array.isArray(value) ? value : [value];
  const displayValue = Array.isArray(value) && value.length > 0 
    ? value.length > 1 ? `${value[0]} +${value.length - 1}` : value[0]
    : value;
  
  const filteredOptions = searchable && search 
    ? options.filter(option => option.toLowerCase().includes(search.toLowerCase())) 
    : options;

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

  const handleSelect = (option: string) => {
    if (multiSelect) {
      const newValues = values.includes(option) 
        ? values.filter(v => v !== option) 
        : [...values, option];
      onSelect(newValues);
    } else {
      onSelect(option);
      setIsOpen(false);
    }
  };

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <div 
        onClick={() => setIsOpen(!isOpen)} 
        className="flex items-center gap-2 border border-grey-400 rounded-lg px-3 h-9 bg-background-paper cursor-pointer hover:bg-grey-200 transition-colors"
      >
        <span className="text-sm text-grey-500 whitespace-nowrap">{label}:</span>
        <span className="text-sm font-medium truncate max-w-[100px]">
          {Array.isArray(value) 
            ? (value.length === 0 ? "All" : displayValue) 
            : (value === "All" ? "All" : value)
          }
        </span>
        <ChevronDown 
          size={16} 
          className={`text-grey-400 transition-transform duration-300 ease-in-out ${isOpen ? 'rotate-180' : ''}`} 
        />
      </div>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className="absolute top-full left-0 mt-1 w-60 bg-background-paper border border-grey-300 rounded-lg shadow-lg py-1 z-[9999]"
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.2 }}
            style={{ position: 'absolute' }}
          >
            {searchable && (
              <div className="px-3 py-2 border-b border-grey-300">
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full text-sm border border-grey-400 rounded-md px-2 py-1 focus:outline-none focus:ring-1 focus:ring-primary-main transition-shadow duration-200"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  onClick={(e) => e.stopPropagation()}
                  autoFocus
                />
              </div>
            )}
            
            <div className="max-h-60 overflow-y-auto">
              {filteredOptions.map((option) => (
                <div
                  key={option}
                  className={`px-3 py-2 text-sm hover:bg-grey-200 cursor-pointer transition-colors flex items-center justify-between
                    ${multiSelect && values.includes(option) ? 'bg-grey-200 font-medium' : ''}
                    ${!multiSelect && option === value ? 'bg-grey-200 font-medium' : ''}
                  `}
                  onClick={() => handleSelect(option)}
                >
                  {option}
                  {multiSelect && values.includes(option) && (
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary-main">
                      <path d="M20 6 9 17l-5-5"/>
                    </svg>
                  )}
                </div>
              ))}
              
              {filteredOptions.length === 0 && (
                <div className="px-3 py-2 text-sm text-grey-500 text-center">
                  No results found
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
