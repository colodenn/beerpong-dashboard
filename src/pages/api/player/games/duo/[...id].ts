// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { NextApiRequest, NextApiResponse } from 'next';

import { supabase } from '@/utils/client';
import { getSeasonData } from '@/utils/seasonData';

export default async function hello(req: NextApiRequest, res: NextApiResponse) {
  const id = req.query['id'][0];
  const season = req.query['id'][1];
  const seasonData = season ? await getSeasonData(season) : null;

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
    .or(
      `team1_player1.eq.${id},team1_player2.eq.${id},team2_player1.eq.${id},team2_player2.eq.${id}`
    )
    .order('timestamp', { ascending: false })
    .limit(15);

  if (data) {
    res.status(200).json({ games: data });
  } else {
    res.send(500);
  }
}
