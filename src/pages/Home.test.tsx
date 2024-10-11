import { render, screen } from '@testing-library/react';
import Home from './Home';

it('renders Home page with SymbolList and Watchlist', () => {
  render(<Home />);
  
  const homePageElement = screen.getByTestId('home-page');
  expect(homePageElement).toBeInTheDocument();

  const symbolListElement = screen.getByTestId('content-symbolList'); 
  expect(symbolListElement).toBeInTheDocument();

  const watchlistElement = screen.getByTestId('content-watchList'); 
  expect(watchlistElement).toBeInTheDocument();
});
