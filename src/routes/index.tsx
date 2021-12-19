import { configureStore } from '@reduxjs/toolkit';
import React from 'react'
import { useDispatch } from 'react-redux';
import { NavLink, Route } from 'react-router-dom';
import Navigation from '../components/Navigation';
import { Layout } from '../styles/layout';
import Settings from './Settings';
import TwoKeyholders from './TwoKeyholder';

import twoKeyholdersReducer from './TwoKeyholder/slice'

export const APP = {
  HOME: '/',
  GAMES: {
    TWO_KH: '/two-keyholders'
  },
  SETTINGS: '/settings'
}

const Routes = () => (
  <Layout>
    <Navigation/>
    <Route exact path="/">
      <NavLink to={APP.GAMES.TWO_KH}>
        Two Keyholders
      </NavLink>
    </Route>
    <Route path={APP.GAMES.TWO_KH} component={TwoKeyholders} />
    <Route path={APP.SETTINGS} component={Settings} />
  </Layout>
)

export default Routes;

export const store = configureStore({
  reducer: {
    twoKeyholders: twoKeyholdersReducer
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