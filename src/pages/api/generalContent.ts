import { fetchGraphQL } from '@app/lib/api';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function getGeneralContent(req: NextApiRequest, res: NextApiResponse) {
  try {
    const data = await fetchGraphQL(
      `query {
            generalContent(id: "7ANFFXV2ylAU7ZYbfB5zDp") {
              aboutDescription
              aboutImage {
                url
                width
                height
              }
            }
          }`,
    );

    res.status(200).json(data.data.generalContent);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
