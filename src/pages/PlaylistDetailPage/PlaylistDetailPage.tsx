import React, { useEffect } from "react";
import { useParams } from "react-router";
import { useGetPlaylist } from "../../hooks/useGetPlaylist";
import ErrorMessage from "../../common/components/ErrorMessage";
import Loading from "../../common/components/Loading";
import PlaylistDetailHeader from "../../layout/components/PlaylistDetailHeader";
import useGetPlaylistItems from "../../hooks/useGetPlaylistItems";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  styled,
} from "@mui/material";
import DesktopPlaylistItem from "./components/DesktopPlaylistItem";
import { PAGE_LIMIT } from "../../configs/commonConfig";
import { useInView } from "react-intersection-observer";
import LoginButton from "../../common/components/LoginButton";
import useGetCurrentUserProfile from "../../hooks/useGetCurrentUserProfile";
import EmptyPlaylistWithSearch from "./components/EmptyPlaylistWithSearch";

const NeedLoginContent = styled("div")({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  fontWeight: "bold",
  fontSize: "18px",
  height: "80vh",
  gap: "16px",
});

const PlaylistDetailPage = () => {
  const { id } = useParams();
  const { data, isLoading, error } = useGetPlaylist({ playlist_id: id || "" });
  const { data: user } = useGetCurrentUserProfile();
  const {
    data: playlistItems,
    isLoading: isPlaylistItemsLoading,
    error: playlistItemsError,
    hasNextPage,
    isFetchNextPageError,
    fetchNextPage,
  } = useGetPlaylistItems({ playlist_id: id || "", limit: 10 });

  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView && hasNextPage && !isPlaylistItemsLoading) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isPlaylistItemsLoading, fetchNextPage]);

  if (!user)
    return (
      <NeedLoginContent>
        <div>다시 로그인하세요</div>
        <LoginButton />
      </NeedLoginContent>
    );
  if (playlistItemsError)
    return <ErrorMessage errorMessage={playlistItemsError.message} />;
  if (isLoading) return <Loading />;

  return (
    <div>
      <PlaylistDetailHeader {...data} />
      {data?.tracks?.total === 0 ? (
        <EmptyPlaylistWithSearch />
      ) : (
        <TableContainer
          sx={{
            height: "calc(100vh - 334px)",
            overflowY: "auto",
            /* IE and Edge */
            msOverflowStyle: "none",
            /* Firefox */
            scrollbarWidth: "none",
            /* Chrome, Safari, Opera */
            "&::-webkit-scrollbar": {
              display: "none",
            },
          }}
        >
          <Table stickyHeader>
            <TableHead>
              <TableRow
                sx={{ "& .MuiTableCell-head": { backgroundColor: "#121212" } }}
              >
                <TableCell>#</TableCell>
                <TableCell>Title</TableCell>
                <TableCell>Album</TableCell>
                <TableCell>Date added</TableCell>
                <TableCell>Duration</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {playlistItems?.pages.map((page, pageIndex) =>
                page.items.map((item, itemIndex) => {
                  const isLastPage =
                    pageIndex === playlistItems.pages.length - 1;
                  const isTriggerItem =
                    isLastPage && itemIndex === page.items.length - 6; // 6번째 아이템에 ref 달기

                  return (
                    <DesktopPlaylistItem
                      ref={isTriggerItem ? ref : null}
                      item={item}
                      key={pageIndex * PAGE_LIMIT + itemIndex + 1}
                      index={pageIndex * PAGE_LIMIT + itemIndex + 1}
                    />
                  );
                })
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
};

export default PlaylistDetailPage;
