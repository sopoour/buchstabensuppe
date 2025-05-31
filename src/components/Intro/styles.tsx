import { styled } from 'styled-components';
import Image from 'next/image';
import Typography from '../Typography/Typography';
import { fadeIn, flexColumn, flexRow } from '@app/styles/mixins';
import { IoIosArrowDown } from 'react-icons/io';
import { FaInfo } from 'react-icons/fa';

export const IntroContainer = styled.div`
  background: ${({ theme }) => theme.colors.bg.default};
  position: relative;
  height: 100vh;
  width: 100%;
  margin: auto;
  align-items: center;
  ${flexColumn};
`;

export const SoupBowl = styled(Image)`
  position: absolute;
  bottom: 29%;
  height: auto;
  width: 90%;
  z-index: 0;
  opacity: 0;

  ${({ theme }) => theme.media('sm')`
    width: 450px;
    left: calc(50% - 225px);
  `}
`;

export const SoupBowlFront = styled(SoupBowl)`
  z-index: 2;
  pointer-events: none;
`;

export const LettersLayer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
`;

export const Letter = styled(Typography)`
  opacity: 0;
  position: absolute;
  font-size: 2.3rem;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.accent.yellow};
  text-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);

  &:hover {
    color: ${({ theme }) => theme.colors.accent.flamingo};
  }
`;

export const ScrollArrowContainer = styled.button`
  ${flexColumn};
  justify-content: center;
  cursor: pointer;
  position: absolute;
  bottom: 5%;
  left: 45%;
  opacity: 0;
  animation: ${fadeIn} 1.5s forwards 8s;
  -webkit-animation: ${fadeIn} 1.5s forwards 8s;
  & svg {
    width: 25px !important;
    height: 25px !important;
    path {
      fill: ${({ theme }) => theme.colors.accent.yellow};
    }
  }

  &:hover {
    transform: scale(1.2);
    svg > path {
      fill: ${({ theme }) => theme.colors.accent.yellow};
    }
  }

  ${({ theme }) => theme.media('sm')`
     left: 49%;
  `}
`;

export const DragNote = styled.span`
  position: absolute;
  bottom: 23%;
  left: calc(50% - 120.5px);
  ${flexRow};
  gap: 4px;
  opacity: 0;

  animation: ${fadeIn} 1.5s forwards 5.75s;
  -webkit-animation: ${fadeIn} 1.5s forwards 5.75s;
`;

export const InfoIcon = styled(FaInfo)`
  && {
    padding: 2px !important;
    border: 1px solid white !important;
    border-radius: 100px;
  }
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
