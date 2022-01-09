// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { NextApiRequest, NextApiResponse } from 'next';

import { supabase } from '@/utils/client';

export default async function hello(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  const { data } = await supabase
    .from('games_solo')
    .select('*')
    .or(`player1.eq.${id},player2.eq.${id}`);

  let schickeln = 0;
  let played = 0;
  let won = 0;
  let drunk = 0;
  data?.map((e) => {
    if (e.player1 == id || e.player2 == id) {
      played += 1;
    }
    if (e.winner == id) {
      won += 1;
      drunk += (0.5 / 6) * (6 - e.cupsleft);
    } else drunk += (0.5 / 6) * e.cupsleft + 0.5;

    if (e.schnickeln == id) {
      schickeln += 1;
    }
  });
  if (data) {
    res.status(200).json({
      player: id,
      stats: {
        played: played,
        won: won,
        schnickeln: schickeln,
        winrate: ((won / played) * 100).toFixed(2) ?? 0,
        drunk: drunk.toFixed(2),
      },
    });
  } else {
    res.send(500);
  }
}
