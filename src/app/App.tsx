
import React from 'react'
import { BrowserRouter } from 'react-router-dom'

import Routes from '../routes';
import GlobalStyles from './styles';

import {store} from 'routes'
import { Provider } from 'react-redux';

const App: React.FC<any> = () => (
  <Provider store={store}>
    <BrowserRouter>
      <GlobalStyles/>
      <Routes/>
    </BrowserRouter>
  </Provider>
);

export default App;
