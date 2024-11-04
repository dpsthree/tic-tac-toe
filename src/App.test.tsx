import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

describe('App', () => {
  test('renders Tic-Tac-Toe title', () => {
    render(<App />);
    const titleElement = screen.getByText(/Tic-Tac-Toe/i);
    expect(titleElement).toBeInTheDocument();
  });

  test('starts with empty board', () => {
    render(<App />);
    const squares = screen.getAllByTestId('game-square');
    expect(squares).toHaveLength(9);
    squares.forEach(square => {
      expect(square).toHaveTextContent('');
    });
  });

  test('allows players to make moves', () => {
    render(<App />);
    const squares = screen.getAllByTestId('game-square');
    fireEvent.click(squares[0]);
    expect(squares[0]).toHaveTextContent('X');
    fireEvent.click(squares[1]);
    expect(squares[1]).toHaveTextContent('O');
  });

  test('declares winner when game is won', () => {
    render(<App />);
    const squares = screen.getAllByTestId('game-square');
    // X wins
    fireEvent.click(squares[0]); // X
    fireEvent.click(squares[3]); // O
    fireEvent.click(squares[1]); // X
    fireEvent.click(squares[4]); // O
    fireEvent.click(squares[2]); // X
    const winnerText = screen.getByText(/Winner: X/i);
    expect(winnerText).toBeInTheDocument();
  });

  test('resets game when reset button is clicked', () => {
    render(<App />);
    const squares = screen.getAllByTestId('game-square');
    fireEvent.click(squares[0]);
    fireEvent.click(squares[1]);
    const resetButton = screen.getByText(/Reset Game/i);
    fireEvent.click(resetButton);
    squares.forEach(square => {
      expect(square).toHaveTextContent('');
    });
    const nextPlayerText = screen.getByText(/Next player: X/i);
    expect(nextPlayerText).toBeInTheDocument();
  });
});