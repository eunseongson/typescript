import React from "react";
import { ISimplifiedPlaylist } from "../../models/playlist";
import styled from "@emotion/styled";
import { Box } from "@mui/material";

interface IPlaylistProps {
  playlists: ISimplifiedPlaylist[];
}

const ContentBox = styled(Box)(({ theme }) => ({
  display: "flex",
  padding: "8px",
  borderRadius: "8px",
  gap: "16px",
  img: {
    width: "60px",
    height: "60px",
    borderRadius: "8px",
    alignSelf: "center",
  },
  cursor: "pointer",
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
  },
}));

const AdditionalInfoStyle = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  ".name": {
    fontSize: "16px",
    fontWeight: 600,
    color: theme.palette.primary.main,
  },
  fontSize: "14px",
  color: "gray",
}));
const Playlist = (props: IPlaylistProps) => {
  const { playlists } = props;
  return (
    <>
      {playlists.map((playlist) => (
        <ContentBox>
          <img src={playlist.images?.[0]?.url} alt={playlist.name} />
          <AdditionalInfoStyle key={playlist.id}>
            <div className="name">{playlist.name}</div>
            <div>playlist - {playlist.owner?.display_name}</div>
          </AdditionalInfoStyle>
        </ContentBox>
      ))}
    </>
  );
};

export default Playlist;
