import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

import BuilderDashboard from "./BuilderDashboard"
import './App.css';

const theme = createTheme();

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container fixed >
        <main>
        <Typography variant="h1" component="h2">Build AWS</Typography>
          <Grid container>
            <BuilderDashboard />
          </Grid>
        </main>
      </Container>
    </ThemeProvider>
  );
}

export default App;
