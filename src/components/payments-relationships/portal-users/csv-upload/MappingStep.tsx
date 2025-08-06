
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
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Map Fields</h3>
        <p className="text-sm text-gray-600">Match the columns from your file to Monto's fields. We've made some suggestions for you.</p>

        {unmappedRequiredFields.length > 0 && (
            <div className="p-3 bg-yellow-50 border border-yellow-200 text-yellow-800 rounded-md text-sm">
                <strong>Warning:</strong> The following required fields are not mapped: {unmappedRequiredFields.join(', ')}.
            </div>
        )}
        
        {duplicateMappings.length > 0 && (
             <div className="p-3 bg-yellow-50 border border-yellow-200 text-yellow-800 rounded-md text-sm">
                <strong>Warning:</strong> The following columns are mapped to more than one field: {duplicateMappings.join(', ')}.
            </div>
        )}

        <div className="border rounded-lg overflow-hidden">
          <div className="overflow-auto max-h-[400px]">
            <Table className="w-[1000px]">
              <TableHeader className="bg-gray-50 sticky top-0 z-10">
                <TableRow>
                  <TableHead className="w-[30%] text-xs font-medium py-3 px-3">Monto Field</TableHead>
                  <TableHead className="w-[45%] text-xs font-medium py-3 px-3">Your File's Column</TableHead>
                  <TableHead className="w-[25%] text-xs font-medium py-3 px-3">Preview</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {MONTO_FIELDS.map(field => (
                  <TableRow key={field.key} className="h-12">
                    <TableCell className="font-medium text-xs py-2 px-3">
                      <div className="flex items-center gap-1">
                        <span className="truncate">{field.label}</span>
                        {field.required && <span className="text-destructive text-xs">*</span>}
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <AlertCircle className="h-3 w-3 text-gray-400 cursor-pointer flex-shrink-0" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="text-xs max-w-48">{field.description}</p>
                          </TooltipContent>
                        </Tooltip>
                      </div>
                    </TableCell>
                    <TableCell className="py-2 px-3">
                      <div className="flex items-center gap-1">
                        <ArrowRight className="h-3 w-3 text-gray-400 flex-shrink-0" />
                        <Select value={mappings[field.key]} onValueChange={(value) => handleMapping(field.key, value)}>
                          <SelectTrigger className="w-full h-8 text-xs">
                            <SelectValue placeholder="Select column" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="skip" className="text-xs">-- Don't import --</SelectItem>
                            {headers.map(header => (
                              <SelectItem key={header} value={header} className="text-xs">{header}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </TableCell>
                    <TableCell className="text-gray-500 italic text-xs py-2 px-3">
                      <div className="max-w-[100px]">
                        {mappings[field.key] && data.length > 0 ? (
                          data.slice(0, 2).map((row, i) => (
                            <div key={i} className="truncate text-[10px]">{row[mappings[field.key] as string]}</div>
                          ))
                        ) : 'N/A'}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}
