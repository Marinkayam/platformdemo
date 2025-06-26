
import { useState } from 'react';
import * as XLSX from 'xlsx';
import Papa from 'papaparse';

export function useFileParser() {
  const [headers, setHeaders] = useState<string[]>([]);
  const [data, setData] = useState<any[]>([]);

  const parseFile = (file: File): Promise<void> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const fileData = e.target?.result;
        let parsedHeaders: string[] = [];
        let parsedRows: any[] = [];

        if (file.name.endsWith('.csv')) {
          Papa.parse(fileData as string, {
            header: true,
            skipEmptyLines: true,
            complete: (results) => {
              parsedHeaders = results.meta.fields || [];
              parsedRows = results.data;
              setHeaders(parsedHeaders);
              setData(parsedRows);
              resolve();
            },
          });
        } else if (file.name.endsWith('.xlsx')) {
          const workbook = XLSX.read(fileData, { type: 'array' });
          const sheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[sheetName];
          parsedRows = XLSX.utils.sheet_to_json(worksheet);
          if (parsedRows.length > 0) {
            parsedHeaders = Object.keys(parsedRows[0]);
          }
          setHeaders(parsedHeaders);
          setData(parsedRows);
          resolve();
        }
      };
      
      if (file.name.endsWith('.csv')) {
        reader.readAsText(file);
      } else {
        reader.readAsArrayBuffer(file);
      }
    });
  };

  return {
    headers,
    data,
    parseFile,
  };
}
