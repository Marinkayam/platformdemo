import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from "@/components/ui/pagination";

interface PaymentsRelationshipsTableFooterProps {
  totalConnections: number;
  currentPage?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
  itemsPerPage?: number;
}

export function PaymentsRelationshipsTableFooter({ 
  totalConnections, 
  currentPage = 1, 
  totalPages = 1, 
  onPageChange,
  itemsPerPage = 10 
}: PaymentsRelationshipsTableFooterProps) {
  const startItem = totalConnections === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalConnections);

  if (totalConnections === 0) {
    return (
      <div className="px-4 py-3 border-t border-gray-200 bg-gray-50 rounded-b-xl">
        <div className="text-sm text-gray-600">
          Total Smart Connections: {totalConnections}
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 py-3 border-t border-gray-200 bg-gray-50 rounded-b-xl">
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-600">
          Showing {startItem} to {endItem} of {totalConnections} Smart Connections
        </div>
        
        {totalPages > 1 && onPageChange && (
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious 
                  onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
                  className={currentPage <= 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                />
              </PaginationItem>
              
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <PaginationItem key={page}>
                  <PaginationLink
                    onClick={() => onPageChange(page)}
                    isActive={currentPage === page}
                    className="cursor-pointer"
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              ))}
              
              <PaginationItem>
                <PaginationNext 
                  onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
                  className={currentPage >= totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
      </div>
    </div>
  );
}
