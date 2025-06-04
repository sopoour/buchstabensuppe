import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import useSidebar from '@app/hooks/useSidebar';
import LinkContainer from '@app/components/LinkContainer';
import Image from 'next/image';
import Logo from '@app/assets/logo.png';
import {
  BurgerMenu,
  DesktopLinkContainer,
  HeaderWrapper,
  Line,
  LogoImage,
  Navigation,
} from './style';
import { useMedia } from '@app/hooks/useMedia';
import { Breakpoints } from '@app/styles/media';

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
      <LogoImage
        src={Logo.src}
        width={Logo.width / 3.5}
        height={Logo.height / 3.5}
        alt="Logo"
        id="logo"
        style={{ marginRight: -25 }}
      />
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
