import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PurchaseOrder } from "@/types/purchase-orders";
import { formatCurrency, getPortalLogoUrl } from "@/lib/utils";
import { PurchaseOrderTableFooter } from "./table/PurchaseOrderTableFooter";
import { PurchaseOrderTableHeader } from "./table/PurchaseOrderTableHeader";
import { useSortedPurchaseOrders } from "@/hooks/useSortedPurchaseOrders";
import { StatusBadge } from "@/components/ui/status-badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useNavigate } from "react-router-dom";
import { TableSkeleton } from "@/components/ui/table-skeleton";
import { PurchaseOrdersPagination } from "./components/PurchaseOrdersPagination";
import { useState, useMemo } from "react";

const statusMap: Record<string, string> = {
  'approved': 'Open',
  'completed': 'Closed',
  'cancelled': 'Cancelled',
  'Partially Invoiced': 'Partially Invoiced',
  'Fully Invoiced': 'Fully Invoiced',
  'new': 'New',
  'New': 'New',
  'pending_approval': 'Pending Approval',
  'rejected': 'Rejected'
};

interface PurchaseOrderTableProps {
  purchaseOrders: PurchaseOrder[];
  isLoading?: boolean;
}

export function PurchaseOrderTable({ purchaseOrders, isLoading = false }: PurchaseOrderTableProps) {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  
  const { 
    sortedPurchaseOrders, 
    sortField, 
    sortDirection, 
    handleSort 
  } = useSortedPurchaseOrders(purchaseOrders);

  // Pagination logic
  const totalPages = Math.ceil(sortedPurchaseOrders.length / pageSize);
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return sortedPurchaseOrders.slice(startIndex, startIndex + pageSize);
  }, [sortedPurchaseOrders, currentPage, pageSize]);

  const handleRowClick = (poId: string) => {
    navigate(`/purchase-orders/${poId}`);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="space-y-4">
      <div className="rounded-xl border overflow-hidden bg-white">
      <div className="overflow-x-auto">
        <Table>
          <PurchaseOrderTableHeader 
            sortField={sortField}
            sortDirection={sortDirection}
            onSort={handleSort}
          />
          
          {isLoading ? (
            <TableSkeleton rows={6} columns={9} showFooter />
          ) : (
            <TableBody className="divide-y divide-gray-100">
              {paginatedData.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={9} className="text-center text-sm text-gray-600 align-middle bg-white">
                    No purchase orders found.
                  </TableCell>
                </TableRow>
              ) : (
                paginatedData.map((po) => {
                  // Calculate TRA and standardized status for each row
                  const pendingSubmissionAmount = 0; // Assume 0 for demo
                  const tra = (po.total || 0) - (po.invoicedAmount || 0) - pendingSubmissionAmount;
                  const standardizedStatus = statusMap[po.status] || po.status;

                  return (
                <TableRow
                  key={po.id}
                  className="hover:bg-gray-50 cursor-pointer transition-colors bg-white"
                  onClick={() => handleRowClick(po.id)}
                >
                  <TableCell className="sticky left-0 z-10 bg-white border-r border-gray-100 font-semibold w-[200px] min-w-[200px]">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <span className="truncate cursor-help">{po.poNumber}</span>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{po.poNumber}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </TableCell>
                  <TableCell className="truncate w-[200px] min-w-[200px]">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <span className="truncate cursor-help">{po.buyerName}</span>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{po.buyerName}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </TableCell>
                  <TableCell className="whitespace-nowrap w-[200px] min-w-[200px]">
                    <StatusBadge status={po.rawStatus} className="whitespace-nowrap flex-shrink-0" />
                  </TableCell>
                  <TableCell className="whitespace-nowrap w-[200px] min-w-[200px]">
                    <StatusBadge status={standardizedStatus} className="whitespace-nowrap flex-shrink-0" />
                  </TableCell>
                  <TableCell className="truncate w-[200px] min-w-[200px]">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <span className="truncate cursor-help flex items-center gap-2">
                            <img 
                              src={getPortalLogoUrl(po.portal)} 
                              alt={`${po.portal} logo`}
                              className="w-5 h-5 object-contain rounded-full"
                              width={20}
                              height={20}
                              onError={(e) => {
                                e.currentTarget.onerror = null; 
                                e.currentTarget.src = '/portal-logos/placeholder.svg';
                              }}
                            />
                            {po.portal}
                          </span>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{po.portal}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </TableCell>
                  <TableCell className="font-medium w-[200px] min-w-[200px]">
                    {formatCurrency(po.total, po.currency)}
                  </TableCell>
                  <TableCell className="font-medium w-[200px] min-w-[200px]">
                    {formatCurrency(po.invoicedAmount, po.currency)}
                  </TableCell>
                  <TableCell className="font-medium w-[200px] min-w-[200px]">
                    {formatCurrency(tra, po.currency)}
                  </TableCell>
                  <TableCell className="truncate w-[200px] min-w-[200px]">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <span className="truncate cursor-help">{po.paymentTerms}</span>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{po.paymentTerms}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </TableCell>
                  <TableCell className="truncate w-[200px] min-w-[200px]">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <span className="truncate cursor-help">{po.createdDate}</span>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Created: {po.createdDate}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </TableCell>
                </TableRow>
                );
                })
              )}
            </TableBody>
          )}
          
          
        </Table>
      </div>
      </div>
      
      {!isLoading && (
        <PurchaseOrdersPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          pageSize={pageSize}
          totalItems={sortedPurchaseOrders.length}
          purchaseOrders={sortedPurchaseOrders}
        />
      )}
    </div>
  );
}
