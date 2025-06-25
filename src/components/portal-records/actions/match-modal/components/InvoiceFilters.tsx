
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { PortalRecord } from "@/types/portalRecord";

interface InvoiceFiltersProps {
  record: PortalRecord;
  selectedPortal: string;
  setSelectedPortal: (portal: string) => void;
  selectedBuyer: string;
  setSelectedBuyer: (buyer: string) => void;
}

export function InvoiceFilters({
  record,
  selectedPortal,
  setSelectedPortal,
  selectedBuyer,
  setSelectedBuyer,
}: InvoiceFiltersProps) {
  const [fromDate, setFromDate] = useState<Date>();
  const [toDate, setToDate] = useState<Date>();

  const formatDateRange = () => {
    if (fromDate && toDate) {
      return `${format(fromDate, "MM/dd")} - ${format(toDate, "MM/dd")}`;
    } else if (fromDate) {
      return `From ${format(fromDate, "MM/dd")}`;
    } else if (toDate) {
      return `To ${format(toDate, "MM/dd")}`;
    }
    return "Select dates";
  };

  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="space-y-2">
        <Label htmlFor="portal-filter" className="text-sm font-medium">Portal</Label>
        <Select value={selectedPortal} onValueChange={setSelectedPortal}>
          <SelectTrigger className="h-10">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={record.portal}>{record.portal}</SelectItem>
            <SelectItem value="All Portals">All Portals</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="buyer-filter" className="text-sm font-medium">Buyer</Label>
        <Select value={selectedBuyer} onValueChange={setSelectedBuyer}>
          <SelectTrigger className="h-10">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={record.buyer}>{record.buyer}</SelectItem>
            <SelectItem value="all_buyers">All Buyers</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label className="text-sm font-medium">Date Range</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-full justify-start text-left font-normal h-10",
                !fromDate && !toDate && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {formatDateRange()}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <div className="p-4 space-y-4">
              <div>
                <Label className="text-sm font-medium mb-2 block">From Date</Label>
                <Calendar
                  mode="single"
                  selected={fromDate}
                  onSelect={setFromDate}
                  className="p-0 pointer-events-auto"
                />
              </div>
              <div>
                <Label className="text-sm font-medium mb-2 block">To Date</Label>
                <Calendar
                  mode="single"
                  selected={toDate}
                  onSelect={setToDate}
                  className="p-0 pointer-events-auto"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2 border-t">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => {
                    setFromDate(undefined);
                    setToDate(undefined);
                  }}
                >
                  Clear
                </Button>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
