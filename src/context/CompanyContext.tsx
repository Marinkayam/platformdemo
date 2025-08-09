import React, { createContext, useState, useContext, useEffect } from 'react';

interface CompanyInfo {
  logoUrl: string | null;
  name: string;
  timezone: string;
}

interface CompanyContextType {
  companyInfo: CompanyInfo;
  updateLogo: (logoUrl: string | null) => void;
  updateCompanyInfo: (info: Partial<CompanyInfo>) => void;
}

const CompanyContext = createContext<CompanyContextType | undefined>(undefined);

export const useCompany = () => {
  const context = useContext(CompanyContext);
  if (!context) {
    throw new Error('useCompany must be used within a CompanyProvider');
  }
  return context;
};

export const CompanyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [companyInfo, setCompanyInfo] = useState<CompanyInfo>({
    logoUrl: null,
    name: 'Monto LTD',
    timezone: '🇮🇱 Israel (Asia/Jerusalem)'
  });

  // Load company info from localStorage on mount
  useEffect(() => {
    const savedCompanyInfo = localStorage.getItem('companyInfo');
    if (savedCompanyInfo) {
      try {
        setCompanyInfo(JSON.parse(savedCompanyInfo));
      } catch (e) {
        console.error('Failed to parse company info from localStorage');
      }
    }
  }, []);

  // Save company info to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('companyInfo', JSON.stringify(companyInfo));
  }, [companyInfo]);

  const updateLogo = (logoUrl: string | null) => {
    setCompanyInfo(prev => ({ ...prev, logoUrl }));
  };

  const updateCompanyInfo = (info: Partial<CompanyInfo>) => {
    setCompanyInfo(prev => ({ ...prev, ...info }));
  };

  return (
    <CompanyContext.Provider
      value={{
        companyInfo,
        updateLogo,
        updateCompanyInfo
      }}
    >
      {children}
    </CompanyContext.Provider>
  );
};