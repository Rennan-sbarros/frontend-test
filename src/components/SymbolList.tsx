import React, { useEffect, useState, useContext } from 'react';
import { fetchSymbols } from '../services/binanceService';
import { WebsocketContext } from '../context/WatchListContext';
import {
  Box, Checkbox, Button, FormControlLabel, Paper, List, ListItem, TextField, InputAdornment 
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';

interface SymbolData {
  symbol: string;
}

const SymbolList: React.FC = () => {
  const [symbols, setSymbols] = useState<SymbolData[]>([]);
  const [selectedSymbols, setSelectedSymbols] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [addedSymbols, setAddedSymbols] = useState<string[]>([]);
  const { addSymbol, loading } = useContext(WebsocketContext)!;

  useEffect(() => {
    const loadSymbols = async () => {
      const data = await fetchSymbols();
      setSymbols(data);
    };
    loadSymbols();
  }, []);

  const handleSelectSymbol = (symbol: string) => {
    if (selectedSymbols.includes(symbol)) {
      setSelectedSymbols(selectedSymbols.filter((s) => s !== symbol));
    } else {
      setSelectedSymbols([...selectedSymbols, symbol]);
    }
  };

  const handleAddSymbols = () => {
    selectedSymbols.forEach((symbol) => {
      addSymbol(symbol);
      setAddedSymbols((prev) => [...prev, symbol]);
    });

    setSelectedSymbols([]); 
  };

  const filteredSymbols = symbols.filter((s) =>
    s.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', width: '25%', height: '90vh', padding: '10px', borderRadius: '7px', border: '1px solid #e0e0e0'}} data-testid="content-symbolList">
      <TextField
        label="Search symbol"
        variant="outlined"
        fullWidth
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{ marginBottom: 2 }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
      <Paper elevation={2} sx={{
        maxHeight: 400, 
        overflowY: 'auto',  
        padding: 2,
        '&::-webkit-scrollbar': {
          width: '8px',  
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: '#888',
          borderRadius: '10px',
        },
        '&::-webkit-scrollbar-thumb:hover': {
          backgroundColor: '#555',
        },
        '&::-webkit-scrollbar-track': {
          background: '#f1f1f1',
          borderRadius: '10px',
        },
      }}>
        <List>
          {filteredSymbols.length > 0 ? (
            filteredSymbols.map((s) => (
              <ListItem key={s.symbol}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={selectedSymbols.includes(s.symbol)}
                      onChange={() => handleSelectSymbol(s.symbol)}
                      color="primary"
                      disabled={addedSymbols.includes(s.symbol)} 
                    />
                  }
                  label={s.symbol} 
                />
              </ListItem>
            ))
          ) : (
            <ListItem>
              <FormControlLabel
                control={<Checkbox disabled />}
                label="Nenhum símbolo encontrado"
              />
            </ListItem>
          )}
        </List>
      </Paper>
      <Button
        variant="contained"
        color="primary"
        sx={{ marginTop: 2 }}
        onClick={handleAddSymbols}
        disabled={selectedSymbols.length === 0 || loading}
        endIcon={<AddIcon />}
      >
        Add to list
      </Button>
    </Box>
  );
};

export default SymbolList;
