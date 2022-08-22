import { render, screen } from '@testing-library/react';
import SWPower from './SWPower';

test('renders learn react link', () => {
  render(<SWPower />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
