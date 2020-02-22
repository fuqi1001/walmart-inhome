import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from '../pages/Home';
import Nav from '../components/nav/Nav';
import { GlobalStyles } from '../../global';
import { ThemeProvider } from 'styled-components';
import { theme } from '../../theme';
import User from '../pages/User/User';

function App() {
  return (
    <main>
      <ThemeProvider theme={theme}>
        <Fragment>
          <GlobalStyles />
          <Nav />  
        </Fragment>
        <Switch>
          <Route path="/user" component={User} />
          <Route path="/" component={Home} />
        </Switch>
      </ThemeProvider>
    </main>
  );
}

export default App;
