import { RefObject, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import Draggable from 'gsap/dist/Draggable';
import { Breakpoints } from '@app/styles/media';
import { useMedia } from '@app/hooks/useMedia';
import { HEADER_HEIGHT } from '@app/components/layout/Header';
import SplitType from 'split-type';

gsap.registerPlugin(Draggable, ScrollTrigger);

const useHeroAnimation = (
  bowlRef: RefObject<HTMLImageElement | null>,
  letterRefs: RefObject<(HTMLParagraphElement | null)[]>,
  bsRef: RefObject<HTMLParagraphElement | null>,
) => {
  const isDesktop = useMedia(Breakpoints.md);
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
        const centerX = bowlRect.left + bowlRect.width / 2; // not necessary since align center
        const centerY = bowlRect.top - HEADER_HEIGHT + bowlRect.height / 2;

        // Translate to absolute position
        const scrollTop = window.scrollY;
        const scrollLeft = window.scrollX; // not necessary since align center

        // set initial place in the center of bowl
        gsap.set(bsRef.current, {
          opacity: 1,
          y: centerY - bsRef.current.offsetHeight / 2 + scrollTop,
        });
        gsap.set(chars, {
          opacity: 0,
        });

        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: '#intro',
            start: 0,
            end: () => window.innerHeight * 0.35,
            scrub: 0.6,
          },
        });

        timeline
          .to(chars, {
            opacity: 1,
            duration: 0.1,
          })
          // move stacked letters out of bowl
          .to(chars, {
            y: isDesktop ? -250 : -200,
            stagger: 0.04,
            ease: 'back.out(1.7)',
            duration: 1,
          })
          // move whole logo into sticky position on top
          .to(
            bsRef.current,
            {
              duration: 1.2,
              y: isDesktop ? 250 : 210,
              xPercent: isDesktop ? 0 : '-50',
              ease: 'power2.out',
              zIndex: 5,
              fontSize: isDesktop ? '2rem' : '1.2rem',
            },
            isDesktop ? '-=0.8' : '-=0.6',
          )
          // show slowly the header
          .to(
            '#header',
            {
              opacity: 1,
              duration: 0.5,
              ease: 'power2.out',
            },
            isDesktop ? '-=0.3' : '-=0.1',
          );
      }
    });

    return () => ctx.revert();
  }, [isDesktop]);
};

export default useHeroAnimation;
