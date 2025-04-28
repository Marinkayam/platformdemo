
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Settings, X } from "lucide-react";

interface ColumnOption {
  id: number;
  name: string;
  selected: boolean;
}

interface TableCustomizationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onApplyChanges: (columns: ColumnOption[]) => void;
}

export function TableCustomizationDialog({
  open,
  onOpenChange,
  onApplyChanges,
}: TableCustomizationDialogProps) {
  const [columns, setColumns] = useState<ColumnOption[]>([
    { id: 1, name: "Invoice#", selected: true },
    { id: 2, name: "Payable", selected: true },
    { id: 3, name: "Status", selected: true },
    { id: 4, name: "Total Amount", selected: true },
    { id: 5, name: "Create Date", selected: true },
    { id: 6, name: "Portal Name", selected: true },
    { id: 7, name: "Due Date", selected: true },
    { id: 8, name: "Issue", selected: false },
    { id: 9, name: "Assignee", selected: false },
    { id: 10, name: "PO Payment Terms", selected: false },
    { id: 11, name: "Invoice Payment Terms", selected: false },
    { id: 12, name: "Days Overdue", selected: false },
    { id: 13, name: "Collection Days", selected: false },
    { id: 14, name: "Created Date to Today", selected: false },
    { id: 15, name: "Until Paid", selected: false },
    { id: 16, name: "Related Invoice", selected: false },
    { id: 17, name: "Owner", selected: true },
    { id: 18, name: "Schedule Payments", selected: false },
    { id: 19, name: "Approved", selected: false },
    { id: 20, name: "PO Number", selected: false },
    { id: 21, name: "PO Number", selected: false },
    { id: 22, name: "Confirmed Payment Date", selected: false },
    { id: 23, name: "Invoice Date", selected: false },
    { id: 24, name: "Tax Total", selected: false },
    { id: 25, name: "Currency", selected: false },
    { id: 26, name: "Entity", selected: false },
  ]);

  const toggleColumn = (id: number) => {
    setColumns(
      columns.map((column) =>
        column.id === id ? { ...column, selected: !column.selected } : column
      )
    );
  };

  const resetColumns = () => {
    setColumns(
      columns.map((column) => ({
        ...column,
        selected: [1, 2, 3, 4, 5, 6, 7, 17].includes(column.id),
      }))
    );
  };

  const handleApplyChanges = () => {
    onApplyChanges(columns);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader className="flex items-center justify-between flex-row">
          <div className="flex items-center gap-2">
            <Settings className="h-5 w-5 text-muted-foreground" />
            <DialogTitle className="text-xl">Customise Table</DialogTitle>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={resetColumns}
            className="text-red-500 hover:text-red-700 hover:bg-red-50"
          >
            Reset
          </Button>
        </DialogHeader>

        <div className="bg-gray-50 rounded-lg p-6 my-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {columns.map((column) => (
              <div
                key={column.id}
                onClick={() => toggleColumn(column.id)}
                className={`flex items-center gap-2 px-4 py-3 rounded-full border cursor-pointer transition-colors ${
                  column.selected
                    ? "border-primary bg-primary/5"
                    : "border-gray-200 bg-white"
                }`}
              >
                <span className="text-sm bg-gray-100 rounded-full w-6 h-6 flex items-center justify-center">
                  {column.id}
                </span>
                <span className="flex-grow">{column.name}</span>
                <span className="text-gray-400 grid place-items-center">
                  ⋮⋮
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-between mt-6">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="text-red-500 border-red-100 hover:bg-red-50"
          >
            Cancel
          </Button>
          <Button 
            onClick={handleApplyChanges}
            className="bg-[#7B59FF] hover:bg-[#6a4bea]"
          >
            Apply Changes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
