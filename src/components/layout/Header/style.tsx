import { css, styled } from 'styled-components';
import { flexColumn, flexRow } from '@app/styles/mixins';
import LinkContainer from '@app/components/LinkContainer';
import Navigation from '../Navigation';

export const HeaderWrapper = styled.div<{ headerHeight: number }>`
  display: flex;
  position: sticky;
  opacity: 0;
  top: -1px;
  z-index: 5;
  min-height: ${({ headerHeight }) => `${headerHeight}px`};
  padding: 8px 32px;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  transition: all 300ms ease-in-out;
  transform: none;
  background-color: ${({ theme }) => theme.colors.bg.defaultBlur};
  backdrop-filter: ${({ theme }) => theme.filters.backdrop};

  /* ${({ theme }) => theme.media('md')`
    transform: translateY(-100%);
    opacity: 0;
  `} */
`;

export const Line = styled.span<{ $isActive: boolean }>`
  width: 18px;
  height: 2px;
  background-color: ${({ theme }) => theme.colors.fg.default};
  display: block;
  margin: 0 auto;
  -webkit-transition: all 0.3s ease-in-out;
  -o-transition: all 0.3s ease-in-out;
  transition: all 0.3s ease-in-out;

  ${({ $isActive }) =>
    $isActive &&
    css`
      &:nth-child(2) {
        opacity: 0;
      }

      &:nth-child(1) {
        -webkit-transform: translateY(6px) rotate(45deg);
        -ms-transform: translateY(6px) rotate(45deg);
        -o-transform: translateY(6px) rotate(45deg);
        transform: translateY(6px) rotate(45deg);
      }

      &:nth-child(3) {
        -webkit-transform: translateY(-4px) rotate(-45deg);
        -ms-transform: translateY(-4px) rotate(-45deg);
        -o-transform: translateY(-4px) rotate(-45deg);
        transform: translateY(-4px) rotate(-45deg);
      }
    `}
`;

export const BurgerMenu = styled.button`
  padding: 8px;
  width: 35px;
  height: 35px;
  align-items: center;

  justify-content: center;
  ${flexColumn};
  gap: 3px;
  z-index: 100;

  ${({ theme }) => theme.media('sm')`
    display: none;
  `}
`;

export const NavigationDesktop = styled(Navigation)`
  && {
    display: none;
    ${({ theme }) => theme.media('sm')`
    display: flex;
  `}
  }
`;

export const DesktopLinkContainer = styled(LinkContainer)`
  && {
    display: none;
    ${({ theme }) => theme.media('sm')`
       display: flex;
  `}
  }
`;

export const LogoLetter = styled.p`
  font-size: 1.2rem;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.accent.yellow};
  text-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  margin: 0;

  ${({ theme }) => theme.media('sm')`
       font-size: 2rem;
      
  `}
`;
