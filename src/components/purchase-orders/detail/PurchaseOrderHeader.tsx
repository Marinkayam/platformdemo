
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User, File, ArrowLeft } from "lucide-react";
import { PurchaseOrderStatusBadge } from "@/components/ui/purchase-order-status-badge";
import { Card } from "@/components/ui/card";
import { PurchaseOrder } from "@/types/purchaseOrder";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";

interface PurchaseOrderHeaderProps {
  purchaseOrder: PurchaseOrder;
}

export function PurchaseOrderHeader({ purchaseOrder }: PurchaseOrderHeaderProps) {
  const navigate = useNavigate();

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const handleBackNavigation = () => {
    navigate('/purchase-orders');
  };

  return (
    <div className="mb-8">
      <div className="flex items-center mb-6">
        <button 
          onClick={handleBackNavigation}
          className="mr-3 p-1 hover:bg-gray-100 rounded-md transition-colors"
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
              <BreadcrumbPage>{purchaseOrder.poNumber}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      
      <Card className="p-6 rounded-xl">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 px-2 py-1">
                <div className="text-2xl font-bold text-[#38415F]">
                  {purchaseOrder.poNumber}
                </div>
                <PurchaseOrderStatusBadge status={purchaseOrder.status} />
              </div>
            </div>
            
            <div className="text-sm text-gray-400 font-normal px-2 py-1">
              Purchase Order Details
            </div>
          </div>
          
          <div className="border-t border-[#E4E5E9] my-0"></div>
          
          <div className="flex items-center gap-6 text-[14px] text-[#01173E] font-normal">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4" style={{ stroke: "#01173E" }} />
              <span className="font-semibold text-[#01173E]">Buyer:</span>
              <span>{purchaseOrder.buyerName}</span>
            </div>
            
            <div className="flex items-center gap-2">
              <File className="h-4 w-4" style={{ stroke: "#01173E" }} />
              <span className="font-semibold text-[#01173E]">Portal:</span>
              <span>{purchaseOrder.portal}</span>
            </div>
            
            <div className="flex items-center gap-2">
              <span className="font-semibold text-[#01173E]">Total:</span>
              <span>{formatCurrency(purchaseOrder.total)}</span>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
