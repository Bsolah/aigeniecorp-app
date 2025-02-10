
import  { createContext, useState, ReactNode, } from 'react';
import React from "react";


const enabled: any = {
  "oai": false,
  "gai": true,
  "dai": false,
  "knb": false,
  "oth": false,
} 

const isParentEnabled: any = {
  "External": false,
  "Internal": false,
} 

// Define the shape of the context state
interface DashboardContextState {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (isOpen: boolean) => void;
  isMobileSidebarOpen: boolean;
  setIsMobileSidebarOpen: (isOpen: boolean) => void;
  isChildSwitch: boolean;
  setIsChildSwitch: (isOpen: boolean) => void;
  isParentSwitch: boolean;
  setIsParentSwitch: (isOpen: boolean) => void;
}

// Create the context with an initial value
export const DashboardContext = createContext<DashboardContextState | any>(undefined);

// Define the type for the children prop
interface DashboardContextProps {
  children: ReactNode;
}
// Create the provider component
export const DashboardContextProvider: React.FC<DashboardContextProps> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState<boolean>(false);
    const [isChildSwitch, setIsChildSwitch] = useState<{ [key: string]: boolean }>(enabled);
    const [isParentSwitch, setIsParentSwitch] = useState<{ [key: string]: boolean }>(isParentEnabled);
  

  return (
    <DashboardContext.Provider
      value={{
        isSidebarOpen,
        setIsSidebarOpen,
        isMobileSidebarOpen,
        setIsMobileSidebarOpen,
        isChildSwitch,
        setIsChildSwitch,
        isParentSwitch, 
        setIsParentSwitch
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};


