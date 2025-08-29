import { flexColumn, flexRow } from '@app/styles/mixins';
import { Typography } from '@mantine/core';
import Link from 'next/link';
import { FC } from 'react';
import { styled } from 'styled-components';

const FooterWrapper = styled.footer`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 12px 0;
  gap: 32px;
  background-color: ${({ theme }) => theme.colors.bg.contrast};
  color: ${({ theme }) => theme.colors.fg.contrast};
`;

const FooterContent = styled.div`
  ${flexColumn};
  align-items: center;
  justify-content: center;

  ${({ theme }) => theme.media('sm')`
    gap: 8px;
  `}
`;

const FooterRowTop = styled.div`
  ${flexRow};
  gap: 16px;
  align-items: center;
`;

const FooterRowBottom = styled.div`
  ${flexColumn}
  align-items: center;
  ${({ theme }) => theme.media('sm')`
     ${flexRow};
    gap: 8px;
  `}
`;

const Anchor = styled(Link)`
  color: ${({ theme }) => theme.colors.fg.contrast};
  font-weight: 600;

  &:hover {
    text-decoration: underline !important;
    opacity: 0.8;
  }
`;

const Footer: FC = () => {
  const currentYear = new Date().getFullYear();
  return (
    <FooterWrapper>
      <FooterContent>
        <FooterRowTop>
          <Anchor href={'/impressum'}>Impressum</Anchor>
          <Typography> | </Typography>
          <Anchor href={'/datenschutz'}>Datenschutz</Anchor>
        </FooterRowTop>
        <FooterRowBottom>
          <Typography>© {currentYear} Buchstabensuppe.</Typography>
          <Typography>
            Entwickelt von{' '}
            <Anchor href="https://www.fioauer.com/" target="_blank">
              Fio Auer
            </Anchor>{' '}
          </Typography>
        </FooterRowBottom>
      </FooterContent>
    </FooterWrapper>
  );
};

export default Footer;
