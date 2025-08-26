import Typography from '@app/components/Typography/Typography';
import { Live } from '@app/services/graphql/types';
import { fastTransition, flexColumn, flexRow } from '@app/styles/mixins';
import theme from '@app/styles/theme';
import { ISOToDate, ISOToTime } from '@app/utils/formatDate';
import Link from 'next/link';
import { FC } from 'react';
import { css, styled } from 'styled-components';

const LiveItem = styled.div<{ $isPastShow?: boolean }>`
  ${flexColumn};
  gap: 8px;
  padding: 16px 12px;
  background-color: ${({ theme }) => theme.colors.bg.default};
  border-radius: 10px;
  justify-content: flex-start;
  z-index: 2;
  ${({ $isPastShow }) =>
    $isPastShow &&
    css`
      opacity: 0.3;
      pointer-events: none;
    `}

  ${({ theme }) => theme.media('sm')`
    display: grid;
    grid-template-columns: 1.5fr 1.5fr 0.5fr ;
    gap: 32px;
    align-items: center;
    justify-items: flex-start;
  `}
`;

const InfoCol = styled.div`
  ${flexColumn};
  gap: 12px;

  ${({ theme }) => theme.media('sm')`
   gap: 4px;
  `}
`;

const Row = styled.div`
  ${flexColumn};

  ${({ theme }) => theme.media('sm')`
   ${flexRow};
    gap: 8px;
  `}
`;

const Location = styled(Typography)`
  font-size: 28px;
  ${({ theme }) => theme.media('sm')`
    font-size: 32px;
  `}
`;

const Name = styled(Typography)`
  font-size: 20px;
  ${({ theme }) => theme.media('sm')`
    font-size: 28px;
  `}
`;

const TicketButton = styled(Link)`
  padding: 4px 24px;
  border-radius: 100px;
  background-color: ${({ theme }) => theme.colors.bg.contrast};
  color: ${({ theme }) => theme.colors.fg.contrast};
  font-size: 16px;
  font-weight: 600;
  width: max-content;
  height: max-content;
  justify-self: flex-end;
  ${fastTransition};

  &:hover {
    background-color: ${({ theme }) => theme.colors.accent.yellow};
    color: ${({ theme }) => theme.colors.fg.default};
  }
`;

type Props = {
  show: Live;
  isPastShow?: boolean;
};

const LiveRow: FC<Props> = ({ show, isPastShow = false }) => {
  return (
    <LiveItem $isPastShow={isPastShow}>
      <InfoCol>
        <Row>
          <Location
            fontWeight={700}
            color={theme.colors.accent.flamingo}
            $isUpperCase
            type="montserrat"
          >
            {show.location}
          </Location>
          <Typography fontSize="12px">{show.venue}</Typography>
        </Row>
        <Row>
          <Typography fontWeight={700}>{ISOToDate(show.date)},</Typography>
          <Typography>{ISOToTime(show.date)}</Typography>
        </Row>
      </InfoCol>
      <Name fontSize="28px" fontWeight={500}>
        {show.name}
      </Name>

      {show.ticketLink && <TicketButton href={show.ticketLink}>Ticket</TicketButton>}
    </LiveItem>
  );
};

export default LiveRow;
