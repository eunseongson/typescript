import { Box, styled, Typography } from "@mui/material";
import React from "react";
import { NavLink, Outlet } from "react-router";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import LibraryHead from "./components/LibraryHead";
import Library from "./components/Library";
import Navbar from "./components/Navbar";

const Layout = styled("div")({
  display: "flex",
  height: "100vh",
  padding: "8px",
});

const Sidebar = styled("div")(({ theme }) => ({
  marginRight: "8px",
  width: "331px",
  height: "100%", // 100vh
  display: "flex",
  flexDirection: "column",
  [theme.breakpoints.down("sm")]: {
    display: "none",
  },
}));

const ContentBox = styled(Box)(({ theme }) => ({
  borderRadius: "8px",
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.text.primary,
  width: "100%",
  padding: "8px",
  marginBottom: "8px",
  marginRight: "8px",
  '&.library': {
    overflowY: "auto",
    scrollbarWidth: "none",
  }
}));

const MainContentBox = styled(Box)(({ theme }) => ({
  borderRadius: "8px",
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.text.primary,
  width: "100%",
  padding: "20px",
  marginBottom: "8px",
  marginRight: "8px",
  overflowY: "auto",
  scrollbarWidth: "none",
}));

const NavList = styled("ul")({
  listStyle: "none",
  padding: 0,
  margin: 0,
});

const StyledNavLink = styled(NavLink)(({ theme }) => ({
  textDecoration: "none",
  display: "flex",
  alignItems: "center",
  gap: "20px",
  margin: "16px",
  color: theme.palette.text.secondary,
  "&.active": {
    color: theme.palette.text.primary,
  },
  "&:hover": {
    color: theme.palette.text.primary,
  },
}));
const AppLayout = () => {
  return (
    <Layout>
      <Sidebar>
        <ContentBox>
          <NavList>
            <StyledNavLink to="/">
              <HomeIcon />
              <Typography variant="h2" fontWeight={700}>
                Home
              </Typography>
            </StyledNavLink>
            <StyledNavLink to="/search">
              <SearchIcon />
              <Typography variant="h2" fontWeight={700}>
                Search
              </Typography>
            </StyledNavLink>
          </NavList>
        </ContentBox>
        <ContentBox className="library">
          <LibraryHead />
          <Library />
        </ContentBox>
      </Sidebar>
      <MainContentBox>
        <Navbar />
        <Outlet />
      </MainContentBox>
    </Layout>
  );
};

export default AppLayout;
