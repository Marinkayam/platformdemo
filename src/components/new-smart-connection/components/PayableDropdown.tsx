import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Check, ChevronDown, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { PayableOption } from "@/data/payables";
import { getAllPayables, searchPayables, addNewPayable } from "@/data/payables";

interface PayableDropdownProps {
  selectedPayable: PayableOption | null;
  onPayableSelect: (payable: PayableOption) => void;
}

export function PayableDropdown({ selectedPayable, onPayableSelect }: PayableDropdownProps) {
  const [open, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const payablesToShow = searchValue 
    ? searchPayables(searchValue)
    : getAllPayables();

  // Check if we should show "Add new" option
  const shouldShowAddNew = searchValue.trim() && 
    !payablesToShow.some(payable => 
      payable.name.toLowerCase() === searchValue.toLowerCase()
    );

  const handleAddNew = () => {
    if (searchValue.trim()) {
      const newPayable = addNewPayable(searchValue.trim());
      onPayableSelect(newPayable);
      setSearchValue("");
      setOpen(false);
    }
  };

  const handleSelectExisting = (payable: PayableOption) => {
    onPayableSelect(payable);
    setSearchValue("");
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full h-12 justify-between"
        >
          {selectedPayable ? selectedPayable.name : "Select payable name..."}
          <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent 
        className="w-[--radix-popover-trigger-width] p-0" 
        align="start"
        side="bottom"
      >
        <Command>
          <CommandInput 
            placeholder="Search or type new payable name..." 
            value={searchValue}
            onValueChange={setSearchValue}
          />
          <CommandList>
            <CommandEmpty>
              <div className="py-2 text-center text-sm text-muted-foreground">
                No payable found.
              </div>
            </CommandEmpty>
            <CommandGroup>
              {shouldShowAddNew && (
                <CommandItem
                  onSelect={handleAddNew}
                  className="text-primary cursor-pointer"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add '{searchValue}'
                </CommandItem>
              )}
              {payablesToShow.map((payable) => (
                <CommandItem
                  key={payable.id}
                  value={payable.name}
                  onSelect={() => handleSelectExisting(payable)}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      selectedPayable?.id === payable.id ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {payable.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}