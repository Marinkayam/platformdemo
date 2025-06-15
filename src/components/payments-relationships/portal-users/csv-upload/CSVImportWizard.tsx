
import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import Papa from 'papaparse';

import { UploadStep } from './UploadStep';
import { MappingStep } from './MappingStep';
import { ReviewStep } from './ReviewStep';
import { SummaryStep } from './SummaryStep';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { PortalUser } from '@/types/portalUser';

type WizardStepId = 'upload' | 'mapping' | 'review' | 'summary';

interface Step {
  id: WizardStepId;
  name: string;
}

const WIZARD_STEPS: Step[] = [
  { id: 'upload', name: 'Upload File' },
  { id: 'mapping', name: 'Map Fields' },
  { id: 'review', name: 'Review Data' },
  { id: 'summary', name: 'Summary & Import' },
];

export const MONTO_FIELDS: { key: keyof PortalUser | 'password'; label: string; required: boolean; description: string }[] = [
  { key: 'portal', label: 'Portal', required: true, description: "The name of the portal (e.g., Coupa, SAP Ariba)." },
  { key: 'username', label: 'Username', required: true, description: "The login email or username for the portal user." },
  { key: 'password', label: 'Password', required: false, description: "The password for the portal user. Will not be stored." },
];

export interface ValidatedUser extends Partial<PortalUser> {
  _row: number;
  _errors: string[];
  _warnings: string[];
  _status: 'valid' | 'warning' | 'error';
}

export function CSVImportWizard({ onComplete, onImport }: { onComplete: () => void; onImport: (users: Partial<PortalUser>[]) => void }) {
  const [currentStep, setCurrentStep] = useState<WizardStepId>('upload');
  const [file, setFile] = useState<File | null>(null);
  const [headers, setHeaders] = useState<string[]>([]);
  const [data, setData] = useState<any[]>([]);
  const [mappings, setMappings] = useState<{ [key: string]: string }>({});
  const [validatedData, setValidatedData] = useState<ValidatedUser[]>([]);

  const currentStepIndex = WIZARD_STEPS.findIndex(s => s.id === currentStep);
  const progress = ((currentStepIndex + 1) / WIZARD_STEPS.length) * 100;

  const parseFile = (fileToParse: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const fileData = e.target?.result;
      let parsedHeaders: string[] = [];
      let parsedRows: any[] = [];

      if (fileToParse.name.endsWith('.csv')) {
        Papa.parse(fileData as string, {
          header: true,
          skipEmptyLines: true,
          complete: (results) => {
            parsedHeaders = results.meta.fields || [];
            parsedRows = results.data;
            setHeaders(parsedHeaders);
            setData(parsedRows);
            setCurrentStep('mapping');
          },
        });
      } else if (fileToParse.name.endsWith('.xlsx')) {
        const workbook = XLSX.read(fileData, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        parsedRows = XLSX.utils.sheet_to_json(worksheet);
        if (parsedRows.length > 0) {
          parsedHeaders = Object.keys(parsedRows[0]);
        }
        setHeaders(parsedHeaders);
        setData(parsedRows);
        setCurrentStep('mapping');
      }
    };
    if (fileToParse.name.endsWith('.csv')) {
      reader.readAsText(fileToParse);
    } else {
      reader.readAsArrayBuffer(fileToParse);
    }
  };

  const handleNext = () => {
    if (currentStep === 'upload' && file) {
      parseFile(file);
    } else if (currentStep === 'mapping') {
      const newValidatedData = data.map((row, index) => {
          const user: ValidatedUser = { _row: index + 2, _errors: [], _warnings: [], _status: 'valid' };
          
          MONTO_FIELDS.forEach(field => {
              const mappedHeader = mappings[field.key];
              const value = mappedHeader && mappedHeader !== 'skip' ? row[mappedHeader] : undefined;

              if (value) {
                  (user as any)[field.key] = value;
              } else {
                  if (field.required) {
                      user._errors.push(`Missing required field: ${field.label}`);
                  } else {
                      user._warnings.push(`Missing optional field: ${field.label}`);
                  }
              }
          });

          if (user._errors.length > 0) {
              user._status = 'error';
          } else if (user._warnings.length > 0) {
              user._status = 'warning';
          }
          
          return user;
      });
      setValidatedData(newValidatedData);
      setCurrentStep('review');
    } else if (currentStep === 'review') {
      setCurrentStep('summary');
    }
  };

  const handleBack = () => {
    if (currentStep === 'mapping') setCurrentStep('upload');
    if (currentStep === 'review') setCurrentStep('mapping');
    if (currentStep === 'summary') setCurrentStep('review');
  };
  
  const handleImport = () => {
    const usersToImport = validatedData
        .filter(user => user._status !== 'error')
        .map(({ _row, _errors, _warnings, _status, ...user }) => user);
    onImport(usersToImport);
    onComplete();
  }

  const isNextDisabled = () => {
    if (currentStep === 'upload') return !file;
    if (currentStep === 'mapping') return MONTO_FIELDS.filter(f => f.required).some(f => !mappings[f.key]);
    return false;
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 'upload':
        return <UploadStep onFileSelect={setFile} selectedFile={file} />;
      case 'mapping':
        return <MappingStep headers={headers} data={data} onMappingChange={setMappings} />;
      case 'review':
        return <ReviewStep data={validatedData} onDataChange={setValidatedData} />;
      case 'summary':
        return <SummaryStep data={validatedData} />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Progress value={progress} />
        <div className="flex justify-between text-sm font-medium text-gray-600">
          {WIZARD_STEPS.map((step, index) => (
            <span key={step.id} className={currentStepIndex >= index ? 'text-primary' : ''}>
              {step.name}
            </span>
          ))}
        </div>
      </div>
      
      <div className="min-h-[400px]">
        {renderStepContent()}
      </div>

      <div className="flex justify-between items-center pt-4 border-t">
        <div>
          {currentStep !== 'upload' && (
            <Button variant="outline" onClick={handleBack}>
              <ArrowLeft className="mr-2" /> Back
            </Button>
          )}
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" onClick={onComplete}>Cancel</Button>
          {currentStep === 'summary' ? (
            <Button onClick={handleImport}>Import Users</Button>
          ) : (
            <Button onClick={handleNext} disabled={isNextDisabled()}>
              Continue <ArrowRight className="ml-2" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
