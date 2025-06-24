
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { FileText, Plus, Edit2, X } from "lucide-react";
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
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newInstruction, setNewInstruction] = useState({
    title: "",
    category: "",
    description: "",
    items: [""]
  });

  // Check if form is valid for save button state
  const isFormValid = newInstruction.title.trim() !== "" && 
                     newInstruction.category !== "" && 
                     newInstruction.description.trim() !== "" &&
                     newInstruction.items.some(item => item.trim() !== "");

  const handleSaveInstruction = () => {
    const instruction: Instruction = {
      id: editingId || Date.now().toString(),
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

    if (editingId) {
      setInstructions(instructions.map(inst => inst.id === editingId ? instruction : inst));
      setEditingId(null);
    } else {
      setInstructions([...instructions, instruction]);
    }

    setNewInstruction({ title: "", category: "", description: "", items: [""] });
    setShowAddForm(false);
  };

  const handleCancel = () => {
    setNewInstruction({ title: "", category: "", description: "", items: [""] });
    setShowAddForm(false);
    setEditingId(null);
  };

  const handleEdit = (instruction: Instruction) => {
    setNewInstruction({
      title: instruction.title,
      category: instruction.category,
      description: instruction.description,
      items: instruction.items
    });
    setEditingId(instruction.id);
    setShowAddForm(true);
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
        <div></div>
        {!showAddForm && (
          <Button 
            onClick={() => setShowAddForm(true)}
            className="bg-[#7b61ff] hover:bg-[#6b46ff] text-white"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Instruction
          </Button>
        )}
      </div>

      {/* Add/Edit Instruction Form */}
      {showAddForm && (
        <Card className="border-2 border-[#7b61ff]/20 shadow-lg">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg flex items-center gap-2">
              {editingId ? <Edit2 className="h-5 w-5" /> : <Plus className="h-5 w-5" />}
              {editingId ? "Edit Instruction" : "Add New Instruction"}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
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
                    <SelectItem value="Behavioral Rules">Behavioral Rules</SelectItem>
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

            <div className="space-y-3">
              <Label className="text-sm font-medium">Instruction Items *</Label>
              <div className="space-y-3">
                {newInstruction.items.map((item, index) => (
                  <div key={index} className="flex gap-3">
                    <Input
                      value={item}
                      onChange={(e) => updateItem(index, e.target.value)}
                      placeholder="Enter instruction item..."
                      className="flex-1 h-10"
                    />
                    {newInstruction.items.length > 1 && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => removeItem(index)}
                        className="h-10 w-10 p-0 hover:bg-red-50 hover:border-red-200 hover:text-red-600"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={addNewItem}
                  className="h-9 text-sm"
                >
                  <Plus className="h-3 w-3 mr-1" />
                  Add Item
                </Button>
              </div>
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
                {editingId ? "Update Instruction" : "Save Instruction"}
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
          <Card key={instruction.id} className="hover:shadow-md transition-shadow border border-gray-200">
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <CardTitle className="text-lg font-semibold text-gray-900">{instruction.title}</CardTitle>
                    <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-md">
                      {instruction.category}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">{instruction.description}</p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleEdit(instruction)}
                  className="h-8 w-8 p-0 text-gray-400 hover:text-gray-600"
                >
                  <Edit2 className="h-4 w-4" />
                </Button>
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
    </div>
  );
}
