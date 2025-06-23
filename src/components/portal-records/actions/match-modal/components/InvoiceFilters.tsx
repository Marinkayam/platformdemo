
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="space-y-2">
        <Label htmlFor="portal-filter" className="text-sm font-medium">Portal Filter</Label>
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
        <Label htmlFor="buyer-filter" className="text-sm font-medium">Buyer Filter</Label>
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
    </div>
  );
}
