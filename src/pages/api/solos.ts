import { NextApiRequest, NextApiResponse } from 'next';

import { supabase } from '@/utils/client';

export default async function hello(req: NextApiRequest, res: NextApiResponse) {
  const { data } = await supabase
    .from('games_solo')
    .select(
      'cupsleft, winner,player1:profiles!player1 (avatar_url,username), player2:profiles!player2 (avatar_url,username)'
    )
    .order('timestamp', { ascending: false })
    .limit(55);
  res.send({ games: data });
}
