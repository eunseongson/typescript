import React from "react";
import Library from "../../layout/components/Library";
import LibraryHead from "../../layout/components/LibraryHead";
import { Box, styled } from "@mui/material";

const Container = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  gap: '16px',
  [theme.breakpoints.down('sm')]: {
    gap: '8px',
  },
}));

const LibraryPage = () => {
  return (
    <Container>
      <Library />
    </Container>
  );
};

export default LibraryPage;
