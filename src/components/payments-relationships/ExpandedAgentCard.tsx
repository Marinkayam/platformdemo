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

  useEffect(() => {
    let frame: number;
    if (progress < 100) {
      frame = window.setTimeout(() => setProgress(progress + 10), 120);
    } else {
      setTimeout(() => setScanComplete(true), 200);
    }
    return () => clearTimeout(frame);
  }, [progress]);

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
      {/* Insights Section */}
      <div className="mb-2">
        <div className="w-full text-left text-sm text-[#586079] font-medium tracking-tight mb-2 px-2">Insights</div>
        <div className="w-full overflow-x-auto mb-2">
          <div className="grid grid-cols-6 gap-4 min-w-[900px]">
            {(() => {
              const metrics = [
                {
                  icon: <Calendar className="h-3 w-3 text-[#7B59FF] animate-bounce-once align-middle" />, label: 'TDSO', value: 'Net 30', sub: ''
                },
                {
                  icon: <Clock className="h-3 w-3 text-[#7B59FF] animate-bounce-once align-middle" />, label: 'Avg DSO', value: '27', sub: 'Days'
                },
                {
                  icon: <FileText className="h-3 w-3 text-[#22C55E] animate-bounce-once align-middle" />, label: 'Receivables', value: '$12,500', sub: '(8 invoices)'
                },
                {
                  icon: <ShoppingCart className="h-3 w-3 text-[#F2AE40] animate-bounce-once align-middle" />, label: 'Open POs', value: '$7,800', sub: '(3 POs)'
                },
                {
                  icon: <Percent className="h-3 w-3 text-[#EF4444] animate-bounce-once align-middle" />, label: 'Rejection Rate', value: '2.5%', sub: ''
                },
                {
                  icon: <DollarSign className="h-3 w-3 text-[#7B59FF] animate-bounce-once align-middle" />, label: 'Last Yr Revenue', value: '$120,000', sub: ''
                },
              ];
              return metrics.map((metric) => (
                <Card
                  key={metric.label}
                  className="bg-white border border-[#E6E7EB] w-full flex flex-col justify-center items-start rounded-lg shadow-none px-5 py-3 min-h-0"
                >
                  <div className="flex flex-col items-start w-full">
                    <div className="flex flex-row items-center gap-2 mb-2">
                      {metric.icon}
                      <span className="text-xs font-medium text-gray-500 leading-none align-middle">{metric.label}</span>
                    </div>
                    {metric.sub ? (
                      <div className="flex flex-row items-baseline gap-1 whitespace-nowrap">
                        <span className="text-lg font-bold text-[#061237] leading-tight mb-1">{metric.value}</span>
                        <span className="text-xs text-gray-500">{metric.sub}</span>
                      </div>
                    ) : (
                      <span className="text-lg font-bold text-[#061237] leading-tight">{metric.value}</span>
                    )}
                  </div>
                </Card>
              ));
            })()}
          </div>
        </div>
      </div>
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
