// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { NextApiRequest, NextApiResponse } from 'next';

import { supabase } from '@/utils/client';

export default async function hello(req: NextApiRequest, res: NextApiResponse) {
  const { data } = await supabase
    .from('playerstatssolo')
    .select('player,played, schnickelwins, winrate, *')
    .order('winrate', { ascending: false })
    .order('played', { ascending: false })
    .order('schnickelwins', { ascending: false });
  res.status(200).json({ players: data });
}

// create sql query
// group game table by winners and count them
// select winner, count(*) as count from games_solo group by winner
