import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from '../pages/Home';
import Nav from '../components/nav/Nav';
import { ThemeProvider } from 'styled-components';
import { theme } from '../../theme';
import User from '../pages/User/User';
import Order from '../pages/Order/Order';
import Item from '../pages/Item/Item';

import './App.css';

function App() {
  return (
    <main>
      <ThemeProvider theme={theme}>
        <Fragment>
          <Nav />  
        </Fragment>
        <Switch>
          <Route path="/user" component={User} />
          <Route path="/order" component={Order} />
          <Route path="/Item" component={Item} />
          <Route path="/" component={Home} />
        </Switch>
      </ThemeProvider>
    </main>
  );
}

export default App;
