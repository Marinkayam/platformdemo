
import React, { useState } from "react";
import { useAddAgent, ReceivableOption } from "@/context/AddAgentContext";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Check, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

// Mock receivables data
const mockReceivables: ReceivableOption[] = [
  { id: "1", name: "ACME Corporation", companyName: "ACME Corp" },
  { id: "2", name: "TechFlow Solutions", companyName: "TechFlow Inc" },
  { id: "3", name: "Global Dynamics", companyName: "Global Dynamics LLC" },
  { id: "4", name: "NextGen Industries", companyName: "NextGen Inc" },
  { id: "5", name: "Premier Holdings", companyName: "Premier Holdings Corp" },
];

export function ConnectionSetupStep() {
  const { state, updateConnectionSetupData } = useAddAgent();
  const [receivableDropdownOpen, setReceivableDropdownOpen] = useState(false);
  const [payableDropdownOpen, setPayableDropdownOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const filteredReceivables = searchValue 
    ? mockReceivables.filter(receivable => 
        receivable.name.toLowerCase().includes(searchValue.toLowerCase()) ||
        receivable.companyName.toLowerCase().includes(searchValue.toLowerCase())
      )
    : mockReceivables;

  // Debug logging
  console.log("ConnectionSetupStep state:", {
    payableName: state.connectionSetupData.payableName,
    selectedReceivable: state.connectionSetupData.selectedReceivable,
    currentStep: state.currentStep,
    flowType: state.flowType
  });

  const handlePayableSelect = (payable: string) => {
    console.log("Payable selected:", payable);
    updateConnectionSetupData({ payableName: payable });
    setPayableDropdownOpen(false);
    console.log("Updated payable state:", payable);
  };

  const handleReceivableSelect = (receivable: ReceivableOption) => {
    console.log("Receivable selected:", receivable);
    updateConnectionSetupData({ selectedReceivable: receivable });
    setReceivableDropdownOpen(false);
    console.log("Updated receivable state:", receivable);
  };

  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <p className="text-[#8C92A3] text-lg">
          Set up the connection details for your new Smart Connection.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl mx-auto">
        <div className="space-y-2">
          <Label htmlFor="payableName" className="text-[#38415F] font-medium">
            Payable Name on the ERP *
          </Label>
          <Popover open={payableDropdownOpen} onOpenChange={setPayableDropdownOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={payableDropdownOpen}
                className="w-full justify-between h-12"
              >
                {state.connectionSetupData.payableName || "Select payable name..."}
                <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[--radix-popover-trigger-width] p-0" align="start">
              <Command>
                <CommandInput placeholder="Search payable names..." />
                <CommandList>
                  <CommandEmpty>No payable name found.</CommandEmpty>
                  <CommandGroup>
                    {["ACME Corporation", "TechFlow Solutions", "Global Dynamics", "NextGen Industries"].map((payable) => (
                      <CommandItem
                        key={payable}
                        value={payable}
                        onSelect={() => handlePayableSelect(payable)}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            state.connectionSetupData.payableName === payable ? "opacity-100" : "opacity-0"
                          )}
                        />
                        {payable}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>

        <div className="space-y-2">
          <Label htmlFor="receivable" className="text-[#38415F] font-medium">
            Select Existing Receivable *
          </Label>
          <Popover open={receivableDropdownOpen} onOpenChange={setReceivableDropdownOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={receivableDropdownOpen}
                className="w-full justify-between h-12"
              >
                {state.connectionSetupData.selectedReceivable 
                  ? state.connectionSetupData.selectedReceivable.name
                  : "Choose a receivable from the list available in Monto"
                }
                <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[--radix-popover-trigger-width] p-0" align="start">
              <Command>
                <CommandInput 
                  placeholder="Search receivables..." 
                  value={searchValue}
                  onValueChange={setSearchValue}
                />
                <CommandList>
                  <CommandEmpty>No receivable found.</CommandEmpty>
                  <CommandGroup>
                    {filteredReceivables.map((receivable) => (
                      <CommandItem
                        key={receivable.id}
                        value={receivable.name}
                        onSelect={() => handleReceivableSelect(receivable)}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            state.connectionSetupData.selectedReceivable?.id === receivable.id ? "opacity-100" : "opacity-0"
                          )}
                        />
                        <div>
                          <div className="font-medium">{receivable.name}</div>
                          <div className="text-sm text-gray-500">{receivable.companyName}</div>
                        </div>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </div>
  );
}
