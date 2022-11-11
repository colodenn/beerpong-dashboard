import { NextApiRequest, NextApiResponse } from 'next';

import { supabase } from '@/utils/client';
import { getSeasonData } from '@/utils/seasonData';

export default async function hello(req: NextApiRequest, res: NextApiResponse) {
  if (req.query['id'] != undefined) {
    const season = req.query['id'][0];
    const seasonData = await getSeasonData(season);

    let query = supabase
      .from('games_solo')
      .select(
        'cupsleft, winner,player1:profiles!player1 (avatar_url,username), player2:profiles!player2 (avatar_url,username), timestamp'
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
  res.send(500);
}
