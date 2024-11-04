import React, { useState } from 'react';
import { User, Shuffle } from 'lucide-react';

const avatars = ['😀', '😎', '🤠', '🦁', '🐯', '🐶', '🐱', '🐼'];
const randomNames = ['Alex', 'Sam', 'Jordan', 'Taylor', 'Casey', 'Riley', 'Morgan', 'Avery'];

interface PlayerSetupProps {
  onComplete: (name: string, avatar: string) => void;
}

const PlayerSetup: React.FC<PlayerSetupProps> = ({ onComplete }) => {
  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState(avatars[0]);

  const generateRandomName = () => {
    const randomName = randomNames[Math.floor(Math.random() * randomNames.length)];
    setName(randomName);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onComplete(name.trim(), avatar);
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-2xl max-w-md w-full">
      <h2 className="text-3xl font-bold mb-6 text-indigo-700 text-center">Player Setup</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Your Name
          </label>
          <div className="flex">
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="flex-grow px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter your name"
              required
            />
            <button
              type="button"
              onClick={generateRandomName}
              className="px-3 py-2 bg-indigo-100 text-indigo-700 rounded-r-md hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              title="Generate random name"
            >
              <Shuffle size={20} />
            </button>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Choose Avatar
          </label>
          <div className="grid grid-cols-4 gap-2">
            {avatars.map((av) => (
              <button
                key={av}
                type="button"
                onClick={() => setAvatar(av)}
                className={`text-3xl p-2 rounded-md ${
                  avatar === av ? 'bg-indigo-100 ring-2 ring-indigo-500' : 'hover:bg-gray-100'
                }`}
              >
                {av}
              </button>
            ))}
          </div>
        </div>
        <button
          type="submit"
          className="w-full px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors duration-200 flex items-center justify-center"
        >
          <User size={20} className="mr-2" />
          Start Game
        </button>
      </form>
    </div>
  );
};

export default PlayerSetup;