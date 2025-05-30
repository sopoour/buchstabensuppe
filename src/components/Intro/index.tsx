import { FC, useLayoutEffect, useRef } from 'react';
import {
  ContentWrapper,
  ScrollArrowContainer,
  ScrollArrowFadeElement,
  IntroContainer,
  SoupBowl,
  LettersLayer,
  Letter,
  SoupBowlFront,
  DragNote,
  InfoIcon,
} from './styles';
import { IoIosArrowDown } from 'react-icons/io';
import { scroller } from 'react-scroll';
import Image from 'next/image';
import Bowl from './assets/bowl.png';
import BowlFront from './assets/bowl-front.png';
import gsap from 'gsap';
import Draggable from 'gsap/dist/Draggable';
import Typography from '../Typography/Typography';
import { FaInfo } from 'react-icons/fa';

gsap.registerPlugin(Draggable);

const genCharArray = (charA: string, charZ: string) => {
  var a = [],
    i = charA.charCodeAt(0),
    j = charZ.charCodeAt(0);
  for (; i <= j; ++i) {
    a.push(String.fromCharCode(i));
  }
  return a;
};

const LETTERS = [
  ...genCharArray('a', 'z'),
  ...genCharArray('a', 'z'),
  ...genCharArray('a', 'z'),
  ...Array.from('buchstabensuppe'),
];

const Intro: FC = () => {
  const letterRefs = useRef<(HTMLParagraphElement | null)[]>([]);
  const bowlRef = useRef<HTMLImageElement | null>(null);

  useLayoutEffect(() => {
    if (!bowlRef.current) return;

    const bowlRect = bowlRef.current.getBoundingClientRect();

    letterRefs.current.forEach((el, i) => {
      if (!el) return;

      const startX = Math.random() * window.innerWidth;
      const startY = -100 - Math.random() * 300;
      const gaussianRandom = 0.5 + 0.35 * (Math.random() + Math.random() - 1);
      const targetX = bowlRect.left + gaussianRandom * (bowlRect.width - 10);
      const targetY = bowlRect.top + bowlRect.height / 12;

      Draggable.create(el, {
        type: 'x,y', // Drag along x and y axis
        edgeResistance: 0.65,
        bounds: window, // limit dragging within window boundaries
        inertia: true, // smooth dragging with inertia
      });

      gsap.set(el, {
        x: startX,
        y: startY,
        rotation: Math.random() * 360,
      });

      gsap.to(el, {
        duration: 7 + Math.random(),
        x: targetX,
        y: targetY + (Math.random() * 15 - 5),
        rotation: 0,
        opacity: 1,
        ease: 'bounce.out',
        delay: i * 0.1,
        onComplete: () => {
          // "Schwimmen" nach dem Eintauchen
          gsap.to(el, {
            duration: 3 + Math.random(),
            x: `+=${Math.random() * 50 - 10}`,
            y: `+=${Math.random() * 50 - 10}`,
            rotation: `+=${Math.random() * 30 - 15}`,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
          });
        },
      });
    });
  }, []);

  return (
    <IntroContainer>
      <ContentWrapper id="intro">
        <SoupBowl
          src={Bowl.src}
          width={Bowl.width / 3}
          height={Bowl.height / 3}
          alt="Suppenschale"
          ref={bowlRef}
          priority
        />
        <LettersLayer>
          {LETTERS.map((char, i) => (
            <Letter key={i} ref={(el) => (letterRefs.current[i] = el)}>
              {char}
            </Letter>
          ))}
        </LettersLayer>
        <SoupBowlFront
          src={BowlFront.src}
          width={BowlFront.width / 3}
          height={BowlFront.height / 3}
          alt="Suppenschale-front"
        />
        <DragNote>
          <InfoIcon />
          <Typography fontSize="10px">Du kannst die Buchstaben bewegen</Typography>
        </DragNote>
        <DragNote></DragNote>
        <ScrollArrowContainer
          onClick={() => scroller.scrollTo('projects', { smooth: true, duration: 800 })}
          title="Scroll down button"
        >
          <IoIosArrowDown />
          <ScrollArrowFadeElement />
          <ScrollArrowFadeElement />
        </ScrollArrowContainer>
      </ContentWrapper>
    </IntroContainer>
  );
};

export default Intro;
