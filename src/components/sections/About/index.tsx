import Section from '@app/components/layout/Section';
import Typography from '@app/components/Typography/Typography';
import { fetcher } from '@app/hooks/fetch/useFetch';
import { useMedia } from '@app/hooks/useMedia';
import ContentfulImage from '@app/lib/contentful-image';
import { GeneralContent } from '@app/services/graphql/types';
import { Breakpoints } from '@app/styles/media';
import { FC, useEffect } from 'react';
import styled from 'styled-components';
import useSWR from 'swr';
import Whale from '@app/assets/whale.png';
import Image from 'next/image';
import { gsap } from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import { swrFetchObject } from '@app/hooks/fetch/swrConstants';
import Skeleton from 'react-loading-skeleton';
import { VisuallyHidden } from '@mantine/core';

gsap.registerPlugin(ScrollTrigger);

const AboutContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 32px;
  align-items: center;

  ${({ theme }) => theme.media('sm')`
    grid-template-columns: 1fr 1fr;
  `}
`;

const AboutImageWrapper = styled.span`
  position: relative;
  width: 100%;
  height: auto;
  border: none !important;
  ${({ theme }) => theme.media('sm')`
     width: 450px;
  height: 450px;
  `}
`;

const AboutImage = styled(ContentfulImage)`
  && {
    object-fit: cover;
    object-position: center 15%;
    z-index: 1;
    ${({ theme }) => theme.media('sm')`
     width: 450px !important;
     height: 450px !important;
  `}
    width: 100% !important;
    height: unset !important;
    position: relative !important;
  }
`;

const Whalemage = styled(Image)`
  position: absolute;
  top: 30%;
  left: 0;
  opacity: 0;
`;

const About: FC = () => {
  const { data, isLoading } = useSWR<GeneralContent | null>(
    '/api/generalContent',
    fetcher,
    swrFetchObject,
  );
  const isDesktopSm = useMedia(Breakpoints.sm);
  const isDesktopMd = useMedia(Breakpoints.md);

  useEffect(() => {
    let ctx = gsap.context(() => {
      if (isDesktopSm) {
        gsap.set('#whale', { opacity: 0, rotate: -20 });
        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: '#about',
            start: 'top 100%',
            end: 'center 25%',
            scrub: 1,
          },
        });

        timeline
          .to('#whale', {
            x: 150,
            y: -225,
            opacity: 1,
            duration: 0.5,
            rotation: 10,
            ease: 'sine.inOut',
          })
          .to('#whale', {
            x: isDesktopMd ? 750 : 500,
            y: 350,
            duration: 0.5,
            rotation: 385,
            ease: 'sine.inOut',
          });
      }
    });
    return () => ctx.revert();
  }, [isDesktopSm, isDesktopMd]);
  return (
    <Section id="about">
      <AboutContainer>
        <VisuallyHidden component={'h2'}>Über uns</VisuallyHidden>
        <AboutImageWrapper>
          {data?.aboutImage?.url ? (
            <AboutImage
              src={data?.aboutImage?.url || ''}
              fill
              sizes="(max-width: 768px) 100vw"
              alt="buchstabensuppe team picture"
            />
          ) : (
            <Skeleton width={450} height={450} />
          )}
        </AboutImageWrapper>
        <Typography fontSize="20px" $textalign="justify">
          {data?.aboutDescription}
        </Typography>
        <Whalemage
          id="whale"
          src={Whale.src}
          width={Whale.width / 2}
          height={Whale.height / 2}
          alt="Whale"
        />
      </AboutContainer>
    </Section>
  );
};

export default About;
