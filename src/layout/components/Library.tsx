import React, { useEffect } from "react";
import EmptyPlaylist from "./EmptyPlaylist";
import useGetCurrentUserPlaylists from "../../hooks/useGetCurrentUserPlaylists";
import Playlist from "./Playlist";
import useGetCurrentUserProfile from "../../hooks/useGetCurrentUserProfile";
import Loading from "../../common/components/Loading";
import ErrorMessage from "../../common/components/ErrorMessage";
import { useInView } from "react-intersection-observer";

const Library = () => {
  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetCurrentUserPlaylists({
    limit: 10,
    offset: 0,
  });
  const [ref, inView] = useInView();
  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  const { data: user } = useGetCurrentUserProfile();
  if (!user) {
    return <EmptyPlaylist />;
  }
  if (isLoading) {
    return <Loading />;
  }
  if (error) {
    return <ErrorMessage errorMessage={error.message} />;
  }

  return !data || data?.pages[0].total === 0 ? (
    <EmptyPlaylist />
  ) : (
    <>
      {data?.pages.map((page, index) => (
        <Playlist key={index} playlists={page.items} />
      ))}
      <div ref={ref}></div>
    </>
  );
};

export default Library;
