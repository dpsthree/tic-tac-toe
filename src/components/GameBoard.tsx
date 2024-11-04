import React from 'react';
import { useGameStore } from '../store/gameStore';
import { useGameSubscription } from '../hooks/useGameSubscription';

interface SquareProps {
  value: string | null;
  onClick: () => void;
  disabled: boolean;
}

const Square: React.FC<SquareProps> = ({ value, onClick, disabled }) => (
  <button
    className={`w-20 h-20 bg-indigo-100 text-4xl font-bold focus:outline-none transition-colors duration-200
      ${disabled ? 'cursor-not-allowed opacity-50' : 'hover:bg-indigo-200'}`}
    onClick={onClick}
    disabled={disabled}
  >
    {value}
  </button>
);

export const GameBoard: React.FC = () => {
  const { currentGame, currentPlayer, makeMove } = useGameStore();
  useGameSubscription();

  const isMyTurn = currentGame?.next_move === 'X' 
    ? currentGame.player1_id === currentPlayer?.id
    : currentGame?.player2_id === currentPlayer?.id;

  const handleClick = (position: number) => {
    if (!isMyTurn || currentGame?.current_state[position]) return;
    makeMove(position);
  };

  if (!currentGame) return null;

  return (
    <div className="grid grid-cols-3 gap-2 mb-4">
      {currentGame.current_state.map((square, i) => (
        <Square
          key={i}
          value={square}
          onClick={() => handleClick(i)}
          disabled={!isMyTurn || !!square}
        />
      ))}
    </div>
  );
};