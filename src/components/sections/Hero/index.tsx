import { FC, useLayoutEffect, useRef } from 'react';
import {
  ScrollArrowContainer,
  ScrollArrowFadeElement,
  IntroContainer,
  SoupBowl,
  LettersLayer,
  Letter,
  SoupBowlFront,
  DragNote,
  InfoIcon,
  BSLetter,
} from './styles';
import { IoIosArrowDown } from 'react-icons/io';
import { scroller } from 'react-scroll';
import Bowl from './assets/bowl.png';
import BowlFront from './assets/bowl-front.png';
import gsap from 'gsap';
import Draggable from 'gsap/dist/Draggable';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import SplitType from 'split-type';
import Typography from '@app/components/Typography/Typography';
import { useMedia } from '@app/hooks/useMedia';
import { Breakpoints } from '@app/styles/media';
import { HEADER_HEIGHT } from '@app/components/layout/Header';
import theme from '@app/styles/theme';
import useHeroAnimation from './hooks/useHeroAnimation';

gsap.registerPlugin(Draggable, ScrollTrigger);

const genCharArray = (charA: string, charZ: string) => {
  var a = [],
    i = charA.charCodeAt(0),
    j = charZ.charCodeAt(0);
  for (; i <= j; ++i) {
    a.push(String.fromCharCode(i));
  }
  return a;
};

const LETTERS = [...genCharArray('a', 'z'), ...genCharArray('a', 'z'), ...genCharArray('a', 'z')];

const Hero: FC = () => {
  const letterRefs = useRef<(HTMLParagraphElement | null)[]>([]);
  const bowlRef = useRef<HTMLImageElement | null>(null);
  const bsRef = useRef<HTMLParagraphElement | null>(null);
  const isDesktop = useMedia(Breakpoints.sm);

  useHeroAnimation(bowlRef, letterRefs, bsRef);

  return (
    <IntroContainer id="intro">
      <SoupBowl
        src={Bowl.src}
        width={Bowl.width / 3}
        height={Bowl.height / 3}
        alt="Suppenschale"
        ref={bowlRef}
        priority
        id="soup-bowl"
      />
      <BSLetter ref={bsRef}>buchstabensuppe</BSLetter>
      <LettersLayer>
        {LETTERS.map((char, i) => (
          //@ts-ignore
          <Letter key={i} ref={(el) => (letterRefs.current[i] = el)} title={char}>
            {char}
          </Letter>
        ))}
      </LettersLayer>
      <SoupBowlFront
        src={BowlFront.src}
        width={BowlFront.width / 3}
        height={BowlFront.height / 3}
        alt="Suppenschale-front"
        id="soup-bowl-front"
      />
      <DragNote>
        <InfoIcon />
        <Typography fontSize="10px" color={theme.colors.fg.contrast}>
          Erstelle dein eigenes Wort via Drag & Drop
        </Typography>
      </DragNote>
      <DragNote></DragNote>
      <ScrollArrowContainer
        onClick={() => scroller.scrollTo('live', { smooth: true, duration: 800 })}
        title="Scroll down button"
      >
        <IoIosArrowDown />
        <ScrollArrowFadeElement />
        <ScrollArrowFadeElement />
      </ScrollArrowContainer>
    </IntroContainer>
  );
};

export default Hero;
