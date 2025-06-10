import { flexColumn, flexRow } from '@app/styles/mixins';
import styled from 'styled-components';

export const LiveContainer = styled.div`
  ${flexColumn};
  gap: 16px;
`;

export const LiveItem = styled.div`
  ${flexColumn};
  gap: 32px;

  ${({ theme }) => theme.media('sm')`
    ${flexRow};
    justify-content: space-between;
  `}
`;

export const InfoCol = styled.div`
  ${flexColumn};
  gap: 8px;
`;
