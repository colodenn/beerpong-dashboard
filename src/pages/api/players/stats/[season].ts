// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { NextApiRequest, NextApiResponse } from 'next';

import { supabase } from '@/utils/client';
import { getSeasonData } from '@/utils/seasonData';

export default async function hello(req: NextApiRequest, res: NextApiResponse) {
  const season = req.query['season'][0];
  const seasonData = season ? await getSeasonData(season) : null;
  const minimumGames = 5;

  const { data } = await supabase
    .rpc(
      'playerstats_solo_function',
      seasonData
        ? { start_date: seasonData.data?.start, end_date: seasonData.data?.end }
        : {}
    )
    .select('player, played, schnickelwins, winrate, *')
    .gte('played', minimumGames)
    .order('winrate', { ascending: false })
    .order('played', { ascending: false })
    .order('schnickelwins', { ascending: false });
  res.status(200).json({ players: data });
}

// create sql query
// group game table by winners and count them
// select winner, count(*) as count from games_solo group by winner
