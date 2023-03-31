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
      'elo_scores',
      seasonData
        ? { start_date: seasonData.data?.start, end_date: seasonData.data?.end }
        : {}
    )
    .select('player_name, *')
    .eq('player_name', id)
    .single();
  if (data) {
    res.status(200).json({ player: id, stats: data });
  } else {
    res.send(500);
  }
}
