// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { NextApiRequest, NextApiResponse } from 'next';

import { supabase } from '@/utils/client';

export default async function hello(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  const { data } = await supabase
    .from('profiles')
    .select('*')
    .eq('username', id)
    .single();
  if (data) {
    res.status(200).json({ player: data });
  } else {
    res.send(500);
  }
}
