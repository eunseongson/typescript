import { Button } from "@mui/material";
import React from "react";
import { getSpotifyAuthUrl } from "../../utils/auth";

const LoginButton = () => {
  const login = () => {
    getSpotifyAuthUrl()
  }
  return (
    <Button 
      variant="contained" 
      color="secondary" 
      size="large" 
      onClick={login}
      sx={{
        padding: { xs: '6px 16px', sm: '8px 32px' },
        fontSize: { xs: '14px', sm: '16px' },
      }}
    >
      Login
    </Button>
  );
};

export default LoginButton;
