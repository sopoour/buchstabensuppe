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
import Typography from '../Typography/Typography';
import { useMedia } from '@app/hooks/useMedia';
import { Breakpoints } from '@app/styles/media';
import { HEADER_HEIGHT } from '../layout/Header';

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

const BUCHSTABENSUPPE = 'buchstabensuppe';

const LETTERS = [
  ...genCharArray('a', 'z'),
  ...genCharArray('a', 'z'),
  ...genCharArray('a', 'z'),
  ...Array.from(BUCHSTABENSUPPE),
];

const Intro: FC = () => {
  const letterRefs = useRef<(HTMLParagraphElement | null)[]>([]);
  const bowlRef = useRef<HTMLImageElement | null>(null);
  const bsRef = useRef<HTMLParagraphElement | null>(null);
  const isDesktop = useMedia(Breakpoints.xs);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      if (!bowlRef.current) return;

      const bowlRect = bowlRef.current.getBoundingClientRect();

      // Appearance of main bowl
      gsap.fromTo(
        '#soup-bowl',
        {
          opacity: 0,
          scale: 0.2,
        },
        {
          scale: 1,
          opacity: 1,
          duration: 2,
          ease: 'power3.out',
        },
      );

      // Hidden appearance of front side of bowl
      gsap.fromTo(
        '#soup-bowl-front',
        {
          opacity: 0,
        },
        {
          opacity: 1,
          delay: 2,
          ease: 'power3.out',
        },
      );

      // FLY IN animation of letters into bowl
      letterRefs.current.forEach((el, i) => {
        if (!el) return;

        const startX = Math.random() * window.innerWidth;
        const startY = -100 - Math.random() * 300;
        const gaussianRandom = 0.5 + 0.4 * (Math.random() + Math.random() - 1);
        const targetX = bowlRect.left + gaussianRandom * (bowlRect.width - 10);
        const targetY = bowlRect.top - HEADER_HEIGHT + bowlRect.height / 11;

        // Make letters draggable out of bowl
        Draggable.create(el, {
          type: 'x,y', // Drag along x and y axis
          edgeResistance: 0.65,
          bounds: window, // limit dragging within window boundaries
          inertia: true, // smooth dragging with inertia
        });

        // Random start point for each letter
        gsap.set(el, {
          x: startX,
          y: startY,
          rotation: Math.random() * 360,
        });

        // Calculated end point based on a bit of randomness but in bound of bowl
        gsap.to(el, {
          duration: 7 + Math.random(),
          x: targetX,
          y: targetY + (Math.random() * 35 - 15),
          rotation: 0,
          opacity: 1,
          ease: 'bounce.out',
          delay: i * 0.1,
          onComplete: () => {
            // "Swim" animation after the letters are in the bowl
            gsap.to(el, {
              duration: 3 + Math.random(),
              x: `+=${Math.random() * 50 - 10}`,
              y: `+=${Math.random() * 70 - 30}`,
              rotation: `+=${Math.random() * 30 - 15}`,
              repeat: -1,
              yoyo: true,
              ease: 'sine.inOut',
            });
          },
        });
      });

      // FLY OUT animation for hidden "buchstabensuppe"
      if (bsRef.current) {
        const split = new SplitType(bsRef.current, { types: 'chars' });
        const chars = split.chars;

        // place word in the center of bowl behind hidden front
        const centerX = bowlRect.left + bowlRect.width / 2;
        const centerY = bowlRect.top - HEADER_HEIGHT + bowlRect.height / 2;

        // Translate to absolute position
        const scrollTop = window.scrollY;
        const scrollLeft = window.scrollX;

        gsap.set(bsRef.current, {
          opacity: 1,
          x: centerX - bsRef.current.offsetWidth / 2 + scrollLeft,
          y: centerY - bsRef.current.offsetHeight / 2 + scrollTop,
        });
        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: '#intro',
            start: 0,
            end: () => window.innerHeight * 0.35,
            scrub: 0.6,
          },
        });

        gsap.set(chars, {
          opacity: 0,
        });

        timeline
          .to(chars, {
            opacity: 1,
            duration: 0.1,
          })
          .to(chars, {
            y: isDesktop ? -250 : -200,
            stagger: 0.04,
            ease: 'back.out(1.7)',
            duration: 1,
          })

          .to(chars, {
            opacity: 0,
            duration: isDesktop ? 1.2 : 1.5,
            ease: 'power2.out',
            fontSize: isDesktop ? '2.3rem' : '1.2rem',
          })
          .to(
            '#header',
            {
              opacity: 1,
              duration: 0.5,
              ease: 'power2.out',
            },
            isDesktop ? '-=1' : '-=0.8',
          );
      }
    });

    return () => ctx.revert();
  }, [isDesktop]);

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

      <LettersLayer>
        <BSLetter ref={bsRef}>buchstabensuppe</BSLetter>
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
        <Typography fontSize="10px">Erstelle dein eigenes Wort via Drag & Drop</Typography>
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

export default Intro;
