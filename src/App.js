import React, { useContext, Suspense } from 'react';
import { Router, Redirect } from '@reach/router';
import "bootswatch/dist/cosmo/bootstrap.min.css"; 
import { GlobalStyle } from './styles/GlobalStyles';

import  Home  from './pages/Home';
import { Invite }  from './pages/Invite';
import { Panel } from './pages/Panel';
import { Ingreso } from './pages/Ingreso';
import { NewCourse } from './pages/NewCourse';
import { NotRegister } from './pages/NotRegister';
import { Logout } from './pages/Logout';

import { NotFound } from './components/NotFound';
import { NavBar } from './components/NavBar';

import { Context } from './Context';

const Course = React.lazy(() => import('./pages/Course.js'));

function App() {
  const { isAuth } = useContext(Context)

  return (
      <Suspense fallback={<div />}>
        <GlobalStyle />
        <NavBar />
        <Router>
          <NotFound default />
          <NotRegister path="/not-register" />
          <Ingreso path="/auth" /> 
          { !isAuth && <Invite path='/i/:code' /> }
          { !isAuth && <Redirect noThrow from='/' to='/not-register' /> }
          { !isAuth && <Redirect noThrow from='/course/:id' to='/not-register/:id' /> }
          { !isAuth && <Redirect noThrow from='/panel/:id' to='/not-register/:id' /> }
          { !isAuth && <Redirect noThrow from='/newCourse' to='/not-register' /> }
          { !isAuth && <NotRegister default path="/not-register" /> }
          <Invite path='/i/:code' />
          <Logout path='/logout' />
          <Home path='/' />
          <NewCourse path="/newCourse" />
          <Course path='/course/:id' />
          <Panel path='/panel/:id' />
        </Router>
      </Suspense>
    );
  
}

export default App;
