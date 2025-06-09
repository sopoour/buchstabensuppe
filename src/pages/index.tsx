import Hero from '@app/components/sections/Hero';
import MaxWidthContainer from '@app/components/MaxWidthContainer';
import Typography from '@app/components/Typography/Typography';
import { NextPage } from 'next';
import styled from 'styled-components';
import Live from '@app/components/sections/Live';

const Root = styled.span`
  display: flex;
  flex-direction: column;
  gap: 40px;
  padding: 20px 0 32px 0;

  ${({ theme }) => theme.media('sm')`
    padding: 30px 0 48px 0;
  `}
`;

const TopWrapper = styled(MaxWidthContainer)`
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

const DetailContainer = styled.div`
  padding: 0 20px;
`;

const Home: NextPage = () => {
  return (
    <>
      <Hero />
      <Live />
    </>
  );
};

export default Home;
