import { NextApiRequest, NextApiResponse } from 'next';

import { supabase } from '@/utils/client';

import { Database } from '@/types/supabase';

export default async function hello(req: NextApiRequest, res: NextApiResponse) {
  const { data } = await supabase
    .from<Database['public']['Tables']['games_solo']['Row']>('games_solo')
    .select(
      'cupsleft, winner,player1:profiles!player1 (avatar_url,username), player2:profiles!player2 (avatar_url,username), timestamp'
    )
    .order('timestamp', { ascending: false })
    .limit(20);

  res.send({ games: data });
}
