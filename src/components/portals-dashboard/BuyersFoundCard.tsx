import React from "react";
import { Button } from "@/components/ui/button";
import { Building2, Settings, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

interface BuyersFoundCardProps {
  buyersCount: number;
  topBuyersByFrequency: [string, number][];
  isLoading?: boolean;
}

export function BuyersFoundCard({ buyersCount, topBuyersByFrequency, isLoading = false }: BuyersFoundCardProps) {
  // Calculate total records for percentage
  const totalRecords = topBuyersByFrequency.reduce((sum, [_, count]) => sum + count, 0);

  // Mock additional data
  const newBuyers = 8;

  // Skeleton component
  const Skeleton = ({ className }: { className?: string }) => (
    <div className={`animate-pulse bg-gray-200 rounded ${className}`} />
  );

  return (
    <motion.div
      className="bg-white rounded-2xl border border-gray-200 p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.5 }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <Building2 className="w-4 h-4 text-gray-400" strokeWidth={1.5} />
          <span className="font-semibold text-gray-800 text-sm">Buyers Found</span>
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
              transition={{ duration: 0.3, delay: 0.6 }}
              className="text-xl font-bold text-gray-900"
            >
              {buyersCount}
            </motion.div>
          )}
          <div className="text-[10px] text-gray-500">Unique buyers identified</div>
        </div>
        <div className="bg-emerald-50 rounded-lg p-5 text-center">
          {isLoading ? (
            <Skeleton className="w-6 h-6 mx-auto mb-1" />
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.7 }}
              className="text-xl font-bold text-emerald-600"
            >
              {newBuyers}
            </motion.div>
          )}
          <div className="text-[10px] text-emerald-600">New this week</div>
        </div>
      </div>

      {/* Top Active Buyers */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide">Top Active Buyers</span>
          <Settings className="w-3.5 h-3.5 text-gray-400" />
        </div>

        <div className="space-y-3">
          {topBuyersByFrequency.slice(0, 3).map(([buyer, count], idx) => {
            const percentage = Math.round((count / totalRecords) * 100);

            return (
              <motion.div
                key={buyer}
                className="flex items-center justify-between"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: isLoading ? 0 : 1, x: isLoading ? -10 : 0 }}
                transition={{ duration: 0.3, delay: 0.7 + 0.1 * idx }}
              >
                <span className={`text-xs ${idx === 0 ? "font-medium text-gray-700" : "text-gray-700"}`}>
                  {buyer}
                </span>
                <span className="text-xs text-primary font-semibold">
                  {percentage}% <span className="text-gray-400 font-normal">({count} records)</span>
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>

      <Button
        variant="outline"
        size="sm"
        className="w-full mt-5 py-2.5 text-xs font-medium text-gray-600 border-gray-200 hover:bg-gray-50 flex items-center justify-center gap-2"
        asChild
      >
        <Link to="/smart-connections">
          <TrendingUp className="w-3.5 h-3.5" />
          View All Smart Connections
        </Link>
      </Button>
    </motion.div>
  );
}
