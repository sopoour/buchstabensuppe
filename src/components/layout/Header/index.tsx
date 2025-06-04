import React from 'react';
import { gsap } from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import useSidebar from '@app/hooks/useSidebar';
import {
  BurgerMenu,
  DesktopLinkContainer,
  HeaderWrapper,
  Line,
  LogoLetter,
  Navigation,
} from './style';

gsap.registerPlugin(ScrollTrigger);

export const HEADER_HEIGHT = 64;

const Header: React.FC = () => {
  const { open, setOpen } = useSidebar((state) => state);

  return (
    <HeaderWrapper aria-label="navigation header" headerHeight={HEADER_HEIGHT} id="header">
      <Navigation>
        <div>Item 1</div>
        <div>Item 2</div>
      </Navigation>
      <LogoLetter>buchstabensuppe</LogoLetter>
      <DesktopLinkContainer />

      <BurgerMenu onClick={setOpen} id="burger-menu">
        <Line $isActive={open} />
        <Line $isActive={open} />
        <Line $isActive={open} />
        <span className="sr-only">Menu</span>
      </BurgerMenu>
    </HeaderWrapper>
  );
};

export default Header;
