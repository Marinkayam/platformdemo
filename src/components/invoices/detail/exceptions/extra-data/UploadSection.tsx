
import { File, X } from "lucide-react";

interface UploadSectionProps {
  uploadedFile: File | null;
  isUploading: boolean;
  uploadProgress: number;
  selectedAction: string | null;
  onFileUpload: (file: File) => void;
  onFileRemoval: (e?: React.MouseEvent) => void;
}

export function UploadSection({
  uploadedFile,
  isUploading,
  uploadProgress,
  selectedAction,
  onFileUpload,
  onFileRemoval,
}: UploadSectionProps) {
  const handleFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onFileUpload(file);
    }
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file) {
      onFileUpload(file);
    }
  };

  return (
    <div
      className={`bg-white p-4 rounded-lg border border-gray-200 shadow-sm flex flex-col items-center cursor-pointer hover:bg-gray-50 hover:shadow-md transition-all ${
        selectedAction === 'upload' ? '' : ''
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
      
      {!uploadedFile && !isUploading ? (
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
            This invoice must include the corrected data
          </p>
          <p className="text-sm mb-4" style={{ color: '#8C92A3' }}>
            Drag & drop a file here or{' '}
            <span className="font-medium cursor-pointer underline" style={{ color: '#7B59FF' }}>
              click to browse
            </span>
          </p>
        </>
      ) : isUploading ? (
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
                      onFileRemoval(e);
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
  );
}
