// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { NextApiRequest, NextApiResponse } from 'next';

import { supabase } from '@/utils/client';
import { getSeasonData } from '@/utils/seasonData';

export default async function hello(req: NextApiRequest, res: NextApiResponse) {
  if (req.query['id'] != undefined) {
    const id = req.query['id'][0];
    const season = req.query['id'][1];
    const seasonData = season ? await getSeasonData(season) : null;

    let query = supabase
      .from('games_solo')
      .select(
        'player1,player2,cupsleft, winner,player1:profiles!player1 (avatar_url,username),player2:profiles!player2 (avatar_url,username), timestamp'
      );

    if (seasonData) {
      query = query
        .lt('timestamp', seasonData.data?.end)
        .gt('timestamp', seasonData.data?.start);
    }

    const { data } = await query
      .or(`player1.eq.${id},player2.eq.${id}`)
      .order('timestamp', { ascending: false })
      .limit(15);

    if (data) {
      res.status(200).json({ games: data });
    } else {
      res.send(500);
    }
    res.send(500);
  }
}
