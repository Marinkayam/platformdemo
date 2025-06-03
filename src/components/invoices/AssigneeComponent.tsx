
import { useState } from "react";
import { UserCircle2, X, Check, ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { toast } from "@/hooks/use-toast";

interface Assignee {
  id: string;
  name: string;
  initials: string;
  email: string;
}

const mockAssignees: Assignee[] = [
  { id: '1', name: 'Jane Doe', initials: 'JD', email: 'jane.doe@example.com' },
  { id: '2', name: 'Alex Morgan', initials: 'AM', email: 'alex.morgan@example.com' },
  { id: '3', name: 'Sam Lee', initials: 'SL', email: 'sam.lee@example.com' },
  { id: '4', name: 'Maria Garcia', initials: 'MG', email: 'maria.garcia@example.com' },
  { id: '5', name: 'John Smith', initials: 'JS', email: 'john.smith@example.com' },
];

interface AssigneeComponentProps {
  assignee?: string;
  onAssign: (email: string) => void;
  onRemove: () => void;
}

export function AssigneeComponent({ assignee, onAssign, onRemove }: AssigneeComponentProps) {
  const [open, setOpen] = useState(false);
  const [selectedAssignee, setSelectedAssignee] = useState<Assignee | null>(null);
  
  const handleAssign = () => {
    if (!selectedAssignee) {
      toast({
        title: "No assignee selected",
        description: "Please select an assignee from the list",
      });
      return;
    }
    
    onAssign(selectedAssignee.email);
    setSelectedAssignee(null);
    setOpen(false);
    
    toast({
      title: "Invoice assigned",
      description: `Invoice has been assigned to ${selectedAssignee.name}`,
    });
  };
  
  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    onRemove();
    
    toast({
      title: "Assignment removed",
      description: "Invoice assignment has been removed",
    });
  };
  
  if (assignee) {
    // Find the assignee details for display
    const assigneeDetails = mockAssignees.find(a => a.email === assignee) || {
      initials: assignee.split('@')[0].slice(0, 2).toUpperCase(),
      name: assignee
    };
    
    return (
      <div className="flex items-center gap-2 group">
        <div className="h-6 w-6 rounded-full bg-gray-100 flex items-center justify-center">
          <span className="text-xs font-semibold text-gray-700">{assigneeDetails.initials}</span>
        </div>
        <span className="text-[14px] text-gray-900">{assigneeDetails.name}</span>
        <button 
          onClick={handleRemove}
          className="text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <X size={14} />
        </button>
      </div>
    );
  }
  
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button 
          variant="link" 
          className="p-0 h-auto text-primary hover:text-primary/80 font-medium"
        >
          Assign
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="start">
        <Command>
          <CommandInput placeholder="Search assignees..." className="h-9" />
          <CommandList>
            <CommandEmpty>No assignee found.</CommandEmpty>
            <CommandGroup>
              {mockAssignees.map((assignee) => (
                <CommandItem
                  key={assignee.id}
                  value={assignee.name}
                  onSelect={() => {
                    setSelectedAssignee(assignee);
                  }}
                  className="flex items-center gap-2 py-2 px-3"
                >
                  <div className="h-6 w-6 rounded-full bg-gray-100 flex items-center justify-center">
                    <span className="text-xs font-semibold text-gray-700">{assignee.initials}</span>
                  </div>
                  <span className="text-sm font-normal">{assignee.name}</span>
                  {selectedAssignee?.id === assignee.id && (
                    <Check className="ml-auto h-4 w-4" />
                  )}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
        <div className="flex justify-end gap-2 p-4 border-t">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>
          <Button 
            size="sm"
            onClick={handleAssign}
            disabled={!selectedAssignee}
          >
            Assign
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
