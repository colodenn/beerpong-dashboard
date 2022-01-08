import { NextApiRequest, NextApiResponse } from 'next';

import { supabase } from '@/utils/client';

export default async function hello(req: NextApiRequest, res: NextApiResponse) {
  const { data } = await supabase
    .from('games_duo')

    .select(
      'team1_player1 (username, avatar_url),team1_player2 (username, avatar_url),team2_player1 (username, avatar_url), team2_player2 (username, avatar_url),cupsleft'
    );
  res.send({ games: data });
}
