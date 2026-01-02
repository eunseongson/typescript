import { useInfiniteQuery } from "@tanstack/react-query"
import { IGetPlaylistItemsRequest } from "../models/playlist"
import { getPlaylistItems } from "../apis/playlistApi";

const useGetPlaylistItems = (params: IGetPlaylistItemsRequest) => {
    return useInfiniteQuery({
        queryKey: ['playlist-items', params],
        queryFn: ({ pageParam }) => {
            return getPlaylistItems({ offset: pageParam, ...params });
        },
        initialPageParam: 0,
        getNextPageParam: (lastPage) => {
            if (!lastPage.next) return undefined;
            const url = new URL(lastPage.next);
            const nextOffset = url.searchParams.get('offset');
            return nextOffset ? parseInt(nextOffset) : undefined;
        }
    })
}

export default useGetPlaylistItems;