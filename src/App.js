import React, { lazy, Suspense, useState } from 'react';

import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import Checker from "./Checker";
import './App.css';

const theme = createTheme();

export const DashboardLoadable = lazy(() => import('./Dashboard'));
const renderLoader = () => "LOADING";

function App() {
  const [isLoadDashboard, setIsLoadDashboard] = useState(false);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container fixed >
        <main>
          {!isLoadDashboard ? <Checker setIsLoadDashboard={setIsLoadDashboard} /> : null}
          {isLoadDashboard ? (
            <Suspense fallback={renderLoader()}>
              <DashboardLoadable />
            </Suspense>
          ) : null}
        </main>
      </Container>
    </ThemeProvider>
  );
}

export default App;
