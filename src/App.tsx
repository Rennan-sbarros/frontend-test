// src/App.tsx
import React from 'react';
import { WebsocketProvider } from './context/WatchlistContext';
import Home from './pages/Home';

const App: React.FC = () => {
  return (
    <WebsocketProvider>
      <Home />
    </WebsocketProvider>
  );
};

export default App;
