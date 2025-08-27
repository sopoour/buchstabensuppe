import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import rehypeRaw from 'rehype-raw';
import styles from './MarkdownConfig.module.scss';
import { FC } from 'react';
import styled from 'styled-components';

const MarkdownSettings = styled.div`
  color: ${({ theme }) => theme.colors.fg.default};

  li {
    line-height: 2;
  }

  img {
    width: 100%;
  }

  a {
    color: ${({ theme }) => theme.colors.accent.red};
    text-decoration: none;

    &:hover {
      text-decoration: underline !important;
    }
  }

  h1 {
    font-size: 36px;
    font-family: 'montserrat';
  }
  ${({ theme }) => theme.media('sm')`
      h1 {
        font-size: 28px;
      }
    `}

  h2 {
    font-family: 'montserrat';
    font-size: 1.17em;
  }
`;

type Props = {
  content: string;
  className?: string;
};

const MarkdownConfig: FC<Props> = ({ content, className }) => {
  return (
    <MarkdownSettings className={className}>
      <Markdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeSlug, rehypeRaw]}
        skipHtml={false}
      >
        {content}
      </Markdown>
    </MarkdownSettings>
  );
};

export default MarkdownConfig;
