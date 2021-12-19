import React from 'react'
import styled from 'styled-components';

const Container = styled.span`
  color: red;
`

function formatCountdown(seconds: number) {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor(seconds / 60) - (h * 60);
  const s = Math.floor(seconds - h * 3600 - m * 60);

  return h.toString().padStart(2, '0') +":"+ m.toString().padStart(2, '0') +":"+ s.toString().padStart(2, '0');
}

const Countdown: React.FC<{ timeLeft: number }> = ({
  timeLeft
}) => {
  if (timeLeft > 0) {
    return  (
      <Container>
        {formatCountdown(timeLeft)}
      </Container>
    );
  }

  return null;
}

export default Countdown;