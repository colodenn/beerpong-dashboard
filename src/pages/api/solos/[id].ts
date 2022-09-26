import { NextApiRequest, NextApiResponse } from 'next';

import { supabase } from '@/utils/client';

export default async function hello(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  const seasonData = await getSeasonData(id as string);

  const { data } = await supabase
    .from('games_solo')
    .select(
      'cupsleft, winner,player1:profiles!player1 (avatar_url,username), player2:profiles!player2 (avatar_url,username), timestamp'
    )
    .lt('timestamp', seasonData.data?.end)
    .gt('timestamp', seasonData.data?.start)
    .order('timestamp', { ascending: false })
    .limit(55);
  res.send({ games: data });
}

function getSeasonData(id: string) {
  return supabase.from('seasons').select('*').eq('id', id).single();
}
