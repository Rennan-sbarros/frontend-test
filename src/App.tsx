import React from 'react';
import { WebsocketProvider } from './context/WatchListContext';
import Home from './pages/Home';

const App: React.FC = () => {
  return (
    <WebsocketProvider>
      <Home />
    </WebsocketProvider>
  );
};

export default App;
