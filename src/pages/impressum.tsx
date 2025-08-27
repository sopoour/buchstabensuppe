import Section from '@app/components/layout/Section';
import MarkdownConfig from '@app/components/MarkdownConfig/MarkdownConfig';
import { fetcher } from '@app/hooks/fetch/useFetch';
import { GeneralContent } from '@app/services/graphql/types';
import { FC } from 'react';
import useSWR from 'swr';

const Impressum: FC = () => {
  const { data: generalContentData, isLoading } = useSWR<GeneralContent | null>(
    '/api/generalContent',
    fetcher,
    {},
  );

  return (
    <Section id="impressum">
      <MarkdownConfig content={generalContentData?.impressum as string} />
    </Section>
  );
};

export default Impressum;
