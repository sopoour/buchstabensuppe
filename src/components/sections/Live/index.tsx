import Section from '@app/components/layout/Section';
import { fetcher } from '@app/hooks/fetch/useFetch';
import { Live as LiveEvent } from '@app/services/graphql/types';
import { FC, useLayoutEffect, useState } from 'react';
import useSWR from 'swr';
import { normalizeDate } from '@app/utils/formatDate';
import { styled } from 'styled-components';
import { fastTransition, flexColumn } from '@app/styles/mixins';
import LiveRow from './elements/LiveRow';
import { IoIosArrowDown } from 'react-icons/io';
import Image from 'next/image';
import Pig from '@app/assets/pig.png';
import { gsap } from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import { useMedia } from '@app/hooks/useMedia';
import { Breakpoints } from '@app/styles/media';

gsap.registerPlugin(ScrollTrigger);

const LiveContainer = styled.div`
  ${flexColumn};
  gap: 12px;
  z-index: 1;
  position: relative;
  background-color: #cae8e9;
`;

const ShowMore = styled.div`
  display: flex;
  justify-content: center;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    display: block;
    bottom: 50px;
    left: 0;
    width: 100%;
    height: 120px;
    background: linear-gradient(to bottom, rgba(255, 255, 255, 0) 0%, #cae8e9 100%);
    transition: opacity 0.3s ease;
  }
`;

const ShowMoreButton = styled.button`
  padding: 8px 24px;
  border-radius: 100px;
  border: 1px solid ${({ theme }) => theme.colors.bg.contrast};
  color: ${({ theme }) => theme.colors.fg.default};
  font-size: 16px;
  font-weight: 500;
  width: max-content;
  ${fastTransition};
  &:hover {
    background-color: ${({ theme }) => theme.colors.bg.contrast};
    color: ${({ theme }) => theme.colors.fg.contrast};
  }
`;

const PigImage = styled(Image)`
  position: absolute;
  top: 25%;
  opacity: 0;
`;

const Live: FC = () => {
  const { data, isLoading } = useSWR<LiveEvent[] | null>('/api/live', fetcher);
  const isDesktop = useMedia(Breakpoints.lg);
  const [showAll, setShowAll] = useState<boolean>(false);
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Strip time from today

  const shows = data?.sort(
    (a, b) => normalizeDate(b.date).getTime() - normalizeDate(a.date).getTime(),
  );
  const shownEventsNumber = 4;
  const visibleShows = showAll ? shows : shows?.slice(0, shownEventsNumber);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      if (isDesktop) {
        gsap.set('#pig', { opacity: 0 });
        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: '#live',
            start: 'top 5%',
            end: 'bottom 90%',
            scrub: 2,
          },
        });

        timeline
          .to('#pig', {
            x: -120,
            y: 50,
            opacity: 1,
            duration: 8,
            rotation: -15,
            ease: 'sine.inOut',
          })
          .to('#pig', {
            y: 100,
            duration: 3,
          });
      }
    });
    return () => ctx.revert();
  }, [isDesktop]);

  return (
    <Section id="live" $bgColor="#CAE8E9">
      <LiveContainer>
        {visibleShows?.map((live) => (
          <LiveRow key={live.venue} show={live} isPastShow={normalizeDate(live.date) < today} />
        ))}
        {!showAll && shows && shows?.length > shownEventsNumber && (
          <ShowMore>
            <ShowMoreButton onClick={() => setShowAll(true)}>
              Zeige alle Shows <IoIosArrowDown />
            </ShowMoreButton>
          </ShowMore>
        )}
        <PigImage id="pig" src={Pig.src} width={Pig.width / 2} height={Pig.height / 2} alt="Pig" />
      </LiveContainer>
    </Section>
  );
};

export default Live;
