import React from 'react';
import SymbolList from '../components/SymbolList';
import { WebsocketProvider } from '../context/WatchListContext';
import WatchList from '../components/WatchList';

const Home: React.FC = () => {
  return (
    <WebsocketProvider>
      <div style={{ display: 'flex', gap: '15px', padding: '25px' }} data-testid="home-page">
        <SymbolList />
        <WatchList />
      </div>
    </WebsocketProvider>
  );
};

export default Home;
