// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { NextApiRequest, NextApiResponse } from 'next';

import { supabase } from '@/utils/client';

export default async function hello(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  const { data } = await supabase
    .from('games_solo')
    .select(
      'player1,player2,cupsleft, winner,player1:profiles!player1 (avatar_url,username),player2:profiles!player2 (avatar_url,username)'
    )
    .or(`player1.eq.${id},player2.eq.${id}`)
    .order('timestamp', { ascending: false })
    .limit(15);

  if (data) {
    res.status(200).json({ games: data });
  } else {
    res.send(500);
  }
}
