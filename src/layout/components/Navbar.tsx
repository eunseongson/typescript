import { Box } from "@mui/material";
import React from "react";
import LoginButton from "../../common/components/LoginButton";
import LogoutButton from "../../common/components/LogoutButton";

const Navbar = () => {
  const isLogin = !!localStorage.getItem('access_token');
  return (
    <Box
      display="flex"
      justifyContent="flex-end"
      alignItems="center"
      height="64px"
    >
      {isLogin ? <LogoutButton /> : <LoginButton />}
    </Box>
  );
};

export default Navbar;
