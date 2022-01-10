// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { NextApiRequest, NextApiResponse } from 'next';

import { supabase } from '@/utils/client';

export default async function hello(req: NextApiRequest, res: NextApiResponse) {
  const { data } = await supabase
    .from('profiles')
    .select('username, avatar_url')
    .neq('username', 'unentschieden');
  res.status(200).json({ players: data });
}
