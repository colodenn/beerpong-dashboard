import { NextApiRequest, NextApiResponse } from 'next';

import { supabase } from '@/utils/client';

export default async function getSeasons(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { data } = await supabase
    .from('seasons')
    .select('*')
    .order('start', { ascending: true });
  if (data) {
    res.status(200).json({ seasons: data });
  } else {
    res.send(500);
  }
}
