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

export type Solo = {
  id: string /* primary key */;
  player1: string;
  player2: string;
  schnickeln: string;
  winner: string;
  cupsleft: number;
  timestamp: Date;
  latitude: number;
  longitude: number;
};
