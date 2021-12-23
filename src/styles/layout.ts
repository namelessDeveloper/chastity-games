import { NavLink } from 'react-router-dom';
import styled, { css } from 'styled-components'

export const Hero = styled.img`
  max-width: 100vw;
`;

export const Main = styled.main`
  height: 100%;
  position: relative;
`;

export const Credit = styled.div`
  position: absolute;
  bottom: 0;
`


export const Speech = styled.div`
  margin: 1em 0;
  color: #e799ff;
`
type FlexProps = {
  center?: boolean;
  column?: boolean;
};

export const Flex = styled.div<FlexProps>`
  display: flex;
  ${({column}) => column && css`
    flex-direction: column;
  `}
  ${({center}) => center && css`
    justify-content: center;
    align-items: center;
  `}
`

export const StyledNavLink = styled(NavLink)`
  margin-bottom: .4em;
`