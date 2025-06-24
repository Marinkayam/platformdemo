
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { FileText, Plus } from "lucide-react";
import { Agent } from "@/types/smartConnection";

interface AgentInstructionsTabProps {
  agent: Agent;
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

export function AgentInstructionsTab({ agent }: AgentInstructionsTabProps) {
  const [instructions, setInstructions] = useState<Instruction[]>(mockInstructions);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newInstruction, setNewInstruction] = useState({
    title: "",
    category: "",
    description: "",
    items: [""]
  });

  const handleAddInstruction = () => {
    const instruction: Instruction = {
      id: Date.now().toString(),
      title: newInstruction.title,
      category: newInstruction.category,
      description: newInstruction.description,
      items: newInstruction.items.filter(item => item.trim() !== ""),
      addedBy: "Current User",
      addedDate: new Date().toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric', 
        year: 'numeric' 
      })
    };

    setInstructions([...instructions, instruction]);
    setNewInstruction({ title: "", category: "", description: "", items: [""] });
    setShowAddForm(false);
  };

  const handleCancel = () => {
    setNewInstruction({ title: "", category: "", description: "", items: [""] });
    setShowAddForm(false);
  };

  const addNewItem = () => {
    setNewInstruction({
      ...newInstruction,
      items: [...newInstruction.items, ""]
    });
  };

  const updateItem = (index: number, value: string) => {
    const updatedItems = [...newInstruction.items];
    updatedItems[index] = value;
    setNewInstruction({
      ...newInstruction,
      items: updatedItems
    });
  };

  const removeItem = (index: number) => {
    const updatedItems = newInstruction.items.filter((_, i) => i !== index);
    setNewInstruction({
      ...newInstruction,
      items: updatedItems
    });
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Agent Instructions</h3>
        <Button 
          onClick={() => setShowAddForm(true)}
          className="bg-[#7b61ff] hover:bg-[#6b46ff]"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Instruction
        </Button>
      </div>

      {/* Add Instruction Form */}
      {showAddForm && (
        <Card className="border-2 border-[#7b61ff]/20">
          <CardHeader>
            <CardTitle className="text-base">Add New Instruction</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Title</Label>
                <Input
                  value={newInstruction.title}
                  onChange={(e) => setNewInstruction({...newInstruction, title: e.target.value})}
                  placeholder="e.g., Invoice Delivery Type"
                />
              </div>
              <div className="space-y-2">
                <Label>Category</Label>
                <Select 
                  value={newInstruction.category} 
                  onValueChange={(value) => setNewInstruction({...newInstruction, category: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Delivery Instructions">Delivery Instructions</SelectItem>
                    <SelectItem value="Validation Rules">Validation Rules</SelectItem>
                    <SelectItem value="Data Requirements">Data Requirements</SelectItem>
                    <SelectItem value="Behavioral Rules">Behavioral Rules</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea
                value={newInstruction.description}
                onChange={(e) => setNewInstruction({...newInstruction, description: e.target.value})}
                placeholder="Explain the purpose of this instruction..."
                rows={2}
              />
            </div>

            <div className="space-y-2">
              <Label>Instruction Items</Label>
              {newInstruction.items.map((item, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    value={item}
                    onChange={(e) => updateItem(index, e.target.value)}
                    placeholder="Enter instruction item..."
                  />
                  {newInstruction.items.length > 1 && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => removeItem(index)}
                    >
                      Remove
                    </Button>
                  )}
                </div>
              ))}
              <Button
                variant="outline"
                size="sm"
                onClick={addNewItem}
                className="mt-2"
              >
                Add Item
              </Button>
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <Button variant="outline" onClick={handleCancel}>
                Cancel
              </Button>
              <Button 
                onClick={handleAddInstruction}
                disabled={!newInstruction.title || !newInstruction.category || !newInstruction.description}
                className="bg-[#7b61ff] hover:bg-[#6b46ff]"
              >
                Save Instruction
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Behavioral Rules Callout */}
      <Alert className="bg-yellow-50 border-yellow-200">
        <FileText className="h-4 w-4 text-yellow-600" />
        <AlertDescription className="text-yellow-800">
          <span className="font-medium">Behavioral Rules:</span> Monto-specific learned behaviors are automatically 
          generated based on agent interactions and can be fine-tuned here.
        </AlertDescription>
      </Alert>

      {/* Instruction Cards */}
      <div className="space-y-4">
        {instructions.map((instruction) => (
          <Card key={instruction.id} className="hover:shadow-sm transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-base font-semibold">{instruction.title}</CardTitle>
                  <p className="text-sm text-gray-600 mt-1">{instruction.description}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-2">
                {instruction.items.map((item, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <span className="text-gray-400 text-sm mt-0.5">•</span>
                    <span className="text-sm text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-3 border-t text-xs text-gray-500">
                Added by {instruction.addedBy} on {instruction.addedDate}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
