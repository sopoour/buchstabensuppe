import React, { FC, ReactNode } from 'react';

import { styled } from 'styled-components';
import Header from './Header';
import Footer from './Footer';
import Sidebar from '../Sidebar';
import Navigation from './Navigation';
import { LogoLetter } from './Header/style';
import LinkContainer from '../LinkContainer';

const Root = styled.div`
  display: flex;
  flex-direction: column;
`;

const MainLayout = styled.main`
  flex: 1;
  width: 100%;
  margin: 0 auto;
  min-height: 100vh;
`;

const NavigationMobile = styled(Navigation)`
  && {
    padding: 32px 0;
  }
`;

const LinkContainerMobile = styled(LinkContainer)`
  && {
    padding: 32px 0;
  }
`;

type Props = {
  children: ReactNode;
};

const Layout: FC<Props> = ({ children }) => (
  <>
    <Root>
      <Sidebar>
        <LogoLetter>buchstabensuppe</LogoLetter>
        <NavigationMobile />
        <LinkContainerMobile />
      </Sidebar>

      <MainLayout>
        <Header />
        {children}
      </MainLayout>
      <Footer />
    </Root>
  </>
);

export default Layout;
