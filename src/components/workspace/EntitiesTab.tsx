import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TableActions, commonActions } from "@/components/ui/table-actions";
import { showSuccessToast } from "@/lib/toast-helpers";

type EntityType = "Corporation" | "LLC" | "Partnership" | "BV" | "Limited Company" | "GmbH" | "SAS" | "Other";

interface Entity {
  id: number;
  name: string;
  type: EntityType;
  taxId: string;
  jurisdiction: string;
}

const initialEntities: Entity[] = [
  { 
    id: 1, 
    name: "Monto Technologies Inc.", 
    type: "Corporation",
    taxId: "12-3456789",
    jurisdiction: "Delaware, US"
  },
  { 
    id: 2, 
    name: "Monto EU Holdings B.V.", 
    type: "BV",
    taxId: "NL123456789B01",
    jurisdiction: "Netherlands"
  },
  { 
    id: 3, 
    name: "Monto UK Limited", 
    type: "Limited Company",
    taxId: "GB123456789",
    jurisdiction: "United Kingdom"
  },
];

export function EntitiesTab() {
  const [entities, setEntities] = useState<Entity[]>(initialEntities);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [entityToEdit, setEntityToEdit] = useState<Entity | null>(null);
  const [entityToDelete, setEntityToDelete] = useState<Entity | null>(null);

  const [name, setName] = useState("");
  const [type, setType] = useState<EntityType>("Corporation");
  const [taxId, setTaxId] = useState("");
  const [jurisdiction, setJurisdiction] = useState("");
  
  const handleAddNewEntity = () => {
    setEntityToEdit(null);
    setName("");
    setType("Corporation");
    setTaxId("");
    setJurisdiction("");
    setIsModalOpen(true);
  };

  const handleEditEntity = (entity: Entity) => {
    setEntityToEdit(entity);
    setName(entity.name);
    setType(entity.type);
    setTaxId(entity.taxId);
    setJurisdiction(entity.jurisdiction);
    setIsModalOpen(true);
  };
  
  const handleDeleteEntityRequest = (entity: Entity) => {
    setEntityToDelete(entity);
  };
  
  const confirmDelete = () => {
    if (entityToDelete) {
      setEntities(entities.filter(e => e.id !== entityToDelete.id));
      setEntityToDelete(null);
      showSuccessToast("Entity removed", "The entity has been successfully removed.");
    }
  };

  const handleSaveEntity = () => {
    if (!name || !taxId || !jurisdiction) {
        return;
    }
    if (entityToEdit) {
      setEntities(entities.map(e => e.id === entityToEdit.id ? { ...e, name, type, taxId, jurisdiction } : e));
      showSuccessToast("Entity updated", "The entity details have been updated.");
    } else {
      const newEntity = { id: Date.now(), name, type, taxId, jurisdiction };
      setEntities([...entities, newEntity]);
      showSuccessToast("Entity added", "The new entity has been added successfully.");
    }
    setIsModalOpen(false);
    setEntityToEdit(null);
  };

  const entityActions = (entity: Entity) => [
    commonActions.edit(() => handleEditEntity(entity)),
    commonActions.delete(() => handleDeleteEntityRequest(entity)),
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h6 className="text-lg font-semibold text-gray-900 mb-1">Entities</h6>
          <p className="text-base text-gray-600">
            Manage your company's legal entities and subsidiaries.
          </p>
        </div>
        <Button onClick={handleAddNewEntity} size="default">
          <Plus size={16} strokeWidth={1.5} className="mr-2" />
          Add New Entity
        </Button>
      </div>
      
      <Card className="shadow-none border border-[#ececec] rounded-xl w-full overflow-hidden">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table className="min-w-full">
              <TableHeader className="bg-gray-50/50 border-b">
                <TableRow>
                  <TableHead className="px-4 md:px-6 py-4 text-left text-xs font-semibold text-gray-700 tracking-wide">Entity Name</TableHead>
                  <TableHead className="px-4 md:px-6 py-4 text-left text-xs font-semibold text-gray-700 tracking-wide">Type</TableHead>
                  <TableHead className="px-4 md:px-6 py-4 text-left text-xs font-semibold text-gray-700 tracking-wide">Tax ID</TableHead>
                  <TableHead className="px-4 md:px-6 py-4 text-left text-xs font-semibold text-gray-700 tracking-wide">Jurisdiction</TableHead>
                  <TableHead className="px-4 md:px-6 py-4 text-right text-xs font-semibold text-gray-700 tracking-wide"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="bg-white">
                {entities.map((entity) => (
                 <TableRow key={entity.id} className="hover:bg-gray-50/50 transition-colors border-b border-gray-100 last:border-b-0">
                    <TableCell className="px-4 md:px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">{entity.name}</div>
                    </TableCell>
                    <TableCell className="px-4 md:px-6 py-4">
                      <div className="text-sm text-gray-600">{entity.type}</div>
                    </TableCell>
                    <TableCell className="px-4 md:px-6 py-4">
                      <div className="text-sm text-gray-600 font-mono">{entity.taxId}</div>
                    </TableCell>
                    <TableCell className="px-4 md:px-6 py-4">
                      <div className="text-sm text-gray-600">{entity.jurisdiction}</div>
                    </TableCell>
                    <TableCell className="px-4 md:px-6 py-4 text-right">
                       <TableActions actions={entityActions(entity)} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
      
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>{entityToEdit ? "Edit Entity" : "Add New Entity"}</DialogTitle>
            <DialogDescription>
              {entityToEdit ? "Update the details for the entity." : "Enter the details to add a new legal entity."}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Entity Name
              </Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="col-span-3"
                placeholder="Monto Technologies Inc."
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="type" className="text-right">
                Type
              </Label>
              <Select value={type} onValueChange={(value: EntityType) => setType(value)}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select entity type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Corporation">Corporation</SelectItem>
                  <SelectItem value="LLC">LLC</SelectItem>
                  <SelectItem value="Partnership">Partnership</SelectItem>
                  <SelectItem value="BV">BV</SelectItem>
                  <SelectItem value="Limited Company">Limited Company</SelectItem>
                  <SelectItem value="GmbH">GmbH</SelectItem>
                  <SelectItem value="SAS">SAS</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="taxId" className="text-right">
                Tax ID
              </Label>
              <Input
                id="taxId"
                value={taxId}
                onChange={(e) => setTaxId(e.target.value)}
                className="col-span-3"
                placeholder="12-3456789"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="jurisdiction" className="text-right">
                Jurisdiction
              </Label>
              <Input
                id="jurisdiction"
                value={jurisdiction}
                onChange={(e) => setJurisdiction(e.target.value)}
                className="col-span-3"
                placeholder="Delaware, US"
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </DialogClose>
            <Button type="button" onClick={handleSaveEntity}>
              {entityToEdit ? "Save Changes" : "Add Entity"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <AlertDialog open={!!entityToDelete} onOpenChange={(open) => !open && setEntityToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently remove the entity from your records.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setEntityToDelete(null)}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-destructive hover:bg-destructive/90">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}