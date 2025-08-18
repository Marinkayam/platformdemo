import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";
import { SmartConnection } from "@/types/smartConnection";

interface SmartConnectionsPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  pageSize: number;
  totalItems: number;
  smartConnections: SmartConnection[];
}

export function SmartConnectionsPagination({
  currentPage,
  totalPages,
  onPageChange,
  pageSize,
  totalItems,
  smartConnections,
}: SmartConnectionsPaginationProps) {
  const startItem = (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalItems);

  // Calculate status counts
  const statusCounts = smartConnections.reduce((acc, connection) => {
    const status = connection.status;
    acc[status] = (acc[status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Format the status counts display
  const formatStatusCounts = () => {
    const entries = Object.entries(statusCounts);
    if (entries.length === 0) return "No connections";
    
    return entries
      .map(([status, count]) => `${count} ${status}`)
      .join(" • ");
  };

  return (
    <div className="flex items-center justify-between px-6 py-4 bg-white border-t">
      <div className="flex items-center gap-4">
        <div className="text-sm text-muted-foreground">
          Showing {startItem} to {endItem} of {totalItems} connections
        </div>
        <div className="text-sm font-semibold text-gray-900">
          {formatStatusCounts()}
        </div>
      </div>
      
      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
          className="h-8 w-8 p-0"
        >
          <ChevronsLeft className="h-4 w-4" />
          <span className="sr-only">First page</span>
        </Button>
        
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="h-8 w-8 p-0"
        >
          <ChevronLeft className="h-4 w-4" />
          <span className="sr-only">Previous page</span>
        </Button>
        
        <div className="flex items-center space-x-1">
          <span className="text-sm font-medium">
            Page {currentPage} of {totalPages}
          </span>
        </div>
        
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="h-8 w-8 p-0"
        >
          <ChevronRight className="h-4 w-4" />
          <span className="sr-only">Next page</span>
        </Button>
        
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages}
          className="h-8 w-8 p-0"
        >
          <ChevronsRight className="h-4 w-4" />
          <span className="sr-only">Last page</span>
        </Button>
      </div>
    </div>
  );
}