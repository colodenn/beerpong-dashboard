// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { NextApiRequest, NextApiResponse } from 'next';

import { supabase } from '@/utils/client';
import { getSeasonData } from '@/utils/seasonData';

export default async function hello(req: NextApiRequest, res: NextApiResponse) {
  const season = req.query['season'][0];
  const seasonData = season ? await getSeasonData(season) : null;

  const { data } = await supabase
    .rpc(
      'elo_scores',
      seasonData
        ? { start_date: seasonData.data?.start, end_date: seasonData.data?.end }
        : {}
    )
    .select('player_name, elo')
    .order('elo', { ascending: false });
  res.status(200).json({ players: data });
}
