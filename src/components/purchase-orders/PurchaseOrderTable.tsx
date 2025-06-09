import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PurchaseOrder } from "@/types/purchaseOrder";
import { formatCurrency } from "@/lib/utils";
import { PurchaseOrderTableFooter } from "./table/PurchaseOrderTableFooter";
import { PurchaseOrderTableHeader } from "./table/PurchaseOrderTableHeader";
import { useSortedPurchaseOrders } from "@/hooks/useSortedPurchaseOrders";
import { PurchaseOrderStatusBadge } from "./PurchaseOrderStatusBadge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useNavigate } from "react-router-dom";

interface PurchaseOrderTableProps {
  purchaseOrders: PurchaseOrder[];
}

const getPortalLogoUrl = (portalName: string): string => {
  const logoMap: { [key: string]: string } = {
    "SAP Ariba": "ariba.png",
    "Coupa": "coupa.png",
    "Oracle Procurement": "oracle.png",
    "Tipalti": "tipalti.png",
    "Jaggaer": "jagger.png",
    "Amazon Payee": "Amazon Payee.png",
    "Apple": "apple.png",
    "AT&T": "AT&T.png",
    "Bill.com": "bill.png",
    "Facturaxion": "Facturaxion.png",
    "Fieldglass": "Fieldglass.png",
    "iSupplier": "iSupplier.png",
    "KissFlow": "KissFlow.png",
    "Qualcomm": "Qualcomm.png",
    "Sainsburys": "Sainsburys.png",
    "Segment": "Segment.png",
    "Shopify": "Shopify.png",
    "StoreNext": "StoreNext.png",
    "Taulia": "taulia.png",
    "Teradata": "Teradata.png",
    "Tungsten": "tungsten.png",
    "Walmart": "walmart.png",
  };
  const fileName = logoMap[portalName] || portalName.toLowerCase().replace(/\s/g, '-') + '.png';
  return `/portal-logos/${fileName}`;
};

export function PurchaseOrderTable({ purchaseOrders }: PurchaseOrderTableProps) {
  const navigate = useNavigate();
  const { 
    sortedPurchaseOrders, 
    sortField, 
    sortDirection, 
    handleSort 
  } = useSortedPurchaseOrders(purchaseOrders);

  const handleRowClick = (poId: string) => {
    navigate(`/purchase-orders/${poId}`);
  };

  return (
    <div className="rounded-xl border overflow-hidden bg-white">
      <div className="overflow-x-auto">
        <Table>
          <PurchaseOrderTableHeader 
            sortField={sortField}
            sortDirection={sortDirection}
            onSort={handleSort}
          />
          
          <TableBody className="divide-y divide-gray-100">
            {sortedPurchaseOrders.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center text-sm text-gray-600 align-middle bg-white">
                  No purchase orders found.
                </TableCell>
              </TableRow>
            ) : (
              sortedPurchaseOrders.map((po) => (
                <TableRow
                  key={po.id}
                  className="hover:bg-gray-50 cursor-pointer transition-colors bg-white"
                  onClick={() => handleRowClick(po.id)}
                >
                  <TableCell className="sticky left-0 z-10 bg-white border-r border-gray-100 font-semibold">
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
                  <TableCell className="truncate">
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
                  <TableCell>
                    <PurchaseOrderStatusBadge status={po.status} />
                  </TableCell>
                  <TableCell className="truncate">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <span className="truncate cursor-help flex items-center gap-2">
                            <img 
                              src={getPortalLogoUrl(po.portal)} 
                              alt={`${po.portal} logo`}
                              className="w-5 h-5 object-contain rounded-full"
                              onError={(e) => {
                                e.currentTarget.onerror = null; 
                                e.currentTarget.src = '/portal-logos/default.png';
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
                  <TableCell className="font-medium">
                    {formatCurrency(po.total)}
                  </TableCell>
                  <TableCell className="font-medium">
                    {formatCurrency(po.invoicedAmount)}
                  </TableCell>
                  <TableCell className="font-medium">
                    {formatCurrency(po.amountLeft)}
                  </TableCell>
                  <TableCell className="truncate">
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
