export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[];

export interface Database {
  public: {
    Tables: {
      badges: {
        Row: {
          id: number;
          created_at: string | null;
          name: string | null;
          url: string | null;
          description: string | null;
        };
        Insert: {
          id?: number;
          created_at?: string | null;
          name?: string | null;
          url?: string | null;
          description?: string | null;
        };
        Update: {
          id?: number;
          created_at?: string | null;
          name?: string | null;
          url?: string | null;
          description?: string | null;
        };
      };
      games_duo: {
        Row: {
          team1_player1: string | null;
          team1_player2: string | null;
          team2_player1: string | null;
          team2_player2: string | null;
          schnickeln: string | null;
          winner1: string | null;
          winner2: string | null;
          cupsleft: number | null;
          latitude: number | null;
          longitude: number | null;
          id: number;
          created_at: string | null;
          timestamp: string | null;
        };
        Insert: {
          team1_player1?: string | null;
          team1_player2?: string | null;
          team2_player1?: string | null;
          team2_player2?: string | null;
          schnickeln?: string | null;
          winner1?: string | null;
          winner2?: string | null;
          cupsleft?: number | null;
          latitude?: number | null;
          longitude?: number | null;
          id?: number;
          created_at?: string | null;
          timestamp?: string | null;
        };
        Update: {
          team1_player1?: string | null;
          team1_player2?: string | null;
          team2_player1?: string | null;
          team2_player2?: string | null;
          schnickeln?: string | null;
          winner1?: string | null;
          winner2?: string | null;
          cupsleft?: number | null;
          latitude?: number | null;
          longitude?: number | null;
          id?: number;
          created_at?: string | null;
          timestamp?: string | null;
        };
      };
      games_duo_new: {
        Row: {
          id: number;
          schnickeln_winner: string | null;
          loser_player1: string;
          loser_player2: string;
          winner_player2: string;
          cupsleft: number;
          winner_player1: string;
          latitude: number | null;
          longitude: number | null;
          timestamp: string | null;
          created_at: string | null;
          schnickeln_loser: string | null;
        };
        Insert: {
          id?: number;
          schnickeln_winner?: string | null;
          loser_player1: string;
          loser_player2: string;
          winner_player2: string;
          cupsleft: number;
          winner_player1: string;
          latitude?: number | null;
          longitude?: number | null;
          timestamp?: string | null;
          created_at?: string | null;
          schnickeln_loser?: string | null;
        };
        Update: {
          id?: number;
          schnickeln_winner?: string | null;
          loser_player1?: string;
          loser_player2?: string;
          winner_player2?: string;
          cupsleft?: number;
          winner_player1?: string;
          latitude?: number | null;
          longitude?: number | null;
          timestamp?: string | null;
          created_at?: string | null;
          schnickeln_loser?: string | null;
        };
      };
      games_solo: {
        Row: {
          player1: string | null;
          player2: string | null;
          schnickeln: string | null;
          winner: string | null;
          cupsleft: number | null;
          latitude: number | null;
          longitude: number | null;
          id: number;
          timestamp: string | null;
          created_at: string | null;
        };
        Insert: {
          player1?: string | null;
          player2?: string | null;
          schnickeln?: string | null;
          winner?: string | null;
          cupsleft?: number | null;
          latitude?: number | null;
          longitude?: number | null;
          id?: number;
          timestamp?: string | null;
          created_at?: string | null;
        };
        Update: {
          player1?: string | null;
          player2?: string | null;
          schnickeln?: string | null;
          winner?: string | null;
          cupsleft?: number | null;
          latitude?: number | null;
          longitude?: number | null;
          id?: number;
          timestamp?: string | null;
          created_at?: string | null;
        };
      };
      games_solo_new: {
        Row: {
          schnickeln_winner: string | null;
          latitude: number | null;
          longitude: number | null;
          schnickeln_loser: string | null;
          id: number;
          timestamp: string | null;
          created_at: string | null;
          winner_player1: string;
          loser_player1: string;
          cupsleft: number;
        };
        Insert: {
          schnickeln_winner?: string | null;
          latitude?: number | null;
          longitude?: number | null;
          schnickeln_loser?: string | null;
          id?: number;
          timestamp?: string | null;
          created_at?: string | null;
          winner_player1: string;
          loser_player1: string;
          cupsleft: number;
        };
        Update: {
          schnickeln_winner?: string | null;
          latitude?: number | null;
          longitude?: number | null;
          schnickeln_loser?: string | null;
          id?: number;
          timestamp?: string | null;
          created_at?: string | null;
          winner_player1?: string;
          loser_player1?: string;
          cupsleft?: number;
        };
      };
      profileBadgeRelation: {
        Row: {
          awarded_at: string | null;
          amount: number | null;
          badgeID: number;
          username: string;
        };
        Insert: {
          awarded_at?: string | null;
          amount?: number | null;
          badgeID: number;
          username: string;
        };
        Update: {
          awarded_at?: string | null;
          amount?: number | null;
          badgeID?: number;
          username?: string;
        };
      };
      profiles: {
        Row: {
          id: string;
          updated_at: string | null;
          username: string | null;
          avatar_url: string | null;
        };
        Insert: {
          id: string;
          updated_at?: string | null;
          username?: string | null;
          avatar_url?: string | null;
        };
        Update: {
          id?: string;
          updated_at?: string | null;
          username?: string | null;
          avatar_url?: string | null;
        };
      };
      seasons: {
        Row: {
          id: number;
          start: string | null;
          end: string | null;
          name: string | null;
          type: string | null;
        };
        Insert: {
          id?: number;
          start?: string | null;
          end?: string | null;
          name?: string | null;
          type?: string | null;
        };
        Update: {
          id?: number;
          start?: string | null;
          end?: string | null;
          name?: string | null;
          type?: string | null;
        };
      };
    };
    Views: {
      beerdrunk_duo: {
        Row: {
          player: string | null;
          sum: number | null;
        };
      };
      beerdrunk_solo: {
        Row: {
          player: string | null;
          sum: number | null;
        };
      };
      duobeerdrunk: {
        Row: {
          team1_player1: string | null;
          beerdrunk: number | null;
        };
      };
      get_badges: {
        Row: {
          awarded_at: string | null;
          username: string | null;
          amount: number | null;
          name: string | null;
          url: string | null;
          description: string | null;
        };
      };
      losers: {
        Row: {
          loser1: string | null;
          loser2: string | null;
          id: number | null;
        };
        Insert: {
          loser1?: never;
          loser2?: never;
          id?: number | null;
        };
        Update: {
          loser1?: never;
          loser2?: never;
          id?: number | null;
        };
      };
      losers_solo: {
        Row: {
          loser: string | null;
          id: number | null;
        };
        Insert: {
          loser?: never;
          id?: number | null;
        };
        Update: {
          loser?: never;
          id?: number | null;
        };
      };
      playerstats_duo: {
        Row: {
          player1: string | null;
          played: number | null;
          wins: number | null;
          draws: number | null;
          schnickelwins: number | null;
          winrate: number | null;
          beerdrunk: number | null;
          avatar_url: string | null;
        };
      };
      playerstats_solo: {
        Row: {
          player1: string | null;
          played: number | null;
          wins: number | null;
          draws: number | null;
          schnickelwins: number | null;
          winrate: number | null;
          beerdrunk: number | null;
          avatar_url: string | null;
        };
      };
      playerstatsduo: {
        Row: {
          player: string | null;
          avatar_url: string | null;
          played: number | null;
          wins: number | null;
          draws: number | null;
          winrate: number | null;
          beerdrunk: number | null;
        };
      };
      playerstatssolo: {
        Row: {
          player: string | null;
          avatar_url: string | null;
          played: number | null;
          wins: number | null;
          schnickelwins: number | null;
          draws: number | null;
          winrate: number | null;
          beerdrunk: number | null;
        };
      };
      solobeerdrunk: {
        Row: {
          player1: string | null;
          beerdrunk: number | null;
        };
      };
      ss22_duobeerdrunk: {
        Row: {
          team1_player1: string | null;
          beerdrunk: number | null;
        };
      };
      ss22_games_duo: {
        Row: {
          id: number | null;
          team1_player1: string | null;
          team1_player2: string | null;
          team2_player1: string | null;
          team2_player2: string | null;
          schnickeln: string | null;
          winner1: string | null;
          winner2: string | null;
          cupsleft: number | null;
          timestamp: string | null;
          latitude: number | null;
          longitude: number | null;
          created_at: string | null;
        };
        Insert: {
          id?: number | null;
          team1_player1?: string | null;
          team1_player2?: string | null;
          team2_player1?: string | null;
          team2_player2?: string | null;
          schnickeln?: string | null;
          winner1?: string | null;
          winner2?: string | null;
          cupsleft?: number | null;
          timestamp?: string | null;
          latitude?: number | null;
          longitude?: number | null;
          created_at?: string | null;
        };
        Update: {
          id?: number | null;
          team1_player1?: string | null;
          team1_player2?: string | null;
          team2_player1?: string | null;
          team2_player2?: string | null;
          schnickeln?: string | null;
          winner1?: string | null;
          winner2?: string | null;
          cupsleft?: number | null;
          timestamp?: string | null;
          latitude?: number | null;
          longitude?: number | null;
          created_at?: string | null;
        };
      };
      ss22_games_solo: {
        Row: {
          id: number | null;
          player1: string | null;
          player2: string | null;
          schnickeln: string | null;
          winner: string | null;
          cupsleft: number | null;
          timestamp: string | null;
          latitude: number | null;
          longitude: number | null;
          created_at: string | null;
        };
        Insert: {
          id?: number | null;
          player1?: string | null;
          player2?: string | null;
          schnickeln?: string | null;
          winner?: string | null;
          cupsleft?: number | null;
          timestamp?: string | null;
          latitude?: number | null;
          longitude?: number | null;
          created_at?: string | null;
        };
        Update: {
          id?: number | null;
          player1?: string | null;
          player2?: string | null;
          schnickeln?: string | null;
          winner?: string | null;
          cupsleft?: number | null;
          timestamp?: string | null;
          latitude?: number | null;
          longitude?: number | null;
          created_at?: string | null;
        };
      };
      ss22_playerstatsduo: {
        Row: {
          player: string | null;
          avatar_url: string | null;
          played: number | null;
          wins: number | null;
          draws: number | null;
          winrate: number | null;
          beerdrunk: number | null;
        };
      };
      ss22_playerstatssolo: {
        Row: {
          player: string | null;
          avatar_url: string | null;
          played: number | null;
          wins: number | null;
          schnickelwins: number | null;
          draws: number | null;
          winrate: number | null;
          beerdrunk: number | null;
        };
      };
      ss22_solobeerdrunk: {
        Row: {
          player1: string | null;
          beerdrunk: number | null;
        };
      };
    };
    Functions: {
      playerstats_duo_function:
        | {
            Args: { start_date: string; end_date: string };
            Returns: Record<string, unknown>[];
          }
        | {
            Args: Record<PropertyKey, never>;
            Returns: Record<string, unknown>[];
          };
      playerstats_solo_function:
        | {
            Args: { start_date: string; end_date: string };
            Returns: Record<string, unknown>[];
          }
        | {
            Args: Record<PropertyKey, never>;
            Returns: Record<string, unknown>[];
          };
      playerstats_vs_others_solo:
        | {
            Args: { player_in: string };
            Returns: Record<string, unknown>[];
          }
        | {
            Args: { player_in: string; start_date: string; end_date: string };
            Returns: Record<string, unknown>[];
          };
      playerstats_with_teammate_duo:
        | {
            Args: { player_in: string };
            Returns: Record<string, unknown>[];
          }
        | {
            Args: { player_in: string; start_date: string; end_date: string };
            Returns: Record<string, unknown>[];
          };
    };
    Enums: {
      [_ in never]: never;
    };
  };
}
