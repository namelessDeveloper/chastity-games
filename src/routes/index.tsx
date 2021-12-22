import { configureStore } from '@reduxjs/toolkit';
import React from 'react'
import { useDispatch } from 'react-redux';
import { NavLink, Route } from 'react-router-dom';
import Navigation from '../components/Navigation';
import { Flex } from '../styles/layout';
import Settings from './Settings';

import TwoKeyholders from './TwoKeyholder';
import TheDitz from './TheDitz';

import twoKeyholdersReducer from './TwoKeyholder/slice'
import ditzReducer from './TheDitz/slice'
import Layout from 'components/Layout';
import styled from 'styled-components';


export const APP = {
  HOME: '/',
  GAMES: {
    TWO_KH: '/two-keyholders',
    THE_DITZ: '/the-ditz',
  },
  SETTINGS: '/settings'
}

const StyledNavLink = styled(NavLink)`
  margin-bottom: .4em;
`

const Routes = () => (
  <Layout Navigation={Navigation}>
    <Route exact path="/">
      <Flex center column style={{height: '100%' }}>
        <StyledNavLink to={APP.GAMES.TWO_KH}>Two Keyholders</StyledNavLink>
        <StyledNavLink to={APP.GAMES.THE_DITZ}>The Ditz</StyledNavLink>
      </Flex>
    </Route>
    <Route path={APP.GAMES.TWO_KH} component={TwoKeyholders} />
    <Route path={APP.GAMES.THE_DITZ} component={TheDitz} />
    <Route path={APP.SETTINGS} component={Settings} />
  </Layout>
)

export default Routes;

export const store = configureStore({
  reducer: {
    twoKeyholders: twoKeyholdersReducer,
    ditz: ditzReducer,
  },
  //@ts-ignore
  preloadedState: JSON.parse(window.localStorage.getItem('reduxState') || null) || undefined
})

store.subscribe(()=>{
  localStorage.setItem('reduxState', JSON.stringify(store.getState()))
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();