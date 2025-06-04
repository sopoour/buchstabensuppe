import { flexRow } from '@app/styles/mixins';
import { FC, useMemo } from 'react';
import { css, styled } from 'styled-components';
import Link from 'next/link';
import { IconLink } from '@app/types';
import { FaEnvelope, FaInstagram, FaLink, FaMusic, FaSpotify, FaYoutube } from 'react-icons/fa';

type Size = 'small' | 'medium' | 'big';

export const linksDefault: IconLink[] = [
  { type: 'instagram' },
  { type: 'spotify' },
  { type: 'youtube' },
  { type: 'email' },
];

const getSize = (size: Size) => {
  switch (size) {
    case 'small':
      return '16px';
    case 'medium':
      return '20px';
    case 'big':
      return '35px';
    default:
      return '20px';
  }
};

const Container = styled.span<{ hoverColour?: string; size: Size }>`
  ${flexRow};
  gap: 16px;
  justify-content: center;
  svg {
    width: ${({ size }) => getSize(size)};
    height: ${({ size }) => getSize(size)};
    transition: all 0.3s ease-in-out;
    path {
      fill: ${({ theme }) => theme.colors.bg.soft};
    }
    &:hover {
      cursor: pointer;
      transform: scale(1.1);
      path {
        fill: ${({ hoverColour, theme }) => hoverColour ?? theme.colors.accent.green};
      }
    }

    ${({ size }) =>
      size === 'small' &&
      css`
        margin-bottom: 3px;

        &:hover {
          path {
            fill: ${({ theme }) => theme.colors.fg.default};
            opacity: 1;
          }
        }
      `}
  }
`;

type Props = {
  iconLinks?: IconLink[];
  hoverColour?: string;
  size?: Size;
  ariaLabel?: string;
  className?: string;
};

const LinkContainer: FC<Props> = ({
  iconLinks = linksDefault,
  className,
  hoverColour,
  ariaLabel,
  size = 'medium',
}) => {
  const links = useMemo(
    () =>
      iconLinks.map((icon) => {
        switch (icon.type) {
          case 'spotify':
            return {
              id: 'spotify',
              icon: <FaSpotify />,
              link:
                icon.link ||
                'https://open.spotify.com/artist/6ZEMlHydJRHREpHwmNza4T?si=L5NhpgmwSmO2AmJAjRnxWw',
            };
          case 'email':
            return {
              id: 'email',
              icon: <FaEnvelope />,
              link: icon.link || 'mailto:contact@g-emma.com',
            };
          case 'instagram':
            return {
              id: 'instagram',
              icon: <FaInstagram />,
              link: 'https://www.instagram.com/gemma.msc/',
            };
          case 'appleMusic':
            return {
              id: 'appleMusic',
              icon: <FaMusic />,
              link: icon.link || 'https://music.apple.com/dk/artist/gemma/1469747172',
            };
          case 'youtube':
            return {
              id: 'youtube',
              icon: <FaYoutube />,
              link: 'https://www.youtube.com/@gemma.msc.',
            };
          case 'link':
            return { id: icon.id ?? 'external link', icon: <FaLink />, link: icon.link };
          default:
            return { id: 'email', icon: <FaEnvelope />, link: 'mailto:contact@g-emma.com' };
        }
      }),
    [iconLinks],
  );

  return (
    <Container
      aria-label={ariaLabel ?? 'Social Media links'}
      className={className}
      hoverColour={hoverColour}
      size={size ?? 'big'}
    >
      {links?.map(
        (item) =>
          item.link && (
            <Link href={item.link} key={item.id} target="_blank" aria-label={item.id}>
              {item.icon}
            </Link>
          ),
      )}
    </Container>
  );
};

export default LinkContainer;
