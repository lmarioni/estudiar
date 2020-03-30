import React, { useContext, Suspense } from 'react';
import { Router, Redirect } from '@reach/router';

import './App.css';

import { GlobalStyle } from './styles/GlobalStyles';

import { Home } from './pages/Home';
import { Course } from './pages/Course';
import { Invite } from './pages/Invite';

import { NotFound } from './components/NotFound';
import { NavBar } from './components/NavBar';

import { Context } from './Context';

import { Panel } from './pages/Panel';
import { NewCourse } from './pages/NewCourse';
import { NotRegister } from './pages/NotRegister';


function App() {
  const { isAuth } = useContext(Context)
  console.log('auth', isAuth);

  if(!isAuth){
    return(
        <Suspense fallback={<div />}>
            <GlobalStyle />
            <NavBar />
            <Router>
              <NotRegister default path="/not-register" />
            </Router>
          </Suspense>
    );
  }else{
    return (
      <Suspense fallback={<div />}>
        <GlobalStyle />
        <NavBar />
        <Router>
          <NotFound default />
          <NotRegister path="/not-register" />
          {/* {!isAuth && <Redirect noThrow from='/' to='/not-register' /> }
          {!isAuth && <Redirect noThrow from='/course/:id' to='/not-register' /> } */}
          <Invite path='/invite/:code' />
          <Home path='/' />
          <NewCourse path="/newCourse" />
          <Course path='/course/:id' />
          <Panel path='/panel/:id' />
        </Router>
      </Suspense>
    );
  }
}

export default App;
