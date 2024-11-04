import { render } from '@testing-library/react';
import Fireworks from './Fireworks';

describe('Fireworks', () => {
  test('renders fireworks', () => {
    const { container } = render(<Fireworks />);
    const fireworksElement = container.querySelector('.fireworks');
    expect(fireworksElement).toBeInTheDocument();
  });

  test('renders correct number of firework elements', () => {
    const { container } = render(<Fireworks />);
    const fireworkElements = container.querySelectorAll('.firework');
    expect(fireworkElements).toHaveLength(5);
  });
});