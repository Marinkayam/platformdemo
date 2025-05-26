
import React from "react";
import { Info } from "lucide-react";

interface InfoBannerProps {
  children: React.ReactNode;
}

export function InfoBanner({ children }: InfoBannerProps) {
  return (
    <div className="bg-[#EBF1FF] border border-[#C7D9FF] rounded-lg p-4 flex items-start space-x-3">
      <Info className="h-5 w-5 text-[#253EA7] mt-0.5 flex-shrink-0" />
      <p className="text-[#253EA7] text-sm leading-relaxed">{children}</p>
    </div>
  );
}
