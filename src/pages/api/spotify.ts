import { fetchGraphQL } from '@app/lib/api';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function getSpotifySamples(req: NextApiRequest, res: NextApiResponse) {
  try {
    const data = await fetchGraphQL(
      `query {
            spotifySampleCollection(limit: 1000) {
              items {
                title
                sample
              }
            }
          }`,
    );

    res.status(200).json(data.data.spotifySampleCollection.items);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
