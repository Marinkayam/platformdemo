import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Link } from "react-router-dom";
import { Server, Plus, Eye, Zap, Globe, Activity, ChevronDown, ChevronRight } from "lucide-react";
import { getPortalLogoUrl } from "@/lib/utils";

interface PortalsScannedCardProps {
  portalsCount: number;
  recentPortals: string[];
}

export function PortalsScannedCard({ portalsCount, recentPortals }: PortalsScannedCardProps) {
  // Expanded portals state
  const [expandedPortals, setExpandedPortals] = useState<Set<string>>(new Set());
  
  const togglePortalExpanded = (portalName: string) => {
    const newExpanded = new Set(expandedPortals);
    if (newExpanded.has(portalName)) {
      newExpanded.delete(portalName);
    } else {
      newExpanded.add(portalName);
    }
    setExpandedPortals(newExpanded);
  };
  
  // Show 12 portals as requested
  const allPortals = [
    "Walmart", "Target", "Amazon", "Costco", "Home Depot", "Best Buy", 
    "Microsoft", "Oracle", "SAP", "Salesforce", "Google", "Apple"
  ];

  // Mock scan performance data and disconnection status
  const allPortalsData = [
    { name: "Walmart", connectedAgents: 24, disconnectedAgents: 3, hasIssues: true },
    { name: "Target", connectedAgents: 18, disconnectedAgents: 0, hasIssues: false },
    { name: "Amazon", connectedAgents: 0, disconnectedAgents: 5, hasIssues: true, reason: "Authentication expired" },
    { name: "Costco", connectedAgents: 12, disconnectedAgents: 1, hasIssues: true },
    { name: "Home Depot", connectedAgents: 15, disconnectedAgents: 0, hasIssues: false },
    { name: "Best Buy", connectedAgents: 2, disconnectedAgents: 4, hasIssues: true, reason: "Network timeout" },
    { name: "Microsoft", connectedAgents: 22, disconnectedAgents: 0, hasIssues: false },
    { name: "Oracle", connectedAgents: 16, disconnectedAgents: 2, hasIssues: true },
    { name: "SAP", connectedAgents: 0, disconnectedAgents: 8, hasIssues: true, reason: "Agent offline" },
    { name: "Salesforce", connectedAgents: 14, disconnectedAgents: 0, hasIssues: false },
    { name: "Google", connectedAgents: 20, disconnectedAgents: 1, hasIssues: true },
    { name: "Apple", connectedAgents: 11, disconnectedAgents: 0, hasIssues: false }
  ];
  
  const portalsWithIssues = allPortalsData.filter(p => p.hasIssues).length;
  const fullyConnectedPortals = allPortalsData.filter(p => !p.hasIssues).length;
  const totalDisconnectedAgents = allPortalsData.reduce((sum, p) => sum + p.disconnectedAgents, 0);
  
  return (
    <Card className="relative overflow-hidden border transition-all duration-300 hover:shadow-lg hover:-translate-y-1 bg-white border-[#3B82F6]/20">
      {/* Decorative network pattern background */}
      <div className="absolute top-0 right-0 w-32 h-32 opacity-5">
        <div className="absolute top-4 right-4 w-2 h-2 bg-[#3B82F6] rounded-full animate-pulse"></div>
        <div className="absolute top-8 right-12 w-1.5 h-1.5 bg-[#3B82F6] rounded-full animate-pulse delay-200"></div>
        <div className="absolute top-12 right-8 w-1 h-1 bg-[#3B82F6] rounded-full animate-pulse delay-500"></div>
        <svg className="absolute top-4 right-4 w-20 h-20 text-[#3B82F6]" viewBox="0 0 100 100">
          <path d="M20,20 Q50,10 80,20 Q90,50 80,80 Q50,90 20,80 Q10,50 20,20" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.3"/>
        </svg>
      </div>
      
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-sm font-medium text-[#586079]">Portal Connections</CardTitle>
        <div className="p-2.5 rounded-xl bg-gradient-to-br from-[#3B82F6]/10 to-[#3B82F6]/20 border border-[#3B82F6]/20">
          <Globe className="h-4 w-4 text-[#3B82F6]" />
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-end justify-between">
          <div>
            <div className="text-3xl font-bold text-[#061237]">{portalsCount}</div>
            <p className="text-xs text-[#586079] mt-1">Enterprise portals synced</p>
          </div>
          {portalsWithIssues > 0 && (
            <div className="text-right">
              <div className="flex items-center gap-1 text-red-600">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <span className="text-xs font-medium">{totalDisconnectedAgents} agents offline</span>
              </div>
              <span className="text-xs text-[#586079]">{portalsWithIssues} portals need attention</span>
            </div>
          )}
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center gap-1 flex-wrap">
            {recentPortals.map((portal) => {
              const portalData = allPortalsData.find(p => p.name === portal);
              const hasIssues = portalData && portalData.hasIssues;
              
              return (
                <div key={portal} className="relative">
                  <img
                    src={getPortalLogoUrl(portal)}
                    alt={portal + ' logo'}
                    className="w-6 h-6 rounded-full border border-[#E6E7EB] bg-white object-contain shadow-sm"
                    title={portal}
                  />
                  {hasIssues && (
                    <div className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-red-500 rounded-full border border-white"></div>
                  )}
                </div>
              );
            })}
          </div>
          
          <div className="pt-3">
            <Dialog>
            <DialogTrigger asChild>
              <Button size="sm" variant="outline" className="text-xs w-full text-[#7B59FF] border-[#7B59FF] hover:bg-[#7B59FF] hover:text-white group">
                <Eye className="h-3 w-3 mr-1" />
                View Portals
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <Server className="h-5 w-5 text-[#3B82F6]" />
                  All Portals ({allPortals.length})
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4 mt-4">
                <div className="grid grid-cols-2 gap-4">
                  {allPortalsData
                    .map((portalData) => {
                      const { name: portal, connectedAgents, disconnectedAgents, hasIssues, reason } = portalData;
                      const totalAgents = connectedAgents + disconnectedAgents;
                      const isExpanded = expandedPortals.has(portal);
                      
                      return (
                        <div 
                          key={portal} 
                          className="border border-[#E6E7EB] rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          {/* Main portal row */}
                          <div 
                            className={`flex items-center gap-3 p-3 ${hasIssues ? 'cursor-pointer' : ''}`}
                            onClick={() => hasIssues && togglePortalExpanded(portal)}
                          >
                            <div className="relative">
                              <img
                                src={getPortalLogoUrl(portal)}
                                alt={portal + ' logo'}
                                className="w-8 h-8 rounded-full border border-[#E6E7EB] bg-white object-contain shadow-sm"
                              />
                              {hasIssues && (
                                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border border-white"></div>
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="text-sm font-medium text-[#061237] truncate">{portal}</div>
                              <div className="text-xs text-[#586079]">
                                {totalAgents} scan agents connected
                                {hasIssues && (
                                  <span className="text-red-600 ml-1">
                                    ({disconnectedAgents} offline)
                                  </span>
                                )}
                              </div>
                            </div>
                            {hasIssues && (
                              <div className="text-gray-400">
                                {isExpanded ? (
                                  <ChevronDown className="h-4 w-4" />
                                ) : (
                                  <ChevronRight className="h-4 w-4" />
                                )}
                              </div>
                            )}
                          </div>
                          
                          {/* Expanded details */}
                          {hasIssues && isExpanded && (
                            <div className="px-3 pb-3 border-t border-gray-100 bg-gray-50">
                              <div className="pt-3 space-y-2">
                                <div className="flex items-center justify-between text-xs">
                                  <span className="text-green-600">✓ Connected agents:</span>
                                  <span className="font-medium text-green-600">{connectedAgents}</span>
                                </div>
                                <div className="flex items-center justify-between text-xs">
                                  <span className="text-red-600">⚠ Disconnected agents:</span>
                                  <span className="font-medium text-red-600">{disconnectedAgents}</span>
                                </div>
                                {reason && (
                                  <div className="flex items-center justify-between text-xs">
                                    <span className="text-gray-600">Issue:</span>
                                    <span className="font-medium text-red-600">{reason}</span>
                                  </div>
                                )}
                                <div className="pt-2">
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    className="text-xs w-full text-red-600 border-red-300 hover:bg-red-100"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      window.location.href = '/scan-agents?portal=' + encodeURIComponent(portal) + '&status=disconnected';
                                    }}
                                  >
                                    Resolve Issues
                                  </Button>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                </div>
              </div>
            </DialogContent>
            </Dialog>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
