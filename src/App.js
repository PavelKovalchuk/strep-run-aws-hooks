import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

import BuilderDashboard from "./BuilderDashboard";
import { DevelopVariants } from "./constants/develop";
import { MasterVariants } from "./constants/master";
import { LiveCopiesVariants } from "./constants/liveCopies";
import { ProdVariants } from "./constants/prod";
import { compareTitles } from './helpers';
import './App.css';

const theme = createTheme();

DevelopVariants.sort( compareTitles );
MasterVariants.sort( compareTitles );
LiveCopiesVariants.sort( compareTitles );
ProdVariants.sort( compareTitles );

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
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Typography variant="h3" component="h3">Live Copies AWS</Typography>
              <BuilderDashboard id="LiveCopies" variants={LiveCopiesVariants} />
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h3" component="h3">Prod AWS</Typography>
              <BuilderDashboard id="Prod" variants={ProdVariants} />
            </Grid>
          </Grid>
        </main>
      </Container>
    </ThemeProvider>
  );
}

export default App;
