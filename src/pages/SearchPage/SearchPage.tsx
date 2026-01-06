import { Box, styled, Typography } from "@mui/material";
import React from "react";
import BrowseCategory from "../Category/components/BrowseCategory";

const ContentBox = styled(Box)({
  marginTop: "20px",
});

const SearchPage = () => {
  return (
    <ContentBox>
      <Typography variant="h1">Browse all</Typography>
      <BrowseCategory />
    </ContentBox>
  );
};

export default SearchPage;
