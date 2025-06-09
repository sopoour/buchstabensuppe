import { fastTransition, flexColumn, flexRow } from '@app/styles/mixins';
import { FC } from 'react';
import { Link } from 'react-scroll';
import { styled } from 'styled-components';

const items = ['Live', 'Über uns', 'Hörproben', 'Kontakt'];

const NavigationWrapper = styled.nav`
  ${flexColumn};
  gap: 28px;

  ${({ theme }) => theme.media('sm')`
    ${flexRow}
     gap: 12px;
  `}
`;

const NavigationItem = styled(Link)`
  font-size: 16px;
  ${fastTransition}
  font-weight: 600;
  color: ${({ theme }) => theme.colors.fg.contrast};

  &:not(.active) {
    cursor: pointer;
  }

  &:hover,
  &.active {
    color: ${({ theme }) => theme.colors.accent.yellow};
    transform: scale(1.1);
  }

  ${({ theme }) => theme.media('sm')`
    font-size: 14px;
    
  `}

  ${({ theme }) => theme.media('md')`
    font-size: 16px;
    
  `}
`;

type Props = {
  className?: string;
};

const Navigation: FC<Props> = ({ className }) => {
  return (
    <NavigationWrapper className={className}>
      {items.map((item, index) => {
        const navItemName = item.toLowerCase().replace(/\s+/g, '-');
        return (
          <NavigationItem
            key={item + index}
            activeClass="active"
            to={navItemName}
            spy
            smooth
            duration={700}
            href={`#${navItemName}`}
          >
            {item}
          </NavigationItem>
        );
      })}
    </NavigationWrapper>
  );
};

export default Navigation;
