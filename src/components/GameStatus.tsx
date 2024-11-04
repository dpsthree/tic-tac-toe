import React from 'react';
import { useGameStore } from '../store/gameStore';
import { Trophy, Clock } from 'lucide-react';

export const GameStatus: React.FC = () => {
  const { currentGame, currentPlayer, opponent } = useGameStore();

  if (!currentGame || !currentPlayer) return null;

  const isMyTurn = currentGame.next_move === 'X' 
    ? currentGame.player1_id === currentPlayer.id
    : currentGame.player2_id === currentPlayer.id;

  const getStatusMessage = () => {
    if (currentGame.status === 'waiting') {
      return 'Waiting for opponent...';
    }
    if (currentGame.winner_id) {
      const winner = currentGame.winner_id === currentPlayer.id ? 'You won!' : `${opponent?.name} won!`;
      return <span className="flex items-center"><Trophy className="mr-2" size={20} />{winner}</span>;
    }
    if (currentGame.current_state.every(Boolean)) {
      return "It's a draw!";
    }
    return isMyTurn ? "Your turn" : `${opponent?.name}'s turn`;
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Clock className="mr-2" size={20} />
          <span className="font-medium">{getStatusMessage()}</span>
        </div>
        <div className="flex space-x-4">
          <span className="text-indigo-600 font-medium">
            {currentPlayer.name} ({currentGame.player1_id === currentPlayer.id ? 'X' : 'O'})
          </span>
          <span className="text-gray-400">vs</span>
          <span className="text-indigo-600 font-medium">
            {opponent?.name || 'Waiting...'} ({currentGame.player1_id === currentPlayer.id ? 'O' : 'X'})
          </span>
        </div>
      </div>
    </div>
  );
};