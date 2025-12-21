import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Server, Eye, Globe, ChevronDown, ChevronRight } from "lucide-react";
import { getPortalLogoUrl } from "@/lib/utils";
import { motion } from "framer-motion";

interface PortalsScannedCardProps {
  portalsCount: number;
  recentPortals: string[];
  isLoading?: boolean;
}

// Portal icon colors for the circular display
const portalColors: { [key: string]: { bg: string; letter: string } } = {
  "Walmart": { bg: "bg-teal-500", letter: "W" },
  "Target": { bg: "bg-red-500", letter: "T" },
  "Amazon": { bg: "bg-yellow-400", letter: "A" },
  "Costco": { bg: "bg-red-600", letter: "C" },
  "Home Depot": { bg: "bg-orange-500", letter: "H" },
  "Best Buy": { bg: "bg-blue-600", letter: "B" },
};

export function PortalsScannedCard({ portalsCount, recentPortals, isLoading = false }: PortalsScannedCardProps) {
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

  // Display portals for the icon row
  const displayPortals = ["Walmart", "Amazon", "Home Depot", "Target", "Best Buy"];

  // Mock portal data with connected agents
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

  // Skeleton component
  const Skeleton = ({ className }: { className?: string }) => (
    <div className={`animate-pulse bg-gray-200 rounded ${className}`} />
  );

  return (
    <motion.div
      className="bg-white rounded-2xl border border-gray-200 p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.6 }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <Globe className="w-4 h-4 text-gray-400" strokeWidth={1.5} />
          <span className="font-semibold text-gray-800 text-sm">Portal Connections</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-gray-50 rounded-lg p-5 text-center">
          {isLoading ? (
            <Skeleton className="w-8 h-6 mx-auto mb-1" />
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.7 }}
              className="text-xl font-bold text-gray-900"
            >
              {portalsCount}
            </motion.div>
          )}
          <div className="text-[10px] text-gray-500">Portals connected</div>
        </div>
        <div className="bg-primary/10 rounded-lg p-5 text-center">
          {isLoading ? (
            <Skeleton className="w-8 h-6 mx-auto mb-1" />
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.8 }}
              className="text-xl font-bold text-primary"
            >
              211
            </motion.div>
          )}
          <div className="text-[10px] text-primary">Agents connected</div>
        </div>
      </div>

      {/* Portal Icons */}
      <div className="flex items-center justify-center gap-4 mb-6">
        {displayPortals.map((portal, idx) => {
          const colorInfo = portalColors[portal] || { bg: "bg-gray-500", letter: portal[0] };
          return (
            <motion.div
              key={portal}
              className={`w-9 h-9 rounded-full ${colorInfo.bg} flex items-center justify-center`}
              title={portal}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: isLoading ? 0 : 1, scale: isLoading ? 0 : 1 }}
              transition={{ duration: 0.3, delay: 0.8 + 0.05 * idx }}
            >
              <span className="text-white font-bold text-sm">{colorInfo.letter}</span>
            </motion.div>
          );
        })}
        <motion.div
          className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: isLoading ? 0 : 1, scale: isLoading ? 0 : 1 }}
          transition={{ duration: 0.3, delay: 1.1 }}
        >
          <span className="text-gray-600 font-bold text-sm">+</span>
        </motion.div>
      </div>

      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="w-full py-2.5 text-xs font-medium text-gray-600 border-gray-200 hover:bg-gray-50 flex items-center justify-center gap-2"
          >
            <Eye className="w-3.5 h-3.5" />
            View Portals
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Server className="h-5 w-5 text-blue-600" />
              All Portals ({allPortals.length})
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div className="grid grid-cols-2 gap-4">
              {allPortalsData.map((portalData) => {
                const { name: portal, connectedAgents, agentNames } = portalData;
                const isExpanded = expandedPortals.has(portal);
                const displayAgents = agentNames.slice(0, 5);
                const hasMoreAgents = agentNames.length > 5;

                return (
                  <div
                    key={portal}
                    className="border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
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
                          className="w-8 h-8 rounded-full border border-gray-200 bg-white object-contain shadow-sm"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-gray-900 truncate">{portal}</div>
                      </div>
                      <div className="text-gray-400">
                        {isExpanded ? (
                          <ChevronDown className="h-4 w-4" />
                        ) : (
                          <ChevronRight className="h-4 w-4" />
                        )}
                      </div>
                    </div>

                    {/* Expanded details */}
                    {isExpanded && (
                      <div className="px-3 pb-3 border-t border-gray-100 bg-gray-50">
                        <div className="pt-3 space-y-2">
                          <div className="text-xs font-medium text-gray-500 mb-2">Connected Agents:</div>
                          {displayAgents.map((agentName, index) => (
                            <div key={index} className="text-xs text-gray-900 py-1">
                              {agentName}
                            </div>
                          ))}
                          {hasMoreAgents && (
                            <div className="text-xs text-gray-500 italic pt-1">
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
    </motion.div>
  );
}
