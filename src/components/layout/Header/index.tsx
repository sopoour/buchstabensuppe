import React, { useEffect, FC, useState } from 'react';
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
import { useRouter } from 'next/router';
import { animateScroll } from 'react-scroll';

gsap.registerPlugin(ScrollTrigger);

export const HEADER_HEIGHT = 64;

const Header: FC = () => {
  const { open, setOpen } = useSidebar((state) => state);
  const [showHeader, setShowHeader] = useState<boolean>(false);

  const router = useRouter();

  useEffect(() => {
    router.pathname !== '/' ? setShowHeader(true) : setShowHeader(false);
  }, [router]);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.set('#logo', { opacity: showHeader ? 1 : 0 });
      // Once the live section is reached show the logo (before it is handled via hero animation)
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: '#about',
          start: 'top 10%',
          end: 'top -20%',
          scrub: 1,
        },
      });
      timeline.fromTo(
        '#logo',
        {
          opacity: showHeader ? 1 : 0,
          duration: 0.2,
          ease: 'back.out(1.7)',
        },
        {
          opacity: 1,
        },
      );
    });
    return () => ctx.revert();
  }, [showHeader]);

  return (
    <HeaderWrapper
      aria-label="navigation header"
      $headerHeight={HEADER_HEIGHT}
      id="header"
      $showHeader={showHeader}
    >
      <NavigationDesktop />
      <LogoLetter
        id="logo"
        onClick={() => {
          animateScroll.scrollTo(0, { smooth: true, duration: 800 });
          router.pathname !== '/' && router.replace('/');
        }}
      >
        buchstabensuppe
      </LogoLetter>
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
