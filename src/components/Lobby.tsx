import React, { useState, useEffect } from 'react';
import { useGameStore } from '../store/gameStore';
import { Loader } from 'lucide-react';

export const Lobby: React.FC = () => {
  const { currentGame, currentPlayer } = useGameStore();
  const [searchTime, setSearchTime] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSearchTime((prevTime) => prevTime + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (!currentGame || !currentPlayer) return null;

  return (
    <div className="bg-white p-8 rounded-lg shadow-2xl max-w-md w-full text-center">
      <h2 className="text-3xl font-bold mb-6 text-indigo-700">Finding Opponent</h2>
      <div className="mb-6">
        <p className="text-xl font-semibold">
          {currentPlayer.name} {currentPlayer.avatar}
        </p>
        <p className="text-gray-600">Waiting for an opponent to join...</p>
      </div>
      <div className="flex justify-center items-center mb-6">
        <Loader className="animate-spin mr-2" size={24} />
        <p className="text-lg">Time elapsed: {searchTime}s</p>
      </div>
      <div className="bg-indigo-100 p-4 rounded-lg">
        <p className="text-sm text-indigo-700">
          Tip: While waiting, take a deep breath and visualize your winning strategy!
        </p>
      </div>
    </div>
  );
};