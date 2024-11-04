import { useEffect } from 'react';
import { useGameStore } from '../store/gameStore';
import { supabase } from '../lib/supabase';

export function useGameSubscription() {
  const { currentGame, setCurrentGame } = useGameStore();

  useEffect(() => {
    if (!currentGame) return;

    const channel = supabase
      .channel(`game:${currentGame.id}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'games',
          filter: `id=eq.${currentGame.id}`,
        },
        (payload) => {
          setCurrentGame(payload.new as any);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [currentGame, setCurrentGame]);
}