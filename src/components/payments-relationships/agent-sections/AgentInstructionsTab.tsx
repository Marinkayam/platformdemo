
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Agent } from "@/types/smartConnection";
import { toast } from '@/hooks/use-toast';
import { Notes } from "@/components/common/Notes";

interface AgentInstructionsTabProps {
  agent: Agent;
  showAddForm?: boolean;
  onShowAddFormChange?: (show: boolean) => void;
}

interface Instruction {
  id: string;
  title: string;
  category: string;
  description: string;
  items: string[];
  addedBy: string;
  addedDate: string;
}

const mockInstructions: Instruction[] = [
  {
    id: "1",
    title: "Invoice Delivery Type",
    category: "Delivery Instructions",
    description: "How invoices should be routed through the portal system",
    items: [
      "All invoices must be submitted as PDF attachments",
      "Include PO number in the subject line",
      "Route to Accounts Payable queue for approval"
    ],
    addedBy: "System Admin",
    addedDate: "Jun 15, 2025"
  },
  {
    id: "2",
    title: "PO Validation Rules",
    category: "Validation Rules",
    description: "Purchase order requirements and validation checks",
    items: [
      "PO number is mandatory for all invoices",
      "Validate PO amount against invoice total",
      "Check PO status before processing"
    ],
    addedBy: "Finance Team",
    addedDate: "Jun 10, 2025"
  },
  {
    id: "3",
    title: "Data Requirements",
    category: "Data Requirements",
    description: "Mandatory vs optional fields for invoice processing",
    items: [
      "Required: Invoice number, date, amount, PO number",
      "Optional: Line item details, tax breakdown",
      "Supplier information must match portal registration"
    ],
    addedBy: "IT Admin",
    addedDate: "Jun 8, 2025"
  }
];

export function AgentInstructionsTab({ 
  agent, 
  showAddForm = false, 
  onShowAddFormChange 
}: AgentInstructionsTabProps) {
  const [instructions, setInstructions] = useState<Instruction[]>(mockInstructions);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newInstruction, setNewInstruction] = useState({
    title: "",
    category: "",
    description: ""
  });

  // Check if form is valid for save button state
  const isFormValid = newInstruction.title.trim() !== "" && 
                     newInstruction.category !== "" && 
                     newInstruction.description.trim() !== "";

  const handleSaveInstruction = () => {
    const instruction: Instruction = {
      id: editingId || Date.now().toString(),
      title: newInstruction.title,
      category: newInstruction.category,
      description: newInstruction.description,
      items: [],
      addedBy: "Current User",
      addedDate: new Date().toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric', 
        year: 'numeric' 
      })
    };

    if (editingId) {
      setInstructions(instructions.map(inst => inst.id === editingId ? instruction : inst));
      setEditingId(null);
      toast({ 
        title: "Instructions Updated", 
        description: "The instruction has been successfully updated." 
      });
    } else {
      setInstructions([...instructions, instruction]);
      toast({ 
        title: "Instructions Added", 
        description: "New instruction has been successfully added." 
      });
    }

    setNewInstruction({ title: "", category: "", description: "" });
    onShowAddFormChange?.(false);
  };

  const handleCancel = () => {
    setNewInstruction({ title: "", category: "", description: "" });
    onShowAddFormChange?.(false);
    setEditingId(null);
  };

  const handleCardClick = (instruction: Instruction) => {
    setNewInstruction({
      title: instruction.title,
      category: instruction.category,
      description: instruction.description
    });
    setEditingId(instruction.id);
    onShowAddFormChange?.(true);
  };

  return (
    <div className="h-full">
      {/* Add/Edit Instruction Form */}
      {showAddForm && (
        <div className="border rounded-lg p-6 bg-white mb-6">
          <div className="flex items-center gap-2 mb-6">
            <h3 className="text-lg font-semibold">
              {editingId ? "Update Instructions" : "Add Instructions"}
            </h3>
          </div>
          
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-sm font-medium">Title *</Label>
                <Input
                  value={newInstruction.title}
                  onChange={(e) => setNewInstruction({...newInstruction, title: e.target.value})}
                  placeholder="e.g., Invoice Delivery Type"
                  className="h-10"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium">Category *</Label>
                <Select 
                  value={newInstruction.category} 
                  onValueChange={(value) => setNewInstruction({...newInstruction, category: value})}
                >
                  <SelectTrigger className="h-10">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Delivery Instructions">Delivery Instructions</SelectItem>
                    <SelectItem value="Validation Rules">Validation Rules</SelectItem>
                    <SelectItem value="Data Requirements">Data Requirements</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label className="text-sm font-medium">Description *</Label>
              <Textarea
                value={newInstruction.description}
                onChange={(e) => setNewInstruction({...newInstruction, description: e.target.value})}
                placeholder="Explain the purpose of this instruction..."
                rows={3}
                className="resize-none"
              />
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t">
              <Button variant="outline" onClick={handleCancel} className="min-w-[80px]">
                Cancel
              </Button>
              <Button 
                onClick={handleSaveInstruction}
                disabled={!isFormValid}
                className={`min-w-[120px] ${
                  isFormValid 
                    ? "bg-[#7b61ff] hover:bg-[#6b46ff] text-white" 
                    : "bg-gray-200 text-gray-400 cursor-not-allowed"
                }`}
              >
                {editingId ? "Update Instructions" : "Add Instructions"}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Two-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full">
        {/* Left Column - Instructions */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Instructions</h3>
          {instructions.map((instruction) => (
            <Card 
              key={instruction.id} 
              className="hover:shadow-md transition-all duration-200 cursor-pointer hover:border-[#7b61ff]/30 border border-gray-200"
              onClick={() => handleCardClick(instruction)}
            >
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <CardTitle className="text-lg font-semibold text-gray-900">{instruction.title}</CardTitle>
                    </div>
                    <p className="text-sm text-gray-600">{instruction.description}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-2">
                  {instruction.items.map((item, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <span className="text-[#7b61ff] text-sm mt-0.5 font-medium">•</span>
                      <span className="text-sm text-gray-700 leading-relaxed">{item}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-3 border-t text-xs text-gray-500">
                  Added by <span className="font-medium">{instruction.addedBy}</span> on {instruction.addedDate}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Right Column - Notes */}
        <div className="h-full">
          <Notes 
            entityId={agent.id}
            entityType="agent"
            className="h-full"
          />
        </div>
      </div>
    </div>
  );
}
