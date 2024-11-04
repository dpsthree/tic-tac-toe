import React from 'react';
import { useGameStore } from '../store/gameStore';
import { User, Gamepad2 } from 'lucide-react';

const avatars = ['😀', '😎', '🤠', '🦁', '🐯', '🐶', '🐱', '🐼'];

export const PlayerSetup: React.FC = () => {
  const { currentPlayer, findMatch } = useGameStore();

  if (!currentPlayer) return null;

  return (
    <div className="bg-white p-8 rounded-lg shadow-2xl max-w-md w-full">
      <div className="text-center mb-8">
        <div className="text-4xl mb-2">{currentPlayer.avatar}</div>
        <h2 className="text-2xl font-bold text-gray-800">{currentPlayer.name}</h2>
        <p className="text-gray-600 mt-2">Ready to play?</p>
      </div>

      <div className="space-y-4">
        <div className="bg-indigo-50 p-4 rounded-lg">
          <h3 className="font-semibold text-indigo-900 mb-2">Stats</h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-indigo-600">{currentPlayer.stats.wins}</div>
              <div className="text-sm text-gray-600">Wins</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-indigo-600">{currentPlayer.stats.losses}</div>
              <div className="text-sm text-gray-600">Losses</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-indigo-600">{currentPlayer.stats.draws}</div>
              <div className="text-sm text-gray-600">Draws</div>
            </div>
          </div>
        </div>

        <button
          onClick={() => findMatch()}
          className="w-full px-4 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors duration-200 flex items-center justify-center space-x-2"
        >
          <Gamepad2 className="w-5 h-5" />
          <span>Find Match</span>
        </button>
      </div>
    </div>
  );
};