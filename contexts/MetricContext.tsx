// MetricContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define the shape of our context value
interface MetricContextType {
  isMetric: boolean;
  setIsMetric: React.Dispatch<React.SetStateAction<boolean>>;
}

// Create the context with a default value of `undefined`
const MetricContext = createContext<MetricContextType | undefined>(undefined);

interface MetricProviderProps {
  children: ReactNode;
}

export function MetricProvider({ children }: MetricProviderProps) {
  const [isMetric, setIsMetric] = useState<boolean>(true);

  return (
    <MetricContext.Provider value={{ isMetric, setIsMetric }}>
      {children}
    </MetricContext.Provider>
  );
}

// Custom hook for consuming the context
export function useMetric(): MetricContextType {
  const context = useContext(MetricContext);
  if (!context) {
    throw new Error("useMetric must be used within a MetricProvider");
  }
  return context;
}
