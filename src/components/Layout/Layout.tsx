import { NAVIGATION_HEIGHT } from 'components/Navigation/styles';
import React from 'react'
import styled from 'styled-components';

const Container = styled.div`
  height: 100vh;
`;

const Content = styled.div`
  height: calc(100% - ${NAVIGATION_HEIGHT}px);
`

type LayoutProps = {
  Navigation: React.FC
}

const Layout: React.FC<LayoutProps> = ({
  children, Navigation
}) => (
  <Container>
    <Navigation/>
    <Content>
      {children}
    </Content>
  </Container>
);

export default Layout;