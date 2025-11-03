import { PurchaseOrder } from "@/types/purchase-orders";
import { format } from "date-fns";
import { StatusBadge } from "@/components/ui/status-badge";
import { Button } from "@/components/ui/button";
import { Download, Edit, MoreVertical, ArrowLeft } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { formatCurrency, getPortalLogoUrl } from "@/lib/utils";
import { useNavigate, Link } from "react-router-dom";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator, BreadcrumbList } from "@/components/ui/breadcrumb";
import { Card } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface PurchaseOrderDetailHeaderProps {
  purchaseOrder: PurchaseOrder;
  className?: string;
}

export function PurchaseOrderDetailHeader({ purchaseOrder, className }: PurchaseOrderDetailHeaderProps) {
  const navigate = useNavigate();


  return (
    <div className={`mb-8 ${className}`}>
      <div className="flex items-center gap-2 mb-4">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="h-8 w-8">
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/purchase-orders">Purchase Orders</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>All POs</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <Card className="p-6 rounded-xl">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 px-2 py-1">
                <div className="text-lg font-semibold text-[#01173E]">
                  {purchaseOrder.poNumber || "N/A"}
                </div>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div>
                        <StatusBadge status={purchaseOrder.rawStatus} />
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Monto's standardized status</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>

              <div className="flex items-center gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem className="text-red-600">Cancel PO</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            <div className="text-sm text-muted-foreground font-normal px-2 py-1">
              Buyer: {purchaseOrder.buyerName || "N/A"}
            </div>
          </div>

          <div className="border-t border-[#E4E5E9] my-0"></div>

          <div className="flex items-center gap-6 text-[14px] text-[#01173E] font-normal">
            <div className="flex items-center gap-2">
              {purchaseOrder.portal && (
                <img
                  src={getPortalLogoUrl(purchaseOrder.portal)}
                  alt={`${purchaseOrder.portal} logo`}
                  className="w-4 h-4 object-contain rounded-full"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = '/portal-logos/placeholder.svg';
                  }}
                />
              )}
              <span>Portal: {purchaseOrder.portal || "N/A"}</span>
            </div>
            <div className="flex items-center gap-2">
              <span>Scan Agent: </span>
              <Link
                to={`/scan-agents?openAgentModal=true&portal=${encodeURIComponent(purchaseOrder.portal)}`}
                className="text-black hover:text-gray-700 hover:underline font-medium"
              >
                {purchaseOrder.portal === "SAP Ariba" ? "supplier@acmecorp.com" :
                 purchaseOrder.portal === "Coupa" ? "vendor@techsolutions.com" :
                 purchaseOrder.portal === "Jaggaer" ? "global@enterprise.com" :
                 "supplier@portal.com"}
              </Link>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
