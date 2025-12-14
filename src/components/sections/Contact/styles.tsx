import LinkContainer from '@app/components/LinkContainer';
import { montserrat } from '@app/styles/fonts';
import { fastTransition, flexColumn, flexRow } from '@app/styles/mixins';
import { Typography } from '@mantine/core';
import styled from 'styled-components';

export const ContactContainer = styled.div`
  ${flexColumn};
  gap: 64px;
  align-items: center;

  ${({ theme }) => theme.media('sm')`
    ${flexRow};
    
  `}
`;

export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 32px;
  border-radius: 10px;
  background: ${({ theme }) => theme.colors.bg.default};

  label {
    margin-bottom: 8px;
    color: ${({ theme }) => theme.colors.fg.default};
  }
`;

export const Button = styled.button`
  padding: 4px 18px;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.colors.bg.contrast};
  color: ${({ theme }) => theme.colors.fg.contrast};
  font-size: 16px;
  font-weight: 600;
  width: max-content;
  height: max-content;
  justify-self: flex-end;
  ${fastTransition};

  &:hover {
    background-color: ${({ theme }) => theme.colors.accent.orange};
    color: ${({ theme }) => theme.colors.fg.default};
  }
`;

export const LettersLayer = styled.div`
  position: relative;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 1;

  ${({ theme }) => theme.media('sm')`
     margin-top: 64px;
    
  `}
`;

export const Letter = styled(Typography)`
  opacity: 0;
  position: absolute;
  font-size: 2.3rem;
  font-family: ${montserrat.style.fontFamily};
  font-weight: bold;
  color: ${({ theme }) => theme.colors.accent.orange};
  text-shadow: 0 2px 5px rgba(0, 0, 0, 0.5);
`;

export const ContactLinkContainer = styled(LinkContainer)`
  align-items: center;
  align-content: center;
  gap: 20px !important;
  svg {
    path {
      fill: ${({ theme }) => theme.colors.fg.default} !important;
    }
    &:hover {
      path {
        fill: ${({ hoverColour, theme }) => hoverColour ?? theme.colors.accent.orange} !important;
      }
    }
  }
`;
