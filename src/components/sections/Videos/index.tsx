import Section from '@app/components/layout/Section';
import { swrFetchObject } from '@app/hooks/fetch/swrConstants';
import { fetcher } from '@app/hooks/fetch/useFetch';
import { useMedia } from '@app/hooks/useMedia';
import { YouTubeSample } from '@app/services/graphql/types';
import { Breakpoints } from '@app/styles/media';
import { FC, useEffect } from 'react';
import styled from 'styled-components';
import useSWR from 'swr';
import Image from 'next/image';
import BoBenino from '@app/assets/bobenino.png';
import { gsap } from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SampleContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
  align-items: center;

  ${({ theme }) => theme.media('sm')`
  grid-template-columns: 1fr 1fr;
  `}
`;

const BoBeninoImage = styled(Image)`
  position: absolute;
  bottom: 2%;
  opacity: 0;
`;

const Videos: FC = () => {
  const isDesktop = useMedia(Breakpoints.sm);
  const { data, isLoading } = useSWR<YouTubeSample[] | null>(
    '/api/youtube',
    fetcher,
    swrFetchObject,
  );

  useEffect(() => {
    if (isDesktop) {
      // Start position: off-screen right
      gsap.set('#bobenino', { x: window.innerWidth - 50, y: 0, scaleX: 1 });

      // Bounce (always on when moving)
      const bounce = gsap.to('#bobenino', {
        y: -20,
        duration: 0.5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        paused: true,
      });
      // Timeline for movement
      const tl = gsap.timeline({
        repeat: -1,
        paused: true, // start paused, will play on scroll
        yoyo: true,
        defaults: { ease: 'linear' },
        onRepeat: () => {
          // Flip direction when it changes
          gsap.to('#bobenino', {
            scaleX: gsap.getProperty('#bobenino', 'scaleX') === 1 ? -1 : 1,
            duration: 1,
            ease: 'none',
          });
        },
        scrollTrigger: {
          trigger: '#videos',
          start: 'top 90%',
          onEnter: () => {
            tl.play();
            bounce.play();
          },
          onLeaveBack: () => {
            tl.pause(0);
            bounce.pause(0);
            gsap.set('#bobenino', { x: window.innerWidth - 50, scaleX: 1 }); // reset position & facing right
          },
        },
      });

      //appear
      tl.to('#bobenino', {
        opacity: 1,
      });

      // Horizontal movement
      tl.to('#bobenino', {
        x: -window.innerWidth / 4, // move past the left edge
        duration: 15,
        ease: 'linear',
      });
    }

    console.log(window.innerWidth);
  }, [isDesktop]);

  return (
    <Section id="videos">
      <>
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
        <BoBeninoImage
          id="bobenino"
          src={BoBenino.src}
          width={BoBenino.width / 3}
          height={BoBenino.height / 3}
          alt="Bo Benino Figure Animation"
        />
      </>
    </Section>
  );
};

export default Videos;
