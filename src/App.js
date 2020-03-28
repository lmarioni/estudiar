import React, { useContext, Suspense } from 'react';
import { Router } from '@reach/router';

import './App.css';

import { GlobalStyle } from './styles/GlobalStyles';

import { Home } from './pages/Home';
import { Course } from './pages/Course';

import { NotFound } from './components/NotFound';
import { NavBar } from './components/NavBar';

import { Context } from './Context';

import { Panel } from './pages/Panel';
import { NewCourse } from './pages/NewCourse';


function App() {
  const { isAuth } = useContext(Context)

  return (
    <Suspense fallback={<div />}>
      <GlobalStyle />
      <NavBar />
      <Router>
        <NotFound default />
        <Home path='/' />
        <NewCourse path="/newCourse" />
        <Course path='/course/:id' />
        <Panel path='/panel/:id' />
      </Router>
    </Suspense>
  );
}

export default App;
