import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import Dashboard from "./Dashboard";
import './App.css';

const theme = createTheme();

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container fixed >
        <main>
          <Dashboard />
        </main>
      </Container>
    </ThemeProvider>
  );
}

export default App;
