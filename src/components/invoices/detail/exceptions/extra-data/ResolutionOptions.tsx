
import { ChevronDown, ChevronUp } from "lucide-react";

interface ResolutionOptionsProps {
  selectedAction: string | null;
  showOtherOptions: boolean;
  onSelectedActionChange: (value: string) => void;
  onShowOtherOptionsChange: (show: boolean) => void;
}

export function ResolutionOptions({
  selectedAction,
  showOtherOptions,
  onSelectedActionChange,
  onShowOtherOptionsChange,
}: ResolutionOptionsProps) {
  const toggleOtherOptions = () => {
    onShowOtherOptionsChange(!showOtherOptions);
  };

  const handleOptionSelect = (option: string) => {
    onSelectedActionChange(option);
  };

  return (
    <div className="bg-white p-4 rounded-xl border border-gray-200">
      <div className="py-0">
        <button 
          className="w-full flex justify-between items-center px-2 py-2 rounded-lg bg-white hover:bg-gray-50 transition-colors duration-200 ease-in-out"
          onClick={toggleOtherOptions}
        >
          <span className="font-medium text-sm" style={{ color: '#38415F' }}>
            Other Resolution Options
          </span>
          {showOtherOptions ? 
            <ChevronUp size={16} style={{ color: '#8C92A3' }} /> : 
            <ChevronDown size={16} style={{ color: '#8C92A3' }} />
          }
        </button>
      </div>
      
      {showOtherOptions && (
        <div className="pt-2 space-y-4">
          <div>
            <label className="flex items-start gap-2 cursor-pointer p-2 rounded hover:bg-gray-50 transition-colors duration-200 ease-in-out">
              <input 
                type="radio" 
                name="resolutionOption" 
                value="force_submit" 
                checked={selectedAction === 'force_submit'} 
                onChange={() => handleOptionSelect('force_submit')}
                className="mt-1 focus:ring-purple-200"
                style={{ accentColor: '#7B59FF' }}
              />
              <div>
                <h4 className="font-medium text-sm" style={{ color: '#38415F' }}>
                  Force submit
                </h4>
                <p className="text-sm" style={{ color: '#8C92A3' }}>
                  Submit the invoice despite missing data
                </p>
              </div>
            </label>
          </div>
          
          <div>
            <label className="flex items-start gap-2 cursor-pointer p-2 rounded hover:bg-gray-50 transition-colors duration-200 ease-in-out">
              <input 
                type="radio" 
                name="resolutionOption" 
                value="exclude" 
                checked={selectedAction === 'exclude'} 
                onChange={() => handleOptionSelect('exclude')}
                className="mt-1 focus:ring-purple-200"
                style={{ accentColor: '#7B59FF' }}
              />
              <div>
                <h4 className="font-medium text-sm" style={{ color: '#38415F' }}>
                  Exclude from submission
                </h4>
                <p className="text-sm" style={{ color: '#8C92A3' }}>
                  Remove this invoice from processing
                </p>
              </div>
            </label>
          </div>
          
          <div>
            <label className="flex items-start gap-2 cursor-pointer p-2 rounded hover:bg-gray-50 transition-colors duration-200 ease-in-out">
              <input 
                type="radio" 
                name="resolutionOption" 
                value="resolve_outside" 
                checked={selectedAction === 'resolve_outside'} 
                onChange={() => handleOptionSelect('resolve_outside')}
                className="mt-1 focus:ring-purple-200"
                style={{ accentColor: '#7B59FF' }}
              />
              <div>
                <h4 className="font-medium text-sm" style={{ color: '#38415F' }}>
                  Resolve outside monto
                </h4>
                <p className="text-sm" style={{ color: '#8C92A3' }}>
                  Mark as resolved if handled externally
                </p>
              </div>
            </label>
          </div>
        </div>
      )}
    </div>
  );
}
