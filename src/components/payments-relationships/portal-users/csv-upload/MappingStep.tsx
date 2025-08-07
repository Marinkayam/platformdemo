
import React, { useState, useEffect } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { AlertCircle, ArrowRight } from 'lucide-react';
import { MONTO_FIELDS } from './types';

interface MappingStepProps {
  headers: string[];
  data: any[];
  onMappingChange: (mappings: { [key: string]: string }) => void;
}

export function MappingStep({ headers, data, onMappingChange }: MappingStepProps) {
  const [mappings, setMappings] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    // Auto-map common headers
    const initialMappings: { [key: string]: string } = {};
    MONTO_FIELDS.forEach(field => {
      const foundHeader = headers.find(h => h.toLowerCase().replace(/[\s_]/g, '') === field.label.toLowerCase().replace(/\s/g, ''));
      if (foundHeader) {
        initialMappings[field.key] = foundHeader;
      }
    });
    setMappings(initialMappings);
    onMappingChange(initialMappings);
  }, [headers, onMappingChange]);

  const handleMapping = (montoField: string, csvHeader: string) => {
    const newMappings = { ...mappings, [montoField]: csvHeader };
    setMappings(newMappings);
    onMappingChange(newMappings);
  };

  const unmappedRequiredFields = MONTO_FIELDS.filter(f => f.required && !mappings[f.key]).map(f => f.label);

  const mappedValues = Object.values(mappings).filter(val => val && val !== 'skip');
  const valueCounts = mappedValues.reduce((acc, val) => {
      acc[val] = (acc[val] || 0) + 1;
      return acc;
  }, {} as { [key: string]: number });

  const duplicateMappings = Object.entries(valueCounts)
      .filter(([, count]) => count > 1)
      .map(([value]) => value);

  return (
    <TooltipProvider>
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold">Map Fields</h3>
          <p className="text-sm text-gray-600 mt-1">Match the columns from your file to Monto's fields. We've made some suggestions for you.</p>
        </div>

        {unmappedRequiredFields.length > 0 && (
            <div className="p-3 bg-yellow-50 border border-yellow-200 text-yellow-800 rounded-md text-sm flex items-start gap-2">
                <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <div>
                  <strong>Missing Required Fields:</strong> {unmappedRequiredFields.join(', ')}.
                </div>
            </div>
        )}
        
        {duplicateMappings.length > 0 && (
             <div className="p-3 bg-yellow-50 border border-yellow-200 text-yellow-800 rounded-md text-sm flex items-start gap-2">
                <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <div>
                  <strong>Duplicate Mappings:</strong> The following columns are mapped to more than one field: {duplicateMappings.join(', ')}.
                </div>
            </div>
        )}

        {/* Mapping Table */}
        <div className="border rounded-lg overflow-hidden bg-white">
          <Table className="w-[600px]">
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead className="font-medium text-gray-900 w-[200px] px-2 py-2 text-sm">Monto Field</TableHead>
                <TableHead className="font-medium text-gray-900 w-[200px] px-2 py-2 text-sm">Your CSV Column</TableHead>
                <TableHead className="font-medium text-gray-900 w-[200px] px-2 py-2 text-sm">Sample Data</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {MONTO_FIELDS.map((field) => (
                <TableRow key={field.key} className="h-12 hover:bg-gray-50/50">
                  <TableCell className="px-2 py-2 w-[200px]">
                    <div className="flex items-center gap-1">
                      <span className="font-medium text-sm truncate">
                        {field.label}
                        {field.required && <span className="text-red-500 ml-1">*</span>}
                      </span>
                      <Tooltip>
                        <TooltipTrigger>
                          <AlertCircle className="h-3 w-3 text-gray-400 flex-shrink-0" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="text-sm max-w-xs">{field.description}</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                  </TableCell>
                  <TableCell className="px-2 py-2 w-[200px]">
                    <Select
                      value={mappings[field.key] || ''}
                      onValueChange={(value) => handleMapping(field.key, value)}
                    >
                      <SelectTrigger className="w-full h-8 text-sm">
                        <SelectValue placeholder="Select column..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="skip">Skip this field</SelectItem>
                        {headers.map((header) => (
                          <SelectItem key={header} value={header}>
                            {header}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell className="px-2 py-2 w-[200px]">
                    <div className="text-sm text-gray-600 font-mono truncate">
                      {mappings[field.key] && mappings[field.key] !== 'skip' && data[0] 
                        ? data[0][mappings[field.key]] || '(empty)'
                        : '—'}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

      </div>
    </TooltipProvider>
  );
}
