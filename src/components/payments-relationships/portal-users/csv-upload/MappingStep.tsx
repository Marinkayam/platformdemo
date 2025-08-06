
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

      </div>
    </TooltipProvider>
  );
}
