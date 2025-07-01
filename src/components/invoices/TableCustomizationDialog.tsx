
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Settings, X, Eye, EyeOff } from "lucide-react";
import { Switch } from "@/components/ui/switch";

interface ColumnOption {
  id: string;
  name: string;
  selected: boolean;
  required?: boolean;
  description?: string;
}

interface TableCustomizationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onApplyChanges: (columns: ColumnOption[]) => void;
}

const DEFAULT_COLUMNS: ColumnOption[] = [
  { id: "invoice-number", name: "Invoice#", selected: true, required: true, description: "Invoice identification number" },
  { id: "buyer", name: "Buyer", selected: true, required: true, description: "Company or entity making the purchase" },
  { id: "due-date", name: "Due Date", selected: true, description: "Payment due date" },
  { id: "status", name: "Status", selected: true, required: true, description: "Current invoice status" },
  { id: "portal", name: "Portal", selected: true, description: "Source portal or platform" },
  { id: "total", name: "Total Amount", selected: true, required: true, description: "Invoice total amount" },
  { id: "owner", name: "Owner", selected: true, description: "Invoice owner or assignee" },
  { id: "actions", name: "Actions", selected: true, required: true, description: "Available actions" },
  { id: "creation-date", name: "Creation Date", selected: false, description: "Date when invoice was created" },
  { id: "assignee", name: "Assignee", selected: false, description: "Person assigned to the invoice" },
  { id: "rejection-reason", name: "Rejection Reason", selected: false, description: "Reason for rejection if applicable" },
  { id: "po-number", name: "PO Number", selected: false, description: "Purchase Order reference number" },
  { id: "currency", name: "Currency", selected: false, description: "Invoice currency" },
  { id: "payment-terms", name: "Payment Terms", selected: false, description: "Payment terms and conditions" },
  { id: "tax-amount", name: "Tax Amount", selected: false, description: "Total tax amount" },
  { id: "subtotal", name: "Subtotal", selected: false, description: "Amount before tax" },
  { id: "document-type", name: "Document Type", selected: false, description: "Invoice or Credit Memo" },
  { id: "portal-id", name: "Portal ID", selected: false, description: "Internal portal identifier" },
  { id: "supplier-name", name: "Supplier Name", selected: false, description: "Supplier or vendor name" },
  { id: "approval-date", name: "Approval Date", selected: false, description: "Date when invoice was approved" }
];

export function TableCustomizationDialog({
  open,
  onOpenChange,
  onApplyChanges,
}: TableCustomizationDialogProps) {
  const [columns, setColumns] = useState<ColumnOption[]>(DEFAULT_COLUMNS);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredColumns = columns.filter(column =>
    column.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    column.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectedCount = columns.filter(col => col.selected).length;
  const totalCount = columns.length;

  const toggleColumn = (id: string) => {
    setColumns(prev =>
      prev.map(column =>
        column.id === id && !column.required
          ? { ...column, selected: !column.selected }
          : column
      )
    );
  };

  const resetColumns = () => {
    setColumns(DEFAULT_COLUMNS.map(col => ({ ...col })));
    setSearchTerm("");
  };

  const selectAllVisible = () => {
    setColumns(prev =>
      prev.map(column =>
        filteredColumns.some(filtered => filtered.id === column.id)
          ? { ...column, selected: true }
          : column
      )
    );
  };

  const deselectAllNonRequired = () => {
    setColumns(prev =>
      prev.map(column => ({
        ...column,
        selected: column.required || false
      }))
    );
  };

  const handleApplyChanges = () => {
    onApplyChanges(columns);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[900px] max-h-[80vh] flex flex-col">
        <DialogHeader className="flex items-center justify-between flex-row space-y-0 pb-4">
          <div className="flex items-center gap-2">
            <Settings className="h-5 w-5 text-muted-foreground" />
            <DialogTitle className="text-xl">Customize Table Columns</DialogTitle>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">
              {selectedCount} of {totalCount} columns selected
            </span>
          </div>
        </DialogHeader>

        <div className="flex flex-col gap-4 flex-1 min-h-0">
          {/* Search and Controls */}
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div className="flex-1 min-w-[200px]">
              <input
                type="text"
                placeholder="Search columns..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm"
              />
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={selectAllVisible}
                className="text-xs"
              >
                <Eye className="h-3 w-3 mr-1" />
                Show All
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={deselectAllNonRequired}
                className="text-xs"
              >
                <EyeOff className="h-3 w-3 mr-1" />
                Hide Optional
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={resetColumns}
                className="text-red-500 hover:text-red-700 hover:bg-red-50 text-xs"
              >
                Reset
              </Button>
            </div>
          </div>

          {/* Columns Grid */}
          <div className="flex-1 overflow-y-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 p-1">
              {filteredColumns.map((column) => (
                <div
                  key={column.id}
                  className={`group flex items-start gap-3 p-4 rounded-lg border cursor-pointer transition-all duration-200 ${
                    column.selected
                      ? "border-primary bg-primary/5 shadow-sm"
                      : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm"
                  } ${column.required ? "opacity-75" : ""}`}
                  onClick={() => !column.required && toggleColumn(column.id)}
                >
                  <Switch
                    checked={column.selected}
                    disabled={column.required}
                    className="mt-0.5"
                    aria-label={`Toggle ${column.name} column`}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium text-sm text-gray-900 truncate">
                        {column.name}
                      </h4>
                      {column.required && (
                        <span className="text-xs bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded">
                          Required
                        </span>
                      )}
                    </div>
                    {column.description && (
                      <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                        {column.description}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
            
            {filteredColumns.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <p>No columns match your search.</p>
              </div>
            )}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex justify-between items-center pt-4 border-t">
          <div className="text-sm text-gray-600">
            Select the columns you want to display in your table
          </div>
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="text-gray-600 border-gray-200 hover:bg-gray-50"
            >
              Cancel
            </Button>
            <Button 
              onClick={handleApplyChanges}
              className="bg-[#7B59FF] hover:bg-[#6a4bea] text-white"
            >
              Apply Changes
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
