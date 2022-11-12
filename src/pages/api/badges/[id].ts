// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { NextApiRequest, NextApiResponse } from 'next';

import { supabase } from '@/utils/client';

export default async function getBadges(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;
  const { data } = await supabase
    .from('badges')
    .select('*')
    .eq('id', id)
    .limit(1);
  if (data) {
    res.status(200).json({ badges: data });
  } else {
    res.send(500);
  }
}
