import Section from '@app/components/layout/Section';
import { fetcher } from '@app/hooks/fetch/useFetch';
import { useMedia } from '@app/hooks/useMedia';
import { SpotifySample } from '@app/services/graphql/types';
import { Breakpoints } from '@app/styles/media';
import { FC } from 'react';
import styled from 'styled-components';
import useSWR from 'swr';

const spotifyEmbed = [
  'https://open.spotify.com/embed/track/5uk5whuATUwtzRKeC1M9sz',
  'https://open.spotify.com/embed/track/2EairZXnI7MM4O3weSMePQ',
  'https://open.spotify.com/embed/track/6rVFk8fwOrsvMYJjC72RN1',
  'https://open.spotify.com/embed/track/7eEOQtn7U9OJOJftiK4Fcf',
];

const SampleContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;

  ${({ theme }) => theme.media('sm')`
  grid-template-columns: 1fr 1fr;
  `}
`;

const AudioSample: FC = () => {
  const isDesktop = useMedia(Breakpoints.sm);
  const { data, isLoading } = useSWR<SpotifySample[] | null>('/api/spotify', fetcher);
  return (
    <Section id="hörproben">
      <SampleContainer>
        {data?.map((embed) => (
          <iframe
            key={embed.title}
            style={{ borderRadius: '12px' }}
            src={`${embed.sample}`}
            width="100%"
            height={isDesktop ? '232' : '152'}
            frameBorder="0"
            allow="clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
          />
        ))}
      </SampleContainer>
    </Section>
  );
};

export default AudioSample;
