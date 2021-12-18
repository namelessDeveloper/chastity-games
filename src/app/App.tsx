
import React from 'react'
import { BrowserRouter } from 'react-router-dom'

import Routes from '../routes';

const App: React.FC<any> = () => (
  <BrowserRouter>
    {Routes}
  </BrowserRouter>
);

export default App;
