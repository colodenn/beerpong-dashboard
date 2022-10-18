// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { NextApiRequest, NextApiResponse } from 'next';

import { supabase } from '@/utils/client';
import { getSeasonData } from '@/utils/seasonData';

export default async function hello(req: NextApiRequest, res: NextApiResponse) {
  const id = req.query['id'][0];
  const season = req.query['id'][1];
  const seasonData = season ? await getSeasonData(season) : null;

  const { data } = await supabase
    .rpc(
      'playerstats_vs_others_solo',
      seasonData
        ? {
            player_in: id,
            start_date: seasonData.data?.start,
            end_date: seasonData.data?.end,
          }
        : { player_in: id }
    )
    .select('*')
    .order('winrate', { ascending: false })
    .limit(20);

  if (data) {
    res.status(200).json({ stats: data });
  } else {
    res.send(500);
  }
}
