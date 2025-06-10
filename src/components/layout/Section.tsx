import { flexColumn } from '@app/styles/mixins';
import theme from '@app/styles/theme';
import { FC, HTMLAttributes, ReactElement } from 'react';
import styled from 'styled-components';

const maxContainerPadding = { mobile: 20, desktop: 24 };

const SectionContainer = styled.section<{ $bgColor?: string }>`
  background-color: ${({ $bgColor }) => $bgColor || theme.colors.bg.default};
`;

const MaxWidthContainer = styled.div<{ $maxWidth?: number }>`
  width: 100%;
  height: unset;
  margin: 0 auto;
  position: relative;
  ${flexColumn};
  gap: 40px;
  width: 100%;
  height: unset;
  padding: 32px ${maxContainerPadding.mobile}px;
  margin: 0 auto;
  max-width: ${({ $maxWidth }) => $maxWidth || 1000}px;

  ${(props) => props.theme.media('sm')`
    padding: 40px ${maxContainerPadding.desktop}px;
    justify-content: center;
    height: 100vh;
  `}
`;

type Props = {
  $maxWidth?: number;
  $bgColor?: string;
  children: ReactElement;
  className?: string;
  id: string;
} & HTMLAttributes<unknown>;

const Section: FC<Props> = ({ children, className, $maxWidth, id, $bgColor, ...props }) => {
  return (
    <SectionContainer $bgColor={$bgColor} className={className} {...props} aria-label={id} id={id}>
      <MaxWidthContainer $maxWidth={$maxWidth}> {children}</MaxWidthContainer>
    </SectionContainer>
  );
};

export default Section;
