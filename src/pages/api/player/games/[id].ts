// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { NextApiRequest, NextApiResponse } from 'next';

import { supabase } from '@/utils/client';

export default async function hello(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  const { data } = await supabase
    .from('games_solo')
    .select(
      'player1,player2,cupsleft, winner,player1 (avatar_url,username),player2 (avatar_url,username)'
    )
    .or(`player1.eq.${id},player2.eq.${id}`);

  if (data) {
    res.status(200).json({ games: data });
  } else {
    res.send(500);
  }
}
