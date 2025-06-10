import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PortalRecordsTableFooterProps {
  totalRecords: number;
  currentPage: number;
  recordsPerPage: number;
  onPageChange: (page: number) => void;
}

export function PortalRecordsTableFooter({
  totalRecords,
  currentPage,
  recordsPerPage,
  onPageChange,
}: PortalRecordsTableFooterProps) {
  const totalPages = Math.ceil(totalRecords / recordsPerPage);
  const startRecord = totalRecords === 0 ? 0 : (currentPage - 1) * recordsPerPage + 1;
  const endRecord = Math.min(currentPage * recordsPerPage, totalRecords);

  return (
    <div className="flex items-center justify-between px-4 py-3 border-t border-gray-200 bg-white">
      <div className="flex items-center text-sm text-gray-600">
        {totalRecords > 0 ? (
          <>
            Showing <span className="font-medium mx-1">{startRecord}</span> to{" "}
            <span className="font-medium mx-1">{endRecord}</span> of{" "}
            <span className="font-medium mx-1">{totalRecords}</span> records
          </>
        ) : (
          "No records to display"
        )}
      </div>
      
      {totalPages > 1 && (
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="h-8 w-8 p-0"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          
          <div className="flex items-center space-x-1">
            {(() => {
              const pageButtons = [];
              const maxPageButtons = 5; // Maximum number of page buttons to show
              const startPage = Math.max(1, currentPage - Math.floor(maxPageButtons / 2));
              const endPage = Math.min(totalPages, startPage + maxPageButtons - 1);

              if (startPage > 1) {
                pageButtons.push(
                  <Button key={1} variant={currentPage === 1 ? "default" : "outline"} size="sm" onClick={() => onPageChange(1)} className="h-8 w-8 p-0">
                    1
                  </Button>
                );
                if (startPage > 2) {
                  pageButtons.push(<span key="dots-start" className="px-2 text-gray-500">...</span>);
                }
              }

              for (let i = startPage; i <= endPage; i++) {
                pageButtons.push(
                  <Button key={i} variant={currentPage === i ? "default" : "outline"} size="sm" onClick={() => onPageChange(i)} className="h-8 w-8 p-0">
                    {i}
                  </Button>
                );
              }

              if (endPage < totalPages) {
                if (endPage < totalPages - 1) {
                  pageButtons.push(<span key="dots-end" className="px-2 text-gray-500">...</span>);
                }
                pageButtons.push(
                  <Button key={totalPages} variant={currentPage === totalPages ? "default" : "outline"} size="sm" onClick={() => onPageChange(totalPages)} className="h-8 w-8 p-0">
                    {totalPages}
                  </Button>
                );
              }

              return pageButtons;
            })()}
          </div>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="h-8 w-8 p-0"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
} 