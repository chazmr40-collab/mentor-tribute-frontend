import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Mentor Legacy header', () => {
  render(<App />);
  expect(screen.getByText(/Mentor Legacy/i)).toBeInTheDocument();
});

