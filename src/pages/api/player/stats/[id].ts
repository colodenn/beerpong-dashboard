// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { NextApiRequest, NextApiResponse } from 'next';

import { supabase } from '@/utils/client';

export default async function hello(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  const { data } = await supabase.from('games_solo').select('*');

  let schickeln = 0;
  let played = 0;
  let won = 0;
  data?.map((e) => {
    if (e.player1 == id || e.player2 == id) {
      played += 1;
    }
    if (e.winner == id) {
      won += 1;
    }

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
        winrate: (won / played) * 100 ?? 0,
        drunk: played * 0.5,
      },
    });
  } else {
    res.send(500);
  }
}
