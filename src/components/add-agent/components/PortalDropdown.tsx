
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Check, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { PortalOption } from "@/context/AddAgentContext";
import { getAllPortals, searchPortals } from "@/data/portals";

interface PortalDropdownProps {
  selectedPortal: PortalOption | null;
  onPortalSelect: (portal: PortalOption) => void;
}

export function PortalDropdown({ selectedPortal, onPortalSelect }: PortalDropdownProps) {
  const [open, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const portalsToShow = searchValue 
    ? searchPortals(searchValue)
    : getAllPortals();

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full max-w-md justify-between"
        >
          {selectedPortal ? selectedPortal.name : "Select a portal..."}
          <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full max-w-md p-0" align="start">
        <Command>
          <CommandInput 
            placeholder="Search portals..." 
            value={searchValue}
            onValueChange={setSearchValue}
          />
          <CommandList>
            <CommandEmpty>No portal found.</CommandEmpty>
            <CommandGroup>
              {portalsToShow.map((portal) => (
                <CommandItem
                  key={portal.id}
                  value={portal.name}
                  onSelect={() => {
                    onPortalSelect(portal);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      selectedPortal?.id === portal.id ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {portal.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
