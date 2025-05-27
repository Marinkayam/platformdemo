
import { useNavigate } from "react-router-dom";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { PurchaseOrder } from "@/types/purchaseOrder";
import { PurchaseOrderStatusBadge } from "@/components/ui/purchase-order-status-badge";
import { useSortedPurchaseOrders } from "@/hooks/useSortedPurchaseOrders";
import { PurchaseOrderTableHeader } from "./table/PurchaseOrderTableHeader";
import { PurchaseOrderTableFooter } from "./table/PurchaseOrderTableFooter";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MoreVertical } from "lucide-react";

interface PurchaseOrderTableProps {
  purchaseOrders: PurchaseOrder[];
}

export function PurchaseOrderTable({ purchaseOrders }: PurchaseOrderTableProps) {
  const navigate = useNavigate();
  const { 
    sortedPurchaseOrders, 
    sortField, 
    sortDirection, 
    handleSort, 
    setLocalPurchaseOrders 
  } = useSortedPurchaseOrders(purchaseOrders);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const handleRowClick = (poId: string) => {
    navigate(`/purchase-orders/${poId}`);
  };

  const handleExcludePO = (poId: string, event: React.MouseEvent) => {
    event.stopPropagation();
    // TODO: Implement exclude PO functionality
    console.log(`Excluding PO ${poId}`);
  };

  return (
    <div className="rounded-xl border overflow-hidden">
      <div className="overflow-x-auto max-h-[600px]">
        <Table>
          <PurchaseOrderTableHeader 
            sortField={sortField}
            sortDirection={sortDirection}
            onSort={handleSort}
            className="sticky top-0 z-10 bg-white"
          />
          
          <TableBody className="divide-y">
            {sortedPurchaseOrders.length === 0 ? (
              <TableRow>
                <TableCell colSpan={9} className="h-[56px] text-center text-[14px] text-gray-600 py-2 align-middle bg-white">
                  No purchase orders found.
                </TableCell>
              </TableRow>
            ) : (
              sortedPurchaseOrders.map((po) => (
                <TableRow
                  key={po.id}
                  className="h-14 cursor-pointer hover:bg-gray-50 transition-colors bg-white"
                  onClick={() => handleRowClick(po.id)}
                >
                  <TableCell className="py-3 px-4 text-left">
                    <span className="font-medium text-[#0A0714] hover:text-blue-800">
                      {po.poNumber}
                    </span>
                  </TableCell>
                  <TableCell className="py-3 px-4 text-sm">{po.buyerName}</TableCell>
                  <TableCell className="py-3 px-4 text-sm">
                    <PurchaseOrderStatusBadge status={po.status} />
                  </TableCell>
                  <TableCell className="py-3 px-4 text-sm">{po.portal}</TableCell>
                  <TableCell className="py-3 px-4 text-sm">{formatCurrency(po.total)}</TableCell>
                  <TableCell className="py-3 px-4 text-sm">{formatCurrency(po.invoicedAmount)}</TableCell>
                  <TableCell className="py-3 px-4 text-sm">{formatCurrency(po.amountLeft)}</TableCell>
                  <TableCell className="py-3 px-4 text-sm">{po.paymentTerms}</TableCell>
                  <TableCell className="py-3 px-4 text-sm">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-8 w-8 p-0"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={(e) => handleExcludePO(po.id, e)}>
                          Exclude PO
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
          
          <PurchaseOrderTableFooter purchaseOrders={sortedPurchaseOrders} />
        </Table>
      </div>
    </div>
  );
}
