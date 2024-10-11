import { render, screen, fireEvent } from '@testing-library/react';
import SymbolList from './SymbolList';
import { WebsocketContext } from '../context/WatchListContext';

// Mock dos módulos
jest.mock('../services/binanceService', () => ({
  fetchSymbols: jest.fn(() => Promise.resolve([{ symbol: 'BTCUSDT' }, { symbol: 'ETHUSDT' }])),
}));

// Mock do WebsocketContext
const mockAddSymbol = jest.fn();
const mockRemoveSymbol = jest.fn();
const mockPrices = {}; 
const mockLoading = false;

const renderSymbolList = () => {
  render(
    <WebsocketContext.Provider value={{ 
      addSymbol: mockAddSymbol, 
      prices: mockPrices, 
      loading: mockLoading 
    }}>
      <SymbolList />
    </WebsocketContext.Provider>
  );
};

describe('SymbolList Component', () => {
  beforeEach(() => {
    jest.clearAllMocks(); 
  });

  it('renders and filters symbols', async () => {
    renderSymbolList();

    const searchInput = screen.getByLabelText(/Search symbol/i);
    expect(searchInput).toBeInTheDocument();

    await screen.findByText(/BTCUSDT/i);
    await screen.findByText(/ETHUSDT/i);

    expect(screen.getByText('BTCUSDT')).toBeInTheDocument();
    expect(screen.getByText('ETHUSDT')).toBeInTheDocument();

    fireEvent.change(searchInput, { target: { value: 'BTC' } });

    expect(screen.queryByText('ETHUSDT')).not.toBeInTheDocument();
    expect(screen.getByText('BTCUSDT')).toBeInTheDocument();
  });

  it('displays "No symbol found" when no symbols match the search term', async () => {
    renderSymbolList();
  
    const searchInput = screen.getByLabelText(/Search symbol/i);
    fireEvent.change(searchInput, { target: { value: 'XYZ' } });
  
    await screen.findByText('Nenhum símbolo encontrado');
  
    expect(screen.getByText('Nenhum símbolo encontrado')).toBeInTheDocument();
  });

  it('selects and deselects symbols', async () => {
    renderSymbolList();

    await screen.findByText(/BTCUSDT/i);
    
    const btcCheckbox = screen.getByLabelText('BTCUSDT');
    const ethCheckbox = screen.getByLabelText('ETHUSDT');
    
    fireEvent.click(btcCheckbox);
    expect(btcCheckbox).toBeChecked();

    expect(ethCheckbox).not.toBeChecked();

    fireEvent.click(btcCheckbox);
    expect(btcCheckbox).not.toBeChecked();
  });

  it('adds selected symbols to the list', async () => {
    renderSymbolList();

    await screen.findByText(/BTCUSDT/i);

    const btcCheckbox = screen.getByLabelText('BTCUSDT');
    
    fireEvent.click(btcCheckbox);

    const addButton = screen.getByRole('button', { name: /add to list/i });
    expect(addButton).not.toBeDisabled();

    fireEvent.click(addButton);

    expect(mockAddSymbol).toHaveBeenCalledWith('BTCUSDT');
  });

  it('disables Add to list button when loading', async () => {
    render(
      <WebsocketContext.Provider value={{ 
        addSymbol: mockAddSymbol,
        prices: mockPrices,  
        loading: true 
      }}>
        <SymbolList />
      </WebsocketContext.Provider>
    );

    await screen.findByText(/BTCUSDT/i);

    const btcCheckbox = screen.getByLabelText('BTCUSDT');

    fireEvent.click(btcCheckbox);

    const addButton = screen.getByRole('button', { name: /add to list/i });
    expect(addButton).toBeDisabled();
  });

});
