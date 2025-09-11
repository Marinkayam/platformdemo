import React, { createContext, useContext, useState, useEffect } from 'react';

interface LayoutContextType {
  headerVisible: boolean;
  toggleHeader: () => void;
  setHeaderVisible: (visible: boolean) => void;
}

const LayoutContext = createContext<LayoutContextType | undefined>(undefined);

export const useLayout = (): LayoutContextType => {
  const context = useContext(LayoutContext);
  if (!context) {
    throw new Error('useLayout must be used within a LayoutProvider');
  }
  return context;
};

export const LayoutProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [headerVisible, setHeaderVisibleState] = useState<boolean>(() => {
    const saved = localStorage.getItem('headerVisible');
    return saved !== null ? JSON.parse(saved) : true;
  });

  // Save to localStorage whenever headerVisible changes
  useEffect(() => {
    localStorage.setItem('headerVisible', JSON.stringify(headerVisible));
  }, [headerVisible]);

  const toggleHeader = () => {
    setHeaderVisibleState(!headerVisible);
  };

  const setHeaderVisible = (visible: boolean) => {
    setHeaderVisibleState(visible);
  };

  return (
    <LayoutContext.Provider value={{
      headerVisible,
      toggleHeader,
      setHeaderVisible,
    }}>
      {children}
    </LayoutContext.Provider>
  );
};