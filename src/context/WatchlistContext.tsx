import React, { createContext, useState } from 'react';
import { useWebsocket } from '../hooks/useWebsocket';
import { PriceUpdate } from '../types/PriceUpdate';

interface WebsocketContextProps {
  prices: { [key: string]: PriceUpdate };
  addSymbol: (symbol: string) => void;
  loading: boolean;
}

export const WebsocketContext = createContext<WebsocketContextProps | undefined>(undefined);

export const WebsocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedSymbols, setSelectedSymbols] = useState<string[]>([]);
  const { prices, loading } = useWebsocket(selectedSymbols);

  const addSymbol = (symbol: string) => {
    setSelectedSymbols((prevSymbols) => {
      if (!prevSymbols.includes(symbol)) {
        return [...prevSymbols, symbol];  
      }
      return prevSymbols; 
    });
  };

  return (
    <WebsocketContext.Provider value={{ prices, addSymbol, loading }}>
      {children}
    </WebsocketContext.Provider>
  );
};
