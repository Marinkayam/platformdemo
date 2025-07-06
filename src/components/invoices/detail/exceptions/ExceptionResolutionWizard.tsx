import React, { useState, useEffect } from 'react';
import { AlertTriangle, Upload, ChevronDown, ChevronUp, WandSparkles, X, File, TriangleAlert } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ExceptionBanner } from '@/components/ui/exception-banner';

interface ExceptionResolutionWizardProps {
  onResolve?: (resolutionData: any) => void;
  onCancel?: () => void;
  exceptions?: Array<{
    id: string;
    title: string;
    description: string;
    severity: 'warning' | 'error';
    color: string;
  }>;
}

/**
 * ExceptionResolutionWizard Component
 * 
 * A comprehensive wizard for resolving PO exceptions with multiple resolution methods:
 * 1. File upload for new RTP
 * 2. Force submit option
 * 3. Exclude from submission
 * 4. Mark as resolved outside system
 */
const ExceptionResolutionWizard = ({ 
  onResolve, 
  onCancel,
  exceptions = [
    {
      id: 'po_status',
      title: 'PO status',
      description: 'The PO is closed for invoicing',
      severity: 'warning' as const,
      color: '#DF1C41'
    },
    {
      id: 'po_funds',
      title: 'PO funds', 
      description: "The PO doesn't have enough available funds to cover the full invoice amount",
      severity: 'error' as const,
      color: '#DF1C41'
    }
  ]
}: ExceptionResolutionWizardProps) => {
  const navigate = useNavigate();
  
  // State management
  const [showOtherOptions, setShowOtherOptions] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  
  /**
   * File Upload Handler
   * Simulates file upload process with progress tracking
   */
  const handleFileUpload = (file: File) => {
    if (file) {
      setIsUploading(true);
      setUploadProgress(0);
      setSelectedOption('upload');
      setUploadedFile(file);
      
      // Simulate upload progress
      const interval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setIsUploading(false);
            return 100;
          }
          return prev + 10;
        });
      }, 200);
    }
  };
  
  /**
   * File Input Change Handler
   * Handles file selection from input element
   */
  const handleFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      handleFileUpload(file);
    }
  };
  
  /**
   * Drag and Drop Handlers
   * Enable drag & drop functionality for file upload
   */
  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
  };
  
  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file) {
      handleFileUpload(file);
    }
  };
  
  /**
   * File Removal Handler
   * Clears uploaded file and resets related states
   */
  const handleFileRemoval = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setUploadedFile(null);
    setSelectedOption(null);
    setIsUploading(false);
    setUploadProgress(0);
  };
  
  /**
   * Action Button State Logic
   * Determines if the main action button should be enabled
   */
  const isActionButtonEnabled = () => {
    if (selectedOption === 'upload') {
      return uploadedFile !== null && !isUploading;
    }
    return selectedOption !== null;
  };
  
  /**
   * Toggle Other Options Visibility
   */
  const toggleOtherOptions = () => {
    setShowOtherOptions(!showOtherOptions);
  };
  
  /**
   * Option Selection Handler
   * Updates selected option and clears file if not upload option
   */
  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
    if (option !== 'upload') {
      setUploadedFile(null);
      setIsUploading(false);
      setUploadProgress(0);
    }
  };
  
  /**
   * Main Button Click Handler
   * Shows confirmation for non-upload options, processes upload directly
   */
  const handleMainButtonClick = () => {
    if (!isActionButtonEnabled()) return;
    
    if (selectedOption !== 'upload') {
      setShowConfirmationModal(true);
    } else {
      // Process upload action
      onResolve && onResolve({
        action: 'upload',
        file: uploadedFile,
        data: {
          fileName: uploadedFile?.name,
          fileSize: uploadedFile?.size,
          resolutionMethod: 'file_upload'
        }
      });
      
      // Navigate back to invoices table
      navigate('/invoices');
    }
  };
  
  /**
   * Confirmation Action Handler
   * Processes confirmed non-upload actions
   */
  const confirmAction = () => {
    setShowConfirmationModal(false);
    onResolve && onResolve({
      action: selectedOption,
      data: {
        resolutionMethod: selectedOption,
        confirmedAt: new Date().toISOString()
      }
    });
    
    // Navigate back to invoices table
    navigate('/invoices');
  };
  
  /**
   * Cancel Confirmation Handler
   */
  const cancelConfirmation = () => {
    setShowConfirmationModal(false);
  };
  
  /**
   * Get Action Button Text
   * Returns appropriate button text based on selected option
   */
  const getActionButtonText = () => {
    switch(selectedOption) {
      case 'upload':
        return 'Mark as Solved';
      case 'force_submit':
        return 'Force Submit';
      case 'exclude':
        return 'Exclude from Submission';
      case 'resolve_outside':
        return 'Mark as Resolved Outside';
      case null:
        return 'Select Resolution Method';
      default:
        return 'Select Resolution Method';
    }
  };
  
  /**
   * Confirmation Modal Component
   * Shows confirmation dialog for destructive actions
   */
  const ConfirmationModal = () => {
    if (!showConfirmationModal) return null;
    
    const getConfirmationMessage = () => {
      switch(selectedOption) {
        case 'force_submit':
          return 'may cause issues with validation';
        case 'exclude':
          return 'will prevent the invoice from being submitted';
        case 'resolve_outside':
          return 'requires confirming resolution happened outside the system';
        default:
          return 'cannot be undone';
      }
    };
    
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl max-w-md w-full p-6 shadow-lg">
          <div className="text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full mb-4" style={{ backgroundColor: '#FFEBEE' }}>
              <AlertTriangle className="h-6 w-6" style={{ color: '#DF1C41' }} />
            </div>
            <h3 className="text-lg font-semibold mb-2" style={{ color: '#38415F' }}>
              Are you sure?
            </h3>
            <p className="text-sm mb-6" style={{ color: '#8C92A3' }}>
              Are you sure you want to{' '}
              <span className="font-medium" style={{ color: '#38415F' }}>
                {getActionButtonText().toLowerCase()}
              </span>
              ? This action {getConfirmationMessage()}.
            </p>
            
            <div className="flex justify-center gap-3">
              <button
                onClick={cancelConfirmation}
                className="inline-flex justify-center px-6 py-3 border border-gray-200 shadow-sm text-sm font-medium rounded-lg bg-white hover:bg-gray-50 focus:outline-none transition-colors duration-200 ease-in-out"
                style={{ color: '#8C92A3' }}
              >
                Cancel
              </button>
              <button
                onClick={confirmAction}
                className="inline-flex justify-center px-6 py-3 border border-transparent text-sm font-medium rounded-lg text-white focus:outline-none transition-colors duration-200 ease-in-out"
                style={{ backgroundColor: '#DF1C41' }}
              >
                Yes, I'm sure
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="mt-4">
      {/* Boxed Wrapper to match Portal Records and other tabs */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        {/* Header Section */}
        <div className="flex items-center gap-2 mb-6">
          <h2 className="text-lg font-medium">Resolve Exception</h2>
          <span className="text-xs px-2 py-1 bg-purple-100 text-purple-600 rounded-full font-medium ml-2">
            PO
          </span>
        </div>

        <div className="space-y-4">
          {/* Exception Alerts Section */}
          <div className="space-y-3">
            {exceptions.map((exception, index) => (
              <ExceptionBanner 
                key={exception.id}
                variant="error" 
                icon="alert"
                title={exception.title}
              >
                {exception.description}
              </ExceptionBanner>
            ))}
          </div>
          
          {/* Resolution Guidance Text */}
          <div className="flex items-start gap-3">
            <WandSparkles className="mt-1 flex-shrink-0" style={{ color: '#7B59FF' }} size={16} />
            <div>
              <p style={{ color: '#38415F' }} className="text-sm">
                To resolve these issues, you can upload a new RTP with a valid PO number that has sufficient available funds, or contact your customer for clarification.
              </p>
            </div>
          </div>
          <div 
            className={`bg-white p-6 rounded-xl border border-gray-200 flex flex-col items-center cursor-pointer hover:bg-gray-50 transition-colors duration-200 ${
              selectedOption === 'upload' ? 'ring-2 ring-purple-500 border-purple-500' : ''
            }`}
            onClick={() => !uploadedFile && !isUploading && document.getElementById('file-input')?.click()}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            <input
              id="file-input"
              type="file"
              accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
              className="hidden"
              onChange={handleFileInputChange}
            />
            
            {/* Upload States */}
            {!uploadedFile && !isUploading ? (
              // Initial Upload State with new illustration
              <>
                <div className="h-20 w-20 mb-4 flex items-center justify-center">
                  <img 
                    src="/lovable-uploads/723d6803-fb23-463b-a8b9-414055e13898.png" 
                    alt="Upload illustration" 
                    className="w-full h-full object-contain"
                  />
                </div>
                <h3 className="font-medium mb-1 text-sm" style={{ color: '#38415F' }}>
                  Upload New RTP
                </h3>
                <p className="text-sm mb-4 text-center" style={{ color: '#8C92A3' }}>
                  This invoice must include the updated PO
                </p>
                <p className="text-sm mb-4" style={{ color: '#8C92A3' }}>
                  Drag & drop a file here or{' '}
                  <span className="font-medium cursor-pointer underline" style={{ color: '#7B59FF' }}>
                    click to browse
                  </span>
                </p>
              </>
            ) : isUploading ? (
              // Uploading State
              <>
                <div className="w-full">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-medium" style={{ color: '#38415F' }}>
                      Uploading PDF file...
                    </h3>
                    <span className="text-sm" style={{ color: '#8C92A3' }}>
                      {uploadProgress}% Completed
                    </span>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                    <div 
                      className="h-2 rounded-full transition-all duration-300 ease-out" 
                      style={{ 
                        backgroundColor: '#7B59FF',
                        width: `${uploadProgress}%`
                      }}
                    ></div>
                  </div>
                  
                  <p className="font-medium text-sm mb-4" style={{ color: '#38415F' }}>
                    #{uploadedFile?.name || 'file'}
                  </p>
                  
                  <p className="text-xs text-center" style={{ color: '#8C92A3' }}>
                    Your current invoice will be archived, you can see it in the activity log
                  </p>
                </div>
              </>
            ) : (
              // File Uploaded State
              <>
                <div className="w-full">
                  <div className="flex items-start gap-3 mb-4">
                    <File className="mt-1 flex-shrink-0" style={{ color: '#7B59FF' }} size={16} />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-sm" style={{ color: '#38415F' }}>
                            {uploadedFile?.name}
                          </p>
                          <p className="text-xs" style={{ color: '#8C92A3' }}>
                            {uploadedFile ? (uploadedFile.size / 1024).toFixed(2) : '0'} KB
                          </p>
                        </div>
                        <button 
                          className="flex items-center gap-1 text-sm font-medium hover:underline transition-colors duration-200"
                          style={{ color: '#8C92A3' }}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleFileRemoval(e);
                          }}
                        >
                          <X size={14} />
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="pl-8">
                    <p className="text-sm" style={{ color: '#8C92A3' }}>
                      • Your current invoice will be archived, you can see it in the activity log
                    </p>
                  </div>
                </div>
              </>
            )}
          </div>
          
          {/* Other Resolution Options Section */}
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
            
            {/* Collapsible Options */}
            {showOtherOptions && (
              <div className="pt-2 space-y-4">
                {/* Force Submit Option */}
                <div>
                  <label className="flex items-start gap-2 cursor-pointer p-2 rounded hover:bg-gray-50 transition-colors duration-200 ease-in-out">
                    <input 
                      type="radio" 
                      name="resolutionOption" 
                      value="force_submit" 
                      checked={selectedOption === 'force_submit'} 
                      onChange={() => handleOptionSelect('force_submit')}
                      className="mt-1 focus:ring-purple-200"
                      style={{ accentColor: '#7B59FF' }}
                    />
                    <div>
                      <h4 className="font-medium text-sm" style={{ color: '#38415F' }}>
                        Force submit
                      </h4>
                      <p className="text-sm" style={{ color: '#8C92A3' }}>
                        Override validation and force processing despite the error
                      </p>
                    </div>
                  </label>
                </div>
                
                {/* Exclude Option */}
                <div>
                  <label className="flex items-start gap-2 cursor-pointer p-2 rounded hover:bg-gray-50 transition-colors duration-200 ease-in-out">
                    <input 
                      type="radio" 
                      name="resolutionOption" 
                      value="exclude" 
                      checked={selectedOption === 'exclude'} 
                      onChange={() => handleOptionSelect('exclude')}
                      className="mt-1 focus:ring-purple-200"
                      style={{ accentColor: '#7B59FF' }}
                    />
                    <div>
                      <h4 className="font-medium text-sm" style={{ color: '#38415F' }}>
                        Exclude from submission
                      </h4>
                      <p className="text-sm" style={{ color: '#8C92A3' }}>
                        Mark this invoice as excluded
                      </p>
                    </div>
                  </label>
                </div>
                
                {/* Resolve Outside Option */}
                <div>
                  <label className="flex items-start gap-2 cursor-pointer p-2 rounded hover:bg-gray-50 transition-colors duration-200 ease-in-out">
                    <input 
                      type="radio" 
                      name="resolutionOption" 
                      value="resolve_outside" 
                      checked={selectedOption === 'resolve_outside'} 
                      onChange={() => handleOptionSelect('resolve_outside')}
                      className="mt-1 focus:ring-purple-200"
                      style={{ accentColor: '#7B59FF' }}
                    />
                    <div>
                      <h4 className="font-medium text-sm" style={{ color: '#38415F' }}>
                        Resolve outside monto
                      </h4>
                      <p className="text-sm" style={{ color: '#8C92A3' }}>
                        Indicate that the issue was resolved outside the platform
                      </p>
                    </div>
                  </label>
                </div>
              </div>
            )}
          </div>
          
          {/* Action Buttons Section */}
          <div className="flex justify-end pt-4 border-t border-gray-200">
            <button 
              className={`px-8 py-3 rounded-lg font-medium transition-colors duration-200 ease-in-out shadow-sm flex justify-center items-center gap-2 text-sm ${
                isActionButtonEnabled() 
                  ? 'text-white cursor-pointer' 
                  : 'cursor-not-allowed'
              }`}
              style={isActionButtonEnabled() 
                ? { backgroundColor: '#7B59FF' }
                : { backgroundColor: '#E4E5E9', color: '#8C92A3' }
              }
              onClick={handleMainButtonClick}
              disabled={!isActionButtonEnabled()}
            >
              {getActionButtonText()}
            </button>
          </div>
        </div>
      </div>
      
      {/* Confirmation Modal */}
      <ConfirmationModal />
    </div>
  );
};

export default ExceptionResolutionWizard;
