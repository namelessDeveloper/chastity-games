
import React from 'react'
import { HashRouter } from 'react-router-dom'

import Routes from '../routes';
import GlobalStyles from './styles';

import {store} from 'routes'
import { Provider } from 'react-redux';

const App: React.FC<any> = () => (
  <Provider store={store}>
    <HashRouter>
      <GlobalStyles/>
      <Routes/>
    </HashRouter>
  </Provider>
);

export default App;
