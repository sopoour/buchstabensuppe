import Section from '@app/components/layout/Section';
import Typography from '@app/components/Typography/Typography';
import { fetcher } from '@app/hooks/fetch/useFetch';
import { useMedia } from '@app/hooks/useMedia';
import ContentfulImage from '@app/lib/contentful-image';
import { GeneralContent } from '@app/services/graphql/types';
import { Breakpoints } from '@app/styles/media';
import { FC, useLayoutEffect } from 'react';
import styled from 'styled-components';
import useSWR from 'swr';
import Whale from '@app/assets/whale.png';
import Image from 'next/image';
import { gsap } from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const AboutContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 32px;
  align-items: center;
`;

const AboutImage = styled(ContentfulImage)`
  && {
    object-fit: cover;
    object-position: center 15%;
    z-index: 1;
  }
`;

const Whalemage = styled(Image)`
  position: absolute;
  top: 30%;
  left: 0;
  opacity: 0;
`;

const About: FC = () => {
  const { data, isLoading } = useSWR<GeneralContent | null>('/api/generalContent', fetcher);
  const isDesktop = useMedia(Breakpoints.lg);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      if (isDesktop) {
        gsap.set('#pig', { opacity: 0 });
        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: '#about',
            start: 'top -100%',
            end: 'center -40%',
            scrub: 1,
          },
        });

        timeline
          .to('#whale', {
            x: 150,
            y: -200,
            opacity: 1,
            duration: 0.5,
            rotation: -15,
            ease: 'sine.inOut',
          })
          .to('#whale', {
            x: 700,
            y: 250,
            duration: 0.5,
            rotation: 375,
            ease: 'sine.inOut',
          });
      }
    });
    return () => ctx.revert();
  }, [isDesktop]);
  return (
    <Section id="über-uns">
      <AboutContainer>
        <span style={{ position: 'relative', width: '450px', height: '450px', border: 'none' }}>
          <AboutImage src={data?.aboutImage?.url || ''} fill />
        </span>
        <Typography fontSize="20px" textalign="justify">
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
