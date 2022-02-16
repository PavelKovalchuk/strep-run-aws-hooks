import React, {useState, useEffect} from "react";

import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';

import { CheckValue, SecretCookieLabel, SecretCookieValue } from "./constants/secrets";
import { setCookie, getCookie, eraseCookie } from "./helpers";
import './Checker.css';

function Checker({setIsLoadDashboard}) {
  const [valueToCheck, setValueToCheck] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const secret = getCookie(SecretCookieLabel);
    if(secret !== SecretCookieValue) {
      eraseCookie(SecretCookieLabel);
      return;
    }

    setIsLoadDashboard(true);
  }, [setIsLoadDashboard]);

  const handleChange = (event) => {
    setValueToCheck(event.target.value);

    if(isSubmitted) {
      setIsSubmitted(false);
    }
  };

  const handleCloseAlert = () => {
    setValueToCheck("");
    setIsValid(false);
  };

  const handleCheck = () => {
    setIsSubmitted(true);

    if(valueToCheck !== CheckValue) {
      setIsValid(false);
      return;
    }

    setIsValid(true);
    setIsLoadDashboard(true);
    setCookie(SecretCookieLabel, SecretCookieValue, 7);
  };


  const handleSubmit = (event) => {
    event.preventDefault();
    handleCheck();
  };

  return (
    <Box sx={{ minWidth: 300 }} className="Checker">

      {valueToCheck && isSubmitted && !isValid
        ? <Alert onClose={handleCloseAlert} severity="error">No valid</Alert> 
        : null
      }

      <Grid container>
        <form onSubmit={handleSubmit}>
          <FormControl fullWidth >
            <Grid item xs={12}>
              <Typography variant="h3" component="h3">Checker</Typography>
              
                <TextField 
                  label="Secret"
                  variant="outlined"
                  value={valueToCheck}
                  onChange={handleChange}
                />
                <Button 
                  variant="outlined" 
                  color="secondary" 
                  disabled={!valueToCheck} 
                  onClick={handleCheck}
                  size="large"
                >
                  Check
                </Button>

            </Grid>
          </FormControl>
        </form>
    </Grid>

  </Box>
  );
}

export default Checker;
