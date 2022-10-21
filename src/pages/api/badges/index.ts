import { NextApiRequest, NextApiResponse } from 'next';

import { supabase } from '@/utils/client';

export default async function getAllBadges(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { data } = await supabase.from('badges').select('*');
  if (data) {
    res.status(200).json({ badges: data });
  } else {
    res.send(500);
  }
}
