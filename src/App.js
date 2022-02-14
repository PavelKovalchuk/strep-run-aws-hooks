import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

import BuilderDashboard from "./BuilderDashboard";
import { DevelopVariants } from "./constants/develop";
import { MasterVariants } from "./constants/master";
import './App.css';

const theme = createTheme();

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container fixed >
        <main>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Typography variant="h3" component="h3">Develop AWS</Typography>
              <BuilderDashboard id="Develop" variants={DevelopVariants} />
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h3" component="h3">Master AWS</Typography>
              <BuilderDashboard id="Master" variants={MasterVariants} />
            </Grid>
          </Grid>
        </main>
      </Container>
    </ThemeProvider>
  );
}

export default App;
