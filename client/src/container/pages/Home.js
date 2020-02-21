import React, { Fragment } from 'react';
import { ThemeProvider } from 'styled-components';
import { GlobalStyles } from '../../global';
import { theme } from '../../theme';
import './Home.css';
function Home() {
  return (
    <ThemeProvider theme={theme}>
      <Fragment>
        <GlobalStyles />
        <div className="home">
          Test
        </div>
      </Fragment>
    </ThemeProvider>
  );
}

export default Home;
