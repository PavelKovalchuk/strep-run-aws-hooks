import React, {useState} from "react";

import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';

import Flags from 'country-flag-icons/react/3x2';

import './BuilderDashboard.css';

function compareTitles( a, b ) {
  if ( a.title < b.title ){
    return -1;
  }
  if ( a.title > b.title ){
    return 1;
  }
  return 0;
}

function BuilderDashboard({variants, id}) {
  const [locale, setLocale] = useState('');
  const [message, setMessage] = useState({text: "", type: ""});

  const handleLocaleChange = (event) => {
    setLocale(event.target.value);
  };

  const handleCloseAlert = () => {
    setLocale("");
    setMessage({text: "", type: ""});
  };

  const handleBuild = async () => {
    const data = variants.find((item) => {
      return item.value === locale;
    });

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

      setLocale("");
      setMessage({text: "Success", type: "success"});

    } catch (error) {
      setMessage({text: "Error: " + error, type: "error"});
    }
  };

  variants.sort( compareTitles );

  return (
    <Box sx={{ minWidth: 300 }} className="builderDashboard">

      {message.text 
        ? <Alert onClose={handleCloseAlert} severity={message.type}>{message.text}</Alert> 
        : null
      }
      
      <FormControl fullWidth>
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
        <Button variant="contained" disabled={!locale} onClick={handleBuild}>Build</Button>
      </FormControl>
    </Box>
  );
}

export default BuilderDashboard;
