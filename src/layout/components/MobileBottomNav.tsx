import React from "react";
import { BottomNavigation, BottomNavigationAction, styled, Box } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";
import { NavLink, useLocation } from "react-router";

const BottomNavContainer = styled(Box)(({ theme }) => ({
  position: "fixed",
  bottom: 0,
  left: 0,
  right: 0,
  zIndex: 1000,
  backgroundColor: theme.palette.background.paper,
  borderTop: `1px solid ${theme.palette.divider}`,
  [theme.breakpoints.up("sm")]: {
    display: "none",
  },
}));

const StyledBottomNavigation = styled(BottomNavigation)({
  width: "100%",
  height: "60px",
});

const StyledNavLink = styled(NavLink)({
  textDecoration: "none",
  color: "inherit",
  flex: 1,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100%",
  "&.active": {
    color: "#1db954",
  },
});

const MobileBottomNav = () => {
  const location = useLocation();

  const getActiveValue = () => {
    if (location.pathname === "/") return 0;
    if (location.pathname.startsWith("/search")) return 1;
    if (location.pathname.startsWith("/library") || location.pathname.startsWith("/playlist")) return 2;
    return 0;
  };

  return (
    <BottomNavContainer>
      <StyledBottomNavigation value={getActiveValue()} showLabels={false}>
        <StyledNavLink to="/">
          <BottomNavigationAction label="Home" icon={<HomeIcon />} />
        </StyledNavLink>
        <StyledNavLink to="/search">
          <BottomNavigationAction label="Search" icon={<SearchIcon />} />
        </StyledNavLink>
        <StyledNavLink to="/library">
          <BottomNavigationAction label="Library" icon={<LibraryMusicIcon />} />
        </StyledNavLink>
      </StyledBottomNavigation>
    </BottomNavContainer>
  );
};

export default MobileBottomNav;
