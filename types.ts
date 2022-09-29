/* eslint-disable @typescript-eslint/no-explicit-any */
export interface PageMeta {
  title: string;
  description: string;
  cardImage: string;
}

export interface Customer {
  id: string /* primary key */;
  stripe_customer_id?: string;
}

export interface Product {
  id: string /* primary key */;
  active?: boolean;
  name?: string;
  description?: string;
  image?: string;
  metadata?: Record<string, string>; // type unknown;
}

export interface UserDetails {
  id: string /* primary key */;
  full_name?: string;
  avatar_url?: string;
  billing_address?: any; // type unknown;
  payment_method?: any; // type unknown;
}

export type Player = {
  username: string;
  avatar_url: string;
};

export type SoloGame = {
  player1: Player;
  player2: Player;
  schnickeln: string;
  winner: string;
  cupsleft: number;
  timestamp: number;
};

export type TeamGame = {
  team1_player1: Player;
  team1_player2: Player;
  team2_player1: Player;
  team2_player2: Player;
  schnickeln: string;
  winner1: string;
  winner2: string;
  cupsleft: number;
  timestamp: number;
};

export type Season = {
  id: string;
  start: number;
  end: number;
  name: string;
  type: string;
};
