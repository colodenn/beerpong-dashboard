/* eslint-disable @typescript-eslint/no-explicit-any */
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import formidable from 'formidable';
import fs from 'fs';
import { NextApiRequest, NextApiResponse } from 'next';

import { supabase } from '@/utils/client';
export const config = {
  api: {
    bodyParser: false,
  },
};

const getUser = async (token: string) => {
  const { data, error } = await supabase.auth.api.getUser(token);

  if (error) {
    throw error;
  }

  return data;
};

export default async function hello(req: NextApiRequest, res: NextApiResponse) {
  supabase.auth.setAuth(req.cookies['sb:token']);

  const form = new formidable.IncomingForm();

  const token = req.headers.token;
  const user = await getUser(token as string);

  try {
    form.parse(req, async (err, fields, files) => {
      const fileData = fs.readFileSync((files.myFile as any).filepath);
      await supabase.storage
        .from('images')
        .upload(`${user?.id}/${(files.myFile as any).newFilename}`, fileData, {
          contentType: (files.myFile as any).mimetype,
          cacheControl: '3600',
          upsert: true,
        });

      const { signedURL } = await supabase.storage
        .from('images')
        .createSignedUrl(
          `${user?.id}/${(files.myFile as any).newFilename}`,
          6000000
        );

      await supabase
        .from('profiles')
        .update({ avatar_url: signedURL })
        .eq('id', user?.id);
    });
    res.status(200).send('ok');
  } catch (error) {
    res.status(500).send(error);
  }
}
