import axios from 'axios';

interface SymbolData {
  symbol: string;
}

export const fetchSymbols = async (): Promise<SymbolData[]> => {
  try {
    const response = await axios.get('https://api.binance.com/api/v3/exchangeInfo');
    return response.data.symbols; 
  } catch (error) {
    console.error('Erro ao buscar os símbolos:', error);
    return [];
  }
};
