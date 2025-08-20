import { FC, useRef } from 'react';
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
import Typography from '@app/components/Typography/Typography';
import theme from '@app/styles/theme';
import useHeroAnimation from './hooks/useHeroAnimation';

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
        <Typography fontSize="12px" color={theme.colors.fg.default}>
          Erstelle dein eigenes Wort via Drag & Drop
        </Typography>
      </DragNote>
      <DragNote></DragNote>
      <ScrollArrowContainer
        onClick={() => scroller.scrollTo('about', { smooth: true, duration: 3000, offset: -50 })}
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
