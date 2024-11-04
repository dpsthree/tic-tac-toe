import React from 'react';
import { useGameStore } from './store/gameStore';
import { useAuth } from './hooks/useAuth';
import { AuthForm } from './components/AuthForm';
import { PlayerSetup } from './components/PlayerSetup';
import { GameBoard } from './components/GameBoard';
import { GameStatus } from './components/GameStatus';
import { Lobby } from './components/Lobby';
import { Fireworks } from './components/Fireworks';

function App() {
  useAuth();
  const { currentPlayer, currentGame, showFireworks } = useGameStore();

  if (!currentPlayer) {
    return (
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
        <AuthForm />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      {showFireworks && <Fireworks />}
      <h1 className="text-4xl font-bold mb-8 text-indigo-700">Tic-Tac-Toe Online</h1>
      
      {!currentGame && <PlayerSetup />}
      {currentGame?.status === 'waiting' && <Lobby />}
      {currentGame?.status === 'active' && (
        <div className="w-full max-w-2xl">
          <GameStatus />
          <GameBoard />
        </div>
      )}
    </div>
  );
}

export default App;