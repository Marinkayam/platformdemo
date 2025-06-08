
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Download, Plus, Filter } from "lucide-react";
import { Typography } from "@/components/ui/typography/typography";

interface InvoiceHeaderProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  onExportClick: () => void;
  onFilterClick: () => void;
  totalInvoices: number;
}

export function InvoiceHeader({
  searchQuery,
  onSearchChange,
  onExportClick,
  onFilterClick,
  totalInvoices
}: InvoiceHeaderProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <Typography variant="h2">Invoices</Typography>
        <Typography variant="subtitle1" className="text-grey-600">
          Manage and process Request to Pay invoices
        </Typography>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex flex-1 items-center space-x-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-grey-500 h-4 w-4" />
            <Input
              placeholder="Search invoices..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <Button variant="outline" size="sm" onClick={onFilterClick}>
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
        </div>

        <div className="flex items-center space-x-3">
          <Typography variant="body2" className="text-grey-600">
            {totalInvoices} invoices
          </Typography>
          
          <Button variant="outline" size="sm" onClick={onExportClick}>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          
          <Button size="sm" className="bg-primary-main hover:bg-primary-dark text-primary-contrast-text">
            <Plus className="h-4 w-4 mr-2" />
            Add Invoice
          </Button>
        </div>
      </div>
    </div>
  );
}
