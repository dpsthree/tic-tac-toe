import React, { useState, useEffect } from 'react';
import { Loader } from 'lucide-react';

interface Player {
  name: string;
  avatar: string;
  score: number;
}

interface LobbyProps {
  player: Player;
  onOpponentFound: (name: string, avatar: string) => void;
}

const Lobby: React.FC<LobbyProps> = ({ player, onOpponentFound }) => {
  const [searchTime, setSearchTime] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSearchTime((prevTime) => prevTime + 1);
    }, 1000);

    const timeout = setTimeout(() => {
      const randomAvatar = ['😀', '😎', '🤠', '🦁', '🐯', '🐶', '🐱', '🐼'][Math.floor(Math.random() * 8)];
      const randomName = ['Alex', 'Sam', 'Jordan', 'Taylor', 'Casey', 'Riley', 'Morgan', 'Avery'][Math.floor(Math.random() * 8)];
      onOpponentFound(randomName, randomAvatar);
    }, 5000 + Math.random() * 5000); // Random time between 5-10 seconds

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [onOpponentFound]);

  return (
    <div className="bg-white p-8 rounded-lg shadow-2xl max-w-md w-full text-center">
      <h2 className="text-3xl font-bold mb-6 text-indigo-700">Lobby</h2>
      <div className="mb-6">
        <p className="text-xl font-semibold">Welcome, {player.name} {player.avatar}</p>
        <p className="text-gray-600">Searching for an opponent...</p>
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

export default Lobby;