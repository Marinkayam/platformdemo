
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { PurchaseOrder } from "@/types/purchaseOrder";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

interface PurchaseOrderHeaderProps {
  purchaseOrder: PurchaseOrder;
}

export function PurchaseOrderHeader({ purchaseOrder }: PurchaseOrderHeaderProps) {
  const navigate = useNavigate();
  const location = useLocation();

  // Determine the tab context based on URL search params or state
  const getTabContext = () => {
    const searchParams = new URLSearchParams(location.search);
    const status = searchParams.get("status");
    
    if (status === "new") return "New POs";
    if (status === "low-funds") return "Low Funds";
    return "Found by Monto";
  };

  const handleBackClick = () => {
    // Navigate back to purchase orders with the same tab context
    const searchParams = new URLSearchParams(location.search);
    const status = searchParams.get("status");
    const backUrl = status ? `/purchase-orders?status=${status}` : "/purchase-orders";
    navigate(backUrl);
  };

  return (
    <div className="mb-6">
      <Breadcrumb className="mb-4">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink 
              onClick={handleBackClick}
              className="flex items-center gap-2 cursor-pointer hover:text-gray-900"
            >
              <ArrowLeft className="h-4 w-4" />
              Purchase Orders
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{getTabContext()}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-[#38415F]">
          {purchaseOrder.poNumber}
        </h1>
      </div>
    </div>
  );
}
