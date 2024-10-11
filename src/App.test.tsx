import { render, screen } from '@testing-library/react';
import App from './App';

it('renders the Home page', () => {
  render(<App />);
  const homePageElement = screen.getByTestId('home-page');
  expect(homePageElement).toBeInTheDocument();
});
