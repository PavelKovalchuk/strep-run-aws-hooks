import React, {useState, useEffect} from "react";

import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import Grid from '@mui/material/Grid';

import Flags from 'country-flag-icons/react/3x2';

import './BuilderDashboard.css';
import { convertDate, getDataByLocale } from "./helpers"


function BuilderDashboard({variants, id}) {
  const [locale, setLocale] = useState('');
  const [message, setMessage] = useState({text: "", type: ""});
  const [lastModified, setLastModified] = useState('');
  const [currentWebLink, setCurrentWebLink] = useState('');

  useEffect(() => {
    if(!locale) {
      return;
    }
    const data = getDataByLocale(variants, locale);
    if(data?.webLink) {
      setCurrentWebLink(data.webLink);
      setMessage({text: "", type: ""});
    } else {
      setMessage({text: `No webLink for a ${locale} was found`, type: "error"});
    }
  }, [locale, variants]);

  const handleLocaleChange = (event) => {
    setLocale(event.target.value);
  };

  const handleCloseAlert = () => {
    setLocale("");
    setMessage({text: "", type: ""});
    setLastModified("");
  };

  const handleBuild = async () => {
    const data = getDataByLocale(variants, locale);

    if(!data) {
      setMessage({text: "No such locale was found", type: "error"});
      return;
    }

    if(!data.hook) {
      setMessage({text: "No such hook found", type: "error"});
      return;
    }

    const cleanHook = data.hook.replace('"', '').replace('\\', '');

    try {
      await fetch(cleanHook, {
        method: 'POST',
        mode: 'no-cors',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      setMessage({text: `${locale}: Success`, type: "success"});
      setLocale("");

    } catch (error) {
      setMessage({text: "Error: " + error, type: "error"});
    }
  };

  const handleLastTimeBuild = async () => {
    const data = variants.find((item) => {
      return item.value === locale;
    });

    if(!data) {
      setMessage({text: "No such locale was found", type: "error"});
      return;
    }

    if(!data.webLink) {
      setMessage({text: "No such webLink found", type: "error"});
      return;
    }

    try {
      const result = await fetch(data.webLink, {
        method: 'GET',
        headers: {
          'Content-Type': 'text/plain'
        }
      });

      if(!result.ok) {
        setMessage({text: "Request failed", type: "error"});
        return;
      }

      const lastModifiedResponse = result.headers.get('last-modified');
      const lastModifiedDisplay = convertDate(lastModifiedResponse);
      if(lastModifiedDisplay) {
        setLastModified(`${locale}: ${lastModifiedDisplay}`);
      }
      
      setMessage({text: `${locale}: Success`, type: "success"});
      setLocale("");

    } catch (error) {
      setMessage({text: "Error: " + error, type: "error"});
    }
  };

  return (
    <Box sx={{ minWidth: 300 }} className="builderDashboard">

      {message.text 
        ? <Alert onClose={handleCloseAlert} severity={message.type}>{message.text}</Alert> 
        : null
      }

      {lastModified 
        ? <Alert onClose={handleCloseAlert} severity="info">{lastModified}</Alert> 
        : null
      }

      {currentWebLink && locale ? 
        <div className="web-link">
          <Button 
            variant="outlined" 
            size="large"
            href={currentWebLink}
            target="_blank"
          >
            Link to {locale}
          </Button>
        </div>
        : null
      }
      
      <FormControl fullWidth>
        
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <InputLabel id={`${id}-InputLabel`}>{id}</InputLabel>
            <Select
              labelId={`${id}-InputLabel`}
              id={`${id}-Select`}
              value={locale}
              label={`${id}`}
              onChange={handleLocaleChange}
            >
              {variants.map((item) => {
                const Flag = item?.flagCode ? Flags[item.flagCode.toUpperCase()] : null;

                return (
                  <MenuItem 
                    key={item.title} 
                    value={item.value}
                  >
                    {item.title}
                    {Flag ? <Flag title={item.title} /> : null}
                  </MenuItem>
                  );
                })}
            </Select>
          </Grid>  
          <Grid item xs={12}>
            <Button 
              variant="contained" 
              disabled={!locale} 
              onClick={handleBuild}
              size="large"
            >
              Build
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Button 
              variant="outlined" 
              color="secondary" 
              disabled={!locale} 
              onClick={handleLastTimeBuild}
              size="large"
            >
               Get Last Time Build
            </Button>
          </Grid>
        </Grid>
      </FormControl>
    </Box>
  );
}

export default BuilderDashboard;
