import React from 'react';
import Home from './pages/Home';
import { WebsocketProvider } from './context/WatchListContext';

const App: React.FC = () => {
  return (
    <WebsocketProvider>
      <Home />
    </WebsocketProvider>
  );
};

export default App;
