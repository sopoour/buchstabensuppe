import React, { useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import useSidebar from '@app/hooks/useSidebar';
import {
  BurgerMenu,
  DesktopLinkContainer,
  HeaderWrapper,
  Line,
  LogoLetter,
  NavigationDesktop,
} from './style';

gsap.registerPlugin(ScrollTrigger);

export const HEADER_HEIGHT = 64;

const Header: React.FC = () => {
  const { open, setOpen } = useSidebar((state) => state);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      gsap.set('#logo', { opacity: 0 });
      // Once the live section is reached show the logo (before it is handled via hero animation)
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: '#live',
          start: 'top 10%',
          end: 'top -20%',
          scrub: 1,
        },
      });
      timeline.fromTo(
        '#logo',
        {
          opacity: 0,
          duration: 0.2,
          ease: 'back.out(1.7)',
        },
        {
          opacity: 1,
        },
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <HeaderWrapper aria-label="navigation header" headerHeight={HEADER_HEIGHT} id="header">
      <NavigationDesktop />
      <LogoLetter id="logo">buchstabensuppe</LogoLetter>
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
