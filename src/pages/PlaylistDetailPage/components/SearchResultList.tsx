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

const TableRowStyle = styled(TableRow)({
  "&:hover": {
    cursor: "pointer",
    backgroundColor: (theme.palette.action as any).hover,
  },
  img: {
    width: "60px",
    borderRadius: "4px",
  },
  '@media (max-width: 600px)': {
    img: {
      width: "48px",
    },
  },
});

const TrackInfo = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  gap: '2px',
  minWidth: 0,
  maxWidth: '200px',
});

const TrackName = styled('div')({
  fontWeight: 'bold',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
});

const TrackArtist = styled('div')({
  color: 'text.secondary',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
});

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
    addItemsToPlaylist({
      playlist_id: id,
      positions: 0,
      uris: track.uri || "",
    });
  };

  return (
    <TableBody>
      {list.map((track, idx) => {
        const isTriggerItem = isLastPage && idx === list.length - 6;
        return (
          <TableRowStyle key={track.id} ref={isTriggerItem ? ref : null}>
            <TableCell sx={{ padding: '8px', width: '60px' }}>
              <img src={track.album?.images[0]?.url} alt="" />
            </TableCell>
            <TableCell sx={{ padding: '8px', width: 'auto' }}>
              <TrackInfo>
                <TrackName>{track.name}</TrackName>
                <TrackArtist>{track.artists?.[0]?.name || "unKnown"}</TrackArtist>
              </TrackInfo>
            </TableCell>
            <TableCell sx={{
              padding: '8px',
              width: 'auto',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: { xs: 'none', sm: 'table-cell' }
            }}>
              {track.album?.name}
            </TableCell>
            <TableCell sx={{ padding: '8px', whiteSpace: 'nowrap', textAlign: 'right' }}>
              <Button onClick={() => handleAddTrack(track)} size="small">Add</Button>
            </TableCell>
          </TableRowStyle>
        );
      })}
    </TableBody>
  );
};

export default SearchResultList;
