import { NextApiRequest, NextApiResponse } from 'next';

export default async function getSeasons(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const searchSuggestions = [
    'Tobinator',
    'Airballer',
    'Maintainer',
    'Gönner',
    'Trickshotter',
    'Umsteller',
  ];
  const index = Math.floor(Math.random() * searchSuggestions.length);
  res.status(200).json({ searchTerm: searchSuggestions[index] });
}
