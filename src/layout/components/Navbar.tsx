import { Box } from "@mui/material";
import React from "react";
import LoginButton from "../../common/components/LoginButton";
import useGetCurrentUserProfile from "../../hooks/useGetCurrentUserProfile";
import Profile from "../../common/components/Profile";

const Navbar = () => {
  const { data: userProfile } = useGetCurrentUserProfile()
  if (userProfile)
    console.log("userProfile.images[0]?.url : ", userProfile.images[0]?.url)
  return (
    <Box
      display="flex"
      justifyContent="flex-end"
      alignItems="center"
      height="64px"
    >
      {userProfile ? <Profile imageUrl={userProfile.images[0]?.url} /> : <LoginButton />}
    </Box>
  );
};

export default Navbar;
