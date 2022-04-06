// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { NextApiRequest, NextApiResponse } from 'next';

import { supabase } from '@/utils/client';

export default async function hello(req: NextApiRequest, res: NextApiResponse) {
  // console.log(req.cookies['sb:token'])
  supabase.auth.setAuth(req.cookies['sb:token']);
  const data2 = req.body;
  const { data } = await supabase.from('games_solo').insert([
    {
      player1: data2.player1,
      player2: data2.player2,
      winner: data2.winner,
      schnickeln: data2.schnickel,
      cupsleft: data2.cups,
      latitude: data2.lat,
      longitude: data2.lng,
      timestamp: data2.startDate,
    },
  ]);
  if (data) {
    res.send(200);
  } else {
    res.send(500);
  }
}
