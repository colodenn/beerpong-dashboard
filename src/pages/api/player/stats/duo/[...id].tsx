// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { NextApiRequest, NextApiResponse } from 'next';

import { supabase } from '@/utils/client';
import { getSeasonData } from '@/utils/seasonData';

export default async function hello(req: NextApiRequest, res: NextApiResponse) {
  if (req.query['id'] != undefined) {
    const id = req.query['id'][0];
    const season = req.query['id'][1];
    const seasonData = season ? await getSeasonData(season) : null;

    const { data } = await supabase
      .rpc(
        'playerstats_duo_function',
        seasonData
          ? {
              start_date: seasonData.data?.start,
              end_date: seasonData.data?.end,
            }
          : {}
      )
      .select('player, *')
      .eq('player', id)
      .single();
    if (data) {
      res.status(200).json({ player: id, stats: data });
    } else {
      res.send(500);
    }
  }
  res.send(500);
}
