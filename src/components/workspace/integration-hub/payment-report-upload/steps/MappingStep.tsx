
import React, { useState, useEffect } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { AlertCircle, ArrowRight, Sparkles } from 'lucide-react';
import { PAYMENT_REPORT_FIELDS } from '../types';

interface MappingStepProps {
  headers: string[];
  data: any[];
  mappings: { [key: string]: string };
  onMappingChange: (mappings: { [key: string]: string }) => void;
}

export function MappingStep({ headers, data, mappings, onMappingChange }: MappingStepProps) {
  const [localMappings, setLocalMappings] = useState<{ [key: string]: string }>(mappings);
  const [dateFormat, setDateFormat] = useState<string>('MM/DD/YYYY');

  useEffect(() => {
    // Auto-map common headers
    const initialMappings: { [key: string]: string } = { ...mappings };
    PAYMENT_REPORT_FIELDS.forEach(field => {
      if (!initialMappings[field.key]) {
        const foundHeader = headers.find(h => 
          h.toLowerCase().replace(/[\s_]/g, '') === field.label.toLowerCase().replace(/\s/g, '')
        );
        if (foundHeader) {
          initialMappings[field.key] = foundHeader;
        }
      }
    });
    setLocalMappings(initialMappings);
    onMappingChange(initialMappings);
  }, [headers, onMappingChange]);

  const handleMapping = (fieldKey: string, headerValue: string) => {
    const newMappings = { ...localMappings, [fieldKey]: headerValue };
    setLocalMappings(newMappings);
    onMappingChange(newMappings);
  };

  const unmappedRequiredFields = PAYMENT_REPORT_FIELDS.filter(
    f => f.required && !localMappings[f.key]
  ).map(f => f.label);

  const mappedValues = Object.values(localMappings).filter(val => val && val !== 'skip');
  const valueCounts = mappedValues.reduce((acc, val) => {
    acc[val] = (acc[val] || 0) + 1;
    return acc;
  }, {} as { [key: string]: number });

  const duplicateMappings = Object.entries(valueCounts)
    .filter(([, count]) => count > 1)
    .map(([value]) => value);

  const dateFormats = [
    { value: 'MM/DD/YYYY', label: 'MM/DD/YYYY (e.g., 12/31/2024)' },
    { value: 'DD/MM/YYYY', label: 'DD/MM/YYYY (e.g., 31/12/2024)' },
    { value: 'YYYY-MM-DD', label: 'YYYY-MM-DD (e.g., 2024-12-31)' },
    { value: 'MM-DD-YYYY', label: 'MM-DD-YYYY (e.g., 12-31-2024)' },
    { value: 'DD-MM-YYYY', label: 'DD-MM-YYYY (e.g., 31-12-2024)' },
  ];

  return (
    <TooltipProvider>
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Map Fields</h3>
        <p className="text-sm text-gray-600">Match the columns from your file to Monto's payment report fields. We've made some suggestions for you.</p>

        {/* Email Connector Disclaimer */}
        <div className="flex items-start gap-2 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <Sparkles className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
          <p style={{ color: '#38415F' }} className="text-sm">
            Note: The mapping you define here will also apply to all reports submitted via the email connector.
          </p>
        </div>

        {/* Date Format Selection */}
        <div className="p-4 border border-gray-200 rounded-lg">
          <h4 className="text-sm font-medium text-gray-900 mb-2">Date Format Selection</h4>
          <p className="text-sm text-gray-600 mb-3">Please select the date format used in your file. This will apply to all date fields.</p>
          <Select value={dateFormat} onValueChange={setDateFormat}>
            <SelectTrigger className="w-full max-w-md">
              <SelectValue placeholder="Select date format" />
            </SelectTrigger>
            <SelectContent>
              {dateFormats.map(format => (
                <SelectItem key={format.value} value={format.value}>
                  {format.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Warning Messages */}
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

        {/* Mapping Table */}
        <div className="border rounded-lg overflow-hidden">
          <Table>
            <TableHeader className="bg-gray-50">
              <TableRow className="h-10">
                <TableHead className="py-2 text-xs font-medium">Monto Field</TableHead>
                <TableHead className="py-2 text-xs font-medium">Your File's Column</TableHead>
                <TableHead className="py-2 text-xs font-medium">Preview</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {PAYMENT_REPORT_FIELDS.map(field => (
                <TableRow key={field.key} className="h-12">
                  <TableCell className="py-2 text-sm font-medium">
                    <div className="flex items-center gap-1">
                      <span className="truncate">{field.label}</span>
                      {field.required && <span className="text-destructive text-xs">*</span>}
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <AlertCircle className="h-3 w-3 text-gray-400 cursor-pointer flex-shrink-0" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="text-xs">{field.description}</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                  </TableCell>
                  <TableCell className="py-2">
                    <div className="flex items-center gap-1">
                      <ArrowRight className="h-3 w-3 text-gray-400 flex-shrink-0" />
                      <Select value={localMappings[field.key] || ''} onValueChange={(value) => handleMapping(field.key, value)}>
                        <SelectTrigger className="w-[180px] h-8 text-xs">
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
                  <TableCell className="py-2 text-gray-500 italic text-xs">
                    <div className="max-w-[150px]">
                      {localMappings[field.key] && data.length > 0 ? (
                        data.slice(0, 2).map((row, i) => (
                          <div key={i} className="truncate">{row[localMappings[field.key] as string]}</div>
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
    </TooltipProvider>
  );
}
