import { styled } from 'styled-components';
import Image from 'next/image';
import Typography from '../Typography/Typography';
import { fadeIn, flexColumn } from '@app/styles/mixins';
import { IoIosArrowDown } from 'react-icons/io';

export const IntroContainer = styled.div`
  background: ${({ theme }) => theme.colors.bg.default};
  display: flex;
  position: relative;
  flex-flow: column wrap;
  height: 100vh;
  width: 100%;
  transition: all 0.75s ease-in-out;
  -webkit-transition: all 0.75s ease-in-out;
  gap: 16px;
  opacity: 1;
  scroll-snap-align: center;
  scroll-snap-stop: always;

  > svg {
    position: fixed;
    flex-shrink: 0;
    opacity: 0;
  }
`;

export const ContentWrapper = styled.div`
  ${flexColumn};
  gap: 16px;
  margin: auto;
  width: 100%;
  align-items: center;
  z-index: 10;

  ${({ theme }) => theme.media('sm')`
    width: 32rem;
  `}
`;

export const SoupBowl = styled(Image)`
  position: absolute;
  top: 36.7%;
  left: calc(50% - 175px);
  height: auto;
  width: 90%;
  z-index: 0;

  ${({ theme }) => theme.media('xs')`
    width: 350px;
  `}
`;

export const SoupBowlFront = styled(Image)`
  position: absolute;
  top: 42%;
  left: calc(50% - 175px);
  height: auto;
  width: 90%;
  z-index: 2;

  ${({ theme }) => theme.media('xs')`
    width: 350px;
  `}
`;

export const LettersLayer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
`;

export const Letter = styled(Typography)`
  opacity: 0;
  position: absolute;
  font-size: 2.5rem;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.accent.yellow};
  text-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
`;

export const ScrollArrowFadeElement = styled(IoIosArrowDown)`
  transition-duration: 400ms;
  opacity: 0.45;
  animation: downOne 3s ease-in-out infinite;
  margin-top: -20px;

  &:last-of-type {
    opacity: 0.2;
    animation: downTwo 3s ease-in-out infinite;
  }

  @keyframes downOne {
    0% {
      transform: translateY(-4px);
    }
    40%,
    60% {
      transform: translateY(20%);
    }
    100% {
      transform: translateY(-4px);
    }
  }

  @keyframes downTwo {
    0% {
      transform: translateY(-8px);
    }
    40%,
    60% {
      transform: translateY(40%);
    }
    100% {
      transform: translateY(-8px);
    }
  }
`;

export const ScrollArrowContainer = styled.button`
  ${flexColumn};
  justify-content: center;
  cursor: pointer;
  position: absolute;
  bottom: 5%;
  left: 49%;
  opacity: 0;
  animation: ${fadeIn} 1.5s forwards 5.75s;
  -webkit-animation: ${fadeIn} 1.5s forwards 5.75s;
  & svg {
    width: 25px !important;
    height: 25px !important;
    path {
      fill: ${({ theme }) => theme.colors.fg.default};
    }
  }

  &:hover {
    transform: scale(1.2);
    svg > path {
      fill: ${({ theme }) => theme.colors.accent.yellow};
    }
  }
`;
