import React, { forwardRef } from "react";
import { ISimplifiedPlaylist } from "../../models/playlist";
import PlaylistItems from "../../common/components/PlaylistItems";
import { useNavigate } from "react-router";

interface IPlaylistProps {
  playlists: ISimplifiedPlaylist[];
}

const Playlist = forwardRef<HTMLDivElement, IPlaylistProps>((props, ref) => {
  const { playlists } = props;

  const navigate = useNavigate();
  const hadleClick = (id: string) => {
    navigate(`/playlist/${id}`);
  };
  return (
    <>
      {playlists.map((playlist, index) => {
        const isTriggerItem = ref && index === playlists.length - 10;
        return (
          <div ref={isTriggerItem ? ref : null} key={playlist.id}>
            <PlaylistItems
              id={playlist.id || ""}
              images={playlist.images}
              name={playlist.name}
              owner={playlist.owner}
              handleClick={hadleClick}
            />
          </div>
        )


      })}
    </>
  );
});

export default Playlist;
