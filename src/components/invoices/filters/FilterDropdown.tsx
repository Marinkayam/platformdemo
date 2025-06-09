import { useState, useRef, useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface FilterDropdownProps {
  label: string;
  value: string | string[];
  options: string[];
  onSelect: (value: string | string[]) => void;
  multiSelect?: boolean;
  searchable?: boolean;
  renderOption?: (option: string) => React.ReactNode;
}

export function FilterDropdown({ 
  label, 
  value, 
  options, 
  onSelect, 
  multiSelect = false, 
  searchable = false, 
  renderOption 
}: FilterDropdownProps) {
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
    <div className="relative" ref={dropdownRef}>
      <div 
        onClick={() => setIsOpen(!isOpen)} 
        className="flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-background px-5 py-3 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary-main focus-visible:border-primary-main disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 cursor-pointer hover:bg-grey-50 transition-colors"
      >
        <span className="text-sm text-grey-500 whitespace-nowrap mr-1">{label}:</span>
        <span className="text-sm font-medium truncate max-w-[100px]">
          {Array.isArray(value) 
            ? (value.length === 0 ? "All" : displayValue) 
            : (value === "All" ? "All" : value)
          }
        </span>
        <ChevronDown 
          size={16} 
          className={`text-gray-400 transition-transform duration-300 ease-in-out ml-4 ${isOpen ? 'rotate-180' : ''}`} 
        />
      </div>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className="absolute top-full left-0 mt-1 w-60 bg-white border rounded-md shadow-lg py-1 z-[9999]"
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.2 }}
            style={{ position: 'absolute' }}
          >
            {searchable && (
              <div className="px-3 py-2 border-b">
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full text-sm border rounded-md px-2 py-1 focus-visible:outline-none focus-visible:border-primary-main transition-shadow duration-200"
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
                  className={`px-3 py-2 text-sm hover:bg-gray-100 cursor-pointer transition-colors flex items-center justify-between
                    ${multiSelect && values.includes(option) ? 'bg-gray-50 font-medium' : ''}
                    ${!multiSelect && option === value ? 'bg-gray-50 font-medium' : ''}
                  `}
                  onClick={() => handleSelect(option)}
                >
                  {renderOption ? renderOption(option) : option}
                  {multiSelect && values.includes(option) && (
                    <svg xmlns="≈http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                      <path d="M20 6 9 17l-5-5"/>
                    </svg>
                  )}
                </div>
              ))}
              
              {filteredOptions.length === 0 && (
                <div className="px-3 py-2 text-sm text-gray-500 text-center">
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
