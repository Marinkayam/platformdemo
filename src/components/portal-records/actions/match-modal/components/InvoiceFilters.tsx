
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
          <PopoverContent className="w-80 p-0" align="start">
            <div className="p-3 space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className="text-xs font-medium mb-1 block">From</Label>
                  <Calendar
                    mode="single"
                    selected={fromDate}
                    onSelect={setFromDate}
                    className="p-0 pointer-events-auto w-full"
                    classNames={{
                      months: "flex w-full",
                      month: "space-y-2 w-full",
                      caption: "flex justify-center pt-1 relative items-center",
                      caption_label: "text-xs font-medium",
                      nav: "space-x-1 flex items-center",
                      nav_button: "h-6 w-6 bg-transparent p-0 opacity-50 hover:opacity-100",
                      nav_button_previous: "absolute left-1",
                      nav_button_next: "absolute right-1",
                      table: "w-full border-collapse space-y-1",
                      head_row: "flex",
                      head_cell: "text-muted-foreground rounded-md w-7 font-normal text-[0.7rem]",
                      row: "flex w-full mt-1",
                      cell: "h-7 w-7 text-center text-xs p-0 relative",
                      day: "h-7 w-7 p-0 font-normal aria-selected:opacity-100",
                      day_selected: "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
                      day_today: "bg-accent text-accent-foreground",
                      day_outside: "text-muted-foreground opacity-50"
                    }}
                  />
                </div>
                <div>
                  <Label className="text-xs font-medium mb-1 block">To</Label>
                  <Calendar
                    mode="single"
                    selected={toDate}
                    onSelect={setToDate}
                    className="p-0 pointer-events-auto w-full"
                    classNames={{
                      months: "flex w-full",
                      month: "space-y-2 w-full",
                      caption: "flex justify-center pt-1 relative items-center",
                      caption_label: "text-xs font-medium",
                      nav: "space-x-1 flex items-center",
                      nav_button: "h-6 w-6 bg-transparent p-0 opacity-50 hover:opacity-100",
                      nav_button_previous: "absolute left-1",
                      nav_button_next: "absolute right-1",
                      table: "w-full border-collapse space-y-1",
                      head_row: "flex",
                      head_cell: "text-muted-foreground rounded-md w-7 font-normal text-[0.7rem]",
                      row: "flex w-full mt-1",
                      cell: "h-7 w-7 text-center text-xs p-0 relative",
                      day: "h-7 w-7 p-0 font-normal aria-selected:opacity-100",
                      day_selected: "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
                      day_today: "bg-accent text-accent-foreground",
                      day_outside: "text-muted-foreground opacity-50"
                    }}
                  />
                </div>
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
