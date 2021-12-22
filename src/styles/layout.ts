import styled, { css } from 'styled-components'

export const Hero = styled.img`
  max-width: 100vw;
`;

export const Main = styled.main`

`;


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