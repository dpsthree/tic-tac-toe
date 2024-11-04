import { create } from 'zustand';
import { supabase } from '../lib/supabase';
import type { Database } from '../lib/database.types';

type Player = Database['public']['Tables']['players']['Row'];
type Game = Database['public']['Tables']['games']['Row'];

interface GameState {
  currentGame: Game | null;
  currentPlayer: Player | null;
  opponent: Player | null;
  isLoading: boolean;
  error: string | null;
  setCurrentGame: (game: Game | null) => void;
  setCurrentPlayer: (player: Player | null) => void;
  setOpponent: (player: Player | null) => void;
  createGame: () => Promise<void>;
  joinGame: (gameId: string) => Promise<void>;
  makeMove: (position: number) => Promise<void>;
  findMatch: () => Promise<void>;
}

export const useGameStore = create<GameState>((set, get) => ({
  currentGame: null,
  currentPlayer: null,
  opponent: null,
  isLoading: false,
  error: null,

  setCurrentGame: (game) => set({ currentGame: game }),
  setCurrentPlayer: (player) => set({ currentPlayer: player }),
  setOpponent: (player) => set({ opponent: player }),

  createGame: async () => {
    const { currentPlayer } = get();
    if (!currentPlayer) return;

    try {
      set({ isLoading: true, error: null });
      const { data: game, error } = await supabase
        .from('games')
        .insert({
          player1_id: currentPlayer.id,
          current_state: Array(9).fill(null),
          next_move: 'X',
          status: 'waiting',
        })
        .select()
        .single();

      if (error) throw error;
      set({ currentGame: game });
    } catch (error) {
      set({ error: (error as Error).message });
    } finally {
      set({ isLoading: false });
    }
  },

  joinGame: async (gameId: string) => {
    const { currentPlayer } = get();
    if (!currentPlayer) return;

    try {
      set({ isLoading: true, error: null });
      const { data: game, error } = await supabase
        .from('games')
        .update({
          player2_id: currentPlayer.id,
          status: 'active',
        })
        .eq('id', gameId)
        .eq('status', 'waiting')
        .select()
        .single();

      if (error) throw error;
      set({ currentGame: game });
    } catch (error) {
      set({ error: (error as Error).message });
    } finally {
      set({ isLoading: false });
    }
  },

  makeMove: async (position: number) => {
    const { currentGame, currentPlayer } = get();
    if (!currentGame || !currentPlayer) return;

    try {
      set({ isLoading: true, error: null });
      const newState = [...currentGame.current_state];
      newState[position] = currentGame.next_move;

      const { data: game, error } = await supabase
        .from('games')
        .update({
          current_state: newState,
          next_move: currentGame.next_move === 'X' ? 'O' : 'X',
        })
        .eq('id', currentGame.id)
        .select()
        .single();

      if (error) throw error;
      set({ currentGame: game });

      await supabase.from('moves').insert({
        game_id: currentGame.id,
        player_id: currentPlayer.id,
        position,
        symbol: currentGame.next_move,
      });
    } catch (error) {
      set({ error: (error as Error).message });
    } finally {
      set({ isLoading: false });
    }
  },

  findMatch: async () => {
    const { currentPlayer } = get();
    if (!currentPlayer) return;

    try {
      set({ isLoading: true, error: null });
      const { data: game, error } = await supabase
        .from('games')
        .select()
        .eq('status', 'waiting')
        .neq('player1_id', currentPlayer.id)
        .limit(1)
        .single();

      if (error && error.code !== 'PGRST116') {
        throw error;
      }

      if (game) {
        await get().joinGame(game.id);
      } else {
        await get().createGame();
      }
    } catch (error) {
      set({ error: (error as Error).message });
    } finally {
      set({ isLoading: false });
    }
  },
}));