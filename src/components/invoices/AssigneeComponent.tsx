
import { useState } from "react";
import { UserCircle2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from "@/components/ui/popover";
import { toast } from "@/hooks/use-toast";

interface AssigneeComponentProps {
  assignee?: string;
  onAssign: (email: string) => void;
  onRemove: () => void;
}

export function AssigneeComponent({ assignee, onAssign, onRemove }: AssigneeComponentProps) {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  
  const handleAssign = () => {
    if (!email || !email.includes('@')) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address",
      });
      return;
    }
    
    onAssign(email);
    setEmail("");
    setOpen(false);
    
    toast({
      title: "Invoice assigned",
      description: `Invoice has been assigned to ${email}`,
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
    return (
      <div className="flex items-center gap-2 group">
        <UserCircle2 className="h-4 w-4 text-gray-400" />
        <span className="text-[14px] text-gray-900">{assignee}</span>
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
      <PopoverContent className="w-80 p-4" align="start">
        <div className="space-y-4">
          <h4 className="font-medium text-sm">Assign Invoice</h4>
          <div className="space-y-2">
            <label htmlFor="assign-email" className="text-sm text-gray-500">
              Email Address
            </label>
            <input
              id="assign-email"
              type="email"
              placeholder="Enter email address"
              className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleAssign();
                }
              }}
            />
          </div>
          <div className="flex justify-end gap-2">
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
            >
              Assign
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
