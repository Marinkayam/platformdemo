import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Link } from "react-router-dom";
import { Server, Plus, Eye } from "lucide-react";
import { getPortalLogoUrl } from "@/lib/utils";

interface PortalsScannedCardProps {
  portalsCount: number;
  recentPortals: string[];
}

export function PortalsScannedCard({ portalsCount, recentPortals }: PortalsScannedCardProps) {
  // Show 12 portals as requested
  const allPortals = [
    "Walmart", "Target", "Amazon", "Costco", "Home Depot", "Best Buy", 
    "Microsoft", "Oracle", "SAP", "Salesforce", "Google", "Apple"
  ];
  return (
    <Card className="relative overflow-hidden border transition-all duration-300 hover:shadow-lg hover:-translate-y-1 bg-white border-[#3B82F6]/20">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-sm font-medium text-[#586079]">Portals Scanned</CardTitle>
        <div className="p-2.5 rounded-xl bg-[#3B82F6]/10 border border-[#3B82F6]/20">
          <Server className="h-4 w-4 text-[#3B82F6]" />
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-3xl font-bold text-[#061237]">{portalsCount}</div>
        <div className="space-y-3">
          <p className="text-sm text-[#586079] leading-relaxed">Active portals synced in the latest scan</p>
          <div className="flex items-center gap-1 flex-wrap">
            {recentPortals.map((portal) => (
              <img
                key={portal}
                src={getPortalLogoUrl(portal)}
                alt={portal + ' logo'}
                className="w-6 h-6 rounded-full border border-[#E6E7EB] bg-white object-contain shadow-sm"
                title={portal}
              />
            ))}
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button size="sm" variant="outline" className="text-xs w-full text-[#7B59FF] border-[#7B59FF] hover:bg-[#7B59FF] hover:text-white mt-2">
                <Eye className="h-3 w-3 mr-1" />
                View All Scanned Portals
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>All Scanned Portals ({allPortals.length})</DialogTitle>
              </DialogHeader>
              <div className="grid grid-cols-3 gap-4 mt-4">
                {allPortals.map((portal) => (
                  <div key={portal} className="flex items-center gap-2 p-3 border border-[#E6E7EB] rounded-lg hover:bg-gray-50 transition-colors">
                    <img
                      src={getPortalLogoUrl(portal)}
                      alt={portal + ' logo'}
                      className="w-8 h-8 rounded-full border border-[#E6E7EB] bg-white object-contain shadow-sm"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-[#061237] truncate">{portal}</div>
                      <div className="text-xs text-[#586079]">Active</div>
                    </div>
                  </div>
                ))}
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardContent>
    </Card>
  );
}
