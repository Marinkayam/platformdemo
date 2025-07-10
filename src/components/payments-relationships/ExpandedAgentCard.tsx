import { useState, useEffect } from "react";
import { AgentTable } from "./AgentTable";
import { AgentModals } from "./AgentModals";
import { SmartConnection, Agent } from "@/types/smartConnection";
import { Calendar, FileText, ShoppingCart, Percent, DollarSign, Clock } from "lucide-react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { SparklesText } from "@/components/common/SparklesText";
import { Progress } from "@/components/ui/progress";
import { motion, AnimatePresence } from "framer-motion";

interface ExpandedAgentCardProps {
  connection: SmartConnection;
}

export function ExpandedAgentCard({ connection }: ExpandedAgentCardProps) {
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isDeactivateModalOpen, setIsDeactivateModalOpen] = useState(false);
  const [agentToDeactivate, setAgentToDeactivate] = useState<Agent | null>(null);
  const [progress, setProgress] = useState(0);
  const [scanComplete, setScanComplete] = useState(false);
  const [metricsScanning, setMetricsScanning] = useState(true);
  const [metricsProgress, setMetricsProgress] = useState(0);
  const [currentMetrics, setCurrentMetrics] = useState({
    dso: 0,
    receivables: 0,
    openPOs: 0,
    rejectionRate: 0,
    revenue: 0
  });

  const finalMetrics = {
    dso: 27,
    receivables: 12500,
    openPOs: 7800,
    rejectionRate: 2.5,
    revenue: 120000
  };

  useEffect(() => {
    let frame: number;
    if (progress < 100) {
      frame = window.setTimeout(() => setProgress(progress + 10), 120);
    } else {
      setTimeout(() => setScanComplete(true), 200);
    }
    return () => clearTimeout(frame);
  }, [progress]);

  // Metrics scanning simulation
  useEffect(() => {
    if (!metricsScanning) return;
    
    const metricsInterval = setInterval(() => {
      setMetricsProgress(prev => {
        const newProgress = prev + 20;
        
        // Update metrics progressively
        setCurrentMetrics(prev => ({
          dso: Math.min(finalMetrics.dso, Math.round((finalMetrics.dso * newProgress) / 100)),
          receivables: Math.min(finalMetrics.receivables, Math.round((finalMetrics.receivables * newProgress) / 100)),
          openPOs: Math.min(finalMetrics.openPOs, Math.round((finalMetrics.openPOs * newProgress) / 100)),
          rejectionRate: Math.min(finalMetrics.rejectionRate, (finalMetrics.rejectionRate * newProgress) / 100),
          revenue: Math.min(finalMetrics.revenue, Math.round((finalMetrics.revenue * newProgress) / 100))
        }));
        
        return newProgress;
      });
    }, 300);

    const completionTimer = setTimeout(() => {
      setMetricsScanning(false);
      setCurrentMetrics(finalMetrics);
      clearInterval(metricsInterval);
    }, 1800); // Complete in ~1.8 seconds

    return () => {
      clearInterval(metricsInterval);
      clearTimeout(completionTimer);
    };
  }, []);

  const handleViewDetails = (agent: Agent) => {
    setSelectedAgent(agent);
    setIsDetailsModalOpen(true);
  };

  const handleDeactivateAgent = (agent: Agent) => {
    setAgentToDeactivate(agent);
    setIsDeactivateModalOpen(true);
  };

  const handleConfirmDeactivation = () => {
    if (agentToDeactivate) {
      // TODO: Implement actual agent deactivation logic
      console.log('Deactivating agent:', agentToDeactivate.id);
      setIsDeactivateModalOpen(false);
      setAgentToDeactivate(null);
    }
  };

  const handleCloseDetailsModal = () => {
    setIsDetailsModalOpen(false);
    setSelectedAgent(null);
  };

  const handleCloseDeactivateModal = () => {
    setIsDeactivateModalOpen(false);
    setAgentToDeactivate(null);
  };

  return (
    <>
      {/* AI Scan Progress Bar - Compact Version */}
      {!scanComplete && (
        <div className="w-64 max-w-full mt-1 mb-2 flex flex-col items-start relative">
          <AnimatePresence>
            <motion.div
              key="ai-magic-text"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.4 }}
              className="mb-0.5"
            >
              <SparklesText 
                text={`AI scanning Smart Connection... ${progress}%`} 
                className="text-xs font-semibold text-[#7B59FF]" 
                sparklesCount={5} 
                duration={1200} 
              />
            </motion.div>
          </AnimatePresence>
          <div className="relative w-full">
            <Progress
              value={progress}
              indicatorClassName="bg-gradient-to-r from-[#7B59FF] via-[#B983FF] to-[#7B59FF] shadow-[0_0_8px_1px_rgba(123,89,255,0.18)] transition-all duration-300"
              className="h-1 rounded-full bg-[#F0EDFF] shadow-[0_1px_8px_0_rgba(123,89,255,0.08)]"
            />
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <SparklesText text="✨" className="text-base animate-pulse" sparklesCount={3} duration={1200} />
            </div>
          </div>
        </div>
      )}
      {scanComplete && (
        <div className="flex items-center gap-1 text-xs text-[#7B59FF] font-semibold -mt-2 min-h-[24px] mb-1">
          <span className="font-semibold">AI scan finished</span>
        </div>
      )}
      {/* Agents Table Section */}
      <div className="mt-4 mb-2 w-full text-left text-sm text-[#586079] font-medium tracking-tight px-2">
        Agents
      </div>
      <AgentTable
        connection={connection}
        onViewDetails={handleViewDetails}
        onDeactivateAgent={handleDeactivateAgent}
      />

      <AgentModals
        selectedAgent={selectedAgent}
        isDetailsModalOpen={isDetailsModalOpen}
        isDeactivateModalOpen={isDeactivateModalOpen}
        agentToDeactivate={agentToDeactivate}
        connection={connection}
        onCloseDetailsModal={handleCloseDetailsModal}
        onCloseDeactivateModal={handleCloseDeactivateModal}
        onConfirmDeactivation={handleConfirmDeactivation}
      />
    </>
  );
}
