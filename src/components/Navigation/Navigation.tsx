import React from 'react'
import { NavLink } from 'react-router-dom';
import { APP } from '../../routes';
import { Container } from './styles';

const Navigation = () => {
  return (
    <Container>
      <NavLink to={APP.HOME}>
        Home
      </NavLink>
      <NavLink to={APP.SETTINGS}>
        Settings
      </NavLink>
    </Container>
  )
}

export default Navigation;