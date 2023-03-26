// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { NextApiRequest, NextApiResponse } from 'next';

import { supabase } from '@/utils/client';

export default async function hello(req: NextApiRequest, res: NextApiResponse) {
  const { data } = await supabase
    .from('profiles')
    .select('*')
    .order('regular_player', { ascending: false })
    .order('username', { ascending: true });
  res.status(200).json({ players: data });
}
