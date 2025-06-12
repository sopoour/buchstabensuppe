import Section from '@app/components/layout/Section';
import { fetcher } from '@app/hooks/fetch/useFetch';
import { Live as LiveEvent } from '@app/services/graphql/types';
import { FC, useState } from 'react';
import useSWR from 'swr';
import { normalizeDate } from '@app/utils/formatDate';
import { styled } from 'styled-components';
import { fastTransition, flexColumn } from '@app/styles/mixins';
import LiveRow from './elements/LiveRow';
import { IoIosArrowDown } from 'react-icons/io';
import theme from '@app/styles/theme';

const LiveContainer = styled.div`
  ${flexColumn};
  gap: 12px;
  position: relative;
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

const Live: FC = () => {
  const { data, isLoading } = useSWR<LiveEvent[] | null>('/api/live', fetcher);
  const [showAll, setShowAll] = useState<boolean>(false);
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Strip time from today

  const shows = data?.sort(
    (a, b) => normalizeDate(b.date).getTime() - normalizeDate(a.date).getTime(),
  );
  const shownEventsNumber = 4;
  const visibleShows = showAll ? shows : shows?.slice(0, shownEventsNumber);

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
      </LiveContainer>
    </Section>
  );
};

export default Live;
