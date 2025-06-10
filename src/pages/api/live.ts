import { fetchGraphQL } from '@app/lib/api';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function getLiveEvents(req: NextApiRequest, res: NextApiResponse) {
  try {
    const data = await fetchGraphQL(
      `query {
            liveCollection(limit: 1000) {
              items {
                name
                date
                venue
                location
                ticketLink
                ticketNote
              }
            }
          }`,
    );

    res.status(200).json(data.data.liveCollection.items);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
