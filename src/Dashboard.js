import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import BuilderDashboard from "./BuilderDashboard";
import { DevelopVariants } from "./constants/develop";
import { MasterVariants } from "./constants/master";
import { LiveCopiesVariants } from "./constants/liveCopies";
import { ProdVariants } from "./constants/prod";
import { compareTitles } from './helpers';
import './App.css';

DevelopVariants.sort( compareTitles );
MasterVariants.sort( compareTitles );
LiveCopiesVariants.sort( compareTitles );
ProdVariants.sort( compareTitles );

function Dashboard() {
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Typography variant="h3" component="h3">Develop</Typography>
          <BuilderDashboard id="Develop" variants={DevelopVariants} />
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h3" component="h3">Master</Typography>
          <BuilderDashboard id="Master" variants={MasterVariants} />
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Typography variant="h3" component="h3">Live Copies</Typography>
          <BuilderDashboard id="LiveCopies" variants={LiveCopiesVariants} />
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h3" component="h3">Prod</Typography>
          <BuilderDashboard id="Prod" variants={ProdVariants} />
        </Grid>
      </Grid>    
    </>
  );
}

export default Dashboard;
