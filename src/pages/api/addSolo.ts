// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { NextApiRequest, NextApiResponse } from 'next';
import { date, number, object, ref, string } from 'yup';

import { supabase } from '@/utils/client';

export default async function hello(req: NextApiRequest, res: NextApiResponse) {
  const schema = object({
    player1: string().required(),
    player2: string()
      .required()
      .notOneOf([ref('player1')]),
    winner: string()
      .required()
      .oneOf([ref('player1'), ref('player2'), 'unentschieden']),
    schnickel: string().oneOf([ref('player1'), ref('player2')]),
    cups: number().required().min(0).max(10),
    lat: number().optional().nullable(),
    lng: number().optional().nullable(),
    startDate: date().required(),
  });
  try {
    const data2 = await schema.validate(req.body);
    const { data, error } = await supabase.from('games_solo').insert([
      {
        player1: data2.player1,
        player2: data2.player2,
        winner: data2.winner,
        schnickeln: data2.schnickel,
        cupsleft: data2.cups,
        latitude: data2.lat,
        longitude: data2.lng,
        timestamp: data2.startDate,
      },
    ]);
    if (data) {
      res.send(200);
    } else {
      res.status(400).json(error);
    }
  } catch (error) {
    res.status(400).json(error);
  }
}
