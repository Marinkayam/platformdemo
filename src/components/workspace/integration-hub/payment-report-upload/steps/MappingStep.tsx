
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PAYMENT_REPORT_FIELDS } from '../types';

interface MappingStepProps {
  headers: string[];
  data: any[];
  mappings: { [key: string]: string };
  onMappingChange: (mappings: { [key: string]: string }) => void;
}

export function MappingStep({ headers, data, mappings, onMappingChange }: MappingStepProps) {
  const handleMappingChange = (fieldKey: string, headerValue: string) => {
    onMappingChange({
      ...mappings,
      [fieldKey]: headerValue,
    });
  };

  const getSampleData = (header: string) => {
    if (data.length > 0 && header && header !== 'skip') {
      return data[0][header] || '';
    }
    return '';
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-grey-900 mb-2">Map Your Fields</h3>
        <p className="text-grey-600">
          Match your file columns to Monto's payment report fields. Required fields are marked with *.
        </p>
      </div>

      <div className="border border-grey-400 rounded-lg overflow-hidden">
        <div className="bg-grey-200 px-4 py-3 border-b border-grey-400">
          <div className="grid grid-cols-4 gap-4 text-sm font-semibold text-grey-900">
            <div>Monto Field</div>
            <div>Your File Column</div>
            <div>Sample Data</div>
            <div>Description</div>
          </div>
        </div>
        
        <div className="divide-y divide-grey-300">
          {PAYMENT_REPORT_FIELDS.slice(0, 6).map((field) => (
            <div key={field.key} className="p-4">
              <div className="grid grid-cols-4 gap-4 items-start">
                <div className="text-sm font-medium text-grey-900">
                  {field.label}
                  {field.required && <span className="text-red-500 ml-1">*</span>}
                  {field.conditionallyRequired && (
                    <span className="text-orange-500 text-xs block">
                      Required if no {field.conditionallyRequired}
                    </span>
                  )}
                </div>
                
                <div>
                  <Select
                    value={mappings[field.key] || ''}
                    onValueChange={(value) => handleMappingChange(field.key, value)}
                  >
                    <SelectTrigger>
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
                </div>
                
                <div className="text-sm text-grey-600 font-mono">
                  {getSampleData(mappings[field.key])}
                </div>
                
                <div className="text-xs text-grey-500">
                  {field.description}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
