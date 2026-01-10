import React from "react";
import { Box, styled, Typography } from "@mui/material";
import BrowseCategory from "../Category/components/BrowseCategory";

const ContentBox = styled(Box)(({ theme }) => ({
    marginTop: "20px",
    [theme.breakpoints.down("sm")]: {
        marginTop: "10px",
    },
}));

const SearchPage = () => {

    return (
        <ContentBox>
            <Typography variant="h1">Browse all</Typography>
            <BrowseCategory />
        </ContentBox>
    );
};

export default SearchPage;
