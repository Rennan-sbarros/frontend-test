import React from 'react';
import SymbolList from '../components/SymbolList';
import Watchlist from '../components/Watchlist';
import { WebsocketProvider } from '../context/WatchlistContext';

const Home: React.FC = () => {
  return (
    <WebsocketProvider>
      <div style={{ display: 'flex', gap: '15px', padding: '25px' }}>
        <SymbolList />
        <Watchlist />
      </div>
    </WebsocketProvider>
  );
};

export default Home;
