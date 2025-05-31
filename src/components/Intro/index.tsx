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
} from './styles';
import { IoIosArrowDown } from 'react-icons/io';
import { scroller } from 'react-scroll';
import Bowl from './assets/bowl.png';
import BowlFront from './assets/bowl-front.png';
import gsap from 'gsap';
import Draggable from 'gsap/dist/Draggable';
import Typography from '../Typography/Typography';

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

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      if (!bowlRef.current) return;

      const bowlRect = bowlRef.current.getBoundingClientRect();

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

      // FLY IN letters into bowl
      letterRefs.current.forEach((el, i) => {
        if (!el) return;

        const startX = Math.random() * window.innerWidth;
        const startY = -100 - Math.random() * 300;
        const gaussianRandom = 0.5 + 0.4 * (Math.random() + Math.random() - 1);
        const targetX = bowlRect.left + gaussianRandom * (bowlRect.width - 10);
        const targetY = bowlRect.top + bowlRect.height / 11;

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
          y: targetY + (Math.random() * 35 - 15),
          rotation: 0,
          opacity: 1,
          ease: 'bounce.out',
          delay: i * 0.1,
          onComplete: () => {
            // "Schwimmen" nach dem Eintauchen
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

        // Fly out if part of buchstabensuppe
        /* LETTERS.forEach((char, i) => {
          if (!BUCHSTABENSUPPE.includes(char)) return;

          const targetIndex = BUCHSTABENSUPPE.indexOf(char);
          const navTarget = document?.getElementById('navigation-header');
          const elb = letterRefs.current[i];

          if (!elb || !navTarget) return;

          const targetRect = navTarget.getBoundingClientRect();
          const elRect = elb.getBoundingClientRect();

          const dx = targetRect.left - elRect.left;
          const dy = targetRect.top - elRect.top;

          let bs = gsap.timeline({
            scrollTrigger: {
              trigger: '#intro',
              start: 0,
              end: () => window.innerHeight * 1.2,
              scrub: 0.6,
            },
          });

          bs.fromTo(
            elb,
            {
              x: targetX,
              y: targetY + (Math.random() * 35 - 15),
              scale: 0.8,
              ease: 'power2.out',
              zIndex: 3,
            },
            {
              x: `+=${dx}`,
              y: `+=${dy}`,
              scale: 0.8,
              ease: 'power2.out',
              zIndex: 3,
            },
          );
        }); */
      });
    });

    return () => ctx.revert();
  }, []);

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
        id="soup-bowl-front"
      />
      <DragNote>
        <InfoIcon />
        <Typography fontSize="10px">Erstelle dein eigenes Wort via Drag & Drop</Typography>
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
    </IntroContainer>
  );
};

export default Intro;
