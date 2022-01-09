// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { NextApiRequest, NextApiResponse } from 'next';

import { supabase } from '@/utils/client';

export default async function hello(req: NextApiRequest, res: NextApiResponse) {
  const data2 = req.body;

  const { data } = await supabase.from('games_duo').insert([
    {
      team1_player1: data2.t1_player1,
      team1_player2: data2.t1_player2,
      team2_player1: data2.t1_player1,
      team2_player2: data2.t1_player2,
      winner1: data2.winner == 'Team 1' ? data2.t1_player1 : data2.t2_player1,
      winner2: data2.winner == 'Team 1' ? data2.t1_player1 : data2.t2_player1,

      schnickeln: data2.schnickel,
      cupsleft: data2.cups,
      latitude: data2.lat,
      longitude: data2.lat,
    },
  ]);
  if (data) {
    res.send(200);
  } else {
    res.send(500);
  }
}
