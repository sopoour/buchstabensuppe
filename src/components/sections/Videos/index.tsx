import Section from '@app/components/layout/Section';
import { fetcher } from '@app/hooks/fetch/useFetch';
import { useMedia } from '@app/hooks/useMedia';
import { YouTubeSample } from '@app/services/graphql/types';
import { Breakpoints } from '@app/styles/media';
import { FC } from 'react';
import styled from 'styled-components';
import useSWR from 'swr';

const SampleContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
  align-items: center;

  ${({ theme }) => theme.media('sm')`
  grid-template-columns: 1fr 1fr;
  `}
`;

const Videos: FC = () => {
  const isDesktop = useMedia(Breakpoints.sm);
  const { data, isLoading } = useSWR<YouTubeSample[] | null>('/api/youtube', fetcher);
  return (
    <Section id="videos">
      <SampleContainer>
        {data?.map((embed) => (
          <iframe
            key={embed.title}
            style={{ borderRadius: '12px' }}
            src={`${embed.ytSample}`}
            width="100%"
            height={isDesktop ? '300' : '250'}
            frameBorder="0"
            allow="clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
          />
        ))}
      </SampleContainer>
    </Section>
  );
};

export default Videos;
