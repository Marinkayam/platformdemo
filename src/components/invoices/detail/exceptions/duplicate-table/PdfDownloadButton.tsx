
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { Invoice } from "@/types/invoice";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface PdfDownloadButtonProps {
  invoice: Invoice;
  size?: "sm" | "icon";
  variant?: "outline" | "ghost";
}

export function PdfDownloadButton({ 
  invoice, 
  size = "sm",
  variant = "outline" 
}: PdfDownloadButtonProps) {
  const handleDownload = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    toast({
      title: "Download started",
      description: `Downloading invoice ${invoice.number}.pdf`,
    });
    
    // In a real app, this would trigger an actual download
    console.log(`Downloading PDF for invoice ${invoice.number}`);
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button 
            variant={variant}
            size={size}
            onClick={handleDownload}
            className="h-8 w-8"
          >
            <Download className="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Download PDF</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
