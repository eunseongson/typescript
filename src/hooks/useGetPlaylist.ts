import { useQuery } from "@tanstack/react-query"
import { IGetPlaylistRequest } from "../models/playlist";
import { getPlaylist } from "../apis/playlistApi";

export const useGetPlaylist = (params: IGetPlaylistRequest) => {
    return useQuery({
        queryKey: ['getPlaylist', params.playlist_id],
        queryFn: () => {
            return getPlaylist(params);
        },
        enabled: !!params.playlist_id
    })
}