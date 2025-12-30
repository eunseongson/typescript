import React from "react";
import { ISimplifiedPlaylist } from "../../models/playlist";
import PlaylistItems from "../../common/components/PlaylistItems";
import { useNavigate } from "react-router";

interface IPlaylistProps {
  playlists: ISimplifiedPlaylist[];
}

const Playlist = (props: IPlaylistProps) => {
  const { playlists } = props;

  const navigate = useNavigate();
  const hadleClick = (id: string) => {
    navigate(`/playlist/${id}`);
  };
  return (
    <>
      {playlists.map((playlist) => (
        <PlaylistItems
          key={playlist.id}
          id={playlist.id || ""}
          images={playlist.images}
          name={playlist.name}
          owner={playlist.owner}
          handleClick={hadleClick}
        />
      ))}
    </>
  );
};

export default Playlist;
