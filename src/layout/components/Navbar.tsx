import { Box } from "@mui/material";
import React from "react";
import LoginButton from "../../common/components/LoginButton";
import useGetCurrentUserProfile from "../../hooks/useGetCurrentUserProfile";
import Profile from "../../common/components/Profile";
import { styled } from "@mui/system";
import { useLocation } from "react-router";
import SearchInput from "../../pages/SearchPage/components/SearchInput";

const ContentBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  height: "64px",
  '& .search': {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
  },
  '& .search .icon': {
    position: 'absolute',
    left: '12px',
    top: '50%',
    transform: 'translateY(-50%)',
    color: 'rgba(255,255,255,0.7)'
  },
  input: {
    color: 'white',
    fontSize: '16px',
    fontWeight: 'bold',
    width: '420px',
    borderRadius: '20px',
    height: '40px',
    backgroundColor: theme.palette.background.gray,
    border: 'none',
    paddingLeft: '40px',
    '&::placeholder': {
      color: 'white',
      fontSize: '16px',
      opacity: 0.7,
    }
  },
  '& .right-nav-items': {
    marginLeft: 'auto',
  }
}));

const Navbar = () => {
  const { data: userProfile } = useGetCurrentUserProfile()
  const location = useLocation();
  return (
    <ContentBox>
      {location.pathname.startsWith('/search') && (
        <SearchInput />
      )}
      <div className="right-nav-items">
        {userProfile ? <Profile imageUrl={userProfile.images[0]?.url} /> : <LoginButton />}
      </div>
    </ContentBox>
  );
};

export default Navbar;
