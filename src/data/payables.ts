export interface PayableOption {
  id: string;
  name: string;
}

const initialPayables: PayableOption[] = [
  { id: "1", name: "Acme Corporation" },
  { id: "2", name: "Global Industries Ltd" },
  { id: "3", name: "TechStart Solutions" },
  { id: "4", name: "Metro Services Inc" },
  { id: "5", name: "Pioneer Manufacturing" },
  { id: "6", name: "Sunrise Enterprises" },
  { id: "7", name: "NextGen Systems" },
  { id: "8", name: "Atlantic Holdings" },
];

let payablesList: PayableOption[] = [...initialPayables];

export function getAllPayables(): PayableOption[] {
  return [...payablesList];
}

export function searchPayables(query: string): PayableOption[] {
  if (!query.trim()) return getAllPayables();
  
  const searchTerm = query.toLowerCase();
  return payablesList.filter(payable => 
    payable.name.toLowerCase().includes(searchTerm)
  );
}

export function addNewPayable(name: string): PayableOption {
  const newPayable: PayableOption = {
    id: `payable-${Date.now()}`,
    name: name.trim(),
  };
  
  payablesList.push(newPayable);
  return newPayable;
}

export function getPayableById(id: string): PayableOption | undefined {
  return payablesList.find(payable => payable.id === id);
}