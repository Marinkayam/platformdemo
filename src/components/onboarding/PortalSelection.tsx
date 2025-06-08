
import React, { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Search, Building } from 'lucide-react';

interface PortalOption {
  id: string;
  name: string;
  category: 'popular' | 'other';
}

const portals: PortalOption[] = [
  { id: 'coupa', name: 'Coupa', category: 'popular' },
  { id: 'sap-ariba', name: 'SAP Ariba', category: 'popular' },
  { id: 'oracle-procurement', name: 'Oracle Procurement', category: 'popular' },
  { id: 'jaggaer', name: 'Jaggaer', category: 'popular' },
  { id: 'sap-concur', name: 'SAP Concur', category: 'other' },
  { id: 'workday', name: 'Workday', category: 'other' },
  { id: 'netsuite', name: 'NetSuite', category: 'other' },
  { id: 'custom', name: 'Add Custom Portal', category: 'other' }
];

interface PortalSelectionProps {
  value: string;
  onChange: (value: string) => void;
}

export function PortalSelection({ value, onChange }: PortalSelectionProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPortals = portals.filter(portal =>
    portal.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const popularPortals = filteredPortals.filter(p => p.category === 'popular');
  const otherPortals = filteredPortals.filter(p => p.category === 'other');

  return (
    <div className="space-y-2">
      <Label className="text-sm font-medium text-grey-800">Portal</Label>
      <p className="text-sm text-grey-600">Select the portal you use to manage POs and invoices</p>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select your portal" />
        </SelectTrigger>
        <SelectContent>
          <div className="p-2">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-grey-400" />
              <Input
                placeholder="Search portals..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
          </div>
          {popularPortals.length > 0 && (
            <>
              <div className="px-2 py-1 text-xs font-semibold text-grey-500 uppercase tracking-wide">
                Popular Portals
              </div>
              {popularPortals.map(portal => (
                <SelectItem key={portal.id} value={portal.id} className="flex items-center gap-2">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-primary-light flex items-center justify-center">
                      <Building className="h-3 w-3 text-primary-main" />
                    </div>
                    {portal.name}
                  </div>
                </SelectItem>
              ))}
            </>
          )}
          {otherPortals.length > 0 && (
            <>
              <div className="px-2 py-1 text-xs font-semibold text-grey-500 uppercase tracking-wide">
                Other Portals
              </div>
              {otherPortals.map(portal => (
                <SelectItem key={portal.id} value={portal.id} className="flex items-center gap-2">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-grey-200 flex items-center justify-center">
                      <Building className="h-3 w-3 text-grey-600" />
                    </div>
                    {portal.name}
                  </div>
                </SelectItem>
              ))}
            </>
          )}
        </SelectContent>
      </Select>
    </div>
  );
}
