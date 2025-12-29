import { InfiniteData, useInfiniteQuery, UseInfiniteQueryResult } from "@tanstack/react-query"
import { getCurrentUserPlaylists } from "../apis/playlistApi"
import { IGetCurrentUserPlaylistsRequest, TGetCurrentUserPlaylistResponse } from "../models/playlist"

const useGetCurrentUserPlaylists = ({limit, offset}: IGetCurrentUserPlaylistsRequest):UseInfiniteQueryResult<InfiniteData<TGetCurrentUserPlaylistResponse, Error>, Error>=> {
    return useInfiniteQuery({
        queryKey: ['current-user-playlists'],
        queryFn: ({ pageParam = 0 }) =>{ 
            return getCurrentUserPlaylists({limit, offset: pageParam})
        },
        initialPageParam: 0,
        getNextPageParam: (lastPage)=>{
            if(lastPage.next){
                const url = new URL(lastPage.next);
                const offsetParam = url.searchParams.get('offset');
                return offsetParam ? parseInt(offsetParam) : undefined;
            }
            return undefined
        }
    })
}

export default useGetCurrentUserPlaylists