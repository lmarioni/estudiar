import React, { useContext, Suspense } from 'react';
import { Router } from '@reach/router'

import './App.css';

import { GlobalStyle } from './styles/GlobalStyles'

import { Home } from './pages/Home'
import { OtherPage } from './pages/OtherPage'

import { NotFound } from './components/NotFound'

import {Context}  from './Context'


function App() {
const {isAuth} = useContext(Context)

  return (
    <Suspense fallback={<div />}>
      <GlobalStyle />
      {/* <NavBar /> */}
    <Router>
          <NotFound default />
          <Home path='/' />
          <OtherPage path='/other' />
    </Router>
  </Suspense>
  );
}

export default App;
