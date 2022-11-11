// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { NextApiRequest, NextApiResponse } from 'next';

import { supabase } from '@/utils/client';
import { getSeasonData } from '@/utils/seasonData';

export default async function hello(req: NextApiRequest, res: NextApiResponse) {
  if (req.query['season'] != undefined) {
    const season = req.query['season'][0];
    const seasonData = season ? await getSeasonData(season) : null;
    const minimumGames = 5;

    const { data } = await supabase
      .rpc(
        'playerstats_solo_function',
        seasonData
          ? {
              start_date: seasonData.data?.start,
              end_date: seasonData.data?.end,
            }
          : {}
      )
      .select('player, played, schnickelwins, winrate, *')
      .gte('played', minimumGames)
      .order('winrate', { ascending: false })
      .order('played', { ascending: false })
      .order('schnickelwins', { ascending: false });
    res.status(200).json({ players: data });
  }
  res.send(500);
}
