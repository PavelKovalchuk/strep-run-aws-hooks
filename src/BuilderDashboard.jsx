import React, {useState} from "react";

import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';


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

    try {
      await fetch("https://webhooks.amplify.eu-central-1.amazonaws.com/prod/webhooks?id=9fa20c89-2086-430b-af82-d73baf7b6186&token=knKgiqR8WtTHwyBVxkDv8UT5oU4pdXkNTg0OAY8&operation=startbuild", {
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

  console.log("process.env.REACT_APP_DEVELOP_TEST_1_HOOK", process.env.REACT_APP_DEVELOP_TEST_1_HOOK);
  console.log("variants", variants);

  return (
    <Box sx={{ minWidth: 300 }}>

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
            return (
              <MenuItem key={item.title} value={item.value}>{item.title}</MenuItem>
            );
          })}
        </Select>
        <Button variant="contained" disabled={!locale} onClick={handleBuild}>Build</Button>
      </FormControl>
    </Box>
  );
}

export default BuilderDashboard;
