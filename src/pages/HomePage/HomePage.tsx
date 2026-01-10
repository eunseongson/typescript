import React from "react";
import NewReleases from "./components/NewReleases";
import { Box, styled, Typography } from "@mui/material";
import useSearchItemsByKeyword from "../../hooks/useSearchItemsByKeyword";
import { SEARCH_TYPE } from "../../models/search";
import Albums from "../SearchPage/components/Albums";
import Tracks from "../SearchPage/components/Tracks";
import Loading from "../../common/components/Loading";

const ContentBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '30px',
  [theme.breakpoints.down('sm')]: {
    gap: '20px',
  },
}))

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  fontSize: '24px',
  color: 'text.primary',
  [theme.breakpoints.down('sm')]: {
    fontSize: '20px',
  },
}))
const HomePage = () => {
  const { data, isLoading } =
    useSearchItemsByKeyword({
      q: "q=tag:new&type:track&genre:k-pop",
      type: [SEARCH_TYPE.Track, SEARCH_TYPE.Artist, SEARCH_TYPE.Album],
      limit: 10,
    });
  const queryData = data?.pages[0]
  const tracks = (queryData?.tracks?.items || []).slice(0, 6)
  const albums = (queryData?.albums?.items || []).slice(0, 6)

  if (isLoading) {
    return <Loading />
  }

  return (
    <ContentBox>
      <SectionTitle>Recent Popular Tracks</SectionTitle>
      <Tracks tracks={tracks} />
      <SectionTitle>Recent Popular Albums</SectionTitle>
      <Albums albums={albums} />
      <NewReleases />
    </ContentBox>
  );
};

export default HomePage;
