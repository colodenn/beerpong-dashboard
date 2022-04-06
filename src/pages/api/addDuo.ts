// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { NextApiRequest, NextApiResponse } from 'next';
import { date, number, object, ref, string } from 'yup';

import { supabase } from '@/utils/client';

export default async function hello(req: NextApiRequest, res: NextApiResponse) {
  const schema = object({
    t1_player1: string()
      .required()
      .notOneOf([ref('t1_player2'), ref('t2_player1'), ref('t2_player2')]),
    t1_player2: string()
      .required()
      .notOneOf([ref('t1_player1'), ref('t2_player1'), ref('t2_player2')]),
    t2_player1: string()
      .required()
      .notOneOf([ref('t1_player1'), ref('t1_player2'), ref('t2_player2')]),
    t2_player2: string()
      .required()
      .notOneOf([ref('t1_player1'), ref('t1_player2'), ref('t2_player1')]),
    winner: string()
      .required()
      .matches(/(Team 1|Team 2|unentschieden)/),
    schnickel: string().oneOf([
      ref('t1_player1'),
      ref('t1_player2'),
      ref('t2_player1'),
      ref('t2_player2'),
    ]),
    cups: number().required().min(0).max(10),
    lat: number().optional().nullable(),
    lng: number().optional().nullable(),
    startDate: date().required(),
  });
  try {
    const data2 = await schema.validate(req.body);
    const { data, error } = await supabase.from('games_duo').insert([
      {
        team1_player1: data2.t1_player1,
        team1_player2: data2.t1_player2,
        team2_player1: data2.t2_player1,
        team2_player2: data2.t2_player2,
        winner1:
          data2.winner == 'Team 1'
            ? data2.t1_player1
            : data2.winner == 'Team 2'
            ? data2.t2_player1
            : 'unentschieden',
        winner2:
          data2.winner == 'Team 1'
            ? data2.t1_player2
            : data2.winner == 'Team 2'
            ? data2.t2_player2
            : 'unentschieden',

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
