import { PurchaseOrder } from "@/types/purchase-orders";
import { StatusBadge } from "@/components/ui/status-badge";
import { MoreVertical, ArrowLeft } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getPortalLogoUrl } from "@/lib/utils";
import { useNavigate, Link } from "react-router-dom";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator, BreadcrumbList } from "@/components/ui/breadcrumb";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface PurchaseOrderDetailHeaderProps {
  purchaseOrder: PurchaseOrder;
  className?: string;
}

export function PurchaseOrderDetailHeader({ purchaseOrder, className }: PurchaseOrderDetailHeaderProps) {
  const navigate = useNavigate();

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  // Format PO number for display
  const displayPoNumber = purchaseOrder.poNumber
    ? purchaseOrder.poNumber.replace(/^PO-/i, '').padStart(8, '0')
    : "N/A";

  // Get agent email based on portal
  const agentEmail = purchaseOrder.portal === "SAP Ariba" ? "supplier@acmecorp.com" :
    purchaseOrder.portal === "Coupa" ? "vendor@techsolutions.com" :
    purchaseOrder.portal === "Jaggaer" ? "global@enterprise.com" :
    "supplier@portal.com";

  return (
    <div className={className}>
      {/* Breadcrumb */}
      <div className="mb-6">
        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate(-1)}
            className="p-1 hover:bg-gray-100 rounded-md transition-colors"
          >
            <ArrowLeft className="h-4 w-4 text-gray-600" />
          </button>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/purchase-orders">Purchase Orders</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/purchase-orders">All POs</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{purchaseOrder.poNumber || "PO"}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

      {/* Header Card */}
      <Card className="p-6 rounded-xl mb-6">
        <div className="flex flex-col gap-6">
          {/* Top Tier: PO Number (left) and Status + Actions (right) */}
          <div className="flex items-start justify-between">
            {/* Primary Focus: PO Number */}
            <div className="flex flex-col gap-0.5">
              <span className="text-xs text-muted-foreground font-light">PO:</span>
              <span
                className="text-xl font-bold text-[#01173E] cursor-pointer select-all hover:text-[#7B59FF] transition-colors"
                onClick={() => copyToClipboard(displayPoNumber)}
                title="Click to copy"
              >
                {displayPoNumber}
              </span>
            </div>

            <div className="flex items-center gap-6">
              {/* Status */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="cursor-help">
                    <StatusBadge status={purchaseOrder.rawStatus} />
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Monto's standardized status</p>
                </TooltipContent>
              </Tooltip>

              {/* Actions Menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="hover:bg-muted p-1.5 rounded-md transition-colors">
                    <MoreVertical className="w-4 h-4 text-[#01173E]" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48 rounded-md">
                  <DropdownMenuItem className="text-red-600 hover:text-red-700 cursor-pointer rounded-md">
                    Cancel PO
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <Separator className="border-[#E4E5E9]" />

          {/* Bottom Tier: Metadata Grid - Original Data */}
          <div className="flex gap-8 flex-wrap">
            {/* Buyer */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground font-light">Buyer:</span>
              <span className="text-sm font-medium text-[#01173E]">{purchaseOrder.buyerName || "N/A"}</span>
            </div>

            {/* Portal */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground font-light">Portal:</span>
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
              <span className="text-sm font-medium text-[#01173E]">{purchaseOrder.portal || "N/A"}</span>
            </div>

            {/* Scan Agent */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground font-light">Scan Agent:</span>
              <Link
                to={`/scan-agents?openAgentModal=true&portal=${encodeURIComponent(purchaseOrder.portal)}`}
                className="text-sm font-medium text-[#01173E] hover:underline"
              >
                {agentEmail}
              </Link>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
