export interface Database {
  public: {
    Tables: {
      players: {
        Row: {
          id: string;
          name: string;
          avatar: string;
          created_at: string;
          stats: {
            wins: number;
            losses: number;
            draws: number;
          };
        };
        Insert: {
          name: string;
          avatar: string;
          stats?: {
            wins: number;
            losses: number;
            draws: number;
          };
        };
        Update: {
          name?: string;
          avatar?: string;
          stats?: {
            wins: number;
            losses: number;
            draws: number;
          };
        };
      };
      games: {
        Row: {
          id: string;
          player1_id: string;
          player2_id: string | null;
          current_state: string[];
          next_move: 'X' | 'O';
          winner_id: string | null;
          created_at: string;
          updated_at: string;
          status: 'waiting' | 'active' | 'completed';
        };
        Insert: {
          player1_id: string;
          player2_id?: string;
          current_state?: string[];
          next_move?: 'X' | 'O';
          status?: 'waiting' | 'active' | 'completed';
        };
        Update: {
          player2_id?: string;
          current_state?: string[];
          next_move?: 'X' | 'O';
          winner_id?: string;
          status?: 'waiting' | 'active' | 'completed';
        };
      };
      moves: {
        Row: {
          id: string;
          game_id: string;
          player_id: string;
          position: number;
          symbol: 'X' | 'O';
          created_at: string;
        };
        Insert: {
          game_id: string;
          player_id: string;
          position: number;
          symbol: 'X' | 'O';
        };
      };
    };
  };
}