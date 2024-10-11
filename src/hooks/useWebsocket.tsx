import { useState, useEffect, useRef } from 'react';

interface PriceUpdate {
  lastPrice: string;
  priceChangePercent: string;
  bestBidPrice: string;
  bestAskPrice: string;
}

export const useWebsocket = (selectedSymbols: string[]) => {
  const [prices, setPrices] = useState<{ [key: string]: PriceUpdate }>({});
  const [loading, setLoading] = useState(true);
  const socketRef = useRef<WebSocket | null>(null);
  const receivedSymbols = useRef<Set<string>>(new Set()); 

  useEffect(() => {
    if (selectedSymbols.length > 0) {
      setLoading(true); 
      receivedSymbols.current.clear();

      if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
        socketRef.current.close();
      }

      const streams = selectedSymbols.map((symbol) => `${symbol.toLowerCase()}@ticker`).join('/');
      const wsUrl = `wss://stream.binance.com:9443/stream?streams=${streams}`;

      const newSocket = new WebSocket(wsUrl);
      socketRef.current = newSocket;

      newSocket.onmessage = (event) => {
        const message = JSON.parse(event.data);

        if (message && message.data) {
          const { s: symbol, c: lastPrice, P: priceChangePercent, b: bestBidPrice, a: bestAskPrice } = message.data;

          setPrices((prevPrices) => ({
            ...prevPrices,
            [symbol]: { lastPrice, priceChangePercent, bestBidPrice, bestAskPrice },
          }));
          receivedSymbols.current.add(symbol);

          if (receivedSymbols.current.size === selectedSymbols.length) {
            setLoading(false); 
          }
        }
      };

      newSocket.onclose = () => {
        socketRef.current = null;
      };

      return () => {
        if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
          socketRef.current.close();
        }
      };
    } else {
      setLoading(false);
    }
  }, [selectedSymbols]);

  return { prices, loading };
};
