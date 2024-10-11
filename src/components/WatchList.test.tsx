import { render, screen } from '@testing-library/react';
import { WebsocketContext } from '../context/WatchListContext';
import WatchList from './Watchlist';

// Mock da função e dos dados de contexto
const mockAddSymbol = jest.fn();
const mockPrices = {}; 
const mockLoading = false;

const renderWatchList = () => {
    render(
      <WebsocketContext.Provider value={{ 
        addSymbol: mockAddSymbol, 
        prices: mockPrices, 
        loading: mockLoading 
      }}> <WatchList />
      </WebsocketContext.Provider>
    );
  };

describe('WatchList Component', () => {
  it('displays "No symbols added" when prices are empty', () => {
    renderWatchList();

    expect(screen.getByText('Não há símbolos adicionados')).toBeInTheDocument();
  });

  it('displays symbols and formats prices correctly', () => {
    const mockPricesWithSymbols = {
      BTCUSDT: { lastPrice: '50000', priceChangePercent: '0.05', bestBidPrice: '49999', bestAskPrice: '50001' },
      ETHUSDT: { lastPrice: '3000', priceChangePercent: '-0.02', bestBidPrice: '2999', bestAskPrice: '3001' }
    };
  
    const mockLoading = false;
  
    render(
      <WebsocketContext.Provider value={{ prices: mockPricesWithSymbols, addSymbol: mockAddSymbol, loading: mockLoading }}>
        <WatchList />
      </WebsocketContext.Provider>
    );
  
    expect(screen.getByText('BTCUSDT')).toBeInTheDocument();
    expect(screen.getByText('ETHUSDT')).toBeInTheDocument();
  
    expect(screen.getByText('50000.0000')).toBeInTheDocument();
    expect(screen.getByText('2.00%')).toBeInTheDocument(); 
  });
  
});
