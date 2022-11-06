import { NextApiRequest, NextApiResponse } from 'next';

import { supabase } from '@/utils/client';
import { getSeasonData } from '@/utils/seasonData';

export default async function hello(req: NextApiRequest, res: NextApiResponse) {
  const season = req.query['id'][0];
  const seasonData = await getSeasonData(season);

  let query = supabase
    .from('games_duo')
    .select(
      'team1_player1:profiles!team1_player1 (username, avatar_url),team1_player2:profiles!team1_player2 (username, avatar_url),team2_player1:profiles!team2_player1(username, avatar_url), team2_player2:profiles!team2_player2(username, avatar_url),cupsleft, winner1, winner2, timestamp'
    );
  if (seasonData) {
    query = query
      .lt('timestamp', seasonData.data?.end)
      .gt('timestamp', seasonData.data?.start);
  }
  const { data } = await query
    .order('timestamp', { ascending: false })
    .limit(20);
  res.send({ games: data });
}
