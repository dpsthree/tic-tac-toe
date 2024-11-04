import { useEffect } from 'react';
import { useGameStore } from '../store/gameStore';
import { supabase } from '../lib/supabase';

export function useAuth() {
  const { setCurrentPlayer } = useGameStore();

  useEffect(() => {
    // Check current session on mount
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (session?.user) {
        try {
          const { data: existingPlayer } = await supabase
            .from('players')
            .select()
            .eq('id', session.user.id)
            .single();

          if (!existingPlayer) {
            // Create player if doesn't exist
            const { data: newPlayer } = await supabase
              .from('players')
              .insert({
                id: session.user.id,
                name: session.user.user_metadata.name || 'Player',
                avatar: '😀',
                stats: { wins: 0, losses: 0, draws: 0 }
              })
              .select()
              .single();

            if (newPlayer) {
              setCurrentPlayer(newPlayer);
            }
          } else {
            setCurrentPlayer(existingPlayer);
          }
        } catch (error) {
          console.error('Error setting up player:', error);
        }
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'SIGNED_IN' && session?.user) {
          try {
            const { data: player } = await supabase
              .from('players')
              .select()
              .eq('id', session.user.id)
              .single();

            if (player) {
              setCurrentPlayer(player);
            }
          } catch (error) {
            console.error('Error fetching player:', error);
          }
        } else if (event === 'SIGNED_OUT') {
          setCurrentPlayer(null);
        }
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, [setCurrentPlayer]);
};