import React, { useContext, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { Navigate } from "react-router-dom";
import Button from "@mui/material/Button";
import { AuthContext } from "../../contexts/authContext"
import Link from "@mui/material/Link"

const TemplateLoginPage = props => {
    const context = useContext(AuthContext)
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
  
    const login = () => {
      context.authenticate(username, password);
    };

    if (context.isAuthenticated === true) {
        return <Navigate to={"/"} />;
      }

    return (
    <>
        <Box component ="div" pt={10} sx={{ display: 'flex', justifyContent: 'center'}}>
          <Typography component="h2" variant="h3">
            Log In
          </Typography>
        </Box>
        <Box component ="div" pt={5} sx={{ display: 'flex', justifyContent: 'center'}}>
          <TextField
           id="username"
            label="Username"
           type="text"
           autoFocus
           onChange={e => {setUsername(e.target.value)}}
          />
        </Box>
        <Box component ="div" pt={1} sx={{ display: 'flex', justifyContent: 'center'}}>
          <TextField
            id="password"
            label="Password"
            type="password"
            autoComplete="current-password"
            onChange={e => {setPassword(e.target.value)}}
          />
        </Box>
        <Box component ="div" pt={1} sx={{ display: 'flex', justifyContent: 'center'}}>
          <Button
          variant="contained"
          color="primary"
          onClick={login}
          >
            Log in
          </Button>
        </Box>
        <Box component ="div" pt={3} sx={{ display: 'flex', justifyContent: 'center'}}>
          <Typography>
            Not registered? 
          </Typography>
          <Link href="/signup">
            Sign up here!
          </Link>
        </Box>
    </>
  );
};

export default TemplateLoginPage;