import React, { useEffect } from "react";
import { ITrack } from "../../../models/tracks";
import { Button, TableBody, TableCell, TableRow } from "@mui/material";
import { useInView } from "react-intersection-observer";
import Loading from "../../../common/components/Loading";
import styled from "@emotion/styled";
import theme from "../../../theme";
import useAddItemsToPlaylist from "../../../hooks/useAddItemsToPlaylist";
import { useParams } from "react-router";

interface ISearchResultListProps {
  list: ITrack[];
  hasNextPage: boolean | undefined;
  fetchNextPage: () => void;
  isLoading: boolean;
  isLastPage: boolean;
}

const TableRowStyle = styled(TableRow)(({ theme }) => ({
  "&:hover": {
    cursor: "pointer",
    backgroundColor: theme.palette.action.hover,
  },
  img: {
    width: "60px",
    borderRadius: "4px",
  },
}));

const SearchResultList = ({
  list,
  hasNextPage,
  fetchNextPage,
  isLoading,
  isLastPage,
}: ISearchResultListProps) => {
  const [ref, inView] = useInView();
  const { id } = useParams();
  const { mutate: addItemsToPlaylist } = useAddItemsToPlaylist();

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  if (isLoading) {
    return <Loading />;
  }

  const handleAddTrack = (track: ITrack) => {
    if (!id) return;
    console.log("track.uri", track.uri);
    addItemsToPlaylist({
      playlist_id: id,
      positions: 0,
      uris: track.uri || "",
    });
  };

  return (
    <TableBody>
      {list.map((track, idx) => {
        const isTriggerItem = isLastPage && idx === list.length - 6; // 6번째 아이템에 ref 달기
        return (
          <TableRowStyle key={track.id} ref={isTriggerItem ? ref : null}>
            <TableCell>
              <img src={track.album?.images[0].url} alt="" />
            </TableCell>
            <TableCell>
              <div style={{ marginBottom: "2px", fontWeight: "bold" }}>
                {track.name}
              </div>
              <div style={{ color: theme.palette.text.secondary }}>
                {track.artists ? track.artists[0].name : "unKnown"}
              </div>
            </TableCell>
            <TableCell>{track.album?.name}</TableCell>
            <TableCell>
              <Button onClick={() => handleAddTrack(track)}>Add</Button>
            </TableCell>
          </TableRowStyle>
        );
      })}
    </TableBody>
  );
};

export default SearchResultList;
