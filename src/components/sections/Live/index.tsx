import Section from '@app/components/layout/Section';
import { fetcher } from '@app/hooks/fetch/useFetch';
import { Live as LiveEvent } from '@app/services/graphql/types';
import { FC } from 'react';
import useSWR from 'swr';
import { InfoCol, LiveContainer, LiveItem } from './styles';
import Typography from '@app/components/Typography/Typography';
import { ISOToDate, ISOToTime, normalizeDate } from '@app/utils/formatDate';
import theme from '@app/styles/theme';

const Live: FC = () => {
  const { data, isLoading } = useSWR<LiveEvent[] | null>('/api/live', fetcher);
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Strip time from today

  const upcomingShows = data
    ?.filter((live) => normalizeDate(live.date) >= today)
    ?.sort((a, b) => normalizeDate(a.date).getTime() - normalizeDate(b.date).getTime());

  const pastShows = data
    ?.filter((live) => normalizeDate(live.date) < today)
    ?.sort((a, b) => normalizeDate(b.date).getTime() - normalizeDate(a.date).getTime());

  return (
    <Section id="live" $bgColor="#CAE8E9">
      <LiveContainer>
        {upcomingShows?.map((live) => (
          <LiveItem key={live.venue}>
            <Typography fontSize="40px" color={theme.colors.accent.flamingo}>
              {live.name}
            </Typography>
            <InfoCol>
              <Typography fontSize="24px" $isUpperCase>
                {live.location}
              </Typography>
              <Typography fontWeight={500}>{live.venue}</Typography>
            </InfoCol>
            <InfoCol>
              <Typography>{ISOToDate(live.date)}</Typography>
              <Typography fontWeight={500}>{ISOToTime(live.date)}</Typography>
            </InfoCol>
            {live.ticketLink && <a href={live.ticketLink}>Ticket</a>}
          </LiveItem>
        ))}
      </LiveContainer>
    </Section>
  );
};

export default Live;
