import { karla, montserrat } from '@app/styles/fonts';
import styled from 'styled-components';

type TextAlign = 'center' | 'start' | 'end' | 'justify';

type FontWeight = 400 | 500 | 600 | 700 | 900;

type WhiteSpace = 'normal' | 'nowrap' | 'pre' | 'pre-wrap' | 'pre-line' | 'break-spaces';

export type Props = {
  className?: string;
  fontSize?: string;
  fontSizeSm?: string;
  type?: 'montserrat' | 'karla';
  lineHeight?: string;
  $textalign?: TextAlign;
  fontWeight?: FontWeight;
  color?: string;
  whiteSpace?: WhiteSpace;
  $isUpperCase?: boolean;
};

const Typography = styled.p<Props>`
  margin: 0;
  font-size: ${({ fontSize }) => fontSize || '16px'};
  font-family: ${({ type }) =>
    type === 'montserrat' ? montserrat.style.fontFamily : karla.style.fontFamily};
  line-height: ${({ lineHeight }) => lineHeight || '1.5'};
  text-align: ${({ $textalign }) => $textalign || 'start'};
  font-weight: ${({ fontWeight }) => fontWeight || 500};
  color: ${({ color, theme }) => color || theme.colors.fg.default};
  white-space: ${({ whiteSpace }) => whiteSpace || 'pre-wrap'};
  text-transform: ${({ $isUpperCase }) => ($isUpperCase ? 'uppercase' : 'none')};
`;

export default Typography;
