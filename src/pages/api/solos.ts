import { NextApiRequest, NextApiResponse } from 'next';

import { supabase } from '@/utils/client';

export default async function hello(req: NextApiRequest, res: NextApiResponse) {
  const { data } = await supabase
    .from('games_solo')
    .select(
      'player1,player2,cupsleft, player1 (avatar_url,username),player2 (avatar_url,username)'
    );
  res.send({ games: data });
}