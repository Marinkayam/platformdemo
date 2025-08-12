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

  // Mock portal data with connected agents (mix of names and emails)
  const allPortalsData = [
    { 
      name: "Walmart", 
      connectedAgents: 24, 
      agentNames: ["John Smith", "sarah.johnson@walmart.com", "Mike Davis", "lisa.chen@walmart.com", "Robert Wilson"]
    },
    { 
      name: "Target", 
      connectedAgents: 18, 
      agentNames: ["emma.taylor@target.com", "David Brown", "Jessica Martinez"]
    },
    { 
      name: "Amazon", 
      connectedAgents: 32, 
      agentNames: ["Thomas Anderson", "maria.garcia@amazon.com", "James Wilson", "ashley.moore@amazon.com"]
    },
    { 
      name: "Costco", 
      connectedAgents: 12, 
      agentNames: ["jennifer.davis@costco.com", "Michael Johnson"]
    },
    { 
      name: "Home Depot", 
      connectedAgents: 15, 
      agentNames: ["Daniel Rodriguez", "nicole.thompson@homedepot.com", "Tyler Jackson", "Samantha Lee", "jordan.clark@homedepot.com"]
    },
    { 
      name: "Best Buy", 
      connectedAgents: 8, 
      agentNames: ["alex.martinez@bestbuy.com", "Victoria Chang", "Nathan Parker", "emily.watson@bestbuy.com"]
    },
    { 
      name: "Microsoft", 
      connectedAgents: 22, 
      agentNames: ["Isabella Rodriguez", "lucas.anderson@microsoft.com", "Sophia Williams"]
    },
    { 
      name: "Oracle", 
      connectedAgents: 16, 
      agentNames: ["ethan.brown@oracle.com", "Ava Garcia", "Noah Martinez", "emma.wilson@oracle.com", "Jake Thompson"]
    },
    { 
      name: "SAP", 
      connectedAgents: 19, 
      agentNames: ["Liam Thompson", "mia.rodriguez@sap.com"]
    },
    { 
      name: "Salesforce", 
      connectedAgents: 14, 
      agentNames: ["harper.davis@salesforce.com", "Jackson Miller", "Evelyn Taylor", "logan.anderson@salesforce.com"]
    },
    { 
      name: "Google", 
      connectedAgents: 20, 
      agentNames: ["Avery Johnson", "carter.brown@google.com", "Madison Garcia"]
    },
    { 
      name: "Apple", 
      connectedAgents: 11, 
      agentNames: ["elijah.thompson@apple.com", "Layla Rodriguez", "Owen Davis", "zoe.chen@apple.com", "Maya Singh"]
    }
  ];
  
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
            <p className="text-xs text-[#586079] mt-1">Enterprise portals connected</p>
          </div>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center gap-1 flex-wrap">
            {recentPortals.map((portal) => (
              <div key={portal} className="relative">
                <img
                  src={getPortalLogoUrl(portal)}
                  alt={portal + ' logo'}
                  className="w-6 h-6 rounded-full border border-[#E6E7EB] bg-white object-contain shadow-sm"
                  title={portal}
                />
              </div>
            ))}
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
                      const { name: portal, connectedAgents, agentNames } = portalData;
                      const isExpanded = expandedPortals.has(portal);
                      const displayAgents = agentNames.slice(0, 5); // Show max 5 agents
                      const hasMoreAgents = agentNames.length > 5;
                      
                      return (
                        <div 
                          key={portal} 
                          className="border border-[#E6E7EB] rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          {/* Main portal row */}
                          <div 
                            className="flex items-center gap-3 p-3 cursor-pointer"
                            onClick={() => togglePortalExpanded(portal)}
                          >
                            <div className="relative">
                              <img
                                src={getPortalLogoUrl(portal)}
                                alt={portal + ' logo'}
                                className="w-8 h-8 rounded-full border border-[#E6E7EB] bg-white object-contain shadow-sm"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="text-sm font-medium text-[#061237] truncate">{portal}</div>
                            </div>
                            <div className="text-gray-400">
                              {isExpanded ? (
                                <ChevronDown className="h-4 w-4" />
                              ) : (
                                <ChevronRight className="h-4 w-4" />
                              )}
                            </div>
                          </div>
                          
                          {/* Expanded details - Show connected agents */}
                          {isExpanded && (
                            <div className="px-3 pb-3 border-t border-gray-100 bg-gray-50">
                              <div className="pt-3 space-y-2">
                                <div className="text-xs font-medium text-[#586079] mb-2">Connected Agents:</div>
                                {displayAgents.map((agentName, index) => (
                                  <div key={index} className="text-xs text-[#061237] py-1">
                                    {agentName}
                                  </div>
                                ))}
                                {hasMoreAgents && (
                                  <div className="text-xs text-[#586079] italic pt-1">
                                    +{agentNames.length - displayAgents.length} more agents
                                  </div>
                                )}
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
