import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  height: 2em;
  width: 100%;
  background: blueviolet;
  h2 {
    color: white;
  }
  margin-bottom: .4em;
`

const Status: React.FC = ({children}) => {
  return (
    <Container>
      <h2>{children}</h2>
    </Container>
  )
}

export default Status;