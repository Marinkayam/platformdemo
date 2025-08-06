
import React from 'react';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Search, Info } from 'lucide-react';
import { cn } from '@/lib/utils';
import { getPortalLogoUrl } from '@/lib/utils';
import { AVAILABLE_PORTALS } from './portals';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface PortalSelectionStepProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedPortal: string;
  onPortalSelect: (portal: string) => void;
}

export function PortalSelectionStep({ searchQuery, setSearchQuery, selectedPortal, onPortalSelect }: PortalSelectionStepProps) {
  const filteredPortals = AVAILABLE_PORTALS.filter((portal) =>
    portal.name.toLowerCase().includes(searchQuery.toLowerCase())
  ).sort((a, b) => {
    const aName = a.name.toLowerCase();
    const bName = b.name.toLowerCase();
    const query = searchQuery.toLowerCase();

    if (aName === query && bName !== query) return -1;
    if (bName === query && aName !== query) return 1;

    return aName.localeCompare(bName);
  });

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-grey-500" />
          <Input
            placeholder="Search portal by name or paste login URL"
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="flex justify-center">
        {filteredPortals.length > 0 ? (
          <div className="w-full max-w-4xl">
            <div className="grid grid-cols-6 gap-6 justify-items-center">
              {filteredPortals.slice(0, 12).map((portal) => (
                <Card
                  key={portal.id}
                  className={cn(
                    "cursor-pointer transition-all hover:border-primary-main hover:shadow-md w-[120px] h-[110px] p-0 relative",
                    selectedPortal === portal.name && "border-primary-main bg-primary/5 shadow-md"
                  )}
                  onClick={() => onPortalSelect(portal.name)}
                >
                  <CardContent className="flex flex-col items-center justify-center h-full p-3">
                    <div className="w-14 h-14 rounded-full overflow-hidden flex items-center justify-center mb-3 bg-white shadow-sm">
                      <img
                        src={getPortalLogoUrl(portal.name)}
                        alt={`${portal.name} logo`}
                        className="w-full h-full object-contain p-2"
                        width={56}
                        height={56}
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = '/portal-logos/placeholder.svg';
                        }}
                      />
                    </div>
                    <span className="text-xs font-medium text-grey-900 text-center line-clamp-2">{portal.name}</span>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-12 border border-dashed rounded-lg w-full max-w-md">
            <p className="text-grey-600">🔍 No matching portals found.</p>
            <Button variant="link" className="text-primary mt-2">
              Want to add a new one? Click here.
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
